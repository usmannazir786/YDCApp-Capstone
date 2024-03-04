import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { firebase } from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  //Move Signup to its own page for cleaner interface
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(user => console.log(user))
      .catch(error => setErrorMessage(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(user => console.log(user))
      .catch(error => setErrorMessage(error.message));

      navigation.navigate('Youth Drop-In Center');
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

export default Login;
