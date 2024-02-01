import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../../Firebase/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore/lite';

const FoodInput = () => {
    
    /*const [food, setFood] = useState('');

    const handleAddFood = async () => {
        try {
            const itemsRef = collection(db, 'food');
            const docRef = await addDoc(itemsRef, { name: food });
            console.log(`Food added with ID: ${docRef.id}`);
            setFood('');
        } catch (e) {
            console.error("Error adding food: ", e);
        }
    };*/

    const handleAddFood = async () => {
        const foodCol = collection(db, 'food');
        const foodSnapshot = await getDocs(foodCol);
        const foodList = foodSnapshot.docs.map(doc => doc.data());

        console.log(foodList);

    };
    return (
        <View>
            
            <Button
                title="Add Food"
                onPress={handleAddFood}
            />
        </View>
    );
};

export default FoodInput;
