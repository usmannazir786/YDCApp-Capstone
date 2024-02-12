import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/HomeScreen';
import Schedule from './src/screens/Schedule';
import FoodInput from './src/screens/Food';


const Stack = createNativeStackNavigator();

function App()  {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="YDC App" component={Home} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Food" component={FoodInput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;