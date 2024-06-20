import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';

type UserProfile = {
  id: number;
  email: string;
  name: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};

const ProfileScreen = () => {
  const { isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        const userProfile: UserProfile = response.data;
        setProfile(userProfile);
        setName(userProfile.name);
        setEmail(userProfile.email);
        setProfilePicture(userProfile.profilePicture ? `http://192.168.1.72:3000/uploads/${userProfile.profilePicture}` : null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Failed to fetch profile:', error.message);
          Alert.alert('Error', `Failed to fetch profile: ${error.response?.data?.error || error.message}`);
        } else {
          console.error('Failed to fetch profile:', error);
          Alert.alert('Error', 'Failed to fetch profile.');
        }
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const handleUpdateProfile = async () => {
    try {
      const response = await api.put('/profile', { name, email, password, profilePicture });
      const updatedProfile: UserProfile = response.data;
      setProfile(updatedProfile);
      alert('Profile updated successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to update profile:', error.message);
        Alert.alert('Error', `Failed to update profile: ${error.response?.data?.error || error.message}`);
      } else {
        console.error('Failed to update profile:', error);
        Alert.alert('Error', 'Failed to update profile.');
      }
    }
  };

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename!);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('profilePicture', { uri: localUri, name: filename, type } as any);

      try {
        const uploadResponse = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const { profilePicture: uploadedProfilePicture } = uploadResponse.data;
        setProfilePicture(`http://192.168.1.72:3000/uploads/${uploadedProfilePicture}`);
        setIsModalVisible(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Failed to upload image:', error.message);
          Alert.alert('Error', `Failed to upload image: ${error.response?.data?.error || error.message}`);
        } else {
          console.error('Failed to upload image:', error);
          Alert.alert('Error', 'Failed to upload image.');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {profile && (
        <>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <View style={styles.profileImageContainer}>
              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.profileImage} />
              ) : (
                <FontAwesome name="user-circle" size={100} color="gray" />
              )}
              <View style={styles.editIcon}>
                <FontAwesome name="pencil" size={20} color="white" />
              </View>
            </View>
          </TouchableOpacity>

          <Text>Nome: {profile.name}</Text>
          <Text>Email: {profile.email}</Text>
          <Text>Data de Entrada: {new Date(profile.createdAt).toLocaleDateString()}</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Atualizar Perfil" onPress={handleUpdateProfile} />
          <Button title="Logout" onPress={logout} />

          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContent}>
              <Button title="Atualizar Foto de Perfil" onPress={handleChooseImage} />
              <Button title="Cancelar" onPress={() => setIsModalVisible(false)} />
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
  profileImageContainer: { position: 'relative', alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: 'gray' },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 5,
  },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10 },
});

export default ProfileScreen;