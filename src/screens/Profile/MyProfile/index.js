import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowLeft } from 'iconsax-react-native';
import { MyIlustrasi } from '../../../assets';
import colors from '../../../theme/colors';

const MyProfile = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft
                        color='grey'
                        variant="Linear"
                        size={24}
                    />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Profile</Text>
                <View></View>
            </View>
            <TouchableOpacity style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginTop: 80,
                backgroundColor: '#9496A1',
                alignSelf: 'center',
            }}>
                <Image source={MyIlustrasi} style={styles.picture} />
            </TouchableOpacity>
            <View style={{ gap: 10, alignItems: 'center', marginHorizontal: 30 }}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.inputan}>
                    <TextInput
                        style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                        placeholder='Your Name'
                        placeholderTextColor='#9496A1'
                    // onChangeText={(email) => setEmail(email)}
                    // value={email}
                    />
                </View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputan}>
                    <TextInput
                        style={{ fontSize: 18, color: 'black', paddingHorizontal: 10, width: 'auto' }}
                        placeholder='Your Email'
                        placeholderTextColor='#9496A1'
                        inputMode='email'
                    // onChangeText={(email) => setEmail(email)}
                    // value={email}
                    />
                </View>
                <Text style={styles.label}>No Phone</Text>
                <View style={styles.inputan}>
                    <TextInput
                        style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                        placeholder='Your Number Phone'
                        placeholderTextColor='#9496A1'
                        inputMode='tel'
                        maxLength={13}
                    // onChangeText={(email) => setEmail(email)}
                    // value={email}
                    />
                </View>
                <Text style={styles.label}>Address</Text>
                <View style={styles.inputan}>
                    <TextInput
                        style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                        placeholder='Your Address'
                        placeholderTextColor='#9496A1'
                    // onChangeText={(email) => setEmail(email)}
                    // value={email}
                    />
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{
                        fontFamily: 'TitiliumWeb-Bold',
                        fontSize: 18,
                        color: 'white'
                    }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MyProfile

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
        backgroundColor: '#FEFEFE',
        elevation: 10
    },
    titleHeader: {
        fontSize: 20,
        fontFamily: 'Inter-ExtraBold',
        color: 'black',
        letterSpacing: -0.3,
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 50,

    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Bold',
        color: 'black'
    },
    inputan: {
        width: '100%',
        height: 53,
        backgroundColor: '#F6F6F6',
        borderColor: 'black',
        borderWidth: 2,
        shadowColor: 'black',
        shadowOpacity: 100,
        shadowRadius: 10,
        elevation: 10,
    },
    btn: {
        backgroundColor: colors.sekunder,
        marginVertical: 20,
        alignItems: 'center',
        paddingVertical: 15,
        width: 300,
        height: 53,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 100,
        shadowRadius: 10,
        elevation: 10,
        overflow: 'hidden'
    }
})