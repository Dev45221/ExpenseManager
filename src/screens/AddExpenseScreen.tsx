import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import InputText from '../components/InputText';
import { useState } from 'react';
import { ButtonCom } from '../components/ButtonCom';
import database from '@react-native-firebase/database';
import { APPNAME } from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//@ts-ignore
const AddExpenseScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [expName, setExpName] = useState('');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setAmount('');
            setExpName('');
            setCategory('');
            setNote('');
        });
        return unsubscribe;
    }, [navigation]);

    const AddExpense = async () => {

        if (!amount || !expName) {
            Alert.alert(APPNAME, '*Amount and Expense Name are required!');
        } else {
            try {
                const date = new Date();
                const day = date.getDate();
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const year = date.getFullYear();

                let hours = date.getHours();
                hours = hours % 12;
                hours = hours ? hours : 12;
                const minutes = date.getMinutes();
                const meridiem = hours > 12 ? 'AM' : 'PM';

                const finalDate = day + ' ' + months[date.getMonth()] + ', ' + year + '  ' + hours + ':' + minutes + ' ' + meridiem;

                let expData = {
                    amount: amount,
                    expenseName: expName,
                    category: category,
                    note: note,
                    // date: date.toLocaleString(),
                    date: finalDate,
                };
                const mobile = await AsyncStorage.getItem('Mobile');
                const existingData = await database().ref('/UserData/').once('value');
                // console.log(JSON.stringify(existingData) + 'sdfsf');
                if (existingData.hasChild(mobile!)) {
                    await database().ref('/UserData/' + mobile + '/ExpenseData/').push().set(expData);
                    setAmount('');
                    setExpName('');
                    setCategory('');
                    setNote('');
                    navigation.goBack();
                    Alert.alert(APPNAME, 'Expense added');
                } else {
                    console.log('Mobile not exist');
                    // await database().ref('/UserData/' + mobile + '/ExpenseData/').push().set(expData);
                    // setAmount('');
                    // setCategory('');
                    // setNote('');
                    // navigation.goBack();
                    // Alert.alert(APPNAME, 'Expense added');
                }
            } catch (error) {
                console.log(error);
                Alert.alert(APPNAME, 'Something went wrong! ❌');
            }
        }
    };

    return (
        <View style={Styling.container}>
            <InputText
                label={'Amount*'}
                value={amount}
                setValue={setAmount}
                keyboardType={'numeric'}
            />
            <InputText
                label={'Expense Name*'}
                value={expName}
                setValue={setExpName}
                keyboardType={'default'}
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
            {/* <ButtonCom title={'Add Expense Firebase'} onClick={addExp} /> */}
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
