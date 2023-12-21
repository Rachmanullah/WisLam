import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { Add } from 'iconsax-react-native';
import colors from '../../theme/colors';
import ThemeContext from '../../context/GlobalStateProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const AddStories = () => {
    const theme = useContext(ThemeContext)
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [Username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const handleImagePick = async () => {
        ImagePicker.openPicker({
            width: 2500,
            height: 3000,
            cropping: true,
        })
            .then(image => {
                console.log(image);
                setImage(image.path);
                setIsImageSelected(true)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        const fetchProfileData = () => {
            try {
                const user = auth().currentUser;
                if (user) {
                    const userId = user.uid;
                    const userRef = firestore().collection('users').doc(userId);

                    const unsubscribeProfile = userRef.onSnapshot(doc => {
                        if (doc.exists) {
                            const userData = doc.data();
                            setUsername(userData.username);
                        } else {
                            console.error('Dokumen pengguna tidak ditemukan.');
                        }
                    });

                    return () => {
                        unsubscribeProfile();
                    };
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, [])

    const handleUpload = async () => {
        setLoading(true);
        try {
            let filename = image.substring(image.lastIndexOf('/') + 1);
            const extension = filename.split('.').pop();
            const name = filename.split('.').slice(0, -1).join('.');
            filename = name + Date.now() + '.' + extension;
            const reference = storage().ref(`storiesImages/${filename}`);
            await reference.putFile(image);
            const url = await reference.getDownloadURL();
            const authorId = auth().currentUser.uid;
            await firestore().collection('stories').add({
                name: Username,
                image: url,
                caption: caption,
                date: new Date(),
                createdAt: new Date(),
                authorId
            })
            setLoading(false);
            console.log('stories added!');
            setCaption("")
            setImage(null)
            setIsImageSelected(false)
            setUsername("")
            navigation.navigate('Profile', { status: 200 });
        } catch (e) {
            console.log(e);
            navigation.navigate('Profile', { status: 400 });
        }
    };
    useFocusEffect(
        useCallback(() => {
            if (!isImageSelected) {
                handleImagePick()
            }
        }, [])
    )
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.textColor }]}>Stories</Text>
            </View>
            {
                isImageSelected && (
                    <View style={{
                        width: '90%',
                        // marginTop: 50,
                        alignSelf: 'center',
                        position: 'relative'
                    }}>
                        <Image source={{ uri: image }} style={styles.picture} />
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: -10,
                                right: -5,
                                backgroundColor: colors.sekunder,
                                borderRadius: 25,
                            }}
                            onPress={() => {
                                setImage(null)
                                setIsImageSelected(false)
                                handleImagePick()
                            }}>
                            <Add
                                size={20}
                                variant="Linear"
                                color={colors.darkMode.textColor}
                                style={{ transform: [{ rotate: '45deg' }] }}
                            />
                        </TouchableOpacity>
                        <View style={BoxTextInput.box}>
                            <TextInput
                                style={[BoxTextInput.input, { color: theme.textColor }]}
                                placeholder='Caption'
                                placeholderTextColor={theme.theme === 'dark' ? '#FEFEFE' : '#565e56'}
                                value={caption}
                                onChangeText={(text) => setCaption(text)}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleUpload}>
                            {
                                loading ? (
                                    <ActivityIndicator color={colors.lightMode.textColor} />
                                ) : (
                                    <Text style={{
                                        color: '#FEFEFE',
                                        fontSize: 20,
                                        fontFamily: 'TitilliumWeb-Regular',
                                    }}>Post</Text>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    )
}

export default AddStories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        paddingHorizontal: 24,
        gap: 30,
        alignItems: 'center',
        height: 52,
        elevation: 10,
        paddingTop: 10,
        paddingBottom: 5,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Inter-ExtraBold',
        color: 'black',
        letterSpacing: -0.3,
    },
    picture: {
        width: '100%',
        height: 300,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: 50,
        backgroundColor: colors.sekunder,
        marginVertical: 20,
        borderRadius: 20,
    },
})
const BoxTextInput = StyleSheet.create({
    container: {
        // marginTop: 50,
        backgroundColor: '#FEFEFE',
        elevation: 7,
        padding: 15,
        height: 250,
        marginTop: 20,
    },
    label: {
        color: '#000000',
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
        marginBottom: 10,
    },
    box: {
        borderStyle: "dotted",
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        borderColor: '#000000',
        marginBottom: 15,
    },
    input: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Regular',
        color: '#000000',
        padding: 0,
    }
});