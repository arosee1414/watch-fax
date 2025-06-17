import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import * as React from 'react';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from './utils/token-cache';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Alert, EventSubscription } from 'react-native';

export default function RootLayout(): React.JSX.Element {
    return (
        <GestureHandlerRootView>
            <ClerkProvider
                publishableKey={
                    'pk_test_dmFzdC1zZWFzbmFpbC00OC5jbGVyay5hY2NvdW50cy5kZXYk'
                }
                tokenCache={tokenCache}
            >
                <ClerkLoaded>
                    <RootLayoutNav />
                </ClerkLoaded>
            </ClerkProvider>
        </GestureHandlerRootView>
    );
}

function RootLayoutNav(): React.JSX.Element {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            //router.navigate('/dashboard');
        } else if (isLoaded && !isSignedIn) {
            router.navigate('/login-page');
        }
    }, []);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='(auth)'
                options={{ headerShown: false, animation: 'fade' }}
            />
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen
                name='(tabs)'
                options={{
                    headerShown: false,
                    animation: 'fade',
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen name='(screens)' />
        </Stack>
    );
}
