
import { Linking, Alert } from 'react-native';
 

 
export const requestContactsPermission =
    async (setContacts, setFilteredContacts) => {
        try {
            const { status } =
                await Contacts.requestPermissionsAsync();
            
            setContacts(dummyContacts);
            setFilteredContacts(dummyContacts);
 
            if (status === 'granted') {
                setContacts(sortedContacts);
                setFilteredContacts(sortedContacts);
 
            } else {
 
                console.log('Contacts permission denied');
            }
        } catch (error) {
            console
                .error('Error requesting contacts permission:', error);
        }
    };
 
export const fetchContacts =
    async (setContacts, setFilteredContacts) => {
        try {
            // Use dummyContacts for testing
            setContacts(dummyContacts);
            setFilteredContacts(dummyContacts);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };
 
export const makeCall = (contact) => {
    const phoneNumber =
        contact.phoneNumbers
            &&
            contact.phoneNumbers.length > 0
            ? contact.phoneNumbers[0].number
            : null;
 
    if (phoneNumber) {
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url);
    } else {
        Alert.alert('No phone number available for this contact.');
    }
};
 
export const filterContacts =
    (contacts, searchQuery, setFilteredContacts) => {
        const filtered = contacts.filter(
            (contact) =>
                contact.name.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (contact.phoneNumbers &&
                    contact.phoneNumbers.length > 0 &&
                    contact.phoneNumbers[0].number.includes(searchQuery))
        );
 
        setFilteredContacts(filtered);
    };