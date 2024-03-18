// ContactsFunctions.js
import * as Contacts from 'expo-contacts';
import { Linking, Alert } from 'react-native';


// Add dummy contacts for testing
const dummyContacts = [
	{
		id: '1',
		name: 'Jackson',
		phoneNumbers: [
		
		],
		
	},
	{
		id: '2',
		name: 'Ted 2',
		phoneNumbers: [
			
		],
		
	},
	{
		id: '3',
		name: 'Gary',
		phoneNumbers: [
        
		],
		
	},
	// this is just dummy data. figure how to do the data part later
];

export const requestContactsPermission =
	async (setContacts, setFilteredContacts) => {
		try {
			const { status } =
				await Contacts.requestPermissionsAsync();
			// Comment below two lines after testing the contacts
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
