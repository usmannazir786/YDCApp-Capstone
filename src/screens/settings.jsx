import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

// Import the necessary functions from firebase/firestore
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/firebaseConfig'; 

const Dashboard = () => {
    // State for user fields
    const [userDetails, setUserDetails] = useState({
      email: '',
      firstName: '',
      lastName: ''
    });
  
    const [docId, setDocId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userUID = auth.currentUser?.uid; 
            if (userUID) {
                const userRef = collection(db, 'users');
                const q1 = query(userRef, where("uid", "==", userUID));
        
                getDocs(q1)
                    .then((snap) => {
                        if (!snap.empty) {
                            const docData = snap.docs[0].data();
                            const docId = snap.docs[0].id; 
                            setUserDetails({
                                email: docData.email,
                                firstName: docData.firstname,
                                lastName: docData.lastname
                            });
                            setDocId(docId); 
                        } else {
                            console.log('No matching documents.');
                        }
                    })
                    .catch(err => {
                        console.error('Error: ', err);
                    });
            } else {
                console.log('No user is logged in.');
            }
        };

        fetchUserData();
    }, []); 

    const handleSaveChanges = async () => {
        if (docId) {
            const userRef = doc(db, 'users', docId);
            updateDoc(userRef, {
                email: userDetails.email,
                firstname: userDetails.firstName,
                lastname: userDetails.lastName
            })
            .then(() => {
                Alert.alert('Success', 'Your profile has been updated.');
            })
            .catch((error) => {
                Alert.alert('Error', 'There was a problem updating your profile.');
                console.error("Error updating document: ", error);
            });
        }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>
        <TextInput
          value={userDetails.email}
          onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          value={userDetails.firstName}
          onChangeText={(text) => setUserDetails({ ...userDetails, firstName: text })}
          placeholder="First Name"
          style={styles.input}
        />
        <TextInput
          value={userDetails.lastName}
          onChangeText={(text) => setUserDetails({ ...userDetails, lastName: text })}
          placeholder="Last Name"
          style={styles.input}
        />
        <Button
          title="Save Changes"
          onPress={handleSaveChanges}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 6,
  },
});

export default Dashboard;
