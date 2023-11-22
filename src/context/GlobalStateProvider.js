// GlobalStateProvider.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();
const ThemeContext = createContext();

export default ThemeContext;
const initialState = {
    favorites: [],
};

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            // Menambahkan ID favorit ke daftar favorit dalam state
            return { ...state, favorites: [...state.favorites, action.payload] };
        case 'UPDATE_FAVORITE':
            return { ...state, favorites: action.payload };
        case 'REMOVE_FAVORITE':
            return { ...state, favorites: state.favorites.filter(id => id !== action.payload) };
        default:
            throw new Error(`Tindakan tidak dikenal: ${action.type}`);
    }
};

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    useEffect(() => {
        // Mengambil data favorit dari AsyncStorage saat aplikasi dimulai
        AsyncStorage.getItem('favorites')
            .then((favorites) => {
                if (favorites) {
                    const parsedFavorites = JSON.parse(favorites);
                    dispatch({ type: 'UPDATE_FAVORITE', payload: parsedFavorites });
                }
            })
            .catch((error) => console.error('Error getting favorites from AsyncStorage:', error));
    }, []);

    // Menyimpan daftar favorit ke AsyncStorage setiap kali state berubah
    useEffect(() => {
        const flattenedData = [];
        function flattenAndRemoveDuplicates(arr) {
            for (const item of arr) {
                if (Array.isArray(item)) {
                    // Jika item adalah array, panggil rekursif
                    flattenAndRemoveDuplicates(item);
                } else {
                    // Jika item adalah angka
                    if (!flattenedData.includes(item)) {
                        flattenedData.push(item);
                    }
                }
            }
        }
        flattenAndRemoveDuplicates(state.favorites);
        const favoritesToSave = JSON.stringify(flattenedData)
        // console.log(favoritesToSave)
        AsyncStorage.setItem('favorites', favoritesToSave)
            .catch((error) => console.error('Error saving favorites to AsyncStorage:', error));
    }, [state.favorites]);

    const removeFavorite = async (itemId) => {
        if (state.favorites.includes(itemId)) {
            // Hapus ID favorit dari daftar favorit dalam state
            const newFavorites = state.favorites.filter(id => id !== itemId);
            dispatch({ type: 'REMOVE_FAVORITE', payload: itemId });

            // Simpan ke AsyncStorage
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            // console.log(state.favorites)
        }
    };


    const getFavorites = async () => {
        const flattenedData = [];
        function flattenAndRemoveDuplicates(arr) {
            for (const item of arr) {
                if (Array.isArray(item)) {
                    // Jika item adalah array, panggil rekursif
                    flattenAndRemoveDuplicates(item);
                } else {
                    // Jika item adalah angka
                    if (!flattenedData.includes(item)) {
                        flattenedData.push(item);
                    }
                }
            }
        }
        try {
            const favoriteData = await AsyncStorage.getItem('favorites');
            if (favoriteData) {
                const parsedFavorites = JSON.parse(favoriteData);
                flattenAndRemoveDuplicates(parsedFavorites)
            }
        } catch (error) {
            console.error('Error getting favorites from AsyncStorage:', error);
        }
        // console.log('flattenedData : ' + flattenedData)
        return flattenedData;
    }
    return (
        <GlobalStateContext.Provider value={{ ...state, removeFavorite, getFavorites }}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};



export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState harus digunakan dalam GlobalStateProvider');
    }
    return context;
};

export const useGlobalDispatch = () => {
    const context = useContext(GlobalDispatchContext);
    if (context === undefined) {
        throw new Error('useGlobalDispatch harus digunakan dalam GlobalStateProvider');
    }
    return context;
};
