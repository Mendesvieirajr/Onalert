import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { email, password });
      login(response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Já tem conta criada? Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
  signupText: { color: 'blue', marginTop: 16, textAlign: 'center' },
});

export default LoginScreen;