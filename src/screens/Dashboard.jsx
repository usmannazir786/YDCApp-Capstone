import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// Make sure you are using the modular imports for Firestore
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/firebaseConfig'; 

const Dashboard = () => {
    // State for user fields
    const [userDetails, setUserDetails] = useState({
      email: '',
      firstName: '',
      lastName: ''
    });

    useEffect(() => {
      const fetchUserData = async () => {
        const currentUser = auth.currentUser; // Make sure to get the current user from auth
        if (currentUser) {
          const userRef = doc(db, 'users', currentUser.uid); // Correctly get the document reference
          const docSnap = await getDoc(userRef); // Get the document snapshot
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserDetails({
              email: userData.email,
              firstName: userData.firstname, // Make sure these field names match your Firestore document
              lastName: userData.lastname
            });
          } else {
            console.log('No user data found for this user.');
          }
        } else {
          console.log('No user is logged in.');
        }
      };

      fetchUserData();
    }, []); // Add an empty dependency array so it only runs once on component mount

    return (
      <View>
        <Text>Email: {userDetails.email}</Text>
        <Text>First Name: {userDetails.firstName}</Text>
        <Text>Last Name: {userDetails.lastName}</Text>
      </View>
    );
};

export default Dashboard;
