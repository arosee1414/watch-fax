import { WatchRecord } from '@/app/clients/generatedClient';
import { useUser } from '@clerk/clerk-expo';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import UseUserReturn from '@clerk/types';
import { formatDateFromMillis } from '@/app/utils/time-utils';
import { goldColor } from '@/assets/default-styles';

export interface IWatchItemProps {
    watch: WatchRecord;
    user: UseUserReturn.UserResource | undefined;
}

const WatchItem = (props: IWatchItemProps) => {
    const [aspectRatio, setAspectRatio] = useState(1);
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
            <View
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={{
                        uri: props.watch.imageUrls?.[0],
                        cache: 'force-cache',
                    }}
                    resizeMode='contain'
                    style={{
                        aspectRatio: aspectRatio,
                        width: screenWidth,
                        minHeight: screenHeight * 0.25,
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
                                //color: goldColor,
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
