import React from 'react';
import { StyleSheet, Alert, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { APPNAME, textColor, textFamily, winWid } from '../constants/Constants';
import { useState, useEffect } from 'react';
import InputText from '../components/InputText';
import { ButtonCom } from '../components/ButtonCom';
import database from '@react-native-firebase/database';

//@ts-ignore
const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [error, setError] = useState('*All fields are required!');

    useEffect(() => {
        checkValidation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, mobile, email, conPassword]);

    const checkValidation = () => {
        if (!name) {
            setError('*Name is required');
        } else if (!/^[a-zA-Z]+.[a-zA-Z]+$/.test(name)) {
            setError('*Name is invalid');
        } else if (!mobile) {
            setError('*Mobile is required');
        } else if (!/^[6-9]{1}[0-9]{9}$/.test(mobile)) {
            setError('*Mobile number is invalid. (Ex- xxxxxxxxxx)');
        } else if (!email) {
            setError('*Email is required');
        } else if (!/^[a-z]+@[a-z]+.[a-z]{3}$/.test(email)) {
            setError('*Email is invalid');
        } else if (!password) {
            setError('*Password is required');
        } else if (password.length < 6) {
            setError('*Password length must be at least 6 characters');
        } else {
            setError('');
        }

    };

    const RegisterUser = async () => {
        checkValidation();
        try {
            if (error === '') {
                const userData = {
                    name: name,
                    mobile: mobile,
                    email: email,
                    conPassword: conPassword,
                };
                await database().ref('/UserData/' + mobile).set(userData);
                navigation.goBack();
                Alert.alert(APPNAME, 'Registration Successfull. ✅');
            } else {
                Alert.alert(APPNAME, 'Some fields are incorrect or empty ❌');
            }
        } catch (err) {
            console.log(`Something went wrong ${err}`);
            Alert.alert(APPNAME, 'Something went wrong ${err}');
        }
    };

    return (
        <ScrollView>
            <View style={Styling.container} >
                <Text style={Styling.headTxt} >Register</Text>
                <View style={Styling.container1} >

                    <View style={Styling.container4} >
                        <InputText
                            value={name}
                            label={'Name'}
                            keyboardType={'default'}
                            setValue={setName}
                        />
                        {
                            !name || !/^[a-zA-Z]+.[a-zA-Z]+$/.test(name) ? <Text style={Styling.validStyle} >*Invalid Name</Text> : null
                        }

                        <InputText
                            value={mobile}
                            label={'Contact Number'}
                            keyboardType={'default'}
                            setValue={setMobile}
                        />
                        {
                            !mobile || !/^[6-9]{1}[0-9]{9}$/.test(mobile) ? <Text style={Styling.validStyle} >*Invalid Contact Number</Text> : null
                        }

                        <InputText
                            value={email}
                            label={'Email'}
                            keyboardType={'email-address'}
                            setValue={setEmail}
                        />
                        {
                            !email || !/^[a-z]+@[a-z]+.[a-z]{3}$/.test(email) ? <Text style={Styling.validStyle} >*Invalid Email (must not contain uppercases.)</Text> : null
                        }

                        <InputText
                            value={password}
                            label={'Set Password'}
                            keyboardType={'password'}
                            setValue={setPassword}
                        />
                        {
                            !password || password.length < 6 ? <Text style={Styling.validStyle} >*Invalid Password (atleast 6 character long)</Text> : null
                        }

                        <InputText
                            value={conPassword}
                            label={'Confirm Password'}
                            keyboardType={'password'}
                            setValue={setConPassword}
                        />
                        {
                            (!conPassword) || (password !== conPassword) ? <Text style={Styling.validStyle} >*Password doesn't match</Text> : <Text />
                        }
                    </View>

                    <View style={Styling.container2} >
                        <View style={Styling.container3} >

                            <ButtonCom title={'Register'} onClick={RegisterUser} />

                            <Text style={Styling.already} >Already have an account?</Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={Styling.log} >Let's Login</Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={require('../images/img2.png')}
                            style={Styling.img}
                        />
                    </View>

                </View>
            </View>
        </ScrollView>
    );
};

const Styling = StyleSheet.create({
    container: {
        // width: winWid,
        height: 800,
        backgroundColor: 'beige',
    },
    headTxt: {
        fontSize: 42,
        color: textColor,
        fontFamily: textFamily,
        letterSpacing: 2,
        margin: 20,
    },
    container1: {
        width: winWid,
        height: 800,
        backgroundColor: 'white',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderColor: '#C9C5B1',
        elevation: 30,
        paddingBottom: 20,
        // overflow: 'scroll'
    },
    container4: {
        paddingLeft: 30,
    },
    container2: {
        width: winWid,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    container3: {
        marginVertical: 25,
        marginRight: -60,
    },
    already: {
        fontSize: 14,
        color: '#49454f',
        marginTop: 15,
        textAlign: 'center',
    },
    log: {
        fontSize: 16,
        color: textColor,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    img: {
        width: 200,
        height: 200,
        marginRight: -20,
        marginTop: -20,
        // backgroundColor: 'red'
        // paddingBottom: 20
    },
    validStyle: {
        color: 'red',
        marginLeft: 25,
    },
});

export default RegisterScreen;
