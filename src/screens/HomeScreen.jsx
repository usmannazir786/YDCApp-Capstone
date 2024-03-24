import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';



function Home({ navigation, route }) {
  const {email} = route.params;
  const {userRole} = route.params;
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User: ', email, ' is logging out');
        navigation.dispatch(StackActions.pop(1))
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>

        <View style={styles.buttonBlock}>
          <TouchableOpacity style={styles.buttonBlock} onPress={() => navigation.navigate('Schedule')}>
            <Text style={styles.title}>Scheduler</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonBlock}>
          <TouchableOpacity style={styles.buttonBlock} onPress={() => navigation.navigate('Food')}>
            <Text style={styles.title}>Food Voting</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.buttonBlock}>
          <TouchableOpacity style={styles.buttonBlock} onPress={() => navigation.navigate('Chat', { chatId: '1111' })}>
            <Text style={styles.title}>Chat</Text>
          </TouchableOpacity>
        </View>

        <Button mode='outlined' onPress={handleLogout}>Logout</Button>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20, 
    alignSelf: 'center',
    padding: 20,
  },
  buttonBlock: {
    marginBottom: 40,
    marginTop: 40,
    width: 250,
    height: 100,
    borderRadius: 15,
    color: '#000000',
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
}});

export default Home;