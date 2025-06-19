import {
    backgroundColor,
    defaultStyles,
    navyColor,
} from '@/assets/default-styles';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    isClerkAPIResponseError,
    useAuth,
    useSignIn,
    useSSO,
} from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';

const LoginPage = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    const { startSSOFlow } = useSSO();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    enum Strategy {
        Google = 'oauth_google',
        Facebook = 'oauth_facebook',
        Apple = 'oauth_apple',
    }

    const onSelectAuth = async (strategy: Strategy) => {
        try {
            const { createdSessionId, setActive, signIn, signUp } =
                await startSSOFlow({
                    strategy: strategy,
                });
            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                console.log('User is signed in');
                //router.replace('/dashboard');
            } else {
                //handle errors
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Handle the submission of the sign-in form
    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return;

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.navigate('/(tabs)/dashboard');
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2));
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
    }, [isLoaded, email, password]);

    const handleClerkApiErrors = (error: ClerkAPIError) => {
        switch (error.code) {
            case 'strategy_for_user_invalid':
                setErrorMessage(
                    'It looks like you signed up using a third-party account. Please log in with the account provider you used (Google, Facebook, or Apple).'
                );
                break;
            case 'form_identifier_not_found':
                setErrorMessage(
                    "We couldn't find an account with that email and password. Please check your credentials and try again."
                );
                break;
            default:
                setErrorMessage('Failed to sign in. Please try again.');
        }
    };

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={-200}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, width: '100%', backgroundColor: backgroundColor }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={require('../../assets/images/logo.png')}
                        resizeMode='stretch'
                        style={{
                            width: '100%',
                            height: 265,
                            marginBottom: 30,
                        }}
                    />
                    <Text
                        style={{
                            color: navyColor,
                            fontSize: 32,
                            fontFamily: 'roboto-black',
                            marginBottom: 12,
                        }}
                    >
                        Login
                    </Text>
                    <View style={{ marginBottom: 20, width: '80%' }}>
                        <Text style={styles.textLabel}>Email</Text>
                        <TextInput
                            keyboardType='email-address'
                            autoCapitalize='none'
                            placeholder='Email'
                            placeholderTextColor='gray'
                            onChangeText={setEmail}
                            value={email}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={{ marginBottom: 20, width: '80%' }}>
                        <Text style={styles.textLabel}>Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            autoCapitalize='none'
                            placeholder='Password'
                            placeholderTextColor='gray'
                            onChangeText={setPassword}
                            value={password}
                            style={styles.textInput}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: navyColor,
                            padding: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            width: '80%',
                            justifyContent: 'center',
                            height: 50,
                            marginBottom: 8,
                        }}
                        onPress={onSignInPress}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 24,
                                fontFamily: 'roboto-black',
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                    {errorMessage && (
                        <Text style={{ color: 'red' }}>{errorMessage}</Text>
                    )}
                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/sign-up-page')}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                textDecorationLine: 'underline',
                                color: navyColor,
                                marginBottom: 75,
                                fontFamily: 'roboto-black',
                            }}
                        >
                            Don't have an account? Sign up
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: navyColor,
                            padding: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            width: '80%',
                            justifyContent: 'center',
                            height: 50,
                            marginBottom: 8,
                        }}
                        onPress={() => onSelectAuth(Strategy.Google)}
                    >
                        <Ionicons
                            name='logo-google'
                            size={30}
                            color={'white'}
                            style={{ position: 'absolute', left: 16 }}
                        />
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 19,
                                fontFamily: 'roboto-black',
                            }}
                        >
                            Continue with Google
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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

export default LoginPage;
