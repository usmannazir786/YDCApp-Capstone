import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig'; 

function ChatList({navigation}) {
    const [users, setUsers] = useState([]);

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

   

    return (
        <FlatList
        data={users}
        renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', {name: item.name, uid: item.uid})} >
            <View style={styles.card} >
              <View style={styles.textArea}>
            <Text style={styles.nameText} >{item.name}</Text>
            </View>
            </View>
            </TouchableOpacity>
        )}
        />
    )
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