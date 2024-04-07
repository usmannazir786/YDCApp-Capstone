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
                placeholder="Enter food here"
                value={food}
                onChangeText={setFood}
            />
            <View style={styles.buttonBlock}>
                <TouchableOpacity style={styles.button} onPress={handleAddFood}>
                    <Text>Enter Your Suggestion!</Text>
                </TouchableOpacity>
            </View> 
            <FlatList
                data={foodList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )}
            />
            
            <TouchableOpacity style={styles.clearButton} onPress={clearOptions}>
                <Text style={styles.clearButtonText}>Clear Options</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBlockTwo} onPress={() => {
                const recentOptions = foodList.slice(0, 3);
                navigation.navigate('Polling', { recentOptions: recentOptions });
            }}>
                <Text style={styles.buttonText}>Polling</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    buttonBlock: {
        marginBottom: 20,
        width: 200,
        height: 50,
        borderRadius: 15,
        color: '#000000',
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
    },
    buttonBlockTwo: {
        marginBottom: 20,
        marginTop: 20,
        width: 250,
        height: 50,
        borderRadius: 15,
        color: '#000000',
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    clearButton: {
        marginBottom: 10,
        marginTop: 10,
        width: 150,
        height: 40,
        borderRadius: 15,
        color: '#FFFFFF',
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    clearButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    returnButton: {
        marginBottom: 20,
        width: 150,
        height: 40,
        borderRadius: 15,
        color: '#FFFFFF',
        backgroundColor: '#0000FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    returnButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default FoodInput;
