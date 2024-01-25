import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import firebase from '../firebaseConfig';


const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => console.log(user))
      .catch(error => setErrorMessage(error.message));
  };

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => console.log(user))
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <View>
      {errorMessage && <Text>{errorMessage}</Text>}
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={password => setPassword(password)}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Auth;
