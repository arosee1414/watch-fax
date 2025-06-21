import { backgroundColor, goldColor, navyColor } from '@/assets/default-styles';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
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
import { useAddAWatchContext } from '@/app/contexts/add-watch-context';
import { useAuth } from '@clerk/clerk-expo';
import WatchFaxClient from '@/app/clients/watch-fax-client';
import { FileParameter } from '@/app/clients/generatedClient';
import Modal from 'react-native-modal';
import { ImagePickerAsset } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import mime from 'mime';

const AddAWatch3 = () => {
    const [condition, setCondition] = useState<string>();
    const [purchaseStory, setPurchaseStory] = useState<string>();
    const [watchImages, setWatchImages] = useState<string[]>([]);
    const addAWatchContext = useAddAWatchContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isErrorModalVisible, setIsErrorModalVisible] =
        useState<boolean>(false);
    const { getToken } = useAuth();

    useEffect(() => {
        if (addAWatchContext) {
            addAWatchContext.setCondition?.(condition);
            addAWatchContext.setPurchaseStory?.(purchaseStory);
            addAWatchContext.setWatchImages?.(watchImages);
        }
    }, [condition, purchaseStory, watchImages]);

    const toggleModal = () => {
        setIsErrorModalVisible(!isErrorModalVisible);
    };

    const onAddPictures = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: false,
                quality: 0.75,
                base64: false,
                allowsMultipleSelection: true,
            });
            if (!result.canceled) {
                setWatchImages([]);
                result.assets.forEach((image) => {
                    setWatchImages((prev) => [...prev, image.uri]);
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const uriToFileParameter = async (
        uri: string,
        index: number
    ): Promise<FileParameter> => {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) throw new Error('File not found');

        const fileType = mime.getType(uri) || 'image/jpeg'; // fallback
        const fileName = uri.split('/').pop() ?? `image_${index}.jpg`;

        const fileBlob = {
            data: {
                uri,
                type: fileType,
                name: fileName,
            },
            fileName,
        };

        return fileBlob as FileParameter;
    };

    const uploadWatch = async () => {
        try {
            const token = await getToken();
            if (token === null) {
                console.error('Failed to retrieve authentication token');
                return;
            }
            const client = new WatchFaxClient(token);

            const imageParams = await Promise.all(
                addAWatchContext.watchImages?.map((uri, index) =>
                    uriToFileParameter(uri, index)
                ) ?? []
            );

            await client.createWatch(
                addAWatchContext.brand ?? '',
                addAWatchContext.model ?? '',
                addAWatchContext.referenceNumber ?? '',
                addAWatchContext.serialNumber ?? '',
                addAWatchContext.productionYear ?? 0,
                addAWatchContext.purchaseDate?.getTime() ?? 0,
                addAWatchContext.price ?? 0,
                addAWatchContext.hasPapers ?? false,
                addAWatchContext.hasOriginalBox ?? false,
                addAWatchContext.hasRecordOfAuth ?? false,
                addAWatchContext.condition ?? '',
                addAWatchContext.purchaseStory ?? '',
                imageParams
            );

            addAWatchContext.clearAllInfo?.();
            router.replace('/(tabs)/collection');
        } catch (error) {
            console.error(error);
            setIsErrorModalVisible(true);
        } finally {
            setIsLoading(false);
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
                                {watchImages.length > 0 ? (
                                    <>
                                        <MaterialCommunityIcons
                                            name='file-image-plus-outline'
                                            size={35}
                                            color='black'
                                        />
                                        <Text
                                            style={{
                                                color: navyColor,
                                                position: 'absolute',
                                                top: 35,
                                                right: 35,
                                                fontFamily: 'roboto-black',
                                            }}
                                        >{`(${watchImages.length})`}</Text>
                                    </>
                                ) : (
                                    <MaterialCommunityIcons
                                        name='file-image-plus-outline'
                                        size={35}
                                        color={navyColor}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        disabled={isLoading}
                        onPress={() => uploadWatch()}
                        style={styles.addWatchButton}
                    >
                        <Text style={styles.addWatchButtonText}>Add watch</Text>
                    </TouchableOpacity>

                    <Modal
                        isVisible={isErrorModalVisible}
                        onBackdropPress={toggleModal}
                        backdropOpacity={0.5}
                        animationIn='slideInUp'
                        animationOut='slideOutDown'
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: navyColor,
                                backgroundColor: backgroundColor,
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <Text>
                                There was an error uploading your watch. Please
                                try again later.
                            </Text>
                        </View>
                    </Modal>
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
