import { defaultStyles, navyColor } from '@/assets/default-styles';
import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <SafeAreaView style={defaultStyles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={-200}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, width: '100%' }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: navyColor,
                                fontSize: 32,
                                fontFamily: 'Roboto',
                                marginBottom: 12,
                            }}
                        >
                            Login
                        </Text>
                        <View style={{ marginBottom: 20 }}>
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
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.textLabel}>Password</Text>
                            <TextInput
                                autoCapitalize='none'
                                placeholder='Password'
                                placeholderTextColor='gray'
                                onChangeText={setEmail}
                                value={email}
                                style={styles.textInput}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: navyColor,
                                padding: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                width: 320,
                                justifyContent: 'center',
                                height: 50,
                                marginBottom: 8,
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 24 }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 16,
                                    textDecorationLine: 'underline',
                                    color: navyColor,
                                    marginBottom: 75,
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
                                width: 320,
                                justifyContent: 'center',
                                height: 50,
                                marginBottom: 8,
                            }}
                        >
                            <Ionicons
                                name='logo-google'
                                size={30}
                                color={'white'}
                                style={{ position: 'absolute', left: 16 }}
                            />
                            <Text style={{ color: 'white', fontSize: 19 }}>
                                Continue with Google
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textLabel: {
        color: navyColor,
        fontSize: 24,
        marginLeft: 10,
    },
    textInput: {
        color: 'black',
        height: 50,
        width: 320,
        borderColor: '#D4D4D4',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
    },
});

export default LoginPage;
