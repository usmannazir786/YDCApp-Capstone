import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
/*
    Using a library that created agendas already from: https://github.com/wix/react-native-calendars
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
//https://www.youtube.com/watch?v=RdaQIkE47Og&t=803s&ab_channel=JonasGr%C3%B8ndahl -- Agenda guide

const Schedule = () => {
    const [items, setItems] = useState([]);
    const [currDate, setCurrDate] = useState(new Date());

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
    
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
    
            if (!items[strTime]) {
              items[strTime] = [];
              
              //Creates item to be placed in the schedule
              // will be replaced with the ability for the admin to create stuff here
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

//Renders the card in for the renderItem option
      const renderItem = (items) => {

        return (<TouchableOpacity>
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
        <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={formatDate}
        renderItem={renderItem}
        />
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
    card: {

    },
});

export default Schedule;