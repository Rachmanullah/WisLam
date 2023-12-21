import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useState, useEffect } from 'react'
import colors from '../../theme/colors'
import ThemeContext from '../../context/GlobalStateProvider';
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft, FolderMinus } from 'iconsax-react-native';
import { CardTrips } from '../../component';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const MyTrips = () => {
    const navigation = useNavigation();
    const theme = useContext(ThemeContext)
    const [loading, setLoading] = useState(true);
    const [dataTrips, setDataTrips] = useState([])
    useEffect(() => {
        const user = auth().currentUser;
        const fetchBookingData = () => {
            try {
                if (user) {
                    const userId = user.uid;
                    const bookingsCollection = firestore().collection('booking');
                    const query = bookingsCollection.where('authorId', '==', userId);
                    const unsubscribeBooking = query.onSnapshot(querySnapshot => {
                        const bookings = querySnapshot.docs.map(doc => ({
                            ...doc.data(),
                            id: doc.id,
                        }));
                        setDataTrips(bookings);
                        setLoading(false);
                    });

                    return () => {
                        unsubscribeBooking();
                    };
                }
            } catch (error) {
                console.error('Error fetching Booking data:', error);
            }
        }
        fetchBookingData();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
                    ) : dataTrips.length > 0 ? (
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
                    ) : (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '50%' }}>
                            <FolderMinus size="100" color={colors.sekunder} />
                            <Text style={{
                                fontFamily: 'TitilliumWeb-Regular',
                                fontSize: 18,
                                color: colors.sekunder,
                            }}>Tidak ada data Booking</Text>
                        </View>
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