import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, Linking } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as Location from 'expo-location';
import Colors from '../constants/Colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'HomeTabs'>;

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isAuthenticated } = useAuth();

  const sendLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    alert(`Location: ${location.coords.latitude}, ${location.coords.longitude}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
      <View style={styles.header}>
        {isAuthenticated ? (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={[styles.profileButton, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>
              Profile
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.profileButton, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>
              Login
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={[styles.text, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Home Screen</Text>
      <TouchableOpacity
        onPress={() => Linking.openURL('tel:112')}
        style={[
          styles.button,
          { backgroundColor: isDarkMode ? Colors.dark.buttonBackground : Colors.light.buttonBackground },
        ]}
      >
        <Text style={[styles.buttonText, { color: isDarkMode ? Colors.dark.buttonText : Colors.light.buttonText }]}>
          Call Emergency 112
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={sendLocation}
        style={[
          styles.button,
          { backgroundColor: isDarkMode ? Colors.dark.buttonBackground : Colors.light.buttonBackground },
        ]}
      >
        <Text style={[styles.buttonText, { color: isDarkMode ? Colors.dark.buttonText : Colors.light.buttonText }]}>
          Send Location
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
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  profileButton: {
    fontSize: 16,
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

export default HomeScreen;
