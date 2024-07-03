import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/api';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type SignupScreenNavigationProp = NavigationProp<RootStackParamList, 'Signup'>;

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleSignup = async () => {
    try {
      const response = await api.post('/register', { email, password, name });
      console.log('User registered:', response.data);
      navigation.navigate('Login'); // Navegar para a página de login após o registro
    } catch (error) {
      console.error('Signup failed:', error);
      Alert.alert('Signup failed', 'An error occurred');
    }
  };

  return (
    <LinearGradient colors={['#FF0000', '#FFFFFF']} style={styles.gradient}>
      <View style={styles.container}>
        <Image source={require('../../assets/icon.png')} style={styles.icon} />
        <Text style={styles.appName}>OnAlert</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Já tem conta criada? Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  icon: { width: 100, height: 100, marginBottom: 16 },
  appName: { fontSize: 32, fontWeight: 'bold', marginBottom: 32 },
  label: { alignSelf: 'flex-start', marginLeft: '10%', fontSize: 16, marginBottom: 8 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8, width: '80%', borderRadius: 8 },
  signupButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
  },
  signupButtonText: { color: 'white', fontWeight: 'bold' },
  loginText: { color: 'blue', marginTop: 16, textAlign: 'center' },
});

export default SignupScreen;