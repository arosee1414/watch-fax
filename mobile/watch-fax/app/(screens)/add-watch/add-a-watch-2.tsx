import { backgroundColor, navyColor } from '@/assets/default-styles';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
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
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckCircle from '@/components/check-circle';
import YesNoCheck from '@/components/yes-no-check';

const AddAWatch2 = () => {
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState<Float | null>(0.0);
    const [hasPapers, setHasPapers] = useState<boolean>(false);
    const [hasOriginalBox, setHasOriginalBox] = useState<boolean>(false);
    const [hasRecordOfAuth, setHasRecordOfAuth] = useState<boolean>(false);

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

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
                        <Text style={styles.textLabel}>Purchase date</Text>
                        <DateTimePicker
                            maximumDate={new Date()}
                            testID='dateTimePicker'
                            value={date}
                            mode={'date'}
                            is24Hour={true}
                            onChange={onChangeDate}
                        />
                    </View>
                    <View style={{ marginBottom: 20, width: '100%' }}>
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
                    <View style={{ marginBottom: 30, width: '100%' }}>
                        <Text style={styles.textLabel}>Papers?</Text>
                        <YesNoCheck
                            style={{ marginLeft: 10, gap: 100, marginTop: 20 }}
                            isYesChecked={hasPapers}
                            onPress={setHasPapers}
                        />
                    </View>
                    <View style={{ marginBottom: 30, width: '100%' }}>
                        <Text style={styles.textLabel}>Original box?</Text>
                        <YesNoCheck
                            style={{ marginLeft: 10, gap: 100, marginTop: 20 }}
                            isYesChecked={hasOriginalBox}
                            onPress={setHasOriginalBox}
                        />
                    </View>
                    <View style={{ marginBottom: 30, width: '100%' }}>
                        <Text style={styles.textLabel}>
                            Record of authentication?
                        </Text>
                        <YesNoCheck
                            style={{ marginLeft: 10, gap: 100, marginTop: 20 }}
                            isYesChecked={hasRecordOfAuth}
                            onPress={setHasRecordOfAuth}
                        />
                    </View>

                    <TouchableOpacity
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
                        //onPress={onSignInPress}
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

export default AddAWatch2;
