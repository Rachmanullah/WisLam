import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import colors from '../../theme/colors'
import ThemeContext from '../../context/GlobalStateProvider';
import { formatDate } from '../../utils/formatDate';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CardTrips = ({ data }) => {
    const theme = useContext(ThemeContext)
    const navigation = useNavigation();
    const [person, setPerson] = useState([data?.person])
    const [destination, setDestination] = useState([])
    const getdataById = async () => {
        try {
            const response = await axios.get(
                `https://6560930983aba11d99d11c99.mockapi.io/wislamapp/tour_destination/${data.id_destination}`,
            );
            setDestination(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const countPersons = () => {
        const personsCount = person.reduce((total, jmlPerson) => total + jmlPerson.length, 0);
        return personsCount;
    };
    useFocusEffect(
        useCallback(() => {
            getdataById();
        }, [])
    );
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: theme.theme === 'dark' ? colors.sekunder : '#FEFEFE' }]}
            onPress={() => navigation.navigate('DetailMyTrips', { dataId: data.id, destinationId: destination.id })}
        >
            <Text style={[styles.title, { color: theme.textColor }]}>Rachmanullah</Text>
            <Text style={[styles.label, { color: theme.textColor }]}>Destination : <Text style={[styles.destination, { color: theme.textColor }]}>{destination?.name}</Text></Text>
            <Text style={[styles.label, { color: theme.textColor }]}>Person          : <Text style={[styles.destination, { color: theme.textColor }]}>{countPersons()}</Text></Text>
            <Text style={[styles.label, { color: theme.textColor }]}>Total Price    : <Text style={[styles.destination, { color: theme.textColor }]}>Rp. 300.000</Text></Text>
            <Text style={[styles.label, { color: theme.textColor }]}>{formatDate(data?.date)}</Text>
        </TouchableOpacity>
    )
}

export default CardTrips

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#FEFEFE',
        elevation: 10,
        padding: 15,
        gap: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter-ExtraBold',
        color: 'black',
    },
    label: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Regular',
        color: 'black',
    },
    destination: {
        fontFamily: 'TitilliumWeb-Bold',
        color: 'black',
    }
})