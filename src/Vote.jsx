import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const VotingOption = ({ title }) => {
  const [vote, setVote] = useState(null);

  return (
    <View style={styles.votingOptionContainer}>
      <Text style={styles.optionTitle}>{title}</Text>
      <View style={styles.yesNoContainer}>
        <TouchableOpacity
          style={[styles.voteButton, vote === 'YES' && styles.selectedVoteButton]}
          onPress={() => setVote('YES')}
        >
          <Text style={styles.voteButtonText}>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.voteButton, vote === 'NO' && styles.selectedVoteButton]}
          onPress={() => setVote('NO')}
        >
          <Text style={styles.voteButtonText}>NO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function VotingPage() {
  // Placeholder for handling back navigation and confirm action
  const handleBackPress = () => console.log('Back pressed');
  const handleConfirmPress = () => console.log('Confirm pressed');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>&#x3c;</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Voting</Text>
      <VotingOption title="2" />
      <VotingOption title="1" />
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50, // Adjust the padding as needed
    backgroundColor: '#fff',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  votingOptionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  yesNoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  voteButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  selectedVoteButton: {
    backgroundColor: '#c0c0c0', // Darker shade to indicate selection
  },
  voteButtonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
});

export default VotingPage;
