import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

const EmergencyButton = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const triggerEmergencyCall = () => {
    const args = {
      number: '112',
      prompt: true,
    };
    try {
      call(args);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={triggerEmergencyCall}
      style={[
        styles.button,
        { backgroundColor: isDarkMode ? Colors.dark.buttonBackground : Colors.light.buttonBackground },
      ]}
    >
      <Text style={[styles.text, { color: isDarkMode ? Colors.dark.buttonText : Colors.light.buttonText }]}>
        Call Emergency 112
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default EmergencyButton;


