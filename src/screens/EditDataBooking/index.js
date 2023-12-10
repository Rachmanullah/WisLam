import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import colors from '../../theme/colors';
import ThemeContext from '../../context/GlobalStateProvider';
import { ArrowLeft } from 'iconsax-react-native';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

const EditDataBooking = ({ route }) => {
    const { dataId, destinationId } = route.params;
    const navigation = useNavigation();
    const theme = useContext(ThemeContext)
    const [selectedData, setSelectedData] = useState({
        id: 0,
        id_destination: 0,
        person: {},
        date: "",
    });
    const [selectedDataTour, setSelectedDataTour] = useState(null);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true);

    const onChange = (selectedDate) => {
        const currentDate = selectedDate;
        setOpen(false);
        setDate(currentDate);
    };

    useEffect(() => {
        const subscriber = firestore()
            .collection('booking')
            .doc(dataId)
            .onSnapshot(documentSnapshot => {
                const getData = documentSnapshot.data();
                if (getData) {
                    console.log('get data: ', getData);
                    setSelectedData({
                        id: getData.id,
                        id_destination: getData.id_destination,
                        person: getData.person,
                        date: getData.date,
                    });
                    const apiDate = new Date(getData.date.seconds * 1000 + getData.date.nanoseconds / 1000000);
                    console.log("date konvers: ",apiDate);
                    console.log("real: ",getData.date)
                    setDate(apiDate)
                    console.log("date: ", date);
                } else {
                    console.log(`Blog with ID ${dataId} not found.`);
                }
            });
        setLoading(false);
        return () => subscriber();
    }, [dataId]);

    // useEffect(() => {
    //     console.log(selectedData)
    // }, [selectedData])

    const getDestinationById = async () => {
        try {
            const response = await axios.get(
                `https://6560930983aba11d99d11c99.mockapi.io/wislamapp/tour_destination/${destinationId}`,
            );
            setSelectedDataTour(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = async () => {
        setLoading(true);
        try {
            await firestore().collection('booking').doc(dataId).update({
                id_destination: selectedData.id_destination,
                person: selectedData.person,
                date: date ? date : selectedData.date,
            });
            console.log('Data Updated!');
            setLoading(false);
            navigation.navigate('MyTrips');
        } catch (e) {
            console.log(e);
        }
    };

    const handleEditPerson = (personIndex, key, value) => {
        const updatedPerson = [...selectedData.person];
        updatedPerson[personIndex] = {
            ...selectedData.person[personIndex],
            [key]: value,
        };
        setSelectedData({
            ...selectedData,
            person: updatedPerson,
        });
    };

    useFocusEffect(
        useCallback(() => {
            getDestinationById();
        }, [])
    );

    const renderInputComponent = () => {
        const inputComponents = [];
        selectedData?.person.length > 0 &&
            selectedData?.person.map((item, index) => {
                inputComponents.push(
                    <View style={[BoxTextInput.container, { backgroundColor: theme.theme === 'dark' ? '#000000' : '#FEFEFE' }]} key={index}>
                        <Text style={[BoxTextInput.label, { color: theme.textColor }]}>Person-{index + 1}</Text>
                        <View style={BoxTextInput.box}>
                            <TextInput
                                style={[BoxTextInput.input, { color: theme.textColor }]}
                                placeholder='Name'
                                value={item.name}
                                placeholderTextColor={theme.theme === 'dark' ? '#FEFEFE' : '#565e56'}
                                onChangeText={(text) => handleEditPerson(index, "name", text)}
                            />
                        </View>
                        <View style={BoxTextInput.box}>
                            <TextInput
                                style={[BoxTextInput.input, { color: theme.textColor }]}
                                placeholder='ID_Number'
                                placeholderTextColor={theme.theme === 'dark' ? '#FEFEFE' : '#565e56'}
                                keyboardType='numeric'
                                value={item.id_number}
                                onChangeText={(text) => handleEditPerson(index, "id_number", text)}
                            />
                        </View>
                        <View style={BoxTextInput.box}>
                            <TextInput
                                style={[BoxTextInput.input, { color: theme.textColor }]}
                                placeholder='Telp'
                                placeholderTextColor={theme.theme === 'dark' ? '#FEFEFE' : '#565e56'}
                                keyboardType='numeric'
                                value={item.telp}
                                onChangeText={(text) => handleEditPerson(index, "telp", text)}
                            />
                        </View>
                    </View>
                );
            })
        return inputComponents;
    }

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
                }}>Booking</Text>
                <View></View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                <View style={[cardInfo.container, { backgroundColor: theme.theme === 'dark' ? '#000000' : '#FEFEFE' }]}>
                    <Text style={[cardInfo.label, { color: theme.textColor }]}>Destination : <Text style={{ fontFamily: 'TitilliumWeb-Bold' }}>{selectedDataTour?.name}</Text></Text>
                    <Text style={[cardInfo.label, { color: theme.textColor }]}>Price Ticket : <Text style={{ fontFamily: 'TitilliumWeb-Bold' }}>Rp. 150.000 / Person</Text></Text>
                    <Text style={[cardInfo.label, { color: theme.textColor }]}>Total Price   : <Text style={{ fontFamily: 'TitilliumWeb-Bold' }}>Rp. 150.000</Text></Text>
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#27C277', borderRadius: 10, }]} onPress={() => setOpen(true)}>
                    <Text style={{
                        color: '#FEFEFE',
                        fontSize: 20,
                        fontFamily: 'TitilliumWeb-Regular',
                    }}>Schedule Date</Text>
                </TouchableOpacity>
                {renderInputComponent()}
                <DatePicker
                    modal
                    mode='date'
                    open={open}
                    date={date}
                    onConfirm={(date) => onChange(date)}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                <TouchableOpacity style={styles.button} onPress={handleUpload}>
                    <Text style={{
                        color: '#FEFEFE',
                        fontSize: 20,
                        fontFamily: 'TitilliumWeb-Regular',
                    }}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={colors.sekunder} />
                </View>
            )}
        </View>
    )
}

export default EditDataBooking

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
    content: {
        marginTop: 70,
        marginHorizontal: 15,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: 50,
        backgroundColor: colors.sekunder,
        marginVertical: 20,
        borderRadius: 20,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const cardInfo = StyleSheet.create({
    container: {
        // marginTop: 50,
        backgroundColor: '#FEFEFE',
        elevation: 7,
        padding: 15,
        height: 120,
    },
    label: {
        color: '#000000',
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
    }
});

const BoxTextInput = StyleSheet.create({
    container: {
        // marginTop: 50,
        backgroundColor: '#FEFEFE',
        elevation: 7,
        padding: 15,
        height: 250,
        marginTop: 20,
    },
    label: {
        color: '#000000',
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
        marginBottom: 10,
    },
    box: {
        borderStyle: "dotted",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: '#000000',
        marginBottom: 15,
    },
    input: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Regular',
        color: '#000000',
        padding: 0,
    }
});