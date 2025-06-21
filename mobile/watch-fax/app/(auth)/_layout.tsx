import { backgroundColor, navyColor } from '@/assets/default-styles';
import { router, Stack } from 'expo-router';
import * as React from 'react';
import { Button, Keyboard, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export default function AuthLayout(): React.JSX.Element {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login-page' />
            <Stack.Screen
                name='sign-up-page'
                options={{
                    headerShown: true,
                    title: 'Account creation',
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
                name='account-info-page'
                options={{
                    gestureEnabled: false,
                    headerShown: true,
                    title: 'Account information',
                    headerTitleStyle: {
                        color: navyColor,
                        fontSize: 25,
                        fontFamily: 'roboto-black',
                    },
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: backgroundColor },
                    headerLeft: () => <></>,
                }}
            />
        </Stack>
    );
}
