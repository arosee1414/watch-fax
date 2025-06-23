import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Image,
    Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { backgroundColor } from '@/assets/default-styles';
import { useLocalSearchParams } from 'expo-router';
import { WatchRecord } from '@/app/clients/generatedClient';
import { useAuth } from '@clerk/clerk-expo';
import WatchFaxClient from '@/app/clients/watch-fax-client';

export default function WatchDetails() {
    const { watchId } = useLocalSearchParams();
    const [watch, setWatch] = useState<WatchRecord>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const { getToken } = useAuth();

    useEffect(() => {
        const fetchWatch = async () => {
            try {
                const token = await getToken();
                if (token === null) {
                    console.error('Failed to retrieve authentication token');
                    return;
                }
                const client = new WatchFaxClient(token);
                const watch = await client.getWatchById(
                    watchId as unknown as string
                );
                setWatch(watch);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        if (watchId != null) {
            fetchWatch();
        }
    }, [watchId]);

    return (
        <SafeAreaView
            style={{
                backgroundColor: backgroundColor,
                flex: 1,
            }}
        >
            <ScrollView
                style={{
                    marginTop: -50,
                    //flex: 1,
                }}
                contentContainerStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    paddingHorizontal: 30,
                }}
            >
                <View
                    style={{
                        borderRadius: 10,
                        width: screenWidth * 0.7,
                        height: screenHeight * 0.4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 2,
                        shadowColor: 'black',
                        shadowOpacity: 0.5,
                        shadowOffset: {
                            height: 2,
                            width: 0,
                        },
                        shadowRadius: 2,
                    }}
                >
                    {isLoading && (
                        <ActivityIndicator
                            size='large'
                            color='#000'
                            style={{
                                position: 'absolute',
                                zIndex: 1,
                            }}
                        />
                    )}
                    <Image
                        onLoadStart={() => setIsLoading(true)}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                        source={{
                            uri: watch?.imageUrls?.[0],
                            cache: 'force-cache',
                        }}
                        resizeMode='center'
                        style={{
                            borderRadius: 10,
                            width: '100%',
                            height: screenHeight * 0.4,
                        }}
                    />
                </View>
                <View
                    style={{
                        width: '100%',
                        //borderWidth: 1,
                        //borderColor: 'red',
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'flex-start',
                    }}
                >
                    <Text style={{ fontFamily: 'roboto-black', fontSize: 20 }}>
                        {watch?.brand} {watch?.model}
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'roboto-black',
                            fontSize: 20,
                            marginTop: 20,
                        }}
                    >
                        {watch?.purchasePrice?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </Text>
                    <View
                        style={{
                            marginVertical: 30,
                            width: '100%',
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    ></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
