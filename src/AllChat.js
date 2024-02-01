// AllChats.js
import React from 'react';
import './AllChats.css'; // This imports the CSS from AllChats.css

function AllChats() {
  // Placeholder data for chat entries
  const chatPlaceholders = Array(8).fill({ name: 'Placeholder', message: 'Last message...' });

  return (
    <View style={styles.allChatsContainer}>
      <View style={styles.allChatsHeader}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>&#x3c;</Text>
        </TouchableOpacity>
        <Text style={styles.allChatsTitle}>Chats</Text>
        <TouchableOpacity>
          <Text style={styles.addChat}>&#x271A;</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {chatPlaceholders.map((chat, index) => (
          <View key={index} style={styles.chatItem}>
            <Text style={styles.chatIcon}>@</Text>
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatLastMessage}>{chat.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default AllChats;
