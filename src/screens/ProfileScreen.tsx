import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        const userProfile: UserProfile = response.data;
        setProfile(userProfile);
        setName(userProfile.name);
        setEmail(userProfile.email);
        setProfilePicture(userProfile.profilePicture);
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
      } else {
        console.error('Failed to update profile:', error);
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
        setProfilePicture(`http://localhost:3000/${uploadedProfilePicture}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Failed to upload image:', error.message);
        } else {
          console.error('Failed to upload image:', error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {profile && (
        <>
          {profilePicture && <Image source={{ uri: profilePicture }} style={styles.profileImage} />}
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
          <Button title="Escolher Imagem" onPress={handleChooseImage} />
          <Button title="Atualizar Perfil" onPress={handleUpdateProfile} />
          <Button title="Logout" onPress={logout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
});

export default ProfileScreen;