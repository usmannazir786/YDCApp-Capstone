import React from 'react';
import { SafeAreaView, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';



function Home({ navigation }) {
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