import { backgroundColor, navyColor } from '@/assets/default-styles';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import YesNoCheck from '@/components/yes-no-check';
import { router } from 'expo-router';

const AddAWatch2 = () => {
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [price, setPrice] = useState<number | null>(0.0);
    const [hasPapers, setHasPapers] = useState<boolean>(false);
    const [hasOriginalBox, setHasOriginalBox] = useState<boolean>(false);
    const [hasRecordOfAuth, setHasRecordOfAuth] = useState<boolean>(false);

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || purchaseDate;
        setPurchaseDate(currentDate);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <View style={styles.inputGroup}>
                        <Text style={styles.textLabel}>Purchase date</Text>
                        <DateTimePicker
                            maximumDate={new Date()}
                            testID='dateTimePicker'
                            value={purchaseDate}
                            mode='date'
                            is24Hour={true}
                            onChange={onChangeDate}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.textLabel}>Purchase price</Text>
                        <CurrencyInput
                            style={styles.textInput}
                            placeholder='$0.00'
                            placeholderTextColor='gray'
                            value={price ?? null}
                            onChangeValue={setPrice}
                            prefix='$'
                            delimiter=','
                            separator='.'
                            precision={2}
                            minValue={0}
                        />
                    </View>

                    <View style={styles.inputGroupWithMargin}>
                        <Text style={styles.textLabel}>Papers?</Text>
                        <YesNoCheck
                            style={styles.yesNoCheck}
                            isYesChecked={hasPapers}
                            onPress={setHasPapers}
                        />
                    </View>

                    <View style={styles.inputGroupWithMargin}>
                        <Text style={styles.textLabel}>Original box?</Text>
                        <YesNoCheck
                            style={styles.yesNoCheck}
                            isYesChecked={hasOriginalBox}
                            onPress={setHasOriginalBox}
                        />
                    </View>

                    <View style={styles.inputGroupWithMargin}>
                        <Text style={styles.textLabel}>
                            Record of authentication?
                        </Text>
                        <YesNoCheck
                            style={styles.yesNoCheck}
                            isYesChecked={hasRecordOfAuth}
                            onPress={setHasRecordOfAuth}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() =>
                            router.push('/(screens)/add-watch/add-a-watch-3')
                        }
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: backgroundColor,
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 40,
    },
    scrollViewContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputGroup: {
        marginBottom: 20,
        width: '100%',
    },
    inputGroupWithMargin: {
        marginBottom: 30,
        width: '100%',
    },
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
    yesNoCheck: {
        marginLeft: 10,
        gap: 100,
        marginTop: 20,
    },
    continueButton: {
        backgroundColor: navyColor,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        height: 50,
        marginTop: 100,
    },
    continueButtonText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'roboto-black',
    },
});

export default AddAWatch2;
