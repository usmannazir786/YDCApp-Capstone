import React from 'react';
import {
    Stylesheet,
    Text,
    View
} from 'react-native';
import Schedule from './src/screens/Schedule';
import FoodInput from './src/screens/Food';
import HomePage from './src/screens/HomeScreen';
import Chat from './src/screens/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import { PaperProvider } from 'react-native-paper';
import Polling from './src/screens/components/Polling';

const Stack = createNativeStackNavigator();

const App = () => {


    return (
          
        <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login Auth" component={Login}/>
            <Stack.Screen name="Signup Auth" component={Signup}/>
            <Stack.Screen name="Youth Drop-In Center" component={HomePage}/>
            <Stack.Screen name="Schedule" component={Schedule}/>
            <Stack.Screen name="Food" component={FoodInput}/>
            <Stack.Screen name="Chat" component={Chat}/>
            <Stack.Screen name="Polling" component={Polling}/>

          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
};

export default App;