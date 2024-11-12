import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ()=> {

    return(
        <View style={Styling.container} >
            <Text style={Styling.name} >Expense Manager</Text>
        </View>
    );
};

const Styling = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'beige',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 25,
        color: 'black',
    },
});

export default SplashScreen;
