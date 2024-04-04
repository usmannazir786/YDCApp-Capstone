import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';

function ChatList({ navigation }) {
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
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Chat', { name: item.firstname, uid: item.uid })}
                    style={styles.touchable}
                >
                    <View style={styles.card}>
                        <View style={styles.textArea}>
                            <Text style={styles.nameText}>{item.firstname}</Text>
                            <Text style={styles.msgContent}>{item.email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    touchable: {
        backgroundColor: '#f7f7f7', // Add a subtle background color
        borderRadius: 10, // Round corners for a modern look
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: '#000', // Add shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center', // Vertically center the content
        padding: 10,
    },
    textArea: {
        flex: 1, // Take up all available space
        justifyContent: 'center',
        marginLeft: 15,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // Darker font color for better readability
    },
    msgContent: {
        fontSize: 14,
        color: '#666', // Lighter font color for less important information
        marginTop: 2, // Add spacing between name and message
    },
});

export default ChatList;
