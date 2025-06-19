import { backgroundColor, navyColor } from '@/assets/default-styles';
import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import CurrencyInput from 'react-native-currency-input';

const AddAWatch1 = () => {
    const [brand, setBrand] = useState<string>();
    const [referenceNumber, setReferenceNumber] = useState<string>();
    const [serialNumber, setSerialNumber] = useState<string>();
    const [price, setPrice] = useState<Float | null>(0.0);
    const [productionYear, setProductionYear] = useState<number>();

    return (
        <SafeAreaView style={{ backgroundColor: backgroundColor, flex: 1 }}>
            <ScrollView
                style={{
                    flex: 1,
                    paddingVertical: 20,
                    paddingHorizontal: 40,
                }}
                contentContainerStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{ marginBottom: 20, width: '100%' }}>
                    <Text style={styles.textLabel}>Brand</Text>
                    <TextInput
                        autoCapitalize='none'
                        placeholder='Select a brand'
                        placeholderTextColor='gray'
                        onChangeText={setBrand}
                        value={brand}
                        style={styles.textInput}
                    />
                </View>
                <View style={{ marginBottom: 20, width: '100%' }}>
                    <Text style={styles.textLabel}>Purchase price</Text>
                    <CurrencyInput
                        style={styles.textInput}
                        placeholder='$0.00'
                        placeholderTextColor='gray'
                        value={price}
                        onChangeValue={setPrice}
                        prefix='$'
                        delimiter=','
                        separator='.'
                        precision={2}
                        minValue={0}
                    />
                </View>
                <View style={{ marginBottom: 20, width: '100%' }}>
                    <Text style={styles.textLabel}>Reference number</Text>
                    <TextInput
                        autoCapitalize='none'
                        placeholder='Enter the reference number'
                        placeholderTextColor='gray'
                        onChangeText={setReferenceNumber}
                        value={referenceNumber}
                        style={styles.textInput}
                    />
                </View>
                <View style={{ marginBottom: 20, width: '100%' }}>
                    <Text style={styles.textLabel}>Serial number</Text>
                    <TextInput
                        autoCapitalize='none'
                        placeholder='Enter the serial number'
                        placeholderTextColor='gray'
                        onChangeText={setSerialNumber}
                        value={serialNumber}
                        style={styles.textInput}
                    />
                </View>
                {/* <View style={{ marginBottom: 20, width: '100%' }}>
                    <Text style={styles.textLabel}>Production year</Text>
                    <TextInput
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder='Enter the production year'
                        placeholderTextColor='gray'
                        onChangeText={parseInt(setProductionYear)}
                        value={productionYear?.toString()}
                        style={styles.textInput}
                    />
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textLabel: {
        color: navyColor,
        fontSize: 24,
        marginLeft: 10,
        fontFamily: 'roboto-black',
    },
    textInput: {
        color: 'black',
        height: 50,
        maxWidth: 320,
        borderColor: '#D4D4D4',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        fontFamily: 'roboto-black',
    },
});

export default AddAWatch1;
