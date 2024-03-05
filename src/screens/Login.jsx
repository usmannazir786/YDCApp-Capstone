import { useState } from 'react';
import { TextInput, Button, Text } from 'react-native';
import { firebase } from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

//Tie information only related to the user to its uuid

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  //Move Signup to its own page for cleaner interface
  const handleSignUp = () => {
    //Sending email if it has been filled to the sign up page to save sign up time if an account does not exist
    navigation.navigate('Signup Auth', {email});
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(user => {
        console.log(user)
        navigation.navigate('Youth Drop-In Center');
      })
      .catch(error => setErrorMessage(error.message));

  };

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

export default Login;
