import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SplashScreen from '../screens/SplashScreen';
import DashboardTabNavigation from './DashboardTabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AuthenticationNavigation = () => {
    const [show, setShow] = useState(true);
    const [auth, setAuth] = useState(false);

    useEffect(()=> {
        checkUser();
        setTimeout(() => {
            setShow(false);
        }, 3000);
    });

    const checkUser = async ()=> {
        try {
            const jsonVal = await AsyncStorage.getItem('UserData');
            const obj = JSON.parse(jsonVal!);
            const { email } = obj;

            if (email === null) {
                console.log('New');
            } else if (email != null || email !== undefined) {
                setAuth(true);
            }

        } catch (error) {
            // console.log(error);
            // Alert.alert(APPNAME, 'Something went wrong. ❌');
        }
    };

    if (show) {
        return(
            <Stack.Navigator>
                <Stack.Screen name={'Splash'} component={SplashScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }

    if (auth) {
        return (
            <Stack.Navigator>
                <Stack.Screen name={'Dashboard'} component={DashboardTabNavigation} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }

    return (
        <Stack.Navigator initialRouteName={'Login'} >
            <Stack.Screen name={'Login' }component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name={'Register'} component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name={'Dashboard'} component={DashboardTabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name={'Forgot Password'} component={ForgotPasswordScreen} />
        </Stack.Navigator>
    );
};

export default AuthenticationNavigation;
