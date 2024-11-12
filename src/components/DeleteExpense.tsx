import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { APPNAME, StorageKey } from '../constants/Constants';
import { Alert, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//@ts-ignore
export default DeleteExpense = ({ index }) => {

    const deleteItem = async () => {
        // console.log(index);
        // console.log(item);

        try {
            const existingData = await AsyncStorage.getItem(StorageKey);
            // console.log(JSON.parse(existingData!));
            const res = JSON.parse(existingData!);
            /*const upRes =*/ res.splice(index, 1);
            // console.log('*/*/*/*/*/*' + JSON.stringify(upRes));
            // console.log('*/*/*/*/*/*' + JSON.stringify(res));
            await AsyncStorage.setItem(StorageKey, JSON.stringify(res));
        } catch (error) {
            Alert.alert(APPNAME, 'Something went worng! ❌');
        }

    };

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={deleteItem}
        >
            <MaterialIcons name={'delete-forever'} color={'red'} size={35} />
        </TouchableOpacity>
    );
};
