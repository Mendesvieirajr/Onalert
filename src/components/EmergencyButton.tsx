import React from 'react';
import { Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import axios from 'axios';

const EmergencyButton = () => {
  const { isAuthenticated } = useAuth();

  const sendLocationSMS = async () => {
    // Solicitar permissão para acessar a localização
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    // Obter a localização atual
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const message = `Emergency! My current location is: https://maps.google.com/?q=${latitude},${longitude}`;

    if (isAuthenticated) {
      try {
        const response = await api.get('/emergency-contacts');
        const contacts = response.data.map((contact: { phone: string }) => contact.phone);

        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
          for (const phone of contacts) {
            try {
              await SMS.sendSMSAsync([phone], message);
            } catch (error) {
              console.error(`Failed to send SMS to ${phone}:`, error);
            }
          }
          Alert.alert('Emergency message sent or attempted to all contacts');
        } else {
          Alert.alert('SMS service is not available on this device');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Failed to fetch contacts or send SMS:', error.message);
          Alert.alert('Error', `Failed to fetch contacts or send SMS: ${error.response?.data?.error || error.message}`);
        } else {
          console.error('Failed to fetch contacts or send SMS:', error);
          Alert.alert('Error', 'Failed to fetch contacts or send SMS.');
        }
      }
    } else {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        try {
          await SMS.sendSMSAsync([], message);
          Alert.alert('Emergency message draft opened in SMS app');
        } catch (error) {
          Alert.alert('Failed to open SMS app');
        }
      } else {
        Alert.alert('SMS service is not available on this device');
      }
    }
  };

  return (
    <Button title="Send Location" onPress={sendLocationSMS} />
  );
};  

export default EmergencyButton;