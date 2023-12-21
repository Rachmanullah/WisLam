import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Eye, EyeSlash } from 'iconsax-react-native';
import colors from '../../theme/colors';

const RegisterScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isSignupDisabled, setSignupDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [paddingVertical, setPaddingVertical] = useState(60);
    const navigation = useNavigation();

    const handleRegister = async () => {
        let errorMessage = '';

        if (password !== confirmPassword) {
            errorMessage = 'Password dan konfirmasi password tidak cocok.';
        } else if (password.length < 8) {
            errorMessage = 'Panjang kata sandi harus minimal 8 karakter.';
        } else {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
            if (!passwordRegex.test(password)) {
                errorMessage = 'Password harus mengandung kombinasi huruf dan angka.';
            }
        }

        if (errorMessage) {
            Alert.alert('Error', errorMessage);
            return;
        }

        setLoading(true);
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            await firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .set({
                    fullName,
                    username: fullName,
                    email,
                    photoUrl: `https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80`,
                    no_phone: '',
                    address: '',
                    createdAt: new Date(),
                })
                .then(() => {
                    console.log('User added!');
                });
            setLoading(false);
            navigation.navigate('LoginScreen');
        } catch (error) {
            setLoading(false);
            console.log('Registration Error:', error);
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Email sudah terdaftar!';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Email tidak valid';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password lemah';
            }
            Alert.alert('Error', errorMessage);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };
    const updateSignupButtonStatus = () => {
        if (
            fullName.trim() &&
            email.trim() &&
            password.trim() &&
            confirmPassword.trim()
        ) {
            setSignupDisabled(false);
        } else {
            setSignupDisabled(true);
        }
    };

    useEffect(() => {
        updateSignupButtonStatus();
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setPaddingVertical(0);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setPaddingVertical(60);
            },
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [fullName, email, password, confirmPassword]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, { paddingVertical }]}>
                    <View>
                        <Text style={styles.header}>Sign up</Text>
                        <Text style={styles.caption}>
                            It’s never too late to join Woco, we welcome you!
                        </Text>
                        <View style={styles.form}>
                            <View>
                                <Text style={textinput.label}>Full Name</Text>
                                <View style={textinput.container}>
                                    <TextInput
                                        placeholder="Enter full name"
                                        placeholderTextColor='#565e56'
                                        value={fullName}
                                        onChangeText={text => {
                                            setFullName(text);
                                            updateSignupButtonStatus();
                                        }}
                                        style={textinput.text}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={textinput.label}>Email</Text>
                                <View style={textinput.container}>
                                    <TextInput
                                        placeholder="Enter your email address"
                                        placeholderTextColor='#565e56'
                                        value={email}
                                        onChangeText={text => {
                                            setEmail(text);
                                            updateSignupButtonStatus();
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
                                            updateSignupButtonStatus();
                                        }}
                                        secureTextEntry={!passwordVisible}
                                        style={[textinput.text, { flex: 1 }]}
                                    />
                                    <TouchableOpacity onPress={togglePasswordVisibility}>
                                        {passwordVisible ? (
                                            <EyeSlash
                                                variant="Linear"
                                                color='#565e56'
                                                size={20}
                                            />
                                        ) : (
                                            <Eye
                                                variant="Linear"
                                                color='#565e56'
                                                size={20}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text style={textinput.label}>Confirm Password</Text>
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
                                        placeholder="Re-type password"
                                        placeholderTextColor='#565e56'
                                        value={confirmPassword}
                                        onChangeText={text => {
                                            setConfirmPassword(text);
                                            updateSignupButtonStatus();
                                        }}
                                        secureTextEntry={!confirmPasswordVisible}
                                        style={[textinput.text, { flex: 1 }]}
                                    />
                                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                                        {confirmPasswordVisible ? (
                                            <EyeSlash
                                                variant="Linear"
                                                color='#565e56'
                                                size={20}
                                            />
                                        ) : (
                                            <Eye
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
                                    backgroundColor: isSignupDisabled
                                        ? '#565e56'
                                        : colors.sekunder,
                                },
                            ]}
                            underlayColor={colors.sekunder}
                            onPress={handleRegister}
                            disabled={isSignupDisabled}>
                            {loading ? (
                                <ActivityIndicator color={colors.lightMode.textColor} />
                            ) : (
                                <Text style={button.label}>SIGN UP</Text>
                            )}
                        </TouchableHighlight>
                        <View style={{ flexDirection: 'row', gap: 5, alignSelf: 'center' }}>
                            <Text style={[button.label, { color: colors.lightMode.textColor }]}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                                <Text style={[button.label, { color: '#0384fc' }]}>
                                    Log in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightMode.backgroundColor,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
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