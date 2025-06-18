import {
    backgroundColor,
    defaultStyles,
    navyColor,
} from '@/assets/default-styles';
import { isClerkAPIResponseError, useAuth, useSignUp } from '@clerk/clerk-expo';
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
import { ClerkAPIError } from '@clerk/types';
import Dialog from 'react-native-dialog';
import { router } from 'expo-router';

const SignUpPage = () => {
    const { signOut, getToken } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { isLoaded, signUp, setActive } = useSignUp();
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');

    const onSignUpPress = async () => {
        setErrorMessage(null);
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (password === null || password === '') {
            setErrorMessage('You must enter a password');
            return;
        }
        if (!isLoaded) return;

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress: email,
                password: password,
            });

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            });

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true);
        } catch (error) {
            if (isClerkAPIResponseError(error)) {
                handleClerkApiErrors(error.errors[0]);
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.error(JSON.stringify(error, null, 2));
            }
        }
    };

    const handleClerkApiErrors = (error: ClerkAPIError) => {
        setErrorMessage(error.longMessage ?? null);
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            });

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                setPendingVerification(false);
                await setActive({ session: signUpAttempt.createdSessionId });
                console.log('User is signed in');
                signOut();
                //router.navigate('/dashboard');
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (error) {
            if (isClerkAPIResponseError(error)) {
                handleClerkApiErrors(error.errors[0]);
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.error(JSON.stringify(error, null, 2));
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            style={{ flex: 1, backgroundColor: backgroundColor }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={defaultStyles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <Dialog.Container visible={pendingVerification}>
                            <Dialog.Title>
                                A verification code has been sent to your email.
                            </Dialog.Title>
                            <Dialog.CodeInput
                                codeLength={6}
                                onCodeChange={setCode}
                            />

                            <Dialog.Button
                                onPress={onVerifyPress}
                                label='Verify'
                            />
                        </Dialog.Container>
                        <View style={styles.inputGroup}>
                            <Text style={styles.textLabel}>Email</Text>
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor='gray'
                                onChangeText={setEmail}
                                value={email}
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.textLabel}>Password</Text>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor='gray'
                                onChangeText={setPassword}
                                value={password}
                                style={styles.textInput}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.textLabel}>
                                Confirm Password
                            </Text>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor='gray'
                                onChangeText={setConfirmPassword}
                                value={confirmPassword}
                                style={styles.textInput}
                                secureTextEntry
                            />
                        </View>
                        {errorMessage && (
                            <Text style={{ color: 'red' }}>{errorMessage}</Text>
                        )}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onSignUpPress}
                        >
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
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
    button: {
        backgroundColor: navyColor,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
        justifyContent: 'center',
        height: 50,
        marginBottom: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'roboto-black',
    },
});

export default SignUpPage;
