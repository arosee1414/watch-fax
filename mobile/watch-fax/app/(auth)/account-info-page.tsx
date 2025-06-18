import {
    backgroundColor,
    defaultStyles,
    navyColor,
} from '@/assets/default-styles';
import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Image,
    Text,
    TextInput,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useUser } from '@clerk/clerk-expo';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

const EnterNamePage = () => {
    const { user } = useUser();
    const [firstName, setFirstName] = useState(user?.firstName ?? '');
    const [lastName, setLastName] = useState(user?.lastName ?? '');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onClickPicture = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: true,
                quality: 0.75,
                base64: true,
            });
            if (!result.canceled) {
                const base64 = `data:image/png;base64,${result.assets[0].base64}`;
                user?.setProfileImage({ file: base64 });
            }
        } catch (err) {
            //do something?
            console.error(err);
        }
    };

    const onPressSaveInfo = async () => {
        try {
            if (!!firstName) {
                await user?.update({ firstName: firstName });
            } else {
                setErrorMessage('You must enter a first name');
            }
        } catch (err) {
            console.error(err);
        }

        try {
            if (!!lastName) {
                await user?.update({ lastName: lastName });
            } else {
                setErrorMessage('You must enter a last name');
            }
        } catch (err) {
            console.error(err);
        }

        if (!!firstName && !!lastName) {
            //all good, proceed to app
            router.replace('/(tabs)/two');
        }
    };

    useEffect(() => {
        if (!user) return;
        setFirstName(user.firstName ?? '');
        setLastName(user.lastName ?? '');
    }, [user]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            style={[defaultStyles.container]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <View>
                            <TouchableOpacity
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                    borderWidth: 1,
                                    backgroundColor: '#D9D9D9',
                                    width: 125,
                                    height: 125,
                                    borderRadius: 100,
                                }}
                                onPress={onClickPicture}
                            >
                                <Image
                                    source={{ uri: user?.imageUrl }}
                                    style={styles.profilePic}
                                />
                            </TouchableOpacity>
                            <MaterialIcons
                                style={{
                                    alignSelf: 'flex-end',
                                    marginTop: -30,
                                }}
                                name='image-search'
                                size={24}
                                color='black'
                            />
                        </View>
                        <View style={[styles.inputGroup, { marginTop: 50 }]}>
                            <Text style={styles.textLabel}>First name</Text>
                            <TextInput
                                placeholder='First name'
                                placeholderTextColor='gray'
                                onChangeText={setFirstName}
                                value={firstName}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.textLabel}>Last name</Text>
                            <TextInput
                                placeholder='Last name'
                                placeholderTextColor='gray'
                                onChangeText={setLastName}
                                value={lastName}
                                style={styles.textInput}
                            />
                        </View>
                        {errorMessage && (
                            <Text style={{ color: 'red' }}>{errorMessage}</Text>
                        )}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onPressSaveInfo()}
                        >
                            <Text style={styles.buttonText}>Save info</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    profilePic: {
        width: 125,
        height: 125,
        borderRadius: 100,
    },
    inputGroup: {
        marginBottom: 20,
        width: '90%',
        alignItems: 'center',
    },
    textLabel: {
        alignSelf: 'flex-start',
        color: navyColor,
        fontSize: 24,
        marginLeft: 10,
        fontFamily: 'roboto-black',
    },
    textInput: {
        color: 'black',
        height: 50,
        width: '100%',
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

export default EnterNamePage;
