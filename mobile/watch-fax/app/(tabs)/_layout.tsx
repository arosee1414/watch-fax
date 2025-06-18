import { backgroundColor, goldColor, navyColor } from '@/assets/default-styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { JSX } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Layout(): JSX.Element {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: goldColor,
                tabBarInactiveTintColor: backgroundColor,
                tabBarStyle: {
                    backgroundColor: navyColor,
                    height: 90,
                    paddingTop: 10,
                },
            }}
        >
            <Tabs.Screen
                name='dashboard'
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View
                                style={{
                                    height: size + 5,
                                }}
                            >
                                <MaterialIcons
                                    name='dashboard'
                                    size={focused ? size + 5 : size}
                                    color={color}
                                />
                            </View>
                        );
                    },
                }}
            />
            <Tabs.Screen
                name='market'
                options={{
                    tabBarLabel: 'Market',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View
                                style={{
                                    height: size + 5,
                                }}
                            >
                                <MaterialIcons
                                    name='dashboard'
                                    size={focused ? size + 5 : size}
                                    color={color}
                                />
                            </View>
                        );
                    },
                }}
            />
            <Tabs.Screen
                name='explore'
                options={{
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View
                                style={{
                                    height: size + 5,
                                }}
                            >
                                <MaterialIcons
                                    name='dashboard'
                                    size={focused ? size + 5 : size}
                                    color={color}
                                />
                            </View>
                        );
                    },
                }}
            />
            <Tabs.Screen
                name='collection'
                options={{
                    tabBarLabel: 'Collection',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View
                                style={{
                                    height: size + 5,
                                }}
                            >
                                <MaterialIcons
                                    name='dashboard'
                                    size={focused ? size + 5 : size}
                                    color={color}
                                />
                            </View>
                        );
                    },
                }}
            />
            <Tabs.Screen
                name='more'
                options={{
                    tabBarLabel: 'More',
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View
                                style={{
                                    height: size + 5,
                                }}
                            >
                                <MaterialIcons
                                    name='dashboard'
                                    size={focused ? size + 5 : size}
                                    color={color}
                                />
                            </View>
                        );
                    },
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({});
