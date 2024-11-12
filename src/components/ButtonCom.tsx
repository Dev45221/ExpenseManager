import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { buttonColor, textFamily, winWid } from '../constants/Constants';

//@ts-ignore
export const ButtonCom = ({ title, onClick }) => (
    <TouchableOpacity
        activeOpacity={0.6}
        style={Styling.btnSty}
        onPress={onClick}
    >
        <Text style={Styling.btnTxt} >{title}</Text>
    </TouchableOpacity>
);

const Styling = StyleSheet.create({
    btnSty: {
        width: winWid / 2,
        height: 50,
        backgroundColor: buttonColor,
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btnTxt: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontFamily: textFamily,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});
