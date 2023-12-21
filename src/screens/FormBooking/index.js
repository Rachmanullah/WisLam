import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert, } from 'react-native'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import colors from '../../theme/colors';
import ThemeContext from '../../context/GlobalStateProvider';
import { ArrowLeft } from 'iconsax-react-native';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import NotifService from '../../../NotifService';
import auth from '@react-native-firebase/auth';
import { formatRupiah } from '../../utils/formatRupiah';
import { countTotal } from '../../utils/countTotal';

const FormBooking = ({ route }) => {
    const { dataId, person } = route.params;
    const navigation = useNavigation();
    const theme = useContext(ThemeContext)
    const [selectedData, setSelectedData] = useState(null);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true);
    const [registerToken, setRegisterToken] = useState("");
    const [fcmRegistered, setfcmRegistered] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const onRegister = (token) => {
        setRegisterToken(token.token)
        setfcmRegistered(true);
    }

    const onNotif = (notif) => {
        Alert.alert(notif.title, notif.message);
    }
    const notif = new NotifService(onRegister, onNotif);

    const getdataById = async () => {
        try {
            const response = await axios.get(
                `https://6560930983aba11d99d11c99.mockapi.io/wislamapp/tour_destination/${dataId}`,
            );
            setSelectedData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const [newBooking, setNewBooking] = useState({
        id_destination: 0,
        person: {},
        date: "",
        harga: 0,
    })
    const [newPerson, SetNewPerson] = useState([{
        name: "",
        id_number: "",
        telp: "",
    }])

    const handleUpload = async () => {
        const isAnyFieldEmpty = newPerson.some(person => (
            person.name.trim() === '' ||
            person.id_number.trim() === '' ||
            person.telp.trim() === ''
        ));
        if (isAnyFieldEmpty) {
            Alert.alert("Lengkapi Data Anda")
        }

        if (isAnyFieldEmpty) {
            Alert.alert("Lengkapi Data Anda")
        } else {
            setLoading(true);
            try {
                const authorId = auth().currentUser.uid;
                await firestore().collection('booking').add({
                    id_destination: newBooking.id_destination,
                    person: newBooking.person,
                    date: newBooking.date,
                    harga: newBooking.harga,
                    createdAt: new Date(),
                    authorId
                })
                setLoading(false);
                console.log('booking added!');
                notif.localNotif('sample.mp3', 'Booking Succesful', 'Check Your Booking In App')
                navigation.replace('ConfirmScreen', { status: 200 });
            } catch (e) {
                console.log(e);
                navigation.replace('ConfirmScreen', { status: 400 });
            }
        }
    };

    const handleInput = (personIndex, key, value) => {
        const updatedPerson = [...newPerson];
        updatedPerson[personIndex - 1] = {
            ...updatedPerson[personIndex - 1],
            [key]: value,
        };
        SetNewPerson(updatedPerson);
        setNewBooking({
            id_destination: dataId,
            person: updatedPerson,
            date: date,
            harga: countTotal(selectedData?.harga, person)
        })

    }

    const onChange = (selectedDate) => {
        const currentDate = selectedDate;
        setOpen(false);
        setDate(currentDate);
    };

    useFocusEffect(
        useCallback(() => {
            getdataById();
        }, [])
    );

    const renderInputComponent = () => {
        const inputComponents = [];
        for (let i = 1; i <= person; i++) {
            inputComponents.push(
                <View style={[BoxTextInput.container, { backgroundColor: theme.theme === 'dark' ? '#000000' : '#FEFEFE' }]} key={i}>
                    <Text style={[BoxTextInput.label, { color: theme.textColor }]}>Person-{i}</Text>
                    <View style={BoxTextInput.box}>
                        <TextInput
                            style={[BoxTextInput.input, { color: theme.textColor }]}
                            placeholder='Name'
                            placeholderTextColor={theme.theme === 'dark' ? '#FEFEFE' : '#565e56'}
                            onChangeText={(text) => handleInput(i, "name", text)}
                        />
                    </View>
                    <View style={BoxTextInput.box}>
                        <TextInput
                            style={[BoxTextInput.input, { color: theme.textColor }]}
                            placeholder='NO KTP'
                            placeholderTextColor={theme.theme === 'dark' ? '#FEFEFE' : '#565e56'}
                            keyboardType='numeric'
                            onChangeText={(text) => handleInput(i, "id_number", text)}
                        />
                    </View>
                    <View style={BoxTextInput.box}>
                        <TextInput
                            style={[BoxTextInput.input, { color: theme.textColor }]}
                            placeholder='Telp'
                            placeholderTextColor={theme.theme === 'dark' ? '#FEFEFE' : '#565e56'}
                            keyboardType='numeric'
                            textContentType=''
                            onChangeText={(text) => handleInput(i, "telp", text)}
                        />
                    </View>
                </View>
            );
        }
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
                    <Text style={[cardInfo.label, { color: theme.textColor }]}>Destination : <Text style={{ fontFamily: 'TitilliumWeb-Bold' }}>{selectedData?.name}</Text></Text>
                    <Text style={[cardInfo.label, { color: theme.textColor }]}>Price Ticket : <Text style={{ fontFamily: 'TitilliumWeb-Bold' }}>{formatRupiah(selectedData?.harga)} / Person</Text></Text>
                    <Text style={[cardInfo.label, { color: theme.textColor }]}>Total Price   : <Text style={{ fontFamily: 'TitilliumWeb-Bold' }}>{formatRupiah(countTotal(selectedData?.harga, person))}</Text></Text>
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
                <TouchableOpacity style={[styles.button, {
                    backgroundColor: isButtonDisabled
                        ? '#565e56'
                        : colors.sekunder,
                }]} onPress={handleUpload} disabled={isButtonDisabled}>
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

export default FormBooking

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