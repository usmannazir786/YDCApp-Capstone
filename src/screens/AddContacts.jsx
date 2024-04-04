import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { db } from '../../Firebase/firebaseConfig';
import { ref, set } from 'firebase/database';
import { Button } from 'react-native-paper';

export default function AddContacts() {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const dataAddOn = () => {
        set(ref(db, 'users/' + name), {
            name: name,
            lastname: lastname,
            email: email
        });
        setName('');
        setLastName('');
        setEmail('');   
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Contacts</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
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
            <Button mode="contained" onPress={dataAddOn}>
                Add Contact
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        margin: 10,
        padding: 10,
        fontSize: 20
    }
});
