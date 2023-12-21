import { Image, StyleSheet, Text, TouchableOpacity, View, Animated, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useRef, useEffect, useContext, useState } from 'react'
import { MyIlustrasi } from '../../assets'
import { ArrowSquareRight, User, Star1, Setting2, LocationTick, Logout, } from 'iconsax-react-native'
import { useNavigation } from '@react-navigation/native'
import ThemeContext from '../../context/GlobalStateProvider';
import colors from '../../theme/colors';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import ActionSheet from 'react-native-actions-sheet';
import { TravelStoriesList } from '../../component'

const ProfileScreen = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const theme = useContext(ThemeContext)
    const [profileData, setProfileData] = useState([])
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true);

    const actionSheetRef = useRef(null);
    const openActionSheet = () => {
        actionSheetRef.current?.show();
    };
    const closeActionSheet = () => {
        actionSheetRef.current?.hide();
    };

    const handleLogout = async () => {
        try {
            closeActionSheet();
            await auth().signOut();
            await AsyncStorage.removeItem('userData');
            navigation.replace('LoginScreen');
        } catch (error) {
            console.error(error);
        }
    };

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
    const getStories = () => {
        try {
            const user = auth().currentUser;
            if (user) {
                const userId = user.uid;
                const storiesCollection = firestore().collection('stories');
                const query = storiesCollection.where('authorId', '==', userId);
                const unsubscribeStories = query.onSnapshot(querySnapshot => {
                    const stories = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setStories(stories);
                    setLoading(false);
                });
                return () => {
                    unsubscribeStories();
                };
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };
    useEffect(() => {
        fetchProfileData();
        getStories();
    }, [])

    // useEffect(() => {
    //     console.log(stories)
    // }, [stories])

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={openActionSheet}>
                    <Setting2 color={theme.textColor} variant="Linear" size={24} />
                </TouchableOpacity>
            </View>
            <ActionSheet
                ref={actionSheetRef}
                containerStyle={{
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                }}
                indicatorStyle={{
                    width: 100,
                }}
                gestureEnabled={true}
                defaultOverlayOpacity={0.3}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,

                    }}
                    onPress={() => {
                        closeActionSheet();
                        navigation.navigate('MyProfile', { userId: auth().currentUser.uid })
                    }}>
                    <Text
                        style={{
                            fontFamily: 'TitilliumWeb-Regular',
                            color: 'black',
                            fontSize: 18,
                        }}>
                        Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,

                    }}
                    onPress={() => {
                        closeActionSheet();
                        navigation.navigate('MyTrips')
                    }}>
                    <Text
                        style={{
                            fontFamily: 'TitilliumWeb-Regular',
                            color: 'black',
                            fontSize: 18,
                        }}>
                        My Trips
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,

                    }}
                    onPress={() => {
                        closeActionSheet();
                        navigation.navigate('Settings')
                    }}>
                    <Text
                        style={{
                            fontFamily: 'TitilliumWeb-Regular',
                            color: 'black',
                            fontSize: 18,
                        }}>
                        Settings
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                    }}
                    onPress={handleLogout}>
                    <Text
                        style={{
                            fontFamily: 'TitilliumWeb-Regular',
                            color: 'red',
                            fontSize: 18,
                        }}>
                        Log out
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                    }}
                    onPress={closeActionSheet}>
                    <Text
                        style={{
                            fontFamily: 'TitilliumWeb-Regular',
                            color: 'red',
                            fontSize: 18,
                        }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </ActionSheet>

            <View style={{ gap: 15, alignItems: 'center' }}>
                <Animated.Image source={{ uri: profileData?.photoUrl }} style={{ ...styles.picture, opacity: fadeAnim }} />
                <View style={{ gap: 5, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'DavidLibre-Bold', color: theme.textColor, fontSize: 20 }}>{profileData?.fullName}</Text>
                    <Text style={{ fontFamily: 'TitilliumWeb-Regular', color: theme.theme === 'dark' ? theme.textColor : '#9496A1' }}>{profileData?.email}</Text>
                </View>
            </View>
            {
                loading ? (
                    <View style={{ paddingVertical: '50%', gap: 10 }}>
                        <ActivityIndicator size={'large'} color={colors.sekunder} />
                    </View>
                ) : (
                    <View style={styles.content}>
                        {
                            stories.map((item, index) => {
                                return (
                                    <TravelStoriesList
                                        data={item}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </View>
                )
            }
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        elevation: 8,
        paddingTop: 8,
        paddingBottom: 4,
    },
    titleHeader: {
        fontSize: 20,
        fontFamily: 'Inter-ExtraBold',
        color: 'black',
        letterSpacing: -0.3,
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 30,
    },
    content: {
        margin: 10,
        padding: 10,
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e6e6e6',
        gap: 10,
        padding: 10,
        width: 300
    },
    titleItem: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 18,
        color: 'black'
    }
})