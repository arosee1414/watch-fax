import { backgroundColor, goldColor, navyColor } from '@/assets/default-styles';
import { useUser } from '@clerk/clerk-expo';
import {
    AntDesign,
    Feather,
    FontAwesome5,
    MaterialIcons,
} from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import React, { JSX } from 'react';
import {
    Keyboard,
    StyleSheet,
    Touchable,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Layout(): JSX.Element {
    const { user } = useUser();

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
                    headerShown: true,
                    title: `${user?.firstName || 'Collection'}'s Collection`,
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: backgroundColor },
                    headerTitleStyle: {
                        color: navyColor,
                        fontSize: 20,
                        fontFamily: 'roboto-black',
                    },
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
                    headerLeftContainerStyle: {
                        marginLeft: 66,
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity style={{ marginLeft: 15 }}>
                                <FontAwesome5
                                    name='arrow-left'
                                    size={24}
                                    color={navyColor}
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        router.back();
                                    }}
                                />
                            </TouchableOpacity>
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
