import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'

const TravelStoriesList = ({ data }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: data.photo }} style={styles.photo}>
                <View style={styles.content}>
                    <View style={styles.info}>
                        <Text style={{ ...styles.title, paddingVertical: 20 }}>{data.user}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default TravelStoriesList

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 150,
        borderRadius: 20,
        elevation: 10,
        shadowColor: 'black',

    },
    photo: {
        width: '100%',
        height: '100%',

    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    info: {
        justifyContent: 'flex-end',
        height: '100%',
        gap: 10,
        width: '100%',
    },
    title: {
        color: 'white',
        fontFamily: 'Stylish-Regular',
        fontSize: 18,
        padding: 5,
        backgroundColor: colors.darkModeBlack(0.50),
    }
})