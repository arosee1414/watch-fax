import { Stack } from 'expo-router';
import * as React from 'react';

export default function AuthLayout(): React.JSX.Element {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login-page' />
        </Stack>
    );
}
