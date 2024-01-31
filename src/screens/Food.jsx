import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../../Firebase/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';

const FoodInput = () => {
    const [food, setFood] = useState('');

    const handleAddFood = async () => {
        try {
            const itemsRef = collection(db, 'food');
            const docRef = await addDoc(itemsRef, { name: food });
            console.log(`Food added with ID: ${docRef.id}`);
            setFood('');g
        } catch (e) {
            console.error("Error adding food: ", e);
        }
    };

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
        </View>
    );
};

export default FoodInput;
