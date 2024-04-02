import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Button, Modal, TextInput } from 'react-native';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig'; 

function ChatList({navigation}) {
    const [users, setUsers] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const userList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(userList);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        };

        fetchUsers();
    }, [navigation]);

    const handleNewChat = () => {
        setModalVisible(true);
    };

    const handleChatClick = (item) => {
        navigation.navigate('Chat', { name: item.firstname, uid: item.uid });
    };

    const handleSelect = async () => {
      try {
          // Search for the user in the 'users' collection where 'firstname' equals the search text
          const querySnapshot = await getDocs(query(collection(db, 'users'), where('firstname', '==', search)));
          const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
          if (users.length > 0) {
              // If a user was found, select the first one
              setSelectedChat(users[0]);
          } else {
              // If no user was found, show an error message
              alert('No user found with that name');
          }
      } catch (error) {
          console.error('Error searching for user:', error);
      }
  
      setModalVisible(false);
  };

    return (
        <View style={{ flex: 1 }}>
            <Button title="New Chat" onPress={handleNewChat} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Search for a user:</Text>
                        <TextInput
                            style={styles.input}
                            value={search}
                            onChangeText={setSearch}
                        />
                        <Button title="Select" onPress={handleSelect} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            <FlatList
                data={selectedChat ? [selectedChat, ...users] : users}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleChatClick(item)}>
                        <View style={styles.card}>
                            <View style={styles.textArea}>
                                <Text style={styles.nameText}>{item.firstname}</Text>
                                <Text style={styles.msgContent}>{item.email}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    // your existing styles...

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
    },
});

export default ChatList;