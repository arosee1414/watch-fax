import { backgroundColor, navyColor } from '@/assets/default-styles';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { router } from 'expo-router';
import { useAddAWatchContext } from '@/app/contexts/add-watch-context';

const AddAWatch1 = () => {
    const [brand, setBrand] = useState<string>();
    const [referenceNumber, setReferenceNumber] = useState<string>();
    const [serialNumber, setSerialNumber] = useState<string>();
    const [model, setModel] = useState<string>();
    const [productionYear, setProductionYear] = useState<number>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [infoText, setInfoText] = useState<string>();
    const addAWatchContext = useAddAWatchContext();

    const convertToNumber = (value: string | undefined): void => {
        if (value === undefined || value.trim() === '') {
            setProductionYear(undefined);
        }
        const num = parseFloat(value || '');
        return isNaN(num)
            ? setProductionYear(undefined)
            : setProductionYear(num);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const onClickReferenceNumberInfo = () => {
        setInfoText(
            'The reference number is usually engraved on the caseback or between the lugs of your watch. It identifies the specific model and can also be found on the original box or paperwork. It’s typically a mix of letters and numbers like ‘116610LN’ or ‘W7100015’.'
        );
        setIsModalVisible(true);
    };

    const onClickSerialNumberInfo = () => {
        setInfoText(
            'The serial number is a unique identifier for your specific watch. It’s often engraved on the caseback, between the lugs, or on the rehaut (inner bezel). You might also find it on the warranty card or original papers. It usually looks like a string of numbers or letters like ‘F834529’ or ‘947XXXX’.'
        );
        setIsModalVisible(true);
    };

    useEffect(() => {
        if (addAWatchContext) {
            addAWatchContext.setBrand?.(brand);
            addAWatchContext.setReferenceNumber?.(referenceNumber);
            addAWatchContext.setSerialNumber?.(serialNumber);
            addAWatchContext.setModel?.(model);
            addAWatchContext.setProductionYear?.(productionYear);
        }
    }, [brand, referenceNumber, serialNumber, model, productionYear]);

    return (
        <SafeAreaView style={{ backgroundColor: backgroundColor, flex: 1 }}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
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
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.textLabel}>Brand</Text>
                            <Text
                                style={{
                                    marginLeft: 5,
                                    color: 'red',
                                    fontFamily: 'roboto-black',
                                }}
                            >
                                *
                            </Text>
                        </View>
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
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.textLabel}>Model</Text>
                            <Text
                                style={{
                                    marginLeft: 5,
                                    color: 'red',
                                    fontFamily: 'roboto-black',
                                }}
                            >
                                *
                            </Text>
                        </View>
                        <TextInput
                            autoCapitalize='none'
                            placeholder='Select a model'
                            placeholderTextColor='gray'
                            onChangeText={setModel}
                            value={model}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={{ marginBottom: 20, width: '100%' }}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <Text style={styles.textLabel}>
                                    Reference number
                                </Text>
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        color: 'red',
                                        fontFamily: 'roboto-black',
                                    }}
                                >
                                    *
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={onClickReferenceNumberInfo}
                            >
                                <AntDesign
                                    name='infocirlceo'
                                    size={17}
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>

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
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            <Text style={styles.textLabel}>Serial number</Text>
                            <TouchableOpacity onPress={onClickSerialNumberInfo}>
                                <AntDesign
                                    name='infocirlceo'
                                    size={17}
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            autoCapitalize='none'
                            placeholder='Enter the serial number'
                            placeholderTextColor='gray'
                            onChangeText={setSerialNumber}
                            value={serialNumber}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={{ marginBottom: 20, width: '100%' }}>
                        <Text style={styles.textLabel}>Production year</Text>
                        <TextInput
                            keyboardType='numeric'
                            style={styles.textInput}
                            placeholder='Enter the production year'
                            placeholderTextColor='gray'
                            value={productionYear?.toString()}
                            onChangeText={convertToNumber}
                            maxLength={4}
                        />
                    </View>
                    <TouchableOpacity
                        disabled={
                            brand?.trim() === undefined ||
                            brand?.trim() === '' ||
                            model?.trim() === undefined ||
                            model.trim() === '' ||
                            referenceNumber?.trim() === undefined ||
                            referenceNumber.trim() === ''
                        }
                        style={{
                            backgroundColor: navyColor,
                            padding: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'center',
                            height: 50,
                            marginTop: 100,
                        }}
                        onPress={() =>
                            router.push('/(screens)/add-watch/add-a-watch-2')
                        }
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 24,
                                fontFamily: 'roboto-black',
                            }}
                        >
                            Continue
                        </Text>
                    </TouchableOpacity>
                    <Modal
                        isVisible={isModalVisible}
                        onBackdropPress={toggleModal}
                        backdropOpacity={0.5}
                        animationIn='slideInUp'
                        animationOut='slideOutDown'
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: navyColor,
                                backgroundColor: backgroundColor,
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <Text>{infoText}</Text>
                        </View>
                    </Modal>
                </ScrollView>
            </KeyboardAvoidingView>
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
