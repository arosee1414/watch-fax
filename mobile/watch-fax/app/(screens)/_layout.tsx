import { backgroundColor, navyColor } from '@/assets/default-styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAddAWatchContext } from '../contexts/add-watch-context';

const Layout = () => {
    const addAWatchContext = useAddAWatchContext();
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='add-watch/add-a-watch-1'
                options={{
                    headerShown: true,
                    title: 'Add a watch',
                    headerTitleStyle: {
                        color: navyColor,
                        fontSize: 25,
                        fontFamily: 'roboto-black',
                    },
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: backgroundColor },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                addAWatchContext.clearAllInfo?.();
                                Keyboard.dismiss();
                                router.back();
                            }}
                        >
                            <FontAwesome5
                                name='arrow-left'
                                size={24}
                                color={navyColor}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name='add-watch/add-a-watch-2'
                options={{
                    headerShown: true,
                    title: 'Add a watch',
                    headerTitleStyle: {
                        color: navyColor,
                        fontSize: 25,
                        fontFamily: 'roboto-black',
                    },
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: backgroundColor },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                addAWatchContext.clearAllInfo?.();
                                Keyboard.dismiss();
                                router.back();
                            }}
                        >
                            <FontAwesome5
                                name='arrow-left'
                                size={24}
                                color={navyColor}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name='add-watch/add-a-watch-3'
                options={{
                    headerShown: true,
                    title: 'Add a watch',
                    headerTitleStyle: {
                        color: navyColor,
                        fontSize: 25,
                        fontFamily: 'roboto-black',
                    },
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: backgroundColor },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss();
                                router.back();
                            }}
                        >
                            <FontAwesome5
                                name='arrow-left'
                                size={24}
                                color={navyColor}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name='watch-details/[watchId]'
                options={{
                    headerShown: true,
                    title: 'Watch details',
                    headerTitleStyle: {
                        color: navyColor,
                        fontSize: 25,
                        fontFamily: 'roboto-black',
                    },
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: backgroundColor },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss();
                                router.back();
                            }}
                        >
                            <FontAwesome5
                                name='arrow-left'
                                size={24}
                                color={navyColor}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
};

const styles = StyleSheet.create({});

export default Layout;
