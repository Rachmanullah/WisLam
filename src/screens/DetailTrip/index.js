import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { ArrowLeft, Location, Star1, } from 'iconsax-react-native'
import colors from '../../theme/colors'
import { DataWisata } from '../../../data'
import { useNavigation } from '@react-navigation/native'
import ThemeContext from '../../context/GlobalStateProvider'
const DetailTrip = ({ route }) => {
    const { dataId } = route.params;
    const selectedData = DataWisata.find(data => data.id === dataId);
    const navigation = useNavigation();
    const theme = useContext(ThemeContext)
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
                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                    <Share color={colors.grey(0.6)} variant="Linear" size={24} />
                    <More
                        color={colors.grey(0.6)}
                        variant="Linear"
                        style={{ transform: [{ rotate: '90deg' }] }}
                    />
                </View> */}
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
                <TouchableOpacity style={styles.button}>
                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 20, color: '#FEFEFE' }}>
                        Booking
                    </Text>
                </TouchableOpacity>
            </View>
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