import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

const ProfileScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
      <Text style={[styles.text, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>
        Profile Screen
      </Text>
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
  },
});

export default ProfileScreen;

