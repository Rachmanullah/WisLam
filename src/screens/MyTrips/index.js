import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import colors from '../../theme/colors'
import ThemeContext from '../../context/GlobalStateProvider';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { ArrowLeft } from 'iconsax-react-native';
import { CardTrips } from '../../component';
import axios from 'axios';

const MyTrips = () => {
    const navigation = useNavigation();
    const theme = useContext(ThemeContext)
    const [loading, setLoading] = useState(true);
    const [dataTrips, setDataTrips] = useState([])

    const getData = async () => {
        try {
            const response = await axios.get(
                'https://6560930983aba11d99d11c99.mockapi.io/wislamapp/booking',
            );
            setDataTrips(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getData();
        }, [])
    );

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
                }}>My Trips</Text>
                <View></View>
            </View>
            <ScrollView style={{ marginTop: 80 }} showsVerticalScrollIndicator={false}>
                {
                    loading ? (
                        <View style={{ paddingVertical: '50%', gap: 10 }}>
                            <ActivityIndicator size={'large'} color={colors.sekunder} />
                        </View>
                    ) : (
                        dataTrips?.map((item, index) => {
                            return (
                                <View key={index}>
                                    <CardTrips
                                        data={item}
                                        key={index}
                                    />
                                </View>
                            )
                        })
                    )
                }
            </ScrollView>
        </View>
    )
}

export default MyTrips

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
        position: 'absolute',
        zIndex: 1000,
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: colors.sekunder,
    },
    card: {
        top: 80,
        margin: 20,
        backgroundColor: '#FEFEFE',
        elevation: 10,
        padding: 10,
        gap: 10,
        alignItems: 'center',
    },
})