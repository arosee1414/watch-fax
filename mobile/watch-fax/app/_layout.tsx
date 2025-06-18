import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import * as React from 'react';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from './utils/token-cache';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

export default function RootLayout(): React.JSX.Element {
    const [loaded, error] = useFonts({
        'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'roboto-semiBold': require('../assets/fonts/Roboto-SemiBold.ttf'),
        'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'roboto-black': require('../assets/fonts/Roboto-Black.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, []);

    return (
        <GestureHandlerRootView>
            <ClerkProvider
                publishableKey={
                    'pk_test_d2lzZS1zdGluZ3JheS03Ny5jbGVyay5hY2NvdW50cy5kZXYk'
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
            router.navigate('/(tabs)/two');
        } else if (isLoaded && !isSignedIn) {
            router.navigate('/(auth)/login-page');
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
