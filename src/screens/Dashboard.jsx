import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

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

    // Function to handle the saving of user's new data
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
      <View>
        <TextInput
          value={userDetails.email}
          onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
          placeholder="Email"
          style={{marginTop:50}}
        />
        <TextInput
          value={userDetails.firstName}
          onChangeText={(text) => setUserDetails({ ...userDetails, firstName: text })}
          placeholder="First Name"
        />
        <TextInput
          value={userDetails.lastName}
          onChangeText={(text) => setUserDetails({ ...userDetails, lastName: text })}
          placeholder="Last Name"
        />
        <Button
          title="Save Changes"
          onPress={handleSaveChanges}
        />
      </View>
    );
};

export default Dashboard;
