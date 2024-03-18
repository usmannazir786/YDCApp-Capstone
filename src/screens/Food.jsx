import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../Firebase/firebaseConfig'; 
import { collection, addDoc, getDocs, doc } from 'firebase/firestore/lite';
import { Button } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';

const FoodInput = ({ navigation }) => {
    
    const [food, setFood] = useState('');
    const [foodList, setFoodList] = useState([]);

    //Function to add food to the database
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

    //Function to fetch food from the database
    //Adapted from CPRG 306 Week 10 lab
    
    useEffect(() => {
        const fetchFood = async () => {
          const foodCollection = collection(db, 'food');
          const foodSnapshot = await getDocs(foodCollection);
          const foodList = foodSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
          setFoodList(foodList);
        };
    
        fetchFood();
      }, []);
    
    
    return (
        <View  style={styles.container}>
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
            <Button mode='text' onPress={() => navigation.dispatch(StackActions.pop(1))}>Return</Button>
            <FlatList
                data={foodList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )}
            />
            
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    buttonContainer: {
        marginTop: 20, 
        alignSelf: 'center',
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
      }
});

export default FoodInput;
