import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';

function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const userEmail = route.params?.userEmail;
  const userRole = route.params?.userRole;
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User is logging out');
        navigation.dispatch(StackActions.popToTop());
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Schedule', {userEmail, userRole})}>
          <Text style={styles.title}>Scheduler</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Food')}>
          <Text style={styles.title}>Food Voting</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatList')}>
          <Text style={styles.title}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddContacts')}>
          <Text style={styles.title}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contacts')}>
          <Text style={styles.title}>Contacts</Text>
        </TouchableOpacity>
        
        <Button style={styles.logoutButton} mode='outlined' onPress={handleLogout}>Logout</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20, // Reduced font size
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 20, // Reduced margin
    width: 250,
    height: 60, // Reduced height to fit all buttons
    borderRadius: 15,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 10, // Adjusted spacing for logout button
  }
});

export default Home;
