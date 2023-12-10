import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ThemeContext from '../../../context/GlobalStateProvider';
import colors from '../../../theme/colors';
import ActionSheet from 'react-native-actions-sheet';
import { ArrowLeft, More } from 'iconsax-react-native';
import { ItemFavorit } from '../../../component';
import firestore from '@react-native-firebase/firestore';
import { formatDate } from '../../../utils/formatDate';

const DetailMyTrips = ({ route }) => {
    const { dataId, destinationId } = route.params;
    const navigation = useNavigation();
    const theme = useContext(ThemeContext)
    const actionSheetRef = useRef(null);
    const [destination, setDestination] = useState([])
    const [loading, setLoading] = useState(true);
    const [dataTrips, setDataTrips] = useState([])
    useEffect(() => {
        const subscriber = firestore()
            .collection('booking')
            .doc(dataId)
            .onSnapshot(documentSnapshot => {
                const getData = documentSnapshot.data();
                if (getData) {
                    console.log('get data: ', getData);
                    setDataTrips(getData);
                } else {
                    console.log(`Blog with ID ${dataId} not found.`);
                }
            });
        // setLoading(false);
        return () => subscriber();
    }, [dataId]);

    const getdataById = async () => {
        try {
            const response = await axios.get(
                `https://6560930983aba11d99d11c99.mockapi.io/wislamapp/tour_destination/${destinationId}`,
            );
            setDestination(response.data);
            setLoading(false)
            console.log(destination)
        } catch (error) {
            console.error(error);
        }
    };

    const navigateEdit = () => {
        closeActionSheet()
        navigation.navigate('EditDataBooking', { dataId, destinationId })
    }

    const handleDelete = async () => {
        setLoading(true);
        try {
            await firestore()
                .collection('booking')
                .doc(dataId)
                .delete()
                .then(() => {
                    console.log('Data Booking deleted!');
                });
            console.log('Data Booking deleted!');
            closeActionSheet();
            setDataTrips(null);
            setLoading(false);
            navigation.navigate('MyTrips');
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getdataById();
        }, [destinationId])
    );

    const openActionSheet = () => {
        actionSheetRef.current?.show();
    };

    const closeActionSheet = () => {
        actionSheetRef.current?.hide();
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
                }}>Detail</Text>
                <TouchableOpacity onPress={openActionSheet}>
                    <More
                        color='#FFFFFF'
                        variant="Linear"
                        style={{ transform: [{ rotate: '90deg' }] }}
                    />
                </TouchableOpacity>
            </View>
            {
                loading ? (
                    <View style={{ paddingVertical: '50%', gap: 10 }}>
                        <ActivityIndicator size={'large'} color={colors.sekunder} />
                    </View>
                ) : (
                    <ScrollView style={{ marginTop: 60, marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                        <Text style={[styles.label, { color: theme.textColor }]}>Destination</Text>
                        {
                            destination &&
                            <ItemFavorit
                                item={destination}
                                variant="Linear"
                            />
                        }
                        {
                            dataTrips &&
                            <View>
                                <Text style={[styles.label, { color: theme.textColor }]}>Detail</Text>
                                <View style={[styles.cardDetail, { backgroundColor: theme.theme === 'dark' ? colors.sekunder : '#FEFEFE' }]}>
                                    <Text style={[styles.cardLabel, { color: theme.textColor }]}>{formatDate(dataTrips?.date)}</Text>
                                    {
                                        dataTrips.person?.map((item, index) => {
                                            return (
                                                <View key={index}>
                                                    <Text style={[styles.cardLabel, { color: theme.textColor }]}>Person-{index + 1}</Text>
                                                    <Text style={[styles.cardLabel, { color: theme.textColor }]}>ID Number    : <Text>{item.id_number}</Text></Text>
                                                    <Text style={[styles.cardLabel, { color: theme.textColor }]}>Name             : <Text>{item.name}</Text></Text>
                                                    <Text style={[styles.cardLabel, { color: theme.textColor }]}>Telp                 : <Text>{item.telp}</Text></Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <Text style={[styles.label, { color: theme.textColor }]}>Detail Price</Text>
                                <View style={[styles.cardDetail, { backgroundColor: theme.theme === 'dark' ? colors.sekunder : '#FEFEFE' }]}>
                                    <Text style={[styles.cardLabel, { color: theme.textColor }]}>Price                : <Text>Rp. 150.000</Text></Text>
                                    <Text style={[styles.cardLabel, { color: theme.textColor }]}>Person            : <Text>{dataTrips.person?.length}</Text></Text>
                                    <Text style={[styles.cardLabel, { color: theme.textColor }]}>Total                :  <Text>Rp. 300.000</Text></Text>
                                </View>
                            </View>
                        }
                    </ScrollView>
                )
            }
            <ActionSheet
                ref={actionSheetRef}
                containerStyle={{
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    backgroundColor: theme.theme === 'dark' ? colors.sekunder : '#FEFEFE'
                }}
                indicatorStyle={{
                    width: 100,
                }}
                gestureEnabled={true}
                defaultOverlayOpacity={0.3}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                    }}
                    onPress={navigateEdit}
                >
                    <Text
                        style={{
                            fontFamily: 'TitilliumWeb-Regular',
                            color: theme.textColor,
                            fontSize: 18,
                        }}>
                        Edit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                    }}
                    onPress={handleDelete}
                >
                    <Text
                        style={{
                            fontFamily: 'TitilliumWeb-Regular',
                            color: theme.textColor,
                            fontSize: 18,
                        }}>
                        Delete
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                    }}
                    onPress={closeActionSheet}>
                    <Text
                        style={{
                            fontFamily: 'TitilliumWeb-Regular',
                            color: 'red',
                            fontSize: 18,
                        }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </ActionSheet>
        </View>
    )
}

export default DetailMyTrips

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
    label: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Bold',
        color: '#000000',
        marginVertical: 10,
    },
    cardDetail: {
        marginVertical: 10,
        backgroundColor: '#FEFEFE',
        elevation: 10,
        padding: 15,
        gap: 10,
    },
    cardLabel: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Regular',
        color: 'black',
    }
})