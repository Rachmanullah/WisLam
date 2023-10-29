import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MyIlustrasi } from '../../assets'
import { ArrowSquareRight, User, Star1, Setting2, LocationTick, Logout, } from 'iconsax-react-native'

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Profile</Text>
            </View>
            <View style={{ gap: 15, alignItems: 'center' }}>
                <Image source={MyIlustrasi} style={styles.picture} />
                <View style={{ gap: 5, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'DavidLibre-Bold', color: 'black', fontSize: 20 }}>Rachmanullah</Text>
                    <Text style={{ fontFamily: 'TitilliumWeb-Regular', color: '#9496A1' }}>rachmanullah1@gmail.com</Text>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.itemContent}>
                        <User size="25" color="#697689" />
                        <Text style={styles.titleItem}>Profile</Text>
                        <ArrowSquareRight size="25" color="#697689" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContent}>
                        <Star1 size={25} color='#697689' />
                        <Text style={styles.titleItem}>Favorite</Text>
                        <ArrowSquareRight size="25" color="#697689" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContent}>
                        <LocationTick size={25} color='#697689' />
                        <Text style={styles.titleItem}>My Trips</Text>
                        <ArrowSquareRight size="25" color="#697689" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContent}>
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