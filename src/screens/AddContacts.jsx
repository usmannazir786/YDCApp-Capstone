import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { db } from '../../Firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore'; 
import { Button } from 'react-native-paper';

export default function AddContacts() {
    const [firstname, setfirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumbers, setPhoneNumbers] = useState('');

    const dataAddOn = async () => {
        try {
            await addDoc(collection(db, 'users'), { // Add a new document with a generated id.  The collection is 'users'   
                firstnamename: firstname,
                lastname: lastname,
                email: email,
                PhoneNumbers: phoneNumbers,
            });
            console.log("Document added with name: ", firstname);
            
            setfirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumbers('');    
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Contacts</Text>
            <TextInput
                placeholder="First Name"
                value={firstname}
                onChangeText={text => setfirstName(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Last Name"
                value={lastname}
                onChangeText={text => setLastName(text)}
                style={styles.input}
            />
            <TextInput 
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Phone Number"
                value={phoneNumbers}
                onChangeText={text => setPhoneNumbers(text)}
                style={styles.input}
            />
            <Button mode="contained" onPress={dataAddOn}>
                Add Contact
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
});

// The code snippet above is from the src/screens/AddContacts.jsx file.