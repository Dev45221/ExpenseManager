import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { APPNAME, StorageKey } from '../constants/Constants';
import ExpenseItem from '../components/ExpenseItem';

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getExistingExp();
    }, [data]);

    const getExistingExp = async () => {
        try {
            const existingData = await AsyncStorage.getItem(StorageKey);
            // console.log(JSON.parse(existingData!));
            const res = JSON.parse(existingData!);
            setData(res);
            setShow(true);
        } catch (error) {
            console.error(error);
            Alert.alert(APPNAME, 'Something went wrong! ❌');
        }
    };

    return (
        <View style={Styling.container} >
            <Text style={Styling.abtTxt} >About</Text>
            <Text style={Styling.intro} >An Expense Manager tracks financial transactions, and helping monitor budgets. You can add expenses by just clicking below add button.</Text>
            <Text style={Styling.abtTxt} >Expenses</Text>
            <View style={Styling.container1} >
                {
                    !show ? <Text style={Styling.noExp} >Hurrey! No expenses yet.</Text>
                        : <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>
                                <View>
                                    {/* @ts-ignore */}
                                    <ExpenseItem index={index} item={item} amount={item.amount} category={item.category} date={item.date} note={item.note} />
                                </View>
                            }
                        />
                }
            </View>
        </View>
    );
};

const Styling = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5DC',
        padding: 10,
    },
    abtTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    intro: {
        fontSize: 16,
        color: 'black',
        opacity: 0.7,
        textAlign: 'justify',
        marginTop: 10,
        lineHeight: 27,
        marginVertical: 15,
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
    },
    noExp: {
        fontSize: 16,
        color: 'grey',
        textAlign: 'center',
    },
});

export default HomeScreen;
