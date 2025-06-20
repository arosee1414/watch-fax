import { backgroundColor, goldColor, navyColor } from '@/assets/default-styles';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
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
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

const AddAWatch3 = () => {
    const [condition, setCondition] = useState<string>();
    const [purchaseStory, setPurchaseStory] = useState<string>();

    const onAddPictures = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: false,
                quality: 0.75,
                base64: true,
                allowsMultipleSelection: true,
            });
            if (!result.canceled) {
                console.log(result);
                const base64 = `data:image/png;base64,${result.assets[0].base64}`;
            }
        } catch (err) {
            //do something?
            console.error(err);
        }
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
                    <View style={{ marginBottom: 20, width: '100%' }}>
                        <Text style={styles.textLabel}>
                            Description of condition
                        </Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            autoCapitalize='none'
                            placeholder="Enter a brief description of the watch's condition."
                            placeholderTextColor='gray'
                            onChangeText={setCondition}
                            value={condition}
                            style={[styles.textInput, { height: 100 }]}
                        />
                    </View>

                    <View style={{ marginBottom: 20, width: '100%' }}>
                        <Text style={styles.textLabel}>Purchase story</Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            autoCapitalize='none'
                            placeholder='Tell us why you purchased this watch!'
                            placeholderTextColor='gray'
                            onChangeText={setPurchaseStory}
                            value={purchaseStory}
                            style={[styles.textInput, { height: 100 }]}
                        />
                    </View>

                    <View style={{ marginBottom: 20, width: '100%' }}>
                        <Text style={styles.textLabel}>Upload Images</Text>
                        <Text style={styles.subtext}>
                            Please upload any images of the watch, box, papers,
                            proof of purchase, authentication records or service
                            history.
                        </Text>
                        <View style={{ display: 'flex', alignItems: 'center' }}>
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
                                onPress={onAddPictures}
                            >
                                <MaterialCommunityIcons
                                    name='file-image-plus-outline'
                                    size={35}
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.addWatchButton}>
                        <Text style={styles.addWatchButtonText}>Add watch</Text>
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
    subtext: {
        marginTop: 5,
        color: navyColor,
        fontSize: 12,
        marginLeft: 10,
        fontFamily: 'roboto-black',
    },
    textLabel: {
        color: navyColor,
        fontSize: 24,
        marginLeft: 10,
        fontFamily: 'roboto-black',
    },
    textInput: {
        color: 'black',
        minHeight: 50,
        maxWidth: 320,
        borderColor: '#D4D4D4',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        fontFamily: 'roboto-black',
    },
    addWatchButton: {
        backgroundColor: goldColor,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        height: 50,
        marginTop: 100,
    },
    addWatchButtonText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'roboto-black',
    },
});

export default AddAWatch3;
