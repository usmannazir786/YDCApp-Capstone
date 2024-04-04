import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const Polling = ({ navigation, route }) => {
  const routeParams = route.params;
  if (!routeParams) {
    console.log('route.params is undefined');
    return;
  }

  const { recentOptions } = routeParams;
  const options = recentOptions.map(item => item.name);
  const [votes, setVotes] = useState(new Array(options.length).fill(0));
  const [timer, setTimer] = useState(null);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleVote = (optionId) => {
    const updatedVotes = [...votes];
    const optionIndex = recentOptions.findIndex(option => option.id === optionId);
    if (optionIndex !== -1) {
      updatedVotes[optionIndex]++;
      setVotes(updatedVotes);
    }
  };

  const startTimer = () => {
    // Convert days, hours, minutes, and seconds to seconds
    const durationInSeconds = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
    setTimer(durationInSeconds);
  };

  const stopTimer = () => {
    setTimer(null);
  };

  const clearVotes = () => {
    setVotes(new Array(options.length).fill(0));
  };

  useEffect(() => {
    if (timer === null) return; // Don't start timer if null

    // Start the countdown
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          return null;
        }
        return prevTimer - 1;
      });
    }, 1000); // Update every second

    // Clear the interval when the component unmounts or when the timer is up
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    // Update days, hours, minutes, and seconds when the timer changes
    let remainingTime = timer;
    const newDays = Math.floor(remainingTime / (24 * 60 * 60));
    remainingTime -= newDays * (24 * 60 * 60);
    const newHours = Math.floor(remainingTime / (60 * 60));
    remainingTime -= newHours * (60 * 60);
    const newMinutes = Math.floor(remainingTime / 60);
    remainingTime -= newMinutes * 60;
    setDays(newDays);
    setHours(newHours);
    setMinutes(newMinutes);
    setSeconds(remainingTime);
  }, [timer]);

  const totalVotes = votes.reduce((acc, cur) => acc + cur, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Polling</Text>

      {/* Displaying total votes */}
      <View style={styles.totalVotesContainer}>
        <Text>Total Votes: {totalVotes}</Text>
      </View>

      {/* Input fields for timer duration */}
      <View style={styles.timerInputContainer}>
        <TextInput
          style={styles.timerInput}
          keyboardType="numeric"
          placeholder="Days"
          value={days.toString()}
          onChangeText={text => setDays(parseInt(text))}
        />
        <TextInput
          style={styles.timerInput}
          keyboardType="numeric"
          placeholder="Hours"
          value={hours.toString()}
          onChangeText={text => setHours(parseInt(text))}
        />
        <TextInput
          style={styles.timerInput}
          keyboardType="numeric"
          placeholder="Minutes"
          value={minutes.toString()}
          onChangeText={text => setMinutes(parseInt(text))}
        />
        <TextInput
          style={styles.timerInput}
          keyboardType="numeric"
          placeholder="Seconds"
          value={seconds.toString()}
          onChangeText={text => setSeconds(parseInt(text))}
        />
      </View>

      {/* Timer controls */}
      <View style={styles.timerControls}>
        <Button mode='contained' onPress={startTimer}>Start</Button>
        <Button mode='contained' onPress={stopTimer}>Stop</Button>
      </View>

      {/* Displaying countdown */}
      <Text style={styles.timerText}>
        {`${days}d ${hours}h ${minutes}m ${seconds}s`}
      </Text>

      {/* Clear votes button */}
      <Button mode='contained' onPress={clearVotes}>Clear Votes</Button>

      {/* Displaying options */}
      {recentOptions.map((option, index) => (
        <View style={styles.buttonBlock} key={option.id}>
          <Text>{option.name}: {votes[index]} votes</Text>
          {/* Allow voting only if the timer is active */}
          {timer !== null && (
            <TouchableOpacity onPress={() => handleVote(option.id)}>
              <Text>Vote for {option.name}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <Button mode='text' onPress={() => navigation.dispatch(StackActions.pop(1))}>Return</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  buttonBlock: {
    marginBottom: 20,
    width: 250,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  totalVotesContainer: {
    marginBottom: 20,
    width: 250,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  timerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timerInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    width: 60,
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
});

export default Polling;

