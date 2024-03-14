import React from 'react';
import {
    Stylesheet,
    Text,
    View
} from 'react-native';
import Schedule from './src/screens/Schedule';
import FoodInput from './src/screens/Food';
import HomePage from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const App = () => {


    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login Auth" component={Login}/>
            <Stack.Screen name="Signup Auth" component={Signup}/>
            <Stack.Screen name="Youth Drop-In Center" component={HomePage} />
            <Stack.Screen name="Schedule" component={Schedule} />
            <Stack.Screen name="Food" component={FoodInput} />

          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
};

export default App;