import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { db } from '../../Firebase/firebaseConfig'; 
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { StackActions } from '@react-navigation/native';

const FoodInput = ({ navigation }) => {
    const [food, setFood] = useState('');
    const [foodList, setFoodList] = useState([]);

    // Function to add food to the database
    const handleAddFood = async () => {
        try {
            const itemsRef = collection(db, 'food');
            const docRef = await addDoc(itemsRef, { name: food });
            console.log(`Food added with ID: ${docRef.id}`);
            const newFoodItem = { id: docRef.id, name: food };
            setFoodList(prevFoodList => [...prevFoodList, newFoodItem]);
            setFood('');
        } catch (e) {
            console.error("Error adding food: ", e);
        }
    };

    // Function to fetch food from the database
    useEffect(() => {
        const fetchFood = async () => {
            const foodCollection = collection(db, 'food');
            const foodSnapshot = await getDocs(foodCollection);
            const foodList = foodSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setFoodList(foodList);
        };

        fetchFood();
    }, []);

    // Function to clear the entered options
    const clearOptions = () => {
        setFoodList([]);
    };

    return (
        <View style={styles.container}>
            <TextInput   
                style={styles.input}
                placeholder="Enter food here"
                value={food}
                onChangeText={setFood}
                placeholderTextColor="#6B7280" 
            />
            <TouchableOpacity style={styles.button} onPress={handleAddFood}>
                <Text style={styles.buttonText}>Enter Your Suggestion!</Text>
            </TouchableOpacity>
            <FlatList
                data={foodList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listItemText}>{item.name}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.clearButton} onPress={clearOptions}>
                <Text style={styles.clearButtonText}>Clear Options</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.returnButton} onPress={() => navigation.dispatch(StackActions.pop(1))}>
                <Text style={styles.returnButtonText}>Return</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#F9FAFB', // Soft background color
        padding: 16,
    },
    input: {
        borderColor: '#D1D5DB', // Light grey border for input
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#FFFFFF', // White background for the input
        fontSize: 16,
    },
    button: {
        backgroundColor: '#10B981', // A fresh green color for the main action button
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    buttonText: {
        color: '#FFFFFF', // White text on the buttons for better contrast
        fontWeight: '600', // Semi-bold text
        fontSize: 16,
    },
    clearButton: {
        backgroundColor: '#EF4444', // Red color for clear and destructive actions
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    clearButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
    listItem: {
        backgroundColor: '#E5E7EB', // Light grey background for list items
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        flexDirection: 'row', // Arrange content in a row
        alignItems: 'center', // Vertically center align
        justifyContent: 'space-between', // Space out items in the list item
        marginHorizontal: 16,
    },
    listItemText: {
        color: '#111827', // Very dark grey (almost black) for text
        fontSize: 16,
    },
    returnButton: {
        backgroundColor: '#3B82F6', // Blue color for secondary actions
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    returnButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default FoodInput;