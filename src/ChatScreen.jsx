import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

function ChatScreen() {
  const [message, setMessage] = useState('');

  // Placeholder for the list of messages which you can replace with actual data
  const messages = [];

  // Placeholder for sending a message
  const sendMessage = () => {
    console.log('Message to send:', message);
    // Add logic to send message
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>&#x3c;</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Drop-In Chat</Text>
        <TouchableOpacity>
          <Image
            style={styles.headerIcon}
            source={require('./path-to-settings-icon.png')} // Replace with your settings icon path
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          // Here you would render each message
        )}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type A Message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={styles.sendButton}>&rarr;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f5f5f5', // or any color you want for the header background
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcon: {
    width: 24,
    height: 24,
    // Add additional styles if needed
  },
  messagesList: {
    flex: 1,
    // Add additional styles if needed
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5', // or any color you want for the input background
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    alignSelf: 'center',
    fontSize: 24,
    color: '#000',
  },
});

export default ChatScreen;
