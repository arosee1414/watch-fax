import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { backgroundColor } from '@/assets/default-styles';
import { useLocalSearchParams } from 'expo-router';
import { WatchRecord } from '@/app/clients/generatedClient';

export default function WatchDetails() {
    const watchId = useLocalSearchParams();
    const [watch, setWatch] = useState<WatchRecord>();

    return (
        <SafeAreaView
            style={{
                backgroundColor: backgroundColor,
                flex: 1,
            }}
        >
            <ScrollView
                style={{
                    marginTop: -50,
                    flex: 1,
                }}
            >
                <Text>Watch details</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
