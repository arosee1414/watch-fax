import { backgroundColor, goldColor, navyColor } from '@/assets/default-styles';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
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
                                    marginBottom: 5,
                                    height: size + 5,
                                }}
                            >
                                <MaterialIcons
                                    name='dashboard'
                                    size={size + 1}
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
                                    marginBottom: 5,
                                    height: size + 5,
                                }}
                            >
                                <MaterialIcons
                                    name='attach-money'
                                    size={size + 5}
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
                                    height: size + 7,
                                }}
                            >
                                <AntDesign
                                    name='search1'
                                    size={size + 1}
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
                                    name='watch'
                                    size={size}
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
                                <Feather
                                    name='more-horizontal'
                                    size={size + 3}
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
