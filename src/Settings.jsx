import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => setIsDarkMode(previousState => !previousState);

  // Placeholder functions for navigation or actions when the user presses "Text Size" or "Text Font"
  const handleTextSizePress = () => console.log('Text Size Pressed');
  const handleTextFontPress = () => console.log('Text Font Pressed');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { /* Implement back navigation */ }} style={styles.backButton}>
        <Text style={styles.backButtonText}>&#x3c;</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
      
      <Text style={styles.sectionTitle}>Display Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={handleToggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <TouchableOpacity style={styles.settingItem} onPress={handleTextSizePress}>
        <Text style={styles.settingLabel}>Text Size</Text>
        <Text style={styles.settingAction}>&rarr;</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Preferences Settings</Text>
      <TouchableOpacity style={styles.settingItem} onPress={handleTextFontPress}>
        <Text style={styles.settingLabel}>Text Font</Text>
        <Text style={styles.settingAction}>&rarr;</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: '#000',
  },
  settingAction: {
    fontSize: 18,
    color: '#000',
  },
});

export default Settings;
