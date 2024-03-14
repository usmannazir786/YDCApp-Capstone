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
import Contacts from './src/screens/Contacts';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login Auth" component={Login}/>
          <Stack.Screen name="Signup Auth" component={Signup}/>
          <Stack.Screen name="Youth Drop-In Center" component={HomePage} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="Food" component={FoodInput} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Contacts" component={Contacts} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;