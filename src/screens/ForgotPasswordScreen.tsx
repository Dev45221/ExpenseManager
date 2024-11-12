import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ForgotPasswordScreen = () => {
    return (
        <View style={Styling.container} >
            <Text style={Styling.txt} >Forgot Password</Text>
        </View>
    );
};

const Styling = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: 25,
        textAlign: 'center',
    },
});

export default ForgotPasswordScreen;
