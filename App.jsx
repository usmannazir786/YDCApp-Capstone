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

const Stack = createNativeStackNavigator();

const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Youth Drop-In Center" component={HomePage} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="Food" component={FoodInput} />

        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;