import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Location, Star1 } from 'iconsax-react-native'
import { useNavigation } from '@react-navigation/native'

const RecommendList = ({ data, onPress, variant }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DetailTrip', { dataId: data.id })}>
            <Image source={{ uri: data.image }} style={styles.CardImage} />
            <View style={styles.cardContent}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardTitle}>{data.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginVertical: 10 }}>
                    <Location size="15" color="#697689" variant="Bold" />
                    <Text style={styles.destination}>{data.destination}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <Star1 size={20} color='#dce775' variant='Bold' />
                        <Text style={styles.rating}>{data.rating}</Text>
                    </View>
                    <TouchableOpacity onPress={onPress}>
                        <Star1 size={25} color='#dce775' variant={variant} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RecommendList

const styles = StyleSheet.create({
    card: {
        width: 150,
        backgroundColor: 'white',
        maxHeight: 250,
        elevation: 7,
        shadowColor: 'black',
        borderRadius: 20,
        marginBottom: 10
    },
    CardImage: {
        width: '100%',
        height: 100,
        borderRadius: 15,
    },
    cardContent: {
        justifyContent: 'space-between',
        padding: 10,
        gap: 10
    },
    cardTitle: {
        color: 'black',
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 15,
    },
    destination: {
        color: 'black',
        fontFamily: 'TitilliumWeb-Light',
        fontWeight: '600',
        fontSize: 13
    },
    cardIcon: {
        backgroundColor: 'white',
        padding: 5,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    rating: {
        color: 'black',
        fontFamily: 'Inter-ExtraBold'
    }
})