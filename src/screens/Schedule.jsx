import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Modal,
    Button,
    ScrollView,
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
import { collection, addDoc, getDocs } from 'firebase/firestore/lite';
import { firebase } from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';

const Schedule = () => {
    //Databse references
    const scheduleRef = collection(db, 'schedule');
    //Items for card
    const [items, setItems] = useState([]);
    //Current date
    const [currDate, setCurrDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    //States for schedule button
    const [registerModalStatus, setRegisterModalStatus] = useState(false);

    let loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue eu lacus et pretium. Nunc a arcu non sem porttitor faucibus ornare sed orci. Maecenas efficitur libero et diam venenatis, id scelerisque neque lobortis. Nunc ac auctor orci. Praesent viverra placerat ullamcorper. Fusce vitae tempor augue. Ut nibh lorem, ullamcorper nec tempus ac, accumsan at sem. Sed vel nulla fermentum, aliquet elit sed, commodo diam. Praesent dignissim turpis in mauris luctus, in vulputate ligula accumsan. Duis augue arcu, lobortis ac ultricies quis, pharetra quis ante. Nulla sit amet metus non leo pretium mollis. Suspendisse volutpat tortor a lectus facilisis congue. Vestibulum eleifend vel augue id tempor. Quisque tincidunt urna quis arcu eleifend, a tempor ipsum bibendum. Suspendisse eu nisi sit amet tellus dapibus molestie. Suspendisse tellus magna, aliquam non faucibus eu, bibendum vel mi.';
    
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
                  day: strTime,
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
        const docRef = await addDoc(itemsRef, 
            { 
                name: "works",
                state: "registered",
            });

        closeModal();
      }

//Helper close function for modal
      const closeModal = () => {
        setRegisterModalStatus(false);
      }

//Retrieve data from firebase
    const checkRegistration = () => {
        scheduleRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                return true;
            } else {
                return false;
            }
        });
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
        
        <SafeAreaView style={styles.container}>
            <Agenda
            items={items}
                loadItemsForMonth={loadItems}
                selected={formatDate}
                renderItem={renderItem}
                />
                <Modal visible={registerModalStatus} animationType='slide' transparent={true}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        paddingTop: 60,
                        position: 'relative',
                    }} onPress={test}>
                        <View style={{
                            backgroundColor: 'white',
                            justifyContent: 'bottom',
                            alignItems: 'center',
                            padding: 15,
                            width: '60%',
                            height: '40%',
                            borderRadius: 10,
                        }}>
                            <View style={{
                                backgroundColor: '#2e2d2b',
                                width: 215,
                                height: 190,
                                borderRadius: 10,
                                padding: 10,
                                position: 'relative',
                            }}>
                                <View style={{
                                    backgroundColor: '#f5d142',
                                    width: 'auto',
                                    height: 40,
                                    borderRadius: 10,
                                    padding: 10,
                                    alignSelf: 'flex-start'
                                }}>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}>
                                        Event_Name
                                    </Text>
                                </View>
                            </View>
                            <ScrollView centerContent={true} scrollEnabled={true}
                            contentContainerStyle={{
                                flex:1, 
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                            style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                width: 195,
                                height: 125,
                                borderRadius: 10,
                                padding: 10,
                                alignSelf: 'flex-start',
                                bottom: 85,
                                left: 20,
                            }}>
                                    <Text>{loremText}</Text>
                            </ScrollView>
                            {!checkRegistration ? 
                                <TouchableOpacity style={[styles.registerBtn, {
                                    width: 125,
                                    height: 50,
                                    position: 'absolute',
                                    left: 10,
                                    bottom: 10,
                                    backgroundColor: '#2196F3',
                                }]} onPress={test}>
                                    <Text style={{
                                        color: '#f0efed',
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                                :
                                <View style={[styles.registerBtn, {
                                    width: 125,
                                    height: 50,
                                    position: 'absolute',
                                    left: 10,
                                    bottom: 10,
                                    backgroundColor: '#2e2d2b',
                                }]}>
                                    <Text style={{
                                        color: '#f0efed',
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}>
                                        Registered
                                    </Text>
                                </View>
                            }
                            <TouchableOpacity onPress={closeModal} style={[styles.registerBtn, {
                                backgroundColor: '#f54242',
                                position: 'absolute',
                                width: 75,
                                height: 50,
                                right: 10,
                                bottom: 10,
                            }]}>
                                <Text style={{
                                    color: '#f0efed',
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
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
    registerBtn: {
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Schedule;