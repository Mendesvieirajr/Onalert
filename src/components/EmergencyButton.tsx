import React from 'react';
import { Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';

const EmergencyButton = () => {
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

    // Verificar se o dispositivo pode enviar SMS
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // Enviar SMS para um número predefinido
      const { result } = await SMS.sendSMSAsync(
        ['1234567890'], // Substitua pelo número desejado
        message
      );
      if (result === 'sent') {
        Alert.alert('Emergency message sent successfully');
      } else {
        Alert.alert('Failed to send emergency message');
      }
    } else {
      Alert.alert('SMS service is not available on this device');
    }
  };

  return (
    <Button title="Send Location" onPress={sendLocationSMS} />
  );
};

export default EmergencyButton;