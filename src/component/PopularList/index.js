import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import { Location } from 'iconsax-react-native'

const PopularList = ({ data }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: data.image }} style={styles.cardImage} />
            <View style={styles.content}>
                <Text style={styles.category}>{data.category}</Text>
                <Text style={styles.title}>{data.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Location size="18" color="#697689" variant="Bold" />
                    <Text style={styles.location}>{data.destination}</Text>
                </View>
            </View>
        </View>
    )
}

export default PopularList

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 20,
        flexDirection: 'row',
    },
    cardImage: {
        borderRadius: 20,
        width: 90,
        height: 90,
        objectFit: 'cover'
    },
    content: {
        margin: 10,
    },
    category: {
        color: colors.sekunder,
        fontFamily: 'DavidLibre-Bold',
        fontSize: 13
    },
    title: {
        color: 'black',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 18,
        fontWeight: '500'
    },
    location: {
        color: 'grey',
        fontSize: 13,
    }
})