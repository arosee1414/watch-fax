import { WatchRecord } from '@/app/clients/generatedClient';
import React from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';

export interface IWatchItemProps {
    watch: WatchRecord;
}

const WatchItem = (props: IWatchItemProps) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: '#767676',
                width: screenWidth * 0.7,
                minHeight: screenHeight * 0.25,
                borderRadius: 15,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('../assets/images/sample-watch.png')}
                    resizeMode='stretch'
                    style={{
                        width: screenWidth * 0.7,
                        height: screenHeight * 0.25,
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
                    <Text
                        style={{
                            marginTop: 5,
                            fontFamily: 'roboto-black',
                            fontSize: 15,
                        }}
                    >
                        {props.watch.purchasePrice?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default WatchItem;
