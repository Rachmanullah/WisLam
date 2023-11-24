import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, } from 'react-native'
import React, { useState, useContext } from 'react'
import { SearchNormal, DocumentFilter, FolderMinus, CloseCircle } from 'iconsax-react-native'
import { PopularList } from '../../component';
import { DataWisata } from '../../../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalDispatch, useGlobalState } from '../../context/GlobalStateProvider';
import colors from '../../theme/colors';
import ThemeContext from '../../context/GlobalStateProvider';

const SearchScreen = () => {
    const dispatch = useGlobalDispatch();
    const { getFavorites, removeFavorite } = useGlobalState();
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [isFavorites, setIsFavorites] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const theme = useContext(ThemeContext)

    const onPressSearch = async () => {
        const flattenedData = await getFavorites();
        const filteredData = DataWisata.filter(item => {
            const itemName = item.name.toLowerCase()
            const itemCategory = item.category.toLowerCase()
            const itemDestination = item.destination.toLowerCase()
            return itemName.includes(search.toLowerCase()) || itemCategory.includes(search.toLowerCase()) || itemDestination.includes(search.toLowerCase());
        });
        const updatedFavorites = flattenedData.filter(id => filteredData.some(item => item.id === id));
        setIsFavorites(updatedFavorites)
        setResult(filteredData)
        setShowResult(true)
    }

    const clearTextInput = () => {
        setSearch('')
        setResult([])
    }

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

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.box}>
                <View style={styles.search}>
                    <SearchNormal size={23} color='#697689' />
                    <TextInput
                        placeholder='Search Destination'
                        style={styles.input}
                        placeholderTextColor="#565e56"
                        value={search}
                        onChangeText={text => setSearch(text)}
                        
                    />
                    {search ?
                        <TouchableOpacity onPress={() => clearTextInput()}>
                            <CloseCircle size={23} color='#697689' />
                        </TouchableOpacity>
                        : ''
                    }
                </View>
                <TouchableOpacity
                    onPress={() => onPressSearch()}
                    style={{
                        backgroundColor: '#ff8a65',
                        width: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <DocumentFilter size="32" color="#FEFEFE" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginHorizontal: 10 }}>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 18, color: theme.textColor, marginBottom: 10, marginLeft: 10 }}>search result</Text>
                {
                    <View style={{ gap: 15, paddingBottom: 20 }}>
                        {
                            result.length > 0 ?
                                result.map((item, index) => {
                                    const isItemLoved = isFavorites.includes(item.id);
                                    const variant = isItemLoved ? 'Bold' : 'Linear';
                                    return (
                                        <PopularList
                                            data={item}
                                            key={index}
                                            variant={variant}
                                            onPress={() => {
                                                toggleLoved(item.id)
                                            }} />
                                    )
                                }) :
                                showResult ?
                                    <View View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '50%' }}>
                                        <FolderMinus size="100" color={colors.sekunder} />
                                        <Text style={{
                                            fontFamily: 'TitilliumWeb-Regular',
                                            fontSize: 18,
                                            color: colors.sekunder,
                                        }}>Tidak ada data Yang Ditemukan</Text>
                                    </View>
                                    :
                                    ''
                        }
                    </View>
                }
            </ScrollView>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE'
    },
    box: {
        flexDirection: 'row',
        gap: 20,
        padding: 10,
        marginVertical: 20,
        marginHorizontal: 10,
    },
    search: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: '#FEFEFE',
        elevation: 10,
        paddingVertical: 3,
        paddingHorizontal: 10,
        width: 250,
    },
    input: {
        color: 'black',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 18,
        width: 170,
    }
})