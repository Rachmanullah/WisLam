import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SearchNormal, BucketSquare } from 'iconsax-react-native';
import colors from '../../theme/colors';
import { CategoryList, PopularList, RecommendList, TravelStoriesList } from '../../component';
import { DataCategoryList, DataStories, DataWisata } from '../../../data';
import { useGlobalDispatch, useGlobalState } from '../../context/GlobalStateProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchComponent = () => {
    return (
        <View style={SearchStyle.container}>
            <View style={SearchStyle.input}>
                <SearchNormal size="20" color="#565e56" />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#565e56"
                    style={SearchStyle.textInput}
                />
            </View>
            <TouchableOpacity style={SearchStyle.button}>
                <SearchNormal size="20" color="#FEFEFE" />
            </TouchableOpacity>
        </View>
    );
};

const RenderCategoryList = ({ selectedCategory, setSelectedCategory }) => {
    const renderItem = ({ item }) => {
        const color = item.category === selectedCategory ? colors.sekunder : 'white';
        return (
            <CategoryList
                data={item}
                onPress={() => setSelectedCategory(item.category)}
                colors={color}
            />
        )
    }
    return (
        <FlatList
            data={DataCategoryList}
            keyExtractor={item => item.id}
            renderItem={item => renderItem({ ...item })}
            contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
            horizontal
        />
    )
}

const RenderRecommend = ({ dataRender }) => {
    const dispatch = useGlobalDispatch();
    const { favorites, getFavorites, removeFavorite } = useGlobalState();
    const [loved, setLoved] = useState([]);
    // const flattenedData = [];

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
    //         const favoriteData = await AsyncStorage.getItem('favorites');
    //         if (favoriteData) {
    //             const parsedFavorites = JSON.parse(favoriteData);
    //             flattenAndRemoveDuplicates(parsedFavorites)
    //             setLoved(flattenedData);
    //             console.log('HomeScreen : ' + flattenedData);
    //         }
    //     } catch (error) {
    //         console.error('Error getting favorites from AsyncStorage:', error);
    //     }
    // };
    useEffect(() => {
        setInterval(() => {
            const fetchData = async () => {
                const flattenedData = await getFavorites();
                setLoved(flattenedData);
            };
            fetchData();
        }, 3000);
    }, []);

    const toggleLoved = async (itemId) => {
        // console.log(favorites)
        if (loved.includes(itemId)) {
            // Hapus item dari AsyncStorage
            try {
                const flattenedData = await getFavorites();
                if (flattenedData) {
                    // Hapus item dengan ID yang sesuai
                    const updatedFavorites = flattenedData.filter(id => id !== itemId);
                    // console.log(updatedFavorites)
                    // Simpan kembali ke AsyncStorage
                    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                    setLoved(loved.filter(id => id !== itemId));
                    removeFavorite(itemId)
                }
            } catch (error) {
                console.error('Error removing item from AsyncStorage:', error);
            }

        } else {
            dispatch({ type: 'ADD_FAVORITE', payload: itemId });
            setLoved([...loved, itemId]);
        }
    };

    const renderItem = ({ item }) => {
        variant = loved.includes(item.id) ? 'Bold' : 'Linear';
        return (
            <RecommendList
                data={item}
                onPress={() => {
                    toggleLoved(item.id)
                }}
                variant={variant}
            />
        )
    }
    return (
        <FlatList
            data={dataRender}
            keyExtractor={item => item.id}
            renderItem={item => renderItem({ ...item })}
            contentContainerStyle={{ gap: 10 }}
            horizontal
        />
    );
};

