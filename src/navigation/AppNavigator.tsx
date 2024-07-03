import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import MedicalRecordsScreen from '../screens/MedicalRecordsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EmergencyContactsScreen from '../screens/EmergencyContactsScreen';
import TOSScreen from '../screens/TOSScreen'; // Import TOSScreen

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  Signup: undefined;
  EmergencyContacts: undefined;
  MedicalRecords: undefined;
  TOS: undefined; // Add TOS to the stack
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'red' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="MedicalRecords" component={MedicalRecordsScreen} options={{ title: 'Registos Médicos' }} />
            <Stack.Screen name="EmergencyContacts" component={EmergencyContactsScreen} options={{ title: 'Contactos de Emergência' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
          </>
        )}
        <Stack.Screen name="TOS" component={TOSScreen} options={{ title: 'Terms of Service' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;