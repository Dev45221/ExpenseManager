import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { APPNAME } from '../constants/Constants';
import ExpenseItem from '../components/ExpenseItem';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

//@ts-ignore
const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getExistingExp();
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getExistingExp();
        });
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]);

    const getExistingExp = async () => {
        try {
            const mobile = await AsyncStorage.getItem('Mobile');
            await database().ref('/UserData/').once('value')
                .then(snapshot => {
                    if (snapshot.hasChild(mobile!)) {
                        database().ref('/UserData/' + mobile + '/ExpenseData/').on('value', snap => {
                            //@ts-ignore
                            const fetchData = [];
                            //@ts-ignore
                            snap.forEach(child => {
                                fetchData.push({
                                    id: child.key,
                                    ...child.val(),
                                });
                            });
                            //@ts-ignore
                            setData(fetchData);
                            if (data.length === 0) {
                                setShow(false);
                            } else {
                                setShow(true);
                            }
                            // console.log(JSON.stringify(data));
                        });
                    } else {
                        console.log('No');
                    }
                });
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
                    show ?
                        <FlatList
                            data={data}
                            // @ts-ignore
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) =>
                                <View>
                                    {/* @ts-ignore */}
                                    <ExpenseItem id={item.id} item={item} amount={item.amount} category={item.category} date={item.date} note={item.note} />
                                </View>
                            }
                        />
                        :
                        <Text style={Styling.noExp} >Hurrey! No expenses yet.</Text>
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
