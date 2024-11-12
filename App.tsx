import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigation from './src/navigation/AuthenticationNavigation';

const App = () => {
    return (
        <NavigationContainer>
            <AuthenticationNavigation />
        </NavigationContainer>

        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        //     <Text>Let's Start</Text>
        //     <TouchableOpacity
        //         activeOpacity={0.6}
        //         onPress={() => console.log('Clicked')}
        //     >
        //         <Text>Let's Start</Text>
        //     </TouchableOpacity>
        // </View>
    );
};

export default App;