const RenderPopular = ({ dataRender }) => {
    const [loved, setLoved] = useState([]);
    const dispatch = useGlobalDispatch();
    const { favorites, getFavorites, removeFavorite } = useGlobalState();

    // const flattenedData = [];
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
    //         const favoriteData = await AsyncStorage.getItem('favorites');
    //         if (favoriteData) {
    //             const parsedFavorites = JSON.parse(favoriteData);
    //             flattenAndRemoveDuplicates(parsedFavorites)
    //             setLoved(flattenedData);

    //         }
    //     } catch (error) {
    //         console.error('Error getting favorites from AsyncStorage:', error);
    //     }
    // };
    useEffect(() => {
        setInterval(() => {
            const fetchData = async () => {
                const flattenedData = await getFavorites();
                setLoved(flattenedData);
            };
            fetchData();
        }, 3000);
    }, []);

    const toggleLoved = async (itemId) => {
        if (loved.includes(itemId)) {
            // Hapus item dari AsyncStorage
            try {
                const flattenedData = await getFavorites();
                if (flattenedData) {
                    // Hapus item dengan ID yang sesuai
                    const updatedFavorites = flattenedData.filter(id => id !== itemId);
                    // console.log(updatedFavorites)
                    // Simpan kembali ke AsyncStorage
                    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                    setLoved(loved.filter(id => id !== itemId));
                    removeFavorite(itemId)
                }
            } catch (error) {
                console.error('Error removing item from AsyncStorage:', error);
            }

        } else {
            dispatch({ type: 'ADD_FAVORITE', payload: itemId });
            setLoved([...loved, itemId]);
        }
    };
    // const handleAddFavorite = (id) => {
    //     dispatch({ type: 'ADD_FAVORITE', payload: id });
    // };

    return (
        <View style={{ gap: 15 }}>
            {
                dataRender.map((item, index) => {
                    const variant = loved.includes(item.id) ? 'Bold' : 'Linear';

                    return (
                        <PopularList
                            data={item}
                            onPress={() => {
                                toggleLoved(item.id);
                                // handleAddFavorite(item.id);
                            }}
                            variant={variant}
                            key={index}
                        />
                    );
                })
            }
        </View>
    );
}

const RenderTravelStories = () => {
    const renderItem = ({ item }) => {
        return (
            <TravelStoriesList
                data={item}
            />
        )
    }
    return (
        <FlatList
            data={DataStories}
            keyExtractor={item => item.id}
            renderItem={item => renderItem({ ...item })}
            contentContainerStyle={{ gap: 10 }}
            horizontal
        />
    )
}
const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [DataRecommend, setDataRecommend] = useState([])
    const [DataPopular, setDataPopular] = useState([])

    useEffect(() => {
        const DataAcak = DataWisata.sort(() => Math.random());
        if (selectedCategory) {
            const FilterData = DataAcak.filter(item => item.category === selectedCategory)
            setDataRecommend(FilterData.slice(0, 5))
            setDataPopular(FilterData.slice(5, 15))
        } else {
            setDataRecommend(DataAcak.slice(0, 5))
            setDataPopular(DataAcak.slice(5, 15))
        }
    }, [DataWisata, selectedCategory])

    return (
        <View style={styles.container}>
            <View style={styles.topBars}>
                <View style={styles.location}>
                    <Text style={styles.titleCurrent}>Current Location</Text>
                    <Text style={styles.titleUserLocation}>Malang, IDN</Text>
                </View>
                <View style={styles.theme}>
                    <BucketSquare size="35" color="#555555" variant="Bold" />
                </View>
            </View>
            <ScrollView style={{ margin: 10, gap: 10 }}>
                <Text style={styles.label}>Wonderful Indonesia</Text>
                <Text style={styles.label}>Let’s Explore Together </Text>
                <SearchComponent />
                <RenderCategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: 'black',
                            fontSize: 20,
                            paddingVertical: 10,
                        }}>
                        Recommend
                    </Text>
                </View>
                <RenderRecommend dataRender={DataRecommend} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: 'black',
                            fontSize: 20,
                            paddingVertical: 10,
                        }}>
                        Travel Story
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: colors.sekunder,
                            fontSize: 16,
                            paddingVertical: 10,
                        }}>
                        View All
                    </Text>
                </View>
                <RenderTravelStories />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: 'black',
                            fontSize: 20,
                            paddingVertical: 10,
                        }}>
                        Popular
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: colors.sekunder,
                            fontSize: 16,
                            paddingVertical: 10,
                        }}>
                        View All
                    </Text>
                </View>
                <RenderPopular dataRender={DataPopular} />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topBars: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 10,
        padding: 5,
    },
    location: {
        padding: 10,
    },
    titleCurrent: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 12,
        color: 'black',
    },
    titleUserLocation: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 18,
        color: 'black',
    },
    theme: {
        margin: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImagesProfile: {
        width: 40,
        height: 40,
    },
    label: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 25,
        color: 'black',
    },
});

const SearchStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 15,
        gap: 10,
    },
    input: {
        backgroundColor: 'white',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        shadowColor: 'black',
        elevation: 5,
        height: 50,
    },
    textInput: {
        color: 'black',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 18,
    },
    button: {
        backgroundColor: colors.sekunder,
        width: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: 'black',
    },
});
