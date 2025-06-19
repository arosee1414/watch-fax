import { backgroundColor, goldColor, navyColor } from '@/assets/default-styles';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Collection = () => {
    return (
        <>
            <SafeAreaView
                style={{ backgroundColor: backgroundColor, flex: 1 }}
            ></SafeAreaView>
            <TouchableOpacity
                onPress={() => router.push('/add-a-watch-1')}
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
