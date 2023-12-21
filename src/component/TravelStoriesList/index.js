import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import { useNavigation } from '@react-navigation/native';

const TravelStoriesList = ({ data }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("StoriesScreen", { userId: data.id })}>
            <ImageBackground source={{ uri: data?.image }} style={styles.photo}>
                <View style={styles.content}>
                    <View style={styles.info}>
                        <Text style={{ ...styles.title, paddingVertical: 20 }}>{data?.name}</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default TravelStoriesList

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 150,
        borderRadius: 20,
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
        backgroundColor: colors.darkMode.background,
    }
})