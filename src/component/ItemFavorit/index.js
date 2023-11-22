import { Image, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useRef, useEffect, useContext } from 'react'
import { Star1 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native'
import ThemeContext from '../../context/GlobalStateProvider'
import colors from '../../theme/colors'

const truncateTextByWords = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + ' ...';
    }
    return text;
}

const ItemFavorit = ({ item, onPress, variant }) => {
    const navigation = useNavigation();
    const theme = useContext(ThemeContext);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [])
    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity style={[styles.card, { backgroundColor: theme.theme === 'dark' ? colors.sekunder : '#FEFEFE' }]} onPress={() => navigation.navigate('DetailTrip', { dataId: item.id })}>
                <Image source={{ uri: item.image }} style={styles.ImageCard} />
                <View style={{ marginVertical: 10, width: 200 }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", }}>
                        <View style={{ width: 170 }}>
                            <Text style={[styles.TitleCard, { color: theme.textColor }]}>{truncateTextByWords(item.name, 3)}</Text>
                        </View>
                        <TouchableOpacity onPress={onPress}>
                            <Star1 size={25} variant={variant} color={theme.theme === 'dark' ? '#FEFEFE' : colors.sekunder} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.blogContent, { color: theme.theme === 'dark' ? theme.textColor : '#9496A1' }]}>
                        {truncateTextByWords(item.description, 7)}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default ItemFavorit

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        elevation: 7,
        flexDirection: 'row',
        gap: 15,
        shadowColor: '#050505',
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