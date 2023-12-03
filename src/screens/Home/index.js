import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { SearchNormal, Sun1 } from 'iconsax-react-native';
import colors from '../../theme/colors';
import { CategoryList, PopularList, RecommendList, TravelStoriesList } from '../../component';
import { DataCategoryList, DataStories } from '../../../data';
import ThemeContext, { useGlobalDispatch, useGlobalState } from '../../context/GlobalStateProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

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
        const labelColor = item.category === selectedCategory ? '#FEFEFE' : '#000000';
        return (
            <CategoryList
                data={item}
                onPress={() => setSelectedCategory(item.category)}
                colors={color}
                labelColors={labelColor}
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
            showsHorizontalScrollIndicator={false}
        />
    )
}

const RenderRecommend = ({ dataRender }) => {
    const dispatch = useGlobalDispatch();
    const { favorites, getFavorites, removeFavorite } = useGlobalState();
    const [loved, setLoved] = useState([]);

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
            try {
                const flattenedData = await getFavorites();
                if (flattenedData) {
                    // Hapus item dengan ID yang sesuai
                    const updatedFavorites = flattenedData.filter(id => id !== itemId);
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
            showsHorizontalScrollIndicator={false}
        />
    );
};

const RenderPopular = ({ dataRender }) => {
    const [loved, setLoved] = useState([]);
    const dispatch = useGlobalDispatch();
    const { favorites, getFavorites, removeFavorite } = useGlobalState();

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
            try {
                const flattenedData = await getFavorites();
                if (flattenedData) {
                    const updatedFavorites = flattenedData.filter(id => id !== itemId);
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
            showsHorizontalScrollIndicator={false}
        />
    )
}
const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [loading, setLoading] = useState(true);
    const [DataRecommend, setDataRecommend] = useState([])
    const [DataPopular, setDataPopular] = useState([])
    const [mode, SetMode] = useState(false)
    const theme = useContext(ThemeContext)
    const [DataWisata, setDataWisata] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get(
                'https://6560930983aba11d99d11c99.mockapi.io/wislamapp/tour_destination',
            );
            setDataWisata(response.data);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getData();
        }, [])
    );

    useEffect(() => {
        const DataAcak = DataWisata.sort(() => Math.random());
        if (selectedCategory) {
            const FilterData = DataAcak.filter(item => item.category === selectedCategory)
            setDataRecommend(FilterData.slice(0, 5))
            setDataPopular(FilterData.slice(5, 10))
        } else {
            setDataRecommend(DataAcak.slice(0, 5))
            setDataPopular(DataAcak.slice(5, 10))
        }
    }, [DataWisata, selectedCategory])

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={[styles.topBars, { backgroundColor: theme.theme === 'dark' ? colors.sekunder : '#FEFEFE' }]}>
                <View style={styles.location}>
                    <Text style={[styles.titleCurrent, { color: theme.textColor }]}>Current Location</Text>
                    <Text style={[styles.titleUserLocation, , { color: theme.textColor }]}>Malang, IDN</Text>
                </View>
                <TouchableOpacity
                    style={styles.theme}
                    onPress={() => {
                        SetMode(!mode)
                        EventRegister.emit("changeTheme", mode)
                    }}>
                    <Sun1 size="35" color={theme.theme === 'dark' ? '#FEFEFE' : '#555555'} variant="Bold" />
                </TouchableOpacity>
            </View>
            {
                loading ? (
                    <View style={{ paddingVertical: '50%', gap: 10 }}>
                        <ActivityIndicator size={'large'} color={colors.sekunder} />
                    </View>
                ) : (
                    <ScrollView style={{ margin: 10, gap: 10 }} showsVerticalScrollIndicator={false}>
                        <Text style={[styles.label, { color: theme.textColor }]}>Wonderful Indonesia</Text>
                        <Text style={[styles.label, { color: theme.textColor }]}>Let’s Explore Together </Text>
                        <SearchComponent />
                        <RenderCategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                            <Text
                                style={{
                                    fontFamily: 'DavidLibre-Bold',
                                    color: theme.textColor,
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
                                    color: theme.textColor,
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
                                    color: theme.textColor,
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
                )
            }
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
        justifyContent: 'center',
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
