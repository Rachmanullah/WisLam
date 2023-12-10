import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { CloseCircle, TickCircle } from 'iconsax-react-native'
import { useNavigation } from '@react-navigation/native';

const ConfirmScreen = ({ route }) => {
    const { status } = route.params;
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('MyTrips');
        }, 500)
    })

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                status == 200 ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TickCircle size="100" color="#0ac413" variant="Bold" />
                        <Text style={{
                            fontFamily: 'Inter-ExtraBold',
                            fontSize: 20,
                            color: '#000000'
                        }}>
                            BOOKING CONFIRMED
                        </Text>
                    </View>
                ) : (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <CloseCircle size="100" color="#d10808" variant="Bold" />
                        <Text style={{
                            fontFamily: 'Inter-ExtraBold',
                            fontSize: 20,
                            color: '#000000'
                        }}>
                            BOOKING FAILED
                        </Text>
                    </View>
                )
            }
        </View>
    )
}

export default ConfirmScreen

const styles = StyleSheet.create({})