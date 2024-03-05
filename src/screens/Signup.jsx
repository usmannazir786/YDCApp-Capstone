import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../Firebase/firebaseConfig';
import { TextInput, Button } from 'react-native';

const Signup = ({ route, navigation }) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const {email: initialEmail} = route.params;
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState('');

    const handleSignUp = () => {

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