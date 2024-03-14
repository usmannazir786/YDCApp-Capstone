import React, { useCallback, useState, useLayoutEffect ,useEffect, Fragment} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../../Firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, addDoc,  query, orderBy, onSnapshot } from 'firebase/firestore';
import { GiftedChat,InputToolbar,SystemMessage,Bubble } from 'react-native-gifted-chat';

const Chat = ({ navigation, route }) => {
  const c_uid = auth?.currentUser.uid;
  const t_uid = route.params?.chatId;
  const [messages, setMessages] = useState([]);

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
        }}
      />
    );
  };

  useEffect(() => {
    getAllMessages()
  },[]);

  useLayoutEffect(() => {
    navigation.setOptions({
       
        headerRight: () => (
          <View style={{ marginLeft: 20 }}>
      </View>
        )
    })
  }, [navigation]);
const getAllMessages = async () => {
    const chatid = "1111-8uFBAc4qy5TLQIjNho3TPPPI6hv1"


    // var msgList = []
    const q = query(collection(db, 'Chats', chatid,'messages'),orderBy('createdAt', "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
      snapshot.docs.map(doc => ({...doc.data(),createdAt:doc.data().createdAt.toDate()}))
    )
    );
    
  }

  const onSendMsg = async (msgArray) => {
    const msg = msgArray[0]
    const time = new Date();
    const userMsg = {
      ...msg,
      sentBy: c_uid,
      sentTo: t_uid,
      createdAt: time
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, userMsg))
    const chatid = "1111-8uFBAc4qy5TLQIjNho3TPPPI6hv1"
    
    //collection of React
    const docRef = collection(db, 'Chats', chatid,'messages');
    await addDoc(docRef,{...userMsg,createdAt:time});

  }
  

  return (
    
        
    <GiftedChat 
    style={{flex: 1, backgroundColor:'#001973' }}
    messages={messages}
    onSend={text => onSendMsg(text)}
    user={{ 
      _id: c_uid,
    }}
    renderInputToolbar={props => customtInputToolbar(props)}
    renderBubble={props => {
      return (
        <Bubble
          {...props}

          textStyle={{
            right: {
              color: 'white',
              // fontFamily: "CerebriSans-Book"
            },
            left: {
              color: '#24204F',
              // fontFamily: "CerebriSans-Book"
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: '#E6F5F3',
            },
            right: {
              backgroundColor: "#3A13C3",
            },
          }}
        />
      );
    }}      
    />
);
}

export default Chat;
