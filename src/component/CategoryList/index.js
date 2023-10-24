import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'

const CategoryList = ({ data, onPress, colors }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={{ ...styles.card, backgroundColor: colors, }}>
                <Text style={styles.titleCard}>{data.category}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryList

const styles = StyleSheet.create({
    card: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        borderColor: colors.sekunder,
        borderWidth: 2,
        shadowColor: 'black',
        elevation: 5
    },
    titleCard: {
        color: 'black'
    }
})