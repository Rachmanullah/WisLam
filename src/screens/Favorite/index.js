import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ItemFavorit } from '../../component'
import { DataWisata } from '../../../data'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalState } from '../../context/GlobalStateProvider'
import { FolderMinus } from 'iconsax-react-native';

const FavoriteScreen = () => {
    const { favorites, getFavorites, removeFavorite } = useGlobalState();
    const [favoriteData, setFavoriteData] = useState([]);
    const [showResult, setShowResult] = useState(true);

    // function flattenAndRemoveDuplicates(arr) {
    //     for (const item of arr) {
    //         if (Array.isArray(item)) {
    //             // Jika item adalah array, panggil rekursif
    //             flattenAndRemoveDuplicates(item);
    //         } else {
    //             // Jika item adalah angka
    //             if (!flattenedData.includes(item)) {
    //                 flattenedData.push(item);
    //             }
    //         }
    //     }
    // }
    // const getItemFromAsyncStorage = async () => {
    //     try {
    //         // AsyncStorage.setItem('favorites', '')
    //         const favoriteData = await AsyncStorage.getItem('favorites');
    //         if (favoriteData) {
    //             const parsedFavorites = JSON.parse(favoriteData);
    //             flattenAndRemoveDuplicates(parsedFavorites)

    //             const Data = DataWisata.filter((item) =>
    //                 flattenedData.includes(item.id)

    //             );
    //             setFavoriteData(Data);
    //             // console.log(parsedFavorites);
    //             console.log('FavoriteScreen : ' + flattenedData);

    //         }
    //     } catch (error) {
    //         console.error('Error getting favorites from AsyncStorage:', error);
    //     }
    // };
    const toggleLoved = async (itemId) => {
        if (favoriteData.find(item => item.id === itemId)) {
            try {
                const flattenedData = await getFavorites();
                if (flattenedData) {
                    // Hapus item dengan ID yang sesuai
                    const updatedFavorites = flattenedData.filter(id => id !== itemId);
                    // console.log(updatedFavorites)
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
                // AsyncStorage.setItem('favorites', '')
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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Favorite</Text>
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
                                    <FolderMinus size="100" color="#697689" />
                                    <Text style={{
                                        fontFamily: 'TitilliumWeb-Regular',
                                        fontSize: 18,
                                        color: '#697689',
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