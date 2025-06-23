import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ImageCarouselItem from './image-carousel-item';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';

interface IImageCarouselProps {
    imageUrls: string[];
}

export default function ImageCarousel(props: IImageCarouselProps) {
    const scrollX = useSharedValue(0);
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
    });
    return (
        <View>
            <Animated.FlatList
                data={props?.imageUrls}
                renderItem={({ item, index }) => (
                    <ImageCarouselItem
                        imageUrl={item}
                        index={index}
                        scrollX={scrollX}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                onScroll={onScrollHandler}
            />
        </View>
    );
}
