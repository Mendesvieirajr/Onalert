import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.buttonText}>Adicionar Contato</Text>
      </TouchableOpacity>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactContainer}>
            <FontAwesome name="user" size={24} color="black" style={styles.contactIcon} />
            <Text style={styles.contactText}>{item.name}: {item.phone}</Text>
            <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
              <FontAwesome name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4 },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactIcon: {
    marginRight: 10,
  },
  contactText: {
    flex: 1,
  },
});

export default EmergencyContactsScreen;