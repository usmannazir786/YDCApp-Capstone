import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../Firebase/firebaseConfig';
import { TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc } from 'firebase/firestore';
import { StackActions } from '@react-navigation/native';

const Signup = ({ route, navigation }) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const {email: initialEmail} = route.params;
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState('');

    //Creates both the email and password for the user as well as a user collection relating to additional user info
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log('Created User:', cred.user);

                //Retrieve the user UID created
                const uid = cred.user.uid;
                //Store data connecting it to the UID
                const userData = {
                    uid: uid,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    role: 'Regular User'
                };

                addDoc(collection(db, 'users'), userData)
                    .then((docRef) => {
                        console.log('User data stored into the database at', docRef.id);
                        //Returns to screen if successful
                        console.log('Returning user to login after successful user creation');
                        navigation.dispatch(StackActions.pop(1));
                    })
                    .catch((err) => {
                        console.error('Error storing data: ', err);
                    })
            })
            .catch((err) => {
                console.error(err.message);
            })
    }
    
    return (
        <SafeAreaView>
            <TextInput
                // style={}
                placeholder='First Name'
                autoCapitalize='words'
                onChangeText={firstname => setFirstName(firstname)}
            />
            <TextInput
                // style={}
                placeholder='Last Name'
                autoCapitalize='words'
                onChangeText={lastname => setLastName(lastname)}
            />
            <TextInput
                placeholder='Email'
                autoCapitalize='none'
                onChangeText={email => setEmail(email)}
                value={email}
            />
            <TextInput
                secureTextEntry
                placeholder='Password'
                autoCapitalize="none"
                onChangeText={password => setPassword(password)}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </SafeAreaView>
    );
};

export default Signup;