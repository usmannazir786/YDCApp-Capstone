import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Modal,
} from 'react-native';
/*
    Using a library that created agendas already from: https://github.com/wix/react-native-calendars
    https://www.youtube.com/watch?v=RdaQIkE47Og&t=803s&ab_channel=JonasGr%C3%B8ndahl -- Agenda guide
*/
import { Agenda } from 'react-native-calendars';
/*
    Using a library that has components ready to be used in production: https://callstack.github.io/react-native-paper/
*/
import { Card } from 'react-native-paper';
/*
    Using moment to format dates
*/
import moment from 'moment';
/*
    Imports for the database end
*/
import { db } from '../../Firebase/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore/lite';
/* 
    Imports for a library that handles checking for outside clicking: https://github.com/jakex7/react-native-click-outside --SO NAYCE--
*/
import { ClickOutsideProvider, useClickOutside } from 'react-native-click-outside';
//Video reference for button smooth: https://www.youtube.com/watch?v=HfZ7pdhS43s&ab_channel=TK

const Schedule = () => {
    const [items, setItems] = useState([]);
    const [currDate, setCurrDate] = useState(new Date());
    //States for schedule button
    const [registerModalStatus, setRegisterModalStatus] = useState(false);

    const screenRef = useClickOutside<SafeAreaView>(() => {

    });

//Creating a new function that keeps checking for the current date
    useEffect(() => {
        //Calculates time until midnight
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const timeUntilMidnight = midnight.getTime() - now.getTime();

        //Update the current date at midnight
        const timeoutId = setTimeout(() => {
            setCurrDate(new Date());
            //Updating the date again at next midnight
            const nextMidnight = new Date(midnight.getTime + 24 * 60 * 60 * 1000);
            const timeUntilNextMidnight = nextMidnight.getTime() - now.getTime();
            setTimeout(() => {
                setCurrDate(new Date());
            }, timeUntilNextMidnight);
        }, timeUntilMidnight);

        return () => clearTimeout(timeoutId);
    }, []);

//Format the current date to the proper format to be intaked by Agenda
const formatDate = moment(currDate).format('YYYY-MM-DD');
    
//Creates the days and renders them into an array to be used by Agenda
    const loadItems = (day) => {
        const items = items || {};
        
        //Creates random items from 15 before and 85 days after the selected date
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            
            //If it doesn't exist already, initialize strTime property to an array
            if (!items[strTime]) {
              items[strTime] = [];
              
              // Fills the contents of the array with random variables
              const numItems = Math.floor(Math.random() * 3 + 1);
              for (let j = 0; j < numItems; j++) {
                items[strTime].push({
                  name: 'Item for ' + strTime + ' #' + j,
                  height: Math.max(50, Math.floor(Math.random() * 150)),
                  day: strTime
                });
              }
            }
          }
          
          //Iterates over the item array and replaces any new items placed in and updates the array
          const newItems = {};
          Object.keys(items).forEach(key => {
            newItems[key] = items[key];
          });
          setItems(newItems);
        }, 1000);
      };

//Tester function to check if it sends into the database will use this for when the user actually registers themselves in
      const test = async () => {
        const itemsRef = collection(db, 'schedule');
        const docRef = await addDoc(itemsRef, { name: "works" });
      }

//Renders the card in for the renderItem option
      const renderItem = (items) => {

        return (<TouchableOpacity onPress={() => {
            setRegisterModalStatus(!registerModalStatus)
        }}>
            <Card>
                <Card.Content>
                    <View style={styles.card}>
                        <Text>{items.name}</Text>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>)
      }

    return (
        <ClickOutsideProvider>
            <SafeAreaView style={styles.container} useRef={screenRef}>
                <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={formatDate}
                renderItem={renderItem}
                />
                <Modal visible={registerModalStatus} animationType='slider'>
                    <View>
                        <Text>Gang</Text>
                    </View>
                </Modal>
            </SafeAreaView>
        </ClickOutsideProvider>
    );
}

const ScheduleButton = () => {
    return (
        <TouchableOpacity>
            <Text>Register</Text>
        </TouchableOpacity>
    );
}

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {

    },
});

export default Schedule;