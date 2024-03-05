import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../Firebase/firebaseConfig';
import { TextInput } from 'react-native';

const Signup = () => {
    
    
    return (
        <SafeAreaView>
            <TextInput/>
            <TextInput/>
            <TextInput/>
        </SafeAreaView>
    );
};

export default Signup;