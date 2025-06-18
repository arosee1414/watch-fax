import { backgroundColor, defaultStyles } from '@/assets/default-styles';
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
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useUser } from '@clerk/clerk-expo';
import * as ImagePicker from 'expo-image-picker';

const EnterNamePage = () => {
    const { user } = useUser();
    const [firstName, setFirstName] = useState(user?.firstName ?? 'FirstName');
    const [lastName, setLastName] = useState(user?.lastName ?? 'LastName');

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

    useEffect(() => {
        console.log('User image URL:', user?.imageUrl);
    }, [user?.imageUrl]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            style={{ flex: 1, backgroundColor: backgroundColor }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={defaultStyles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <View>
                            <TouchableOpacity
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20,

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
});

export default EnterNamePage;
