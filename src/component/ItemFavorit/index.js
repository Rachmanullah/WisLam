import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Star1 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native'

const truncateTextByWords = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + ' ...';
    }
    return text;
}

const ItemFavorit = ({ item, onPress, variant }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DetailTrip', { dataId: item.id })}>
            <Image source={{ uri: item.image }} style={styles.ImageCard} />
            <View style={{ marginVertical: 10, width: 200 }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", }}>
                    <View style={{ width: 170 }}>
                        <Text style={styles.TitleCard}>{truncateTextByWords(item.name, 3)}</Text>
                    </View>
                    <TouchableOpacity onPress={onPress}>
                        <Star1 size={25} variant={variant} color='yellow' />
                    </TouchableOpacity>
                </View>
                <Text style={styles.blogContent}>
                    {truncateTextByWords(item.description, 7)}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemFavorit

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 10,
        flexDirection: 'row',
        gap: 15,
    },
    ImageCard: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    TitleCard: {
        fontSize: 14,
        fontFamily: 'Inter-ExtraBold',
        color: 'black',
    },
    blogContent: {
        fontSize: 12,
        lineHeight: 20,
        fontFamily: 'TitilliumWeb-Regular',
        color: '#9496A1',
    }
})