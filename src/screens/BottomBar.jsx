import React, { useCallback, useState, useLayoutEffect ,useEffect} from 'react';
import { Text, View ,TouchableOpacity,Avatar,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';
//import Schedule from 'Schedule';
import FoodInput from './Food';
import HomePage from './HomeScreen';
import Chat from './Chat';

const Tab = createBottomTabNavigator();

export default  function TabBottom({route, navigation}) {
    const user = route.params.user_id;
    const signOutNow = () => {
        signOut(auth).then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }).catch((error) => {});
    }

    useLayoutEffect(() => {
    navigation.setOptions({
        
        headerRight: () => (
            <TouchableOpacity style={{
                marginRight: 10
            }}
            onPress={signOutNow}
            >
                <Text>logout</Text>
            </TouchableOpacity>
        )
    })
    
}, [navigation]);
  return (
    <Tab.Navigator initialRouteName='HomePage'
    screenOptions={{
      tabBarActiveTintColor: '#FF6B76',
      tabBarStyle:{
        backgroundColor:'#373838',
        padding: 10
      },
      
    }}

    >
      <Tab.Screen name="Homepage" component={HomePage}
      options={() => ({
        headerBackVisible: false,
        headerShown: false,
        tabBarLabel: 'Home',
        
      })}/>
      <Tab.Screen name="Chat" component={Chat}
      options={() => ({
        headerBackVisible: false,
        headerShown: false,
        tabBarLabel: 'Chat',
            
      })}/>
      <Tab.Screen name="FoodInput" component={FoodInput}
      options={() => ({
        headerBackVisible: false,
        headerShown: false,
        tabBarLabel: 'Food',
      })}/>
      
    </Tab.Navigator>
  );
}