import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Placeholder data for contacts
const contactsData = [
  { id: '1', name: 'Steve', isUser: true },
  { id: '2', name: 'Timmy', isUser: false },
  { id: '3', name: 'Johnny', isUser: false },
  { id: '4', name: 'Steph', isUser: false },
  { id: '5', name: 'Greg', isUser: false },
  { id: '6', name: 'Tony', isUser: false },
  { id: '7', name: 'Brenda', isUser: false },
  { id: '8', name: 'Sofia', isUser: false },
];

const ContactItem = ({ name, isUser }) => (
  <View style={styles.contactItem}>
    <Image
      style={styles.icon}
      source={require('./path-to-your-icon.png')} // Replace with the path to your user icon
    />
    <Text style={styles.contactName}>{name}</Text>
    {isUser && <Text style={styles.youTag}>You</Text>}
    <TouchableOpacity onPress={() => { /* Handle message icon action */ }} style={styles.messageIcon}>
      <Image
        source={require('./path-to-your-message-icon.png')} // Replace with the path to your message icon
      />
    </TouchableOpacity>
  </View>
);

function Contacts() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { /* Implement back navigation */ }} style={styles.backButton}>
        <Text style={styles.backButtonText}>&#x3c;</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={contactsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactItem name={item.name} isUser={item.isUser} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginVertical: 10,
    marginLeft: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    // Add other styles for your icon as needed
  },
  contactName: {
    flex: 1,
    fontSize: 18,
  },
  youTag: {
    color: '#aaa',
    marginRight: 10,
  },
  messageIcon: {
    // Add styles for your message icon as needed
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#e0e0e0',
  },
});

export default Contacts;
