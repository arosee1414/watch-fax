import { backgroundColor, navyColor } from '@/assets/default-styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

const Layout = () => {
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
                        <FontAwesome5
                            name='arrow-left'
                            size={24}
                            color='black'
                            onPress={() => {
                                Keyboard.dismiss();
                                router.back();
                            }}
                        />
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
                        <FontAwesome5
                            name='arrow-left'
                            size={24}
                            color='black'
                            onPress={() => {
                                Keyboard.dismiss();
                                router.back();
                            }}
                        />
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
                        <FontAwesome5
                            name='arrow-left'
                            size={24}
                            color='black'
                            onPress={() => {
                                Keyboard.dismiss();
                                router.back();
                            }}
                        />
                    ),
                }}
            />
        </Stack>
    );
};

const styles = StyleSheet.create({});

export default Layout;
