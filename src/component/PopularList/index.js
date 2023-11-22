import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../theme/colors'
import { Location, Star1 } from 'iconsax-react-native'
import { useNavigation } from '@react-navigation/native'
import ThemeContext from '../../context/GlobalStateProvider'

const PopularList = ({ data, onPress, variant }) => {
    const navigation = useNavigation();
    const theme = useContext(ThemeContext);
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: theme.theme === 'dark' ? colors.sekunder : '#FEFEFE' }]} onPress={() => navigation.navigate('DetailTrip', { dataId: data.id })}>
            <Image source={{ uri: data.image }} style={styles.cardImage} />
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 230, alignItems: 'center' }}>
                    <Text style={[styles.category, { color: theme.textColor }]}>{data.category}</Text>
                    <TouchableOpacity onPress={onPress}>
                        <Star1 size={25} color={theme.theme === 'dark' ? '#FEFEFE' : colors.sekunder} variant={variant} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.title, { color: theme.textColor }]}>{data.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Location size="18" color="#697689" variant="Bold" />
                    <Text style={[styles.location, { color: theme.textColor }]}>{data.destination}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PopularList

const styles = StyleSheet.create({
    container: {
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