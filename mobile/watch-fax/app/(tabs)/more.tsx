import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const More = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>More</Text>
            <View style={styles.separator} />
        </View>
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

export default More;
