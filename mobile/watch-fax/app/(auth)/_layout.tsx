import { backgroundColor, navyColor } from '@/assets/default-styles';
import { router, Stack } from 'expo-router';
import * as React from 'react';
import { Button, Keyboard } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export default function AuthLayout(): React.JSX.Element {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login-page' />
            <Stack.Screen
                name='sign-up-page'
                options={{
                    headerShown: true,
                    title: 'Account registration',
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
                name='account-info-page'
                options={{
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
