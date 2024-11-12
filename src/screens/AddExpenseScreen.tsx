import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputText from '../components/InputText';
import { useState } from 'react';
import { ButtonCom } from '../components/ButtonCom';
import { APPNAME, StorageKey } from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//@ts-ignore
const AddExpenseScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');
    let expArray = [];

    // const getExistingExp = async () => {
    //     try {
    //         const existingData = await AsyncStorage.getItem(StorageKey);
    //         if (existingData) {
    //             // console.log(existingData);
    //             // console.log(typeof existingData);
    //             const jsonVal = JSON.parse(existingData);
    //             console.log(jsonVal);
    //             // console.log(typeof jsonVal);
    //             // return jsonVal;
    //         } else {
    //             console.log('Nhi hai kuch', existingData);
    //         }

    //         // return existingData ? JSON.parse(existingData) : {};
    //     } catch (error) {
    //         Alert.alert(APPNAME, 'Something went wrong! ❌');
    //         return {};
    //     }
    // };

    const AddExpense = async () => {

        if (!amount || !category) {
            Alert.alert(APPNAME, '*Please enter expense detail!');
        } else {
            try {
                const date = new Date();
                let expData = {
                    amount: amount,
                    category: category,
                    note: note,
                    date: date.toLocaleString(),
                };
                const existingData = await AsyncStorage.getItem(StorageKey);
                if (existingData) {
                    // console.log(existingData);
                    // console.log(typeof existingData);
                    const jsonVal = JSON.parse(existingData);
                    // console.log(jsonVal);

                    expData = {
                        amount: amount,
                        category: category,
                        note: note,
                        date: date.toLocaleString(),
                    };
                    // console.log(expData);

                    let newExpArray = [expData];
                    newExpArray.push(...jsonVal);
                    // console.log(newExpArray);
                    // console.log(newExpArray);
                    // console.log(JSON.stringify(newExpArray));
                    await AsyncStorage.setItem(StorageKey, JSON.stringify(newExpArray));
                    Alert.alert(APPNAME, 'Expense added');
                    navigation.goBack();
                    setAmount('');
                    setCategory('');
                    setNote('');
                } else {
                    expArray.push(expData);
                    // console.log(expArray);
                    await AsyncStorage.setItem(StorageKey, JSON.stringify(expArray));
                    Alert.alert(APPNAME, 'Expense added');
                }

                // const jsonVal = JSON.parse(existingData!);

                // const newExpData = [ ...jsonVal, {...expData} ];
                // console.log(JSON.stringify(newExpData) + ' sfsfsdf');

                // await AsyncStorage.setItem(StorageKey, JSON.stringify(newExpData));
                // Alert.alert(APPNAME, 'Expense added');
            } catch (error) {
                console.log(error);
                Alert.alert(APPNAME, 'Something went wrong! ❌');
            }
        }
    };

    return (
        <View style={Styling.container}>
            <Text style={Styling.headTxt} >Add Expense</Text>
            <InputText
                label={'Amount'}
                value={amount}
                setValue={setAmount}
                keyboardType={'numeric'}
            />
            <InputText
                label={'Category'}
                value={category}
                setValue={setCategory}
                keyboardType={'default'}
            />
            <InputText
                label={'Note'}
                value={note}
                setValue={setNote}
                keyboardType={'default'}
            />

            <ButtonCom title={'Add Expense'} onClick={AddExpense} />
            {/* <ButtonCom title={'Route Data'} onClick={getRouteData} /> */}
            {/* <ButtonCom title={'Get Expense'} onClick={getExistingExp} />
            <ButtonCom title={'Remove Expense'} onClick={async () => {
                await AsyncStorage.removeItem(StorageKey, () => console.log('removed'));
            }} /> */}
        </View>
    );
};

const Styling = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'beige',
    },
    bgImg: {
        // flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
        // opacity: 0.5
    },
    headTxt: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green',
        letterSpacing: 3,
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        color: 'black',
    },
});

export default AddExpenseScreen;
