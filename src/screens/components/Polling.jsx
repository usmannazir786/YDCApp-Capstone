import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
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

  const handleVote = (optionId) => {
    const updatedVotes = [...votes];
    const optionIndex = recentOptions.findIndex(option => option.id === optionId);
    if (optionIndex !== -1) {
      updatedVotes[optionIndex]++;
      setVotes(updatedVotes);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Polling</Text>

    {recentOptions.map((option, index) => (
        <View style={styles.buttonBlock} key={option.id}>
        <Text>{option.name}: {votes[index]} votes</Text>
        <TouchableOpacity onPress={() => handleVote(option.id)}>
        <Text>Vote for {option.name}</Text>
        </TouchableOpacity>
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
});

export default Polling;
