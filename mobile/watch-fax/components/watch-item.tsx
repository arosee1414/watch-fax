import { WatchRecord } from '@/app/clients/generatedClient';
import { useUser } from '@clerk/clerk-expo';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import UseUserReturn from '@clerk/types';
import { formatDateFromMillis } from '@/app/utils/time-utils';
import { Ionicons } from '@expo/vector-icons';
import { navyColor } from '@/assets/default-styles';
import { router } from 'expo-router';

export interface IWatchItemProps {
    watch: WatchRecord;
    user: UseUserReturn.UserResource | undefined;
}

const WatchItem = (props: IWatchItemProps) => {
    const [aspectRatio, setAspectRatio] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    useEffect(() => {
        Image.getSize(props.watch.imageUrls?.[0] ?? '', (width, height) => {
            setAspectRatio(width / height);
        });
    }, [props]);

    return (
        <View
            style={{
                //borderWidth: 1,
                //borderColor: '#767676',
                width: screenWidth,
                minHeight: screenHeight * 0.25,
            }}
        >
            <View
                style={{
                    padding: 5,
                    borderRadius: 100,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={{
                            uri: props.user?.imageUrl,
                            //cache: 'force-cache',
                        }}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            borderRadius: 100,
                        }}
                    />
                    <Text>{props.user?.firstName}</Text>
                </View>

                <TouchableOpacity
                    onPress={() =>
                        router.push(
                            `/(screens)/watch-details/${props.watch.id}`
                        )
                    }
                    style={{ alignContent: 'flex-end', marginRight: 10 }}
                >
                    <Ionicons name='open-outline' size={24} color={navyColor} />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    width: screenWidth,
                    aspectRatio: aspectRatio,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f2f2f2', // Optional: placeholder background
                    position: 'relative',
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
                        uri: props.watch.imageUrls?.[0],
                        cache: 'force-cache',
                    }}
                    resizeMode='contain'
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </View>
            <View
                style={{
                    padding: 10,
                    display: 'flex',
                }}
            >
                <View>
                    <Text
                        style={{
                            fontFamily: 'roboto-black',
                            fontSize: 17,
                        }}
                    >
                        {props.watch.brand} {props.watch.model}
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 5,
                                fontFamily: 'roboto-black',
                                fontSize: 15,
                            }}
                        >
                            {props.watch.purchasePrice?.toLocaleString(
                                'en-US',
                                {
                                    style: 'currency',
                                    currency: 'USD',
                                }
                            )}
                        </Text>
                        <Text
                            style={{
                                marginTop: 5,
                                color: '#585858',
                                fontFamily: 'roboto-black',
                                fontSize: 15,
                            }}
                        >
                            {formatDateFromMillis(props.watch.createdAtTime!)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default WatchItem;
