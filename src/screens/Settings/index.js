import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft, ArrowSquareRight, LocationTick, Logout, Setting2, Sun1, Notification } from 'iconsax-react-native';
import colors from '../../theme/colors';
import ThemeContext from '../../context/GlobalStateProvider';
const Settings = () => {
    const navigation = useNavigation();
    const theme = useContext(ThemeContext)
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
                }}>Settings</Text>
                <View></View>
            </View>
            <View style={[styles.content, { backgroundColor: theme.theme === 'dark' ? colors.sekunder : '#FEFEFE' }]}>
                <Text style={[styles.titleContent, { color: theme.textColor }]}>Preferences</Text>
                <TouchableOpacity style={styles.itemContent} onPress={() => navigation.navigate('MyProfile')}>
                    <Notification size="25" color="#697689" />
                    <Text style={styles.titleItem}>Notification</Text>
                    <ArrowSquareRight size="25" color="#697689" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContent} onPress={() => navigation.navigate('ThemeScreen')}>
                    <Sun1 size={25} color='#697689' />
                    <Text style={styles.titleItem}>Theme</Text>
                    <ArrowSquareRight size="25" color="#697689" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Settings

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
        top: 80,
        margin: 20,
        backgroundColor: '#FEFEFE',
        elevation: 10,
        padding: 10,
        gap: 10,
        alignItems: 'center',
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e6e6e6',
        gap: 10,
        padding: 10,
        width: 300
    },
    titleItem: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 18,
        color: 'black'
    },
    titleContent: {
        fontFamily: 'Inter-ExtraBold',
        color: '#000000',
        alignSelf: 'flex-start',
        fontSize: 18,
    }
})