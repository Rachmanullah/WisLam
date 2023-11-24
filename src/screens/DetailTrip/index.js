import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useRef } from 'react'
import { ArrowLeft, Location, Star1, } from 'iconsax-react-native'
import colors from '../../theme/colors'
import { DataWisata } from '../../../data'
import { useNavigation } from '@react-navigation/native'
import ThemeContext from '../../context/GlobalStateProvider'
import ActionSheet from 'react-native-actions-sheet';

const DetailTrip = ({ route }) => {
    const { dataId } = route.params;
    const selectedData = DataWisata.find(data => data.id === dataId);
    const navigation = useNavigation();
    const [person, setPerson] = useState(0);
    const theme = useContext(ThemeContext)
    const actionSheetRef = useRef(null);

    const openActionSheet = () => {
        actionSheetRef.current?.show();
    };

    const closeActionSheet = () => {
        actionSheetRef.current?.hide();
    };

    const handleButton = () => {
        if (person <= 4 && person > 0) {
            navigation.navigate('FormBooking', {
                dataId: dataId,
                person: person
            })
            closeActionSheet()
        }
    }

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
            </View>
            <Image source={{ uri: selectedData.image }} style={styles.itemImages} />
            <View style={[styles.content, { backgroundColor: theme.backgroundColor }]} >
                <Text style={[styles.title, { color: theme.textColor }]}>{selectedData.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
                    <Location size={20} color={colors.sekunder} variant='Bold' />
                    <Text style={[styles.location, { color: theme.textColor }]}>{selectedData.destination}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
                    <Text style={[styles.rating, { color: theme.textColor }]}>{selectedData.rating}</Text>
                    <Star1 variant='Bold' size={20} color={theme.theme === 'dark' ? '#FEFEFE' : colors.sekunder} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                    paddingBottom: 500,
                }}>
                    <Text style={[styles.descrition, { color: theme.textColor }]}>
                        {selectedData.description}
                    </Text>
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={openActionSheet}>
                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 20, color: '#FEFEFE' }}>
                        Booking
                    </Text>
                </TouchableOpacity>
            </View>
            <ActionSheet
                ref={actionSheetRef}
                containerStyle={{
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    backgroundColor: theme.theme === 'dark' ? '#000000' : '#FEFEFE'
                }}
                indicatorStyle={{
                    width: 100,
                }}
                gestureEnabled={true}
                defaultOverlayOpacity={0.3}>
                <View style={textInput.container}>
                    <TextInput
                        placeholder='Person'
                        style={[textInput.input, { color: theme.textColor }]}
                        placeholderTextColor={theme.theme === 'dark' ? '#FEFEFE' : '#565e56'}
                        // value={person}
                        onChangeText={text => setPerson(text)}
                        keyboardType='numeric'
                        inputMode='numeric'
                    />
                </View>
                {
                    person > 4 && <Text style={{
                        fontFamily: 'TitilliumWeb-Regular',
                        fontSize: 14,
                        color: 'red',
                        marginTop: 10,
                        marginHorizontal: 20,
                    }}>
                        Max 4 Person
                    </Text>
                }
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 'auto',
                        height: 50,
                        backgroundColor: person <= 4 && person > 0 ? colors.sekunder : 'grey',
                        marginVertical: 20,
                        marginHorizontal: 20,
                        borderRadius: 20,
                    }}
                    onPress={handleButton}
                >
                    <Text
                        style={{
                            fontFamily: 'TitilliumWeb-Bold',
                            fontSize: 20,
                            color: '#FEFEFE'
                        }}>
                        Booking
                    </Text>
                </TouchableOpacity>
            </ActionSheet>
        </View>
    )
}

export default DetailTrip

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
    itemImages: {
        width: 'auto',
        height: 350,
        objectFit: 'cover',
    },
    content: {
        marginTop: -50,
        backgroundColor: '#FEFEFE',
        padding: 35,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter-ExtraBold',
        color: '#000000',
    },
    location: {
        fontFamily: 'TitilliumWeb-ExtraLight',
        fontSize: 16,
        color: '#000000',
    },
    rating: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 16,
        color: '#000000',
    },
    descrition: {
        textAlign: 'justify',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 16,
        color: '#000000',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: 50,
        backgroundColor: colors.sekunder,
        marginTop: -480,
        borderRadius: 20,
    }
})

const textInput = StyleSheet.create({
    container: {
        borderStyle: "dotted",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 20,
        borderColor: '#000000',
    },
    input: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Regular',
        color: '#000000',
        padding: 0,
    }
})