import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonBlock} onPress={() => navigation.navigate('Schedule')}>
          <Text style={styles.buttonText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBlock} onPress={() => navigation.navigate('Food')}>
          <Text style={styles.buttonText}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBlock} onPress={() => navigation.navigate('')}>
          <Text style={styles.buttonText}>Placeholder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

  const styles = StyleSheet.create({  //Taken from CPRG-303 final project
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily:'',
    },
    buttonContainer: {
      marginTop: 20, 
    },
    buttonBlock: {
      marginBottom: 90,
      width: 250,
      height: 100,
      borderRadius: 15,
      color: '#FFFFFF',
      backgroundColor: '#DFD1AD',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 40,
      fontFamily:'',
  }});

export default Home;
