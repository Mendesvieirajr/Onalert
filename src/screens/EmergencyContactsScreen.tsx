import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

type Contact = {
  id: number;
  name: string;
  phone: string;
};

const EmergencyContactsScreen = () => {
  const { isAuthenticated } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/emergency-contacts');
        setContacts(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Failed to fetch contacts:', error.message);
        } else {
          console.error('Failed to fetch contacts:', error);
        }
      }
    };

    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated]);

  const handleAddContact = async () => {
    try {
      const response = await api.post('/emergency-contacts', { name, phone });
      setContacts([...contacts, response.data]);
      setName('');
      setPhone('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to add contact:', error.message);
      } else {
        console.error('Failed to add contact:', error);
      }
    }
  };

  const handleDeleteContact = async (id: number) => {
    try {
      await api.delete(`/emergency-contacts/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to delete contact:', error.message);
      } else {
        console.error('Failed to delete contact:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Adicionar Contato" onPress={handleAddContact} />

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactContainer}>
            <Text>{item.name}: {item.phone}</Text>
            <Button title="Delete" onPress={() => handleDeleteContact(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
  contactContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 },
});

export default EmergencyContactsScreen;