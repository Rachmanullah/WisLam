import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native'
import colors from '../../theme/colors';
import firestore from '@react-native-firebase/firestore';

const StoriesScreen = ({ route }) => {
    const { userId } = route.params;
    const [stories, setStories] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        const getStories = () => {
            try {
                const storiesCollection = firestore().collection('stories').doc(userId);
                const unsubscribeStories = storiesCollection.onSnapshot(doc => {
                    if (doc.exists) {
                        const userData = doc.data();
                        setStories(userData);
                    } else {
                        console.error('Data tidak ditemukan.');
                    }
                });
                return () => {
                    unsubscribeStories();
                };
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        getStories();
    }, [])
    return (
        <ImageBackground source={{ uri: stories?.image }} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft
                        color='#FFFFFF'
                        variant="Linear"
                        size={24}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.info}>
                    <View style={{ paddingBottom: 60, paddingLeft: 20, backgroundColor: colors.black(0.5) }}>
                        <Text style={styles.title}>{stories?.name}</Text>
                        <Text style={{ ...styles.title, fontSize: 16 }}>{stories?.caption}</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default StoriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
        width: 'auto'
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
        elevation: 10
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    info: {
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%',
    },
    title: {
        color: 'white',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 20,
        padding: 5,
    }
})