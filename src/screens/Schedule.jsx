import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Modal,
    ScrollView,
    Platform,
    Pressable,
    KeyboardAvoidingView,
} from 'react-native';
/*
    Using a library that created agendas already from: https://github.com/wix/react-native-calendars
    https://www.youtube.com/watch?v=RdaQIkE47Og&t=803s&ab_channel=JonasGr%C3%B8ndahl -- Agenda guide
*/
import { Agenda } from 'react-native-calendars';
/*
    Using a library that has components ready to be used in production: https://callstack.github.io/react-native-paper/
*/
import { Card, Button, IconButton, TextInput } from 'react-native-paper';
/*
    Using moment to format dates
*/
import moment from 'moment';
/*
    Imports for the database end
*/
import { db } from '../../Firebase/firebaseConfig'; 
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';

/*
    Import for navigation around
*/
import { StackActions, useRoute } from '@react-navigation/native';
/*
    Import for date time pickers and help from:
    https://www.youtube.com/watch?v=UEfFjfW7Zes&t=124s&ab_channel=ToThePointCode -- Date Time Picker IOS and Android 
*/
import RNDateTimePicker from '@react-native-community/datetimepicker';
//import uuid from 'react-native-uuid';
import uuid from 'react-native-uuid'

const Schedule = ({ navigation }) => {
    //Route params from login
    const route = useRoute();
    const userEmail = route.params.userEmail;
    const userRole = route.params.userRole;
    //Databse references
    const scheduleRef = collection(db, 'schedule');
    //Items for card
    const [items, setItems] = useState([]);
    //Current date
    const [currDate, setCurrDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    //States for schedule button
    const [registerModalStatus, setRegisterModalStatus] = useState(false);
    const [userRegister, setUserRegister] = useState(false);
    //States for admin event creation
    const [eventModalStatus, setEventModalStatus] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState(new Date());
    const [eventTime, setEventTime] = useState(new Date());
    const [eventDescription, setEventDescription] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    //Regex Constants
    const letterAndSpacesRegex = /^[a-zA-Z\s]+$/;

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
//////////////////////////////////////////////////

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
            if (!items[strTime]) { // Keep this code line
              items[strTime] = []; // Keep
              
              // Fills the contents of the array with random variables
              const numItems = Math.floor(Math.random() * 3 + 1);
              for (let j = 0; j < numItems; j++) {
                items[strTime].push({ // Keep this code line
                  name: 'Item for ' + strTime + ' #' + j,
                  height: Math.max(50, Math.floor(Math.random() * 150)),
                  day: strTime,
                });                   // Keep until here
              }
            }
          }
          
          //Iterates over the item array and replaces any new items placed in and updates the array
          const newItems = {}; // Keep this code line
          Object.keys(items).forEach(key => {
            newItems[key] = items[key];
          });
          setItems(newItems); // Keep this code line
        }, 1000);
      };
//////////////////////////////////////////////////

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
//////////////////////////////////////////////////

//Helper close function for modal
      const closeRegisterModal = () => {
        setRegisterModalStatus(false);
      }

      const closeEventModal = () => {
        setEventModalStatus(false);
      }
//////////////////////////////////////////////////

//Event Date & Time Picker functions
      const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
      }

      const toggleTimePicker = () => {
        setShowTimePicker(!showTimePicker);
      }

      const setDate = (event, selectedDate) => {
        if (event.type === 'set') {
            if (selectedDate) {
                const newDate = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
                setEventDate(newDate);
                console.log(timeToDateString(newDate))
                if (Platform.OS === 'android') {
                    toggleDatePicker();
                } else if (Platform.OS === 'ios') {
                    toggleDatePicker();
                }
            }
        } else {
            toggleDatePicker();
        }
      }

      const setTime = (event, selectedTime) => {
        // console.log(event)
        // console.log(selectedTime);
        if (event.type === 'set') {
            if (selectedTime) {
                const hours = selectedTime.getHours()
                const minutes = selectedTime.getMinutes()
                const newDate = new Date(eventTime);
                newDate.setHours(hours);
                newDate.setMinutes(minutes);
                setEventTime(newDate);
                console.log(timeToString(eventTime))
                if (Platform.OS === 'android') {
                    toggleTimePicker();
                } else if (Platform.OS === 'ios') {
                    toggleTimePicker();
                }
            }
        } else {
            toggleTimePicker();
        }
      }
//////////////////////////////////////////////////

//Function to create events and helpers
const testEmptyString = (string) => {
    if (string.trim() === '' || string === null) {
        return true;
    } else {
        return false;
    }
}

const letterCheck = () => {
    if (letterAndSpacesRegex.test(eventName) && letterAndSpacesRegex.test(eventDescription)) {
        console.log('nice');
        return true;
    } else {
        return false;
    }
}

const formatEventDate = (initdate, inittime) => {
    const date = new Date(initdate);

    //Split the time format from string first
    const timeStr = timeToString(inittime);
    const [time, ampm] = timeStr.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    //Check for if PM
    if (ampm === 'PM' && hours < 12) {
        hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
        hours = 0;
    }

    date.setHours(hours);
    date.setMinutes(minutes);

    return dateToDateTimeString(date);
}

const createEvent = async () => {
    console.log(eventName);
    console.log(moment(eventDate).format('YYYY-MM-DD'));
    console.log(timeToString(eventTime));
    console.log(eventDescription);
    if (!testEmptyString(eventName) && !testEmptyString(eventDescription) && letterCheck()) {
        const eventuid = uuid.v4();
        const scheduleRef = await collection(db, 'schedule');
        addDoc(scheduleRef, 
            { 
                eventuid: eventuid,
                eventname: eventName,
                eventdatetime: formatEventDate(eventDate, eventTime),
                eventcreationdate: dateToDateTimeString(currDate),
                volunteers: [],
            });
    } else {
        console.error('Something went wrong with initializing an event, empty input maybe?');
    }

    closeEventModal();
    //Clear states for each thing after successful creation back to default
}

//////////////////////////////////////////////////

//Retrieve data from firebase
      onSnapshot(scheduleRef, (snapshot) => {
        const scheduleDocs = snapshot.docs;

        if (scheduleDocs.length > 0) {
            setUserRegister(true)
        } else {
            setUserRegister(false)
        }
      });
//////////////////////////////////////////////////

//Renders the card in for the renderItem option
      const renderItem = (items) => {

        return (
        <TouchableOpacity onPress={() => {
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
            <Button style={styles.returnBtn} mode='text' onPress={() => navigation.dispatch(StackActions.pop(1))}>Return</Button>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={formatDate}
                renderItem={renderItem}
                showOnlySelectedDayItems={true}
            />
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                behavior='padding'
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                {userRole == 'Admin User' && (
                    <View style={{
                        flex: 1,
                    }}>
                        <View style={styles.addEventContainer}>
                            <IconButton
                                icon={'plus'}
                                size={30}
                                onPress={() => {
                                    setEventModalStatus(!eventModalStatus);
                                }}
                                mode='contained-tonal'
                            />
                        </View>
                        <Modal visible={eventModalStatus} animationType='slide' transparent={true}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                paddingTop: 60,
                                position: 'relative',
                            }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    padding: 15,
                                    width: '80%',
                                    height: '55%',
                                    borderRadius: 10,
                                    flexDirection: 'column',
                                    gap: 10,
                                }}>
                                    <TextInput 
                                        mode='outlined' 
                                        label='Event Name'
                                        onChangeText={eventName => setEventName(eventName)}
                                        style={{
                                            width: '100%',
                                            height: 40,
                                        }}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            gap: 10
                                        }}
                                    >
                                        {showDatePicker && (
                                            <RNDateTimePicker 
                                                mode='date'
                                                value={eventDate}
                                                display='spinner'
                                                onChange={setDate}
                                                style={{
                                                    height: 120,
                                                    marginTop: -10
                                                }}
                                            />
                                        )}
                                        {showDatePicker && Platform.OS === 'ios' && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                }}
                                            >
                                            <Button
                                                mode='contained'
                                                onPress={setDate}
                                            >
                                                Confirm
                                            </Button>    
                                            <Button
                                                mode='outlined'
                                                onPress={toggleDatePicker}
                                            >
                                                Cancel
                                            </Button>
                                            </View>
                                        )}
                                        <Pressable
                                            onPress={toggleDatePicker}
                                        >
                                            <TextInput 
                                                mode='outlined'
                                                label='Event Date'
                                                value={dateToDateString(eventDate)}
                                                editable={false}
                                                onPressIn={toggleDatePicker}
                                                style={{
                                                    height: 40,
                                                    width: 139
                                                }}
                                            />
                                        </Pressable>

                                        {showTimePicker && (
                                            <RNDateTimePicker 
                                                mode='time'
                                                value={eventTime}
                                                display='spinner'
                                                onChange={setTime}
                                                style={{
                                                    height: 120,
                                                    marginTop: -10
                                                }}
                                            />
                                        )}
                                        {showTimePicker && Platform.OS === 'ios' && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                }}
                                            >
                                            <Button
                                                mode='contained'
                                                onPress={setTime}
                                            >
                                                Confirm
                                            </Button>    
                                            <Button
                                                mode='outlined'
                                                onPress={toggleTimePicker}
                                            >
                                                Cancel
                                            </Button>
                                            </View>
                                        )}
                                        <Pressable
                                            onPress={toggleTimePicker}
                                        >
                                            <TextInput 
                                                mode='outlined'
                                                label='Event Time'
                                                value={timeToString(eventTime)}
                                                editable={false}
                                                style={{
                                                    height: 40,
                                                    width: 139
                                                }}
                                            />
                                        </Pressable>
                                    </View>
                                    <ScrollView>
                                        <TextInput
                                            mode='outlined'
                                            label='Description'
                                            multiline={true}
                                            onChangeText={eventDescription => setEventDescription(eventDescription)}
                                            contentStyle={{
                                                height: 175,
                                            }}
                                        />
                                    </ScrollView>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <TouchableOpacity onPress={createEvent} style={[styles.registerBtn, {
                                            backgroundColor: '#2196F3',
                                            justifyContent: 'flex-end',
                                            marginRight: '10%'
                                        }]}>
                                            <Text style={{
                                                color: '#f0efed',
                                                fontSize: 15,
                                                fontWeight: 'bold'
                                            }}>
                                                Confirm
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={closeEventModal} style={[styles.registerBtn, {
                                            backgroundColor: '#f54242',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end',
                                            marginRight: '10%'
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
                            </View>
                        </Modal>
                    </View>
                )}
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
                                {!userRegister ? 
                                    (<TouchableOpacity style={[styles.registerBtn, {
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
                                    </TouchableOpacity>)
                                    :
                                    (<View style={[styles.registerBtn, {
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
                                    </View>)
                                }
                                <TouchableOpacity onPress={closeRegisterModal} style={[styles.registerBtn, {
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const timeToString = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
}

const dateToDateString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

const dateToDateTimeString = (time) => {
    const date = new Date(time);
    return moment(date).format('YYYY-MM-DD HH:mm');
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    },
    registerBtn: {
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    returnBtn: {
        marginTop: '5%'
    },
    addEventContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'column-reverse',
    },
});

export default Schedule;