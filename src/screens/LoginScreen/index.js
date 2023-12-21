import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Eye, EyeSlash } from 'iconsax-react-native';
import colors from '../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoginDisabled, setLoginDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        let errorMessage = '';
        setLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email, password);
            const userToken = await auth().currentUser.getIdToken();
            const expirationInMilliseconds = 30 * 24 * 60 * 60 * 1000; //hari * jam * menit * detik * milidetik
            const expirationTime = new Date().getTime() + expirationInMilliseconds;
            const dataToStore = {
                userToken,
                expirationTime,
            };
            await AsyncStorage.setItem('userData', JSON.stringify(dataToStore));
            setLoading(false);
            navigation.navigate('MainApp');
        } catch (error) {
            setLoading(false);
            console.log('Login Error:', error.message);
            if (error.code === 'auth/invalid-email') {
                errorMessage = 'Email tidak valid.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Password salah.';
            } else if (error.code === 'auth/invalid-login') {
                errorMessage = 'Email atau password salah, silahkan periksa kembali.';
            } else {
                errorMessage = 'Terjadi kesalahan saat login.';
            }
            Alert.alert('Error', errorMessage);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const updateLoginButtonStatus = () => {
        if (email.trim() && password.trim()) {
            setLoginDisabled(false);
        } else {
            setLoginDisabled(true);
        }
    };
    useEffect(() => {
        updateLoginButtonStatus();
    }, [email, password]);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>Log in</Text>
                    <Text style={styles.caption}>
                        Let's log in to your account and roll in to Woco!
                    </Text>
                    <View style={styles.form}>
                        <View>
                            <Text style={textinput.label}>Email</Text>
                            <View style={textinput.container}>
                                <TextInput
                                    placeholder="Enter your email address"
                                    placeholderTextColor='#565e56'
                                    value={email}
                                    onChangeText={text => {
                                        setEmail(text);
                                        updateLoginButtonStatus();
                                    }}
                                    inputMode="email"
                                    keyboardType="email-address"
                                    style={textinput.text}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={textinput.label}>Password</Text>
                            <View
                                style={[
                                    textinput.container,
                                    {
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        gap: 10,
                                    },
                                ]}>
                                <TextInput
                                    placeholder="Enter password"
                                    placeholderTextColor='#565e56'
                                    value={password}
                                    onChangeText={text => {
                                        setPassword(text);
                                        updateLoginButtonStatus();
                                    }}
                                    secureTextEntry={!passwordVisible}
                                    style={[textinput.text, { flex: 1 }]}
                                />
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    {passwordVisible ? (
                                        <Eye variant="Linear" color='#565e56' size={20} />
                                    ) : (
                                        <EyeSlash
                                            variant="Linear"
                                            color='#565e56'
                                            size={20}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ gap: 10 }}>
                    <TouchableHighlight
                        style={[
                            button.container,
                            {
                                backgroundColor: isLoginDisabled
                                    ? '#565e56'
                                    : colors.sekunder,
                            },
                        ]}
                        underlayColor={colors.sekunder}
                        onPress={handleLogin}
                        disabled={isLoginDisabled}>
                        {loading ? (
                            <ActivityIndicator color={colors.lightMode.textColor} />
                        ) : (
                            <Text style={button.label}>LOG IN</Text>
                        )}
                    </TouchableHighlight>
                    <View style={{ flexDirection: 'row', gap: 5, alignSelf: 'center' }}>
                        <Text style={[button.label, { color: colors.lightMode.textColor }]}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                            <Text style={[button.label, { color: '#0384fc' }]}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightMode.backgroundColor,
        paddingHorizontal: 24,
        paddingVertical: 60,
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 32,
        fontFamily: 'TitilliumWeb-Bold',
        color: colors.lightMode.textColor,
    },
    caption: {
        fontFamily: 'TitilliumWeb-Regular',
        color: '#565e56',
        fontSize: 14,
        marginTop: 5,
        marginBottom: 40,
    },
    form: {
        gap: 20,
    },
});
const textinput = StyleSheet.create({
    label: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 14,
        color: '#565e56',
        marginBottom: 5,
    },
    container: {
        backgroundColor: '#d4d7d9',
        height: 52,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    text: {
        paddingVertical: 0,
        color: colors.lightMode.textColor,
        fontFamily: 'TitilliumWeb-Regular',
    },
});
const button = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 16,
        alignItems: 'center',
    },
    label: {
        color: colors.darkMode.textColor,
        fontSize: 14,
        fontFamily: 'TitilliumWeb-Bold',
    },
});