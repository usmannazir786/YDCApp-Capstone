import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function ReportPage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Here you can handle the submission of the report
    console.log('Report submitted with the following details:');
    console.log('Name:', name);
    console.log('Date:', date);
    console.log('Description:', description);
    // You might want to send this data to a backend server or perform other actions
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { /* Implement back navigation */ }} style={styles.backButton}>
        <Text style={styles.backButtonText}>&#x3c;</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Report</Text>
      
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Date of report:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Date"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>What Happened?</Text>
      <TextInput
        style={[styles.input, styles.largeInput]}
        placeholder="Enter What Happened"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4} // You can adjust the number of lines as needed
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  largeInput: {
    height: 100, // Adjust the height as needed
    textAlignVertical: 'top', // Align text to the top on Android
  },
  submitButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default ReportPage;
