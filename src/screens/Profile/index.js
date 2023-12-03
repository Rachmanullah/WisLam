import { Image, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useRef, useEffect, useContext } from 'react'
import { MyIlustrasi } from '../../assets'
import { ArrowSquareRight, User, Star1, Setting2, LocationTick, Logout, } from 'iconsax-react-native'
import { useNavigation } from '@react-navigation/native'
import ThemeContext from '../../context/GlobalStateProvider';
import colors from '../../theme/colors';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const theme = useContext(ThemeContext)

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={{ gap: 15, alignItems: 'center' }}>
                <Animated.Image source={{ uri: 'https://images.unsplash.com/photo-1683009427500-71296178737f?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={{ ...styles.picture, opacity: fadeAnim }} />
                <View style={{ gap: 5, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'DavidLibre-Bold', color: theme.textColor, fontSize: 20 }}>Rachmanullah</Text>
                    <Text style={{ fontFamily: 'TitilliumWeb-Regular', color: theme.theme === 'dark' ? theme.textColor : '#9496A1' }}>rachmanullah1@gmail.com</Text>
                </View>
                <View style={[styles.content, { backgroundColor: theme.theme === 'dark' ? colors.sekunder : '#FEFEFE' }]}>
                    <TouchableOpacity style={styles.itemContent} onPress={() => navigation.navigate('MyProfile')}>
                        <User size="25" color="#697689" />
                        <Text style={styles.titleItem}>Profile</Text>
                        <ArrowSquareRight size="25" color="#697689" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContent} onPress={() => navigation.navigate('Favorite')}>
                        <Star1 size={25} color='#697689' />
                        <Text style={styles.titleItem}>Favorite</Text>
                        <ArrowSquareRight size="25" color="#697689" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContent} onPress={() => navigation.navigate('MyTrips')}>
                        <LocationTick size={25} color='#697689' />
                        <Text style={styles.titleItem}>My Trips</Text>
                        <ArrowSquareRight size="25" color="#697689" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContent} onPress={() => navigation.navigate('Settings')}>
                        <Setting2 size={25} color='#697689' />
                        <Text style={styles.titleItem}>Settings</Text>
                        <ArrowSquareRight size="25" color="#697689" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.itemContent, backgroundColor: 'red' }}>
                        <Logout size={25} color='#FEFEFE' />
                        <Text style={{ ...styles.titleItem, color: '#FEFEFE' }}>Logout</Text>
                        <ArrowSquareRight size="25" color="#FEFEFE" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        elevation: 8,
        paddingTop: 8,
        paddingBottom: 4,
        backgroundColor: '#FEFEFE'
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
        marginTop: 50,
    },
    content: {
        margin: 20,
        backgroundColor: '#FEFEFE',
        elevation: 10,
        padding: 10,
        gap: 10,
        alignItems: 'center',
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