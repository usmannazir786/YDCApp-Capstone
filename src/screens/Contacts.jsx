import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput, Pressable} from 'react-native';
import { requestContactsPermission,makeCall, filterContacts} from './ContactsFunctions';





const ContactsScreen = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
 
    useEffect(() => {
        requestContactsPermission(setContacts, setFilteredContacts);
    }, []);
 
    const handleSearch = () => {
        filterContacts(contacts, searchQuery, setFilteredContacts);
    };
 
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => makeCall(item)}
            style={{ borderBottomWidth: 1, borderColor: '#000000' }}
        >
            <View
                style={{
                    padding: 20,
                    backgroundColor: 'white',
                }}
            >
                <Text style=
                    {
                        { color: '#000000' }}>
                    {item.name}: {item.phoneNumbers
                        && item.phoneNumbers.length > 0 &&
                        item.phoneNumbers[0].number}
                </Text>
            </View>
        </TouchableOpacity>
    );
 
    return (
        <View>
            <View style=
                {
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin: 10
                    }
                }>
                <TextInput
                    style=
                    {
                        {
                            flex: 1, height: 40,
                            borderColor: '#000000',
                            borderWidth: 1, marginRight: 10,
                            paddingLeft: 10, color: '##000000'
                        }
                    }
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={
                        (text) =>
                            setSearchQuery(text)
                    }
                />
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#1e8449' : '#2ecc71',
                            padding: 10,
                            borderRadius: 5,
                        },
                    ]}
                    onPress={handleSearch}
                >
                    <Text style=
                        {
                            {
                                color: 'white'
                            }
                        }>
                        Search
                    </Text>
                </Pressable>
            </View>
            <FlatList
                data={filteredContacts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};
 
export default ContactsScreen;