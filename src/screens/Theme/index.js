import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { ArrowLeft } from 'iconsax-react-native'
import colors from '../../theme/colors'
import ThemeContext from '../../context/GlobalStateProvider';
import { useNavigation } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';


const ThemeScreen = () => {
    const navigation = useNavigation();
    const [mode, SetMode] = useState(false);
    const theme = useContext(ThemeContext);

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
                }}>Theme</Text>
                <View></View>
            </View>
            <View style={styles.content}>
                <Text style={{ color: theme.textColor, fontSize: 18, fontFamily: 'Inter-ExtraBold' }}>{theme.theme}</Text>
                <Switch value={mode}
                    onValueChange={(value) => {
                        SetMode(value)
                        EventRegister.emit("changeTheme", value)
                    }}
                />
            </View>
        </View>
    )
}

export default ThemeScreen

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
        padding: 10,
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})