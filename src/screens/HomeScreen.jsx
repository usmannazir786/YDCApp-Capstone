import React from 'react';
import { SafeAreaView, Button, StyleSheet, Text, View } from 'react-native';



function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBlock}>
          <Button title="PlaceHolder" onPress={() => navigation.navigate('')} color="DFD1AD" />
        </View>
        <View style={styles.buttonBlock}>
          <Button title="Placeholder" onPress={() => navigation.navigate('')} color="DFD1AD" />
        </View>
        <View style={styles.buttonBlock}>
          <Button title="Placeholder" onPress={() => navigation.navigate('')} color="DFD1AD" />
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
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20, 
  },
  buttonBlock: {
    marginBottom: 90,
    width: 250,
    height: 100,
    borderRadius: 15,
    color: '#000000',
    backgroundColor: '#DFD1AD',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
}});

export default Home;