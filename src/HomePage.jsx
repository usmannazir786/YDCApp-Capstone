import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function HomePage() {
  // Here you would implement navigation or other logic for when buttons are pressed
  const handlePress = (buttonName) => {
    console.log(buttonName + " pressed");
    // Implement navigation or other actions here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Youth Drop-In Centre Chats</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Chat')}
      >
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Vote')}
      >
        <Text style={styles.buttonText}>Vote</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Contacts')}
      >
        <Text style={styles.buttonText}>Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Report')}
      >
        <Text style={styles.buttonText}>Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Settings')}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Assuming a white background
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#e0e0e0', // A light gray background for the buttons
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%', // You might want to adjust this to get the desired button width
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // Black text for the buttons
    textAlign: 'center',
  },
});

export default HomePage;
