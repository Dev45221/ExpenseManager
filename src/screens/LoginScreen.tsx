import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { APPNAME, textColor, textFamily, winHei, winWid } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import InputText from '../components/InputText';
import { ButtonCom } from '../components/ButtonCom';
import AsyncStorage from '@react-native-async-storage/async-storage';

//@ts-ignore
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [storedEmail, setStoredEmail] = useState('');
    const [storedPassword, setStoredPassword] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const jsonVal = await AsyncStorage.getItem('UserData');
            const jsObj = JSON.parse(jsonVal!);
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { email, conPassword } = jsObj;
            if (email === null) {
                console.log('New user');
                Alert.alert(APPNAME, 'Welcome!');
            } else if (email != null) {
                setStoredEmail(email.toString());
                setStoredPassword(conPassword.toString());
            }
        } catch (error) {
            console.log(`Something went wrong ${error}`);
            // Alert.alert(APPNAME, 'Something went wrong.');
        }
    };

    const login = () => {
        if (!email || !password) {
            Alert.alert(APPNAME, 'All fields are required! ❌');
        }

        if (email == storedEmail && password == storedPassword) {
            Alert.alert(APPNAME, 'Successfully logged in ✅');
            navigation.navigate('Dashboard');
        } else {
            Alert.alert(APPNAME, 'Email or Password is incorrect! ❌');
        }
    };

    return (
        <ScrollView>
            <SafeAreaView>
                <View style={Styling.container} >
                    <View style={Styling.container1} >
                        <Text style={Styling.headTxt} >Login</Text>
                        <Image
                            source={require('../images/img1.png')}
                            style={Styling.img}
                        />
                    </View>
                    <View style={Styling.container2} >
                        <InputText
                            value={email}
                            label={'Email'}
                            keyboardType={'email-address'}
                            setValue={setEmail}
                        />

                        <InputText
                            value={password}
                            label={'Password'}
                            keyboardType={'password'}
                            setValue={setPassword}
                        />

                        <Text style={Styling.fogPass} >Forgot Password?</Text>

                        <ButtonCom title={'Login'} onClick={login} />

                        <Text style={Styling.dont} >Don't have an account?</Text>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => navigation.push('Register')}
                        >
                            <Text style={Styling.reg} >Let's Register</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const Styling = StyleSheet.create({
    container: {
        width: winWid,
        height: winHei,
        backgroundColor: 'beige',
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: '-22%',
    },
    container2: {
        width: winWid,
        height: winHei,
        backgroundColor: 'white',
        borderTopRightRadius: 500,
        elevation: 30,
        borderColor: '#c9c5b1',
        borderWidth: 1,
        paddingTop: 110,
    },
    headTxt: {
        fontSize: 42,
        color: textColor,
        fontFamily: textFamily,
        letterSpacing: 2,
        marginLeft: 15,
    },
    img: {
        width: 275,
        height: 275,
    },
    fogPass: {
        fontSize: 16,
        color: '#49454f',
        textAlign: 'center',
        marginVertical: 20,
    },
    dont: {
        fontSize: 14,
        color: '#49454f',
        marginTop: 20,
        textAlign: 'center',
    },
    reg: {
        fontSize: 16,
        color: textColor,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LoginScreen;
