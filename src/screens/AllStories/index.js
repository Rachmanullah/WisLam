import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { TravelStoriesList } from '../../component'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { ArrowLeft } from 'iconsax-react-native';
import colors from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
const AllStories = () => {
    const [stories, setStories] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        const getStories = () => {
            try {
                const storiesCollection = firestore().collection('stories');
                const unsubscribeStories = storiesCollection.onSnapshot(querySnapshot => {
                    const storiesData = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setStories(storiesData);
                });

                return () => {
                    unsubscribeStories();
                };
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };
        getStories();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={{ margin: 5 }}>
                <TravelStoriesList
                    data={item}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
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
            <FlatList
                data={stories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ margin: 10 }}
                numColumns={3}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} color={colors.sekunder} />
                    </View>
                )}
            />
        </View>
    )
}

export default AllStories

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