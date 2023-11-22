import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ItemFavorit } from '../../component'
import { DataWisata } from '../../../data'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalState } from '../../context/GlobalStateProvider'
import { FolderMinus } from 'iconsax-react-native';
import colors from '../../theme/colors';
import ThemeContext from '../../context/GlobalStateProvider';
const FavoriteScreen = () => {
    const { favorites, getFavorites, removeFavorite } = useGlobalState();
    const [favoriteData, setFavoriteData] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const theme = useContext(ThemeContext)

    const toggleLoved = async (itemId) => {
        if (favoriteData.find(item => item.id === itemId)) {
            try {
                const flattenedData = await getFavorites();
                if (flattenedData) {
                    // Hapus item dengan ID yang sesuai
                    const updatedFavorites = flattenedData.filter(id => id !== itemId);
                    // Simpan kembali ke AsyncStorage
                    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                    setFavoriteData(favoriteData.find(item => item.id !== itemId));
                    removeFavorite(itemId)

                }
            } catch (error) {
                console.error('Error removing item from AsyncStorage:', error);
            }
        }
    };
    useEffect(() => {
        setInterval(() => {
            const fetchData = async () => {
                const flattenedData = await getFavorites();
                const Data = DataWisata.filter((item) =>
                    flattenedData.includes(item.id)
                );
                setFavoriteData(Data)
                if (Data.length > 0) {
                    setShowResult(false)
                } else {
                    setShowResult(true)
                }
            };
            fetchData();
        }, 3000);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.textColor }]}>Favorite</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 15, gap: 10, paddingVertical: 10 }}>
                    {
                        favoriteData && favoriteData.length > 0 ?
                            favoriteData.map((item, index) => {
                                const isItemLoved = favoriteData.some(favoriteItem => favoriteItem.id === item.id);
                                const variant = isItemLoved ? 'Bold' : 'Linear';
                                return (
                                    <ItemFavorit
                                        item={item}
                                        variant={variant}
                                        key={index}
                                        onPress={() => {
                                            toggleLoved(item.id)
                                        }}

                                    />
                                )
                            }) :
                            showResult ?
                                <View View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '50%' }}>
                                    <FolderMinus size="100" color={colors.sekunder} />
                                    <Text style={{
                                        fontFamily: 'TitilliumWeb-Regular',
                                        fontSize: 18,
                                        color: colors.sekunder,
                                    }}>Tidak ada data Favorite</Text>
                                </View>
                                :
                                ''
                    }
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