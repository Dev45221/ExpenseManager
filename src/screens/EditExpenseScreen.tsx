import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ButtonCom } from '../components/ButtonCom';
import InputText from '../components/InputText';
import { APPNAME, StorageKey } from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//@ts-ignore
const EditExpenseScreen = ({ route, navigation }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(()=> {
        setAmount(route.params?.item.amount);
        setCategory(route.params?.item.category);
        setNote(route.params?.item.note);
        setIndex(route.params?.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const DeleteItem = async (ind: number) => {
        // console.log(index);
        // console.log(item);
        ind = index;
        try {
            const existingData = await AsyncStorage.getItem(StorageKey);
            // console.log(JSON.parse(existingData!));
            const res = JSON.parse(existingData!);
            /*const upRes =*/ res.splice(ind, 1);
            // console.log('*/*/*/*/*/*' + JSON.stringify(upRes));
            // console.log('*/*/*/*/*/*' + JSON.stringify(res));
            await AsyncStorage.setItem(StorageKey, JSON.stringify(res));
            // console.log('After deleted...', res);
            editExpense();
        } catch (error) {
            Alert.alert(APPNAME, 'Something went worng! ❌');
        }

    };

    const editExpense = async () => {
    //     console.log(item);
        if (!amount || !category) {
            Alert.alert(APPNAME, '*Please enter expense detail!');
        } else {
            // console.log('complete delete please check');
            // navigation.goBack();
            try {
                const date = new Date();
                let expData = {
                    amount: amount,
                    category: category,
                    note: note,
                    date: date.toLocaleString(),
                };
                const existingData = await AsyncStorage.getItem(StorageKey);
                // console.log('Before edit' + existingData);
                // console.log(typeof existingData);
                const jsonVal = JSON.parse(existingData!);

                let newExpArray = [ expData ];
                newExpArray.push(...jsonVal);
                // console.log(newExpArray);

                // let newExpArray = [...jsonVal];
                // // console.log(newExpArray);
                // newExpArray.unshift(expData);
                // console.log(newExpArray);
                // console.log(JSON.stringify(newExpArray));
                await AsyncStorage.setItem(StorageKey, JSON.stringify(newExpArray));
                Alert.alert(APPNAME, 'Expense edited');
                navigation.goBack();
                setAmount('');
                setCategory('');
                setNote('');
            } catch (error) {
                console.log(error);
                Alert.alert(APPNAME, 'Something went wrong! ❌');
            }
        }
    };

    return (
        <View style={Styling.container}>
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

            <ButtonCom title={'Edit Expense'} onClick={DeleteItem} />
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

export default EditExpenseScreen;
