import React from 'react';
import { useColorScheme, View, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/Colors';

const App = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
      <AppNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
