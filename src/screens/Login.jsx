import { useState } from 'react';
import { Text } from 'react-native';
import { 
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth, db } from '../../Firebase/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native-paper';
import { collection, getDocs, query, where } from 'firebase/firestore';

//Tie information only related to the user to its uuid

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [visible, setVisibile] = useState(false);
  const [userRole, setUserRole] = useState("");

  //Move Signup to its own page for cleaner interface
  const handleSignUp = () => {
    //Sending email if it has been filled to the sign up page to save sign up time if an account does not exist
    setErrorMessage(null);
    navigation.navigate('Signup Auth', {email});
  };

  const handleLogin = () => {
    //Input validation for email and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /\s/; //Password input should not contain any spaces

    if (!emailRegex.test(email) || passwordRegex.test(password)) {
      console.warn('User tried to enter suspicious text in one of the inputs: ', email, ', ', password);
      setErrorMessage('Invalid email or password input');
    } else {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCred => {
        setErrorMessage(null);
        const user = userCred.user;
        console.log(user.email);

        //User Role check
        // const userRef = doc(db, 'users', 'Y22hm8x4UZw6i4LYfZ8B');
        // const docSnap = getDoc(userRef);
        // docSnap.then((snapshot) => {
        //   console.log(snapshot.data().role)
        // });
        
        const userRef = collection(db, 'users');
        const q = query(userRef, where("uid", "==", user.uid));

        getDocs(q)
          .then((qSnapshot) => {
            qSnapshot.forEach((doc) => {
              console.log(doc.data().role)
            })
          })
          .catch((error) => {
            console.error('Error: ', error);
          })
        ///////////////////////////////////////////////////

        navigation.navigate('Youth Drop-In Center', {email});
      })
      .catch(error => {
        setErrorMessage(error.message);
        console.error('Error when user trying to log in: ', error);
      });
    }

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
        secureTextEntry={!visible}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={password => setPassword(password)}
        right={
          <TextInput.Icon 
            icon={!visible ? "eye" : "eye-off" }
            size={20}
            onPress={() => setVisibile(!visible)}
          />
        }
      />
      <Button mode='contained' onPress={handleLogin} >Login</Button>
      <Button mode='contained' onPress={handleSignUp} >Signup</Button>
    </SafeAreaView>
  );
};

export default Login;
