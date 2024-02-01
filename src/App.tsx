import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/HomeScreen';
import FoodInput from './screens/Food';

const Stack = createNativeStackNavigator();

function App()  {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Food" component={FoodInput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;