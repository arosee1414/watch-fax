import { backgroundColor, goldColor, navyColor } from '@/assets/default-styles';
import { AntDesign } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAddAWatchContext } from '../contexts/add-watch-context';
import { useAuth, useUser } from '@clerk/clerk-expo';
import WatchFaxClient from '../clients/watch-fax-client';
import { WatchRecord } from '../clients/generatedClient';
import WatchItem from '@/components/watch-item';

const Collection = () => {
    const user = useUser();
    const { getToken } = useAuth();
    const [watches, setWatches] = useState<WatchRecord[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchWatches = async () => {
        try {
            const token = await getToken();
            if (token === null) {
                console.error('Failed to retrieve authentication token');
                return;
            }
            const client = new WatchFaxClient(token);
            const watches = await client.getAllWatchRecords();
            setWatches(watches);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchWatches();
        }, [])
    );

    const addAWatchContext = useAddAWatchContext();
    return (
        <>
            <SafeAreaView
                style={{
                    backgroundColor: backgroundColor,
                    flex: 1,
                }}
            >
                {isLoading ? (
                    <ActivityIndicator animating={isLoading} size={'large'} />
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{
                            marginTop: -50,
                            flex: 1,
                            padding: 0,
                            marginBottom: -35,
                        }}
                        contentContainerStyle={{
                            alignSelf: 'flex-start',
                            width: '100%',
                            display: 'flex',
                            paddingTop: 0,
                            alignItems: 'center',
                            gap: 25,
                            paddingBottom: 20,
                        }}
                        data={watches}
                        renderItem={({ item }) => {
                            return (
                                <WatchItem
                                    watch={item}
                                    user={user?.user ?? undefined}
                                />
                            );
                        }}
                    />
                )}
            </SafeAreaView>
            <TouchableOpacity
                onPress={() => {
                    addAWatchContext.clearAllInfo?.();
                    router.push('/add-watch/add-a-watch-1');
                }}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'grey',
                    backgroundColor: navyColor,
                    position: 'absolute',
                    bottom: 30,
                    right: 20,
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                }}
            >
                <AntDesign name='plus' size={40} color={goldColor} />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
export default Collection;
