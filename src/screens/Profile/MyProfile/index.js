import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Add, AddSquare, ArrowLeft } from 'iconsax-react-native';
import colors from '../../../theme/colors';
import ThemeContext from '../../../context/GlobalStateProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const MyProfile = ({ route }) => {
    const { userId } = route.params;
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const theme = useContext(ThemeContext);
    const unsplashImageUrl = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80";
    const [profileData, setProfileData] = useState(
        {
            fullName: '',
            username: '',
            email: '',
            no_phone: '',
            address: '',
        }
    )

    const handleChange = (key, value) => {
        setProfileData({
            ...profileData,
            [key]: value,
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
                            setProfileData(userData);
                            setOldImage(userData.photoUrl);
                            setImage(userData.photoUrl);
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

    const handleImagePick = async () => {
        ImagePicker.openPicker({
            width: 1500,
            height: 1500,
            cropping: true,
        })
            .then(image => {
                console.log(image);
                setImage(image.path);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleUpdate = async () => {
        setLoading(true);
        let filename = image.substring(image.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        const reference = storage().ref(`userImages/${filename}`);
        try {
            if (image !== oldImage && oldImage !== unsplashImageUrl) {
                const oldImageRef = storage().refFromURL(oldImage);
                await oldImageRef.delete();
            }
            if (image !== oldImage) {
                await reference.putFile(image);
            }
            const url =
                image !== oldImage ? await reference.getDownloadURL() : oldImage;
            await firestore().collection('users').doc(userId).update({
                fullName: profileData.fullName,
                username: profileData.username,
                email: profileData.email,
                photoUrl: url,
                no_phone: profileData.no_phone,
                address: profileData.address,
            });
            setLoading(false);
            console.log('Profile Updated!');
            navigation.navigate('Profile');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            {
                loading ? (
                    <View style={{ paddingVertical: '50%', gap: 10 }}>
                        <ActivityIndicator size={'large'} color={colors.sekunder} />
                    </View>
                ) : (
                    <View>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <ArrowLeft
                                    color='#FFFFFF'
                                    variant="Linear"
                                    size={24}
                                />
                            </TouchableOpacity>
                            <Text style={styles.titleHeader}>Profile</Text>
                            <View></View>
                        </View>
                        {
                            image ? (
                                <View style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    marginTop: 80,
                                    backgroundColor: '#9496A1',
                                    alignSelf: 'center',
                                    position: 'relative'
                                }}>
                                    <Image source={{ uri: image }} style={styles.picture} />
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            top: -110,
                                            right: -10,
                                            backgroundColor: colors.sekunder,
                                            borderRadius: 25,
                                        }}
                                        onPress={() => setImage(null)}>
                                        <Add
                                            size={20}
                                            variant="Linear"
                                            color={colors.darkMode.textColor}
                                            style={{ transform: [{ rotate: '45deg' }] }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    marginTop: 80,
                                    backgroundColor: '#9496A1',
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} onPress={handleImagePick}>
                                    <AddSquare color='#565e56' variant="Linear" size={42} />
                                </TouchableOpacity>
                            )
                        }
                        <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                            <Text style={[styles.label, { color: theme.textColor }]}>FullName</Text>
                            <View style={styles.box}>
                                <TextInput
                                    style={[styles.inputan, { color: theme.textColor }]}
                                    placeholder='Your FullName'
                                    placeholderTextColor='#9496A1'
                                    onChangeText={text => handleChange('fullName', text)}
                                    value={profileData?.fullName}
                                />
                            </View>
                            <Text style={[styles.label, { color: theme.textColor }]}>Username</Text>
                            <View style={styles.box}>
                                <TextInput
                                    style={[styles.inputan, { color: theme.textColor }]}
                                    placeholder='Your username'
                                    placeholderTextColor='#9496A1'
                                    onChangeText={text => handleChange('username', text)}
                                    value={profileData?.username}
                                />
                            </View>
                            <Text style={[styles.label, { color: theme.textColor }]}>Email</Text>
                            <View style={styles.box}>
                                <TextInput
                                    style={[styles.inputan, { color: theme.textColor }]}
                                    placeholder='Your Email'
                                    placeholderTextColor='#9496A1'
                                    inputMode='email'
                                    onChangeText={text => handleChange('email', text)}
                                    value={profileData?.email}
                                />
                            </View>
                            <Text style={[styles.label, { color: theme.textColor }]}>No Phone</Text>
                            <View style={styles.box}>
                                <TextInput
                                    style={[styles.inputan, { color: theme.textColor }]}
                                    placeholder='Your Number Phone'
                                    placeholderTextColor='#9496A1'
                                    inputMode='tel'
                                    maxLength={13}
                                    onChangeText={text => handleChange('no_phone', text)}
                                    value={profileData?.no_phone}
                                />
                            </View>
                            <Text style={[styles.label, { color: theme.textColor }]}>Address</Text>
                            <View style={styles.box}>
                                <TextInput
                                    style={[styles.inputan, { color: theme.textColor }]}
                                    placeholder='Your Address'
                                    placeholderTextColor='#9496A1'
                                    onChangeText={text => handleChange('address', text)}
                                    value={profileData?.address}
                                />
                            </View>
                            <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
                                <Text style={{
                                    fontFamily: 'TitiliumWeb-Bold',
                                    fontSize: 18,
                                    color: 'white'
                                }}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        paddingTop: 8,
        paddingBottom: 4,
        position: 'absolute',
        zIndex: 1000,
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: colors.sekunder,
        elevation: 10
    },
    titleHeader: {
        fontSize: 20,
        fontFamily: 'Inter-ExtraBold',
        color: '#FEFEFE',
        letterSpacing: -0.3,
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 50,

    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Bold',
        color: 'black',
        marginVertical: 10,
    },
    box: {
        width: '100%',
        borderStyle: "dotted",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: '#000000',
    },
    inputan: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Regular',
        color: '#000000',
        padding: 0,
    },
    btn: {
        backgroundColor: colors.sekunder,
        marginVertical: 20,
        alignItems: 'center',
        paddingVertical: 15,
        width: 300,
        height: 53,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 100,
        shadowRadius: 10,
        elevation: 10,
        overflow: 'hidden'
    }
})