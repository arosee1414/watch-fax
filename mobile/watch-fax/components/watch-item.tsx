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
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 10,
                width: screenWidth * 0.7,
                minHeight: screenHeight * 0.25,
                display: 'flex',
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
            <View
                style={{
                    borderRadius: 10,
                    width: screenWidth * 0.7,
                    height: screenHeight * 0.4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
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
                    resizeMode='center'
                    style={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        width: '100%',
                        height: screenHeight * 0.4,
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={() =>
                    router.push(`/(screens)/watch-details/${props.watch.id}`)
                }
                style={{
                    display: 'flex',
                }}
            >
                <View
                    style={{
                        width: screenWidth * 0.7,
                        padding: 5,
                    }}
                >
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
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({});

export default WatchItem;
