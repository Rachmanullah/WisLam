import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../theme/colors'
import { ImagesSplash } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        checkToken();
    }, []);
    const checkToken = async () => {
        try {
            const userDataJSON = await AsyncStorage.getItem('userData');

            if (userDataJSON) {
                const userData = JSON.parse(userDataJSON);
                const { userToken, expirationTime } = userData;

                if (userToken && expirationTime) {
                    const currentTime = new Date().getTime();

                    if (currentTime <= expirationTime) {
                        setTimeout(() => {
                            navigation.replace('MainApp');
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            navigation.replace('LoginScreen');
                        }, 1500);
                    }
                } else {
                    setTimeout(() => {
                        navigation.replace('LoginScreen');
                    }, 1500);
                }
            } else {
                setTimeout(() => {
                    navigation.replace('LoginScreen');
                }, 1500);
            }
        } catch (error) {
            console.error('Error retrieving token data:', error);
            setTimeout(() => {
                navigation.replace('LoginScreen');
            }, 1500);
        }
    };
    return (
        <View style={styles.container}>
            <Image source={ImagesSplash} style={styles.logo} />
            <Text style={styles.title}>WisLam</Text>
            <View style={styles.infoContainer}>
                <Text style={[styles.info, { fontFamily: 'TitilliumWeb-Regular' }]}>
                    Presented By
                </Text>
                <Text
                    style={[
                        styles.info,
                        { fontFamily: 'TitilliumWeb-Bold', textAlign: 'center' },
                    ]}>
                    Rochmanullah
                </Text>
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEFEFE',
    },
    logo: {
        width: 150,
        height: 150,
        objectFit: 'contain',
    },
    title: {
        fontFamily: 'Inter-ExtraBold',
        fontSize: 30,
        color: '#000000'
    },
    infoContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
    },
    info: {
        fontSize: 16,
        color: '#8c8b8b',
    },
})