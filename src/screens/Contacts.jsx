import React, { useCallback, useState, useEffect, Fragment} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../../Firebase/firebaseConfig';
import Contacts from 'react-native-contacts';


const [contacts, setContacts] = React.useState<Contacts.Contact[] | null>(
    null,
  );
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'ContactsList app would like to access your contacts.',
        buttonPositive: 'Accept',
      }).then(value => {
        if (value === 'granted') {
          Contacts.getAll().then(setContacts);
        }
      });
    } else {
      Contacts.getAll().then(setContacts);
    }
  }, []);

  const sections = React.useMemo(() => {
    if (!contacts) {
      return null;
    }
  
    const sectionsMap = contacts.reduce<Record<string, Contacts.Contact[]>>(
      (acc, contact) => {
        const {familyName} = contact;
        const [firstLetter] = familyName;
  
        return Object.assign(acc, {
          [firstLetter]: [...(acc[firstLetter] || []), contact],
        });
      },
      {},
    );
  
    return Object.entries(sectionsMap)
      .map(([letter, items]) => ({
        letter,
        items: items.sort((a, b) => a.familyName.localeCompare(b.familyName)),
      }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
  }, [contacts]);


  if (!sections) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator />
      </View>
    );
  }


  {sections.map(({letter, items}) => (
    <View style={styles.section} key={letter}>
      <Text style={styles.sectionTitle}>{letter}</Text>
      <View style={styles.sectionItems}>
        {items.map(
          (
            {givenName, familyName, phoneNumbers, thumbnailPath},
            index,
          ) => {
            const name = `${givenName} ${familyName}`;
            const phone = phoneNumbers.length
              ? phoneNumbers[0].number
              : '-';
            const img = thumbnailPath;
  
            return (
              <View key={index} style={styles.cardWrapper}>
                <TouchableOpacity
                  onPress={() => {
                  
                  }}>
                  <View style={styles.card}>
                    {img ? (
                      <Image
                        alt=""
                        resizeMode="cover"
                        source={{uri: img}}
                        style={styles.cardImg}
                      />
                    ) : (
                      <View style={[styles.cardImg, styles.cardAvatar]}>
                        <Text style={styles.cardAvatarText}>
                          {name[0]}
                        </Text>
                      </View>
                    )}
                
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{name}</Text>
                
                      <Text style={styles.cardPhone}>{phone}</Text>
                    </View>
                
                    <View style={styles.cardAction}>
                      <FeatherIcon
                        color="#9ca3af"
                        name="chevron-right"
                        size={22}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          },
        )}
      </View>
    </View>
  ))}