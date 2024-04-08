import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig'; 

function ChatList({navigation}) {
    const [users, setUsers] = useState([]);
    const [chattedUsers, setChattedUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');


     // fardin abdul plz contect below email
// usmanjoyia0304@gmail.com
// i want to help you
// react native developer

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = query(collection(db, 'users'), where('firstname', '==', search));
                const querySnapshot = await getDocs(q);
                const userList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(userList);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        };

        if (search !== '') {
            fetchUsers();
        }
    }, [search, navigation]);

    const handleSelect = (user) => {
        navigation.navigate('Chat', {name: user.firstname, uid: user.uid});
        setChattedUsers(prevUsers => [...prevUsers, user]);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Button mode="contained" style={{marginTop:50}} onPress={() => setModalVisible(true)}>
                Search Users
            </Button>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <Card style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Search for a user"
                        />
                        <FlatList
                            data={users}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => handleSelect(item)}>
                                    <Text>{item.firstname}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Button style={{marginTop:100}}onPress={() => setModalVisible(false)}>
                            Close
                        </Button>
                    </Card>
                </View>
            </Modal>
            <FlatList
                data={chattedUsers}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Chat', {name: item.firstname, uid: item.uid})}>
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
    Contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
  Container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    height: 'auto',
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }, 
  textArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    width: 300,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '900',
  },
  msgTime: {
    textAlign: 'right',
    fontSize: 11,
    marginTop: -20,
  },
  msgContent: {
    paddingTop: 5,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

})

export default ChatList;