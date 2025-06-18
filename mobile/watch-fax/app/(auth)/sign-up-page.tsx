import {
    backgroundColor,
    defaultStyles,
    navyColor,
} from '@/assets/default-styles';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={[defaultStyles.container, { paddingTop: 20 }]}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={-200}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{
                        flex: 1,
                        //width: '100%',
                        backgroundColor: backgroundColor,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                marginBottom: 20,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={styles.textLabel}>Email</Text>
                            <TextInput
                                autoCapitalize='none'
                                placeholder='Email'
                                placeholderTextColor='gray'
                                onChangeText={setEmail}
                                value={email}
                                style={styles.textInput}
                            />
                        </View>
                        <View
                            style={{
                                marginBottom: 20,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={styles.textLabel}>Password</Text>
                            <TextInput
                                autoCapitalize='none'
                                placeholder='Password'
                                placeholderTextColor='gray'
                                onChangeText={setPassword}
                                value={password}
                                style={styles.textInput}
                            />
                        </View>
                        <View
                            style={{
                                marginBottom: 20,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={styles.textLabel}>
                                Confirm password
                            </Text>
                            <TextInput
                                autoCapitalize='none'
                                placeholder='Password'
                                placeholderTextColor='gray'
                                onChangeText={setConfirmPassword}
                                value={confirmPassword}
                                style={styles.textInput}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: navyColor,
                                padding: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                width: '90%',
                                justifyContent: 'center',
                                height: 50,
                                marginBottom: 8,
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
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    textLabel: {
        alignSelf: 'flex-start',
        color: navyColor,
        fontSize: 24,
        marginLeft: 30,
        fontFamily: 'roboto-black',
    },
    textInput: {
        color: 'black',
        height: 50,
        width: '90%',
        borderColor: '#D4D4D4',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        fontFamily: 'roboto-black',
    },
});

export default SignUpPage;
