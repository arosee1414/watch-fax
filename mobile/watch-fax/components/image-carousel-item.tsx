import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { transform } from '@babel/core';

interface IImageCarouselItemProps {
    imageUrl: string;
    index: number;
    scrollX: SharedValue<number>;
}

export default function ImageCarouselItem(props: IImageCarouselItemProps) {
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    const rnAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        props.scrollX.value,
                        [
                            (props.index - 1) * screenWidth,
                            props.index * screenWidth,
                            (props.index + 1) * screenWidth,
                        ],
                        [-screenWidth * 0.25, 0, screenWidth * 0.25],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        props.scrollX.value,
                        [
                            (props.index - 1) * screenWidth,
                            props.index * screenWidth,
                            (props.index + 1) * screenWidth,
                        ],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    return (
        <Animated.View
            style={[
                {
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: screenWidth,
                },
                rnAnimatedStyle,
            ]}
        >
            <Image
                source={{
                    uri: props.imageUrl,
                    cache: 'force-cache',
                }}
                resizeMode='center'
                style={{
                    margin: 30,
                    borderRadius: 10,
                    width: screenWidth * 0.7,
                    height: screenHeight * 0.4,
                }}
            />
        </Animated.View>
    );
}
