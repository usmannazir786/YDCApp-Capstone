import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { db } from '../../Firebase/firebaseConfig'; 
import { collection, addDoc, getDocs } from 'firebase/firestore/lite';

const FoodInput = () => {
    
    const [food, setFood] = useState('');
    const [foodList, setFoodList] = useState([]);

    const handleAddFood = async () => {
        try {
            const itemsRef = collection(db, 'food');
            const docRef = await addDoc(itemsRef, { name: food });
            console.log(`Food added with ID: ${docRef.id}`);
            setFood('');
        } catch (e) {
            console.error("Error adding food: ", e);
        }
    };


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
        <View>
            <TextInput
                placeholder="Enter food"
                value={food}
                onChangeText={setFood}
            />
            <Button
                title="Add Food"
                onPress={handleAddFood}
            />
            <FlatList
        data={foodList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.food}</Text>}
      />
        </View>
    );
};

export default FoodInput;
