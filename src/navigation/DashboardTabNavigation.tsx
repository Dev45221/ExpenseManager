import React from 'react';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import SettingScreen from '../screens/SettingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { buttonColor, textColor, textFamily } from '../constants/Constants';
import HomeScreenNavigation from './HomeScreenNavigation';

const Tab = createBottomTabNavigator();

const DashboardTabNavigation = () => {

    return (
        <Tab.Navigator initialRouteName={'Home'} screenOptions={
            ({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconname = '';
                    if (route.name === 'Home') {
                        iconname = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Add Expenses') {
                        iconname = focused ? 'add-circle-sharp' : 'add-circle-outline';
                    } else if (route.name === 'Setting') {
                        iconname = focused ? 'settings' : 'settings-outline';
                    }
                    return <Ionicons name={iconname} color={buttonColor} size={30} />;
                },
                headerTitleStyle: {
                    fontSize: 25,
                    letterSpacing: 2,
                    fontFamily: textFamily,
                    color: textColor,
                },
                headerTitleAlign: 'center',
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 7,
                },
                tabBarLabelStyle: {
                    fontSize: 16,
                    color: textColor,
                    fontWeight: '700',
                },
            })
        } >
            <Tab.Screen name={'Home'} component={HomeScreenNavigation} options={{ headerShown: false }} />
            <Tab.Screen name={'Add Expenses'} component={AddExpenseScreen} options={{ headerShown: false }} />
            <Tab.Screen name={'Setting'} component={SettingScreen} />
        </Tab.Navigator>
    );
};

export default DashboardTabNavigation;
