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
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={{
                borderWidth: 1,
                borderColor: 'red',
                backgroundColor: 'green',
                zIndex: 1000,
            }}
        >
            <SafeAreaView style={defaultStyles.container}>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: 'blue',
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
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
                            onChangeText={setPassword}
                            value={password}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.textLabel}>Confirm password</Text>
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
                            width: 320,
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
            </SafeAreaView>
        </TouchableWithoutFeedback>
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
        width: 320,
        borderColor: '#D4D4D4',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        fontFamily: 'roboto-black',
    },
});

export default SignUpPage;
