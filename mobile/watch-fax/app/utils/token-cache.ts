import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { TokenCache } from '@clerk/clerk-expo';

const createTokenCache = (): TokenCache => {
    return {
        getToken: async (key: string) => {
            try {
                const item = await SecureStore.getItemAsync(key);
                return item;
            } catch (error) {
                console.error('secure store get item error: ', error);
                await SecureStore.deleteItemAsync(key);
                return null;
            }
        },
        saveToken: (key: string, token: string) => {
            return SecureStore.setItemAsync(key, token);
        },
    };
};

// SecureStore is not supported on the web
export const tokenCache =
    Platform.OS !== 'web' ? createTokenCache() : undefined;

export default tokenCache;
