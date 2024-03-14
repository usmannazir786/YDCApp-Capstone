import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../Firebase/firebaseConfig';
import { Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection} from 'firebase/firestore';
import { StackActions } from '@react-navigation/native';
import { IconButton, Icon, TextInput } from 'react-native-paper';

const Signup = ({ route, navigation }) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const {email: initialEmail} = route.params;
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState('');
    const [visible, setVisibile] = useState(false);

    //Creates both the email and password for the user as well as a user collection relating to additional user info
    const handleSignUp = () => {
        //Regex for input validation meets requirements
        const firstNameRegex = /^[A-Za-z0-9\s]+$/;
        const lastNameRegex = /^[A-Za-z0-9\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        //Booleans to check if each input is valid
        let fncheck = false;
        let lncheck = false;
        let emailcheck = false;
        let passwordcheck = false;
        let inputposition = '';

        //If any of these are false, update something to notify the user which input they need to fix
        if (firstNameRegex.test(firstname)) {
            fncheck = true;
            inputposition = inputposition, 'FirstName|';
        }

        if (lastNameRegex.test(lastname)) {
            lncheck = true;
            inputposition = inputposition, 'LastName|';
        }

        if (emailRegex.test(email)) {
            emailcheck = true;
            inputposition = inputposition, 'Email|';
        }

        if (passwordRegex.test(password)) {
            passwordcheck = true;
            inputposition = inputposition, 'Password|';
        }

        //If the inputs look good then create the user
        if (fncheck && lncheck && emailcheck && passwordcheck) {
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
                if (err.code == 'auth/email-already-in-use') {
                    Alert.alert('Error', 'This email already exists');
                    console.error('User tried to create an account with an existing email');
                } else {
                    console.error('Error creating user: ', err.message);
                }
            })
        } else {
            console.error('User failed to enter information to one of the inputs at ', inputposition);
            Alert.alert('Error', 'Missing input requirement(s)');
        }
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
            <Button title="Sign Up" onPress={handleSignUp} />
        </SafeAreaView>
    );
};

export default Signup;