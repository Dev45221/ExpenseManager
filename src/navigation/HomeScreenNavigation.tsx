import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import EditExpenseScreen from '../screens/EditExpenseScreen';
import { textColor, textFamily } from '../constants/Constants';

const Stack = createNativeStackNavigator();

const HomeScreenNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Home1'} >
            <Stack.Screen name={'Home1'} component={HomeScreen} options={{
                headerTitle: 'Expense Manager',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 25,
                    fontFamily: textFamily,
                    color: textColor,
                },
            }} />
            <Stack.Screen name={'Edit Expense'} component={EditExpenseScreen} />
        </Stack.Navigator>
    );
};

export default HomeScreenNavigation;
