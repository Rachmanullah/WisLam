import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { ItemFavorit } from '../../component'
import { DataWisata } from '../../../data'

const FavoriteScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Favorite</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 15, gap: 10, paddingVertical: 10 }}>
                    {DataWisata.map((item, index) => (
                        <ItemFavorit item={item} key={index} />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        paddingHorizontal: 24,
        gap: 30,
        alignItems: 'center',
        height: 52,
        elevation: 10,
        paddingTop: 10,
        paddingBottom: 5,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Inter-ExtraBold',
        color: 'black',
        letterSpacing: -0.3,
    },
})