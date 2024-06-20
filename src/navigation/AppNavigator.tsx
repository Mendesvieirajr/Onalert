import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import MedicalRecordsScreen from '../screens/MedicalRecordsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EmergencyContactsScreen from '../screens/EmergencyContactsScreen';

export type RootStackParamList = {
  Login: undefined;
  HomeTabs: undefined;
  Profile: undefined;
  Signup: undefined;
  EmergencyContacts: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      {isAuthenticated && (
        <>
          <Tab.Screen name="MedicalRecords" component={MedicalRecordsScreen} />
          <Tab.Screen name="EmergencyContacts" component={EmergencyContactsScreen} />
        </>
      )}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        {!isAuthenticated && (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          </>
        )}
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

export default App;
