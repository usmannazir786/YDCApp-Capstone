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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import { PaperProvider } from 'react-native-paper';
import Polling from './src/screens/components/Polling';
import ChatList from './src/screens/ChatList';

const Tab = createBottomTabNavigator();

const App = () => {


    return (
          
        <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen name="Login Auth" component={Login}/>
            <Tab.Screen name="Signup Auth" component={Signup}/>
            <Tab.Screen name="Youth Drop-In Center" component={HomePage}/>
            <Tab.Screen name="Schedule" component={Schedule}/>
            <Tab.Screen name="Food" component={FoodInput}/>
            <Tab.Screen name="Chat" component={Chat}/>
            <Tab.Screen name="Polling" component={Polling}/>
            <Tab.Screen name="ChatList" component={ChatList}/>

          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
};

export default App;