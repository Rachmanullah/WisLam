import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ThemeContext, { useGlobalDispatch, useGlobalState } from '../../context/GlobalStateProvider';
import colors from '../../theme/colors';
import { ArrowLeft } from 'iconsax-react-native';
import { PopularList } from '../../component';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllTrips = () => {
    const dispatch = useGlobalDispatch();
    const { getFavorites, removeFavorite } = useGlobalState();
    const [isFavorites, setIsFavorites] = useState([]);
    const navigation = useNavigation();
    const theme = useContext(ThemeContext)
    const [DataWisata, setDataWisata] = useState([]);
    const getData = async () => {
        try {
            const response = await axios.get(
                'https://6560930983aba11d99d11c99.mockapi.io/wislamapp/tour_destination',
            );
            setDataWisata(response.data);
            const flattenedData = await getFavorites();
            const updatedFavorites = flattenedData.filter(id => response.data.some(item => item.id === id));
            setIsFavorites(updatedFavorites)
        } catch (error) {
            console.error(error);
        }
    }
    useFocusEffect(
        useCallback(() => {
            getData();

        }, [])
    );
    const toggleLoved = async (itemId) => {
        if (isFavorites.includes(itemId)) {
            // Hapus item dari AsyncStorage
            try {
                const flattenedData = await getFavorites();
                if (flattenedData) {
                    // Hapus item dengan ID yang sesuai
                    const updatedFavorites = flattenedData.filter(id => id !== itemId);
                    // Simpan kembali ke AsyncStorage
                    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                    setIsFavorites(updatedFavorites); // Menggunakan updatedFavorites
                    removeFavorite(itemId)
                }
            } catch (error) {
                console.error('Error removing item from AsyncStorage:', error);
            }
        } else {
            // Menambahkan item baru ke isFavorites
            dispatch({ type: 'ADD_FAVORITE', payload: itemId });
            setIsFavorites([...isFavorites, itemId]);
            // console.log(parseInt(itemId))
        }
    };
    const renderItem = ({ item }) => {
        const isItemLoved = isFavorites.includes(item.id);
        const variant = isItemLoved ? 'Bold' : 'Linear';

        return (
            <PopularList
                data={item}
                variant={variant}
                onPress={() => toggleLoved(item.id)}
            />
        );
    };
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft
                        color='#FFFFFF'
                        variant="Linear"
                        size={24}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontFamily: 'Inter-ExtraBold',
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#FFFFFF',
                }}>Trips</Text>
                <View></View>
            </View>
            <View style={{ paddingHorizontal: 5, marginBottom: '15%', paddingTop: 2, }}>
                <FlatList
                    data={DataWisata}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />} // Optional: space between items
                    ListFooterComponentStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} color={colors.sekunder} />
                        </View>
                    )}
                />
            </View>

        </View>
    )
}

export default AllTrips

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        paddingTop: 8,
        paddingBottom: 4,
        backgroundColor: colors.sekunder,
    },
})