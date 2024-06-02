import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
      <Text style={[styles.text, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Profile Screen</Text>
      <TouchableOpacity
        onPress={logout}
        style={[
          styles.button,
          { backgroundColor: isDarkMode ? Colors.dark.buttonBackground : Colors.light.buttonBackground },
        ]}
      >
        <Text style={[styles.buttonText, { color: isDarkMode ? Colors.dark.buttonText : Colors.light.buttonText }]}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default ProfileScreen;


