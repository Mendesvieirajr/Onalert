import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro no logim, tente novamente', 'An error occurred');
    }
  };

  return (
    <LinearGradient colors={['#FF0000', '#FFFFFF']} style={styles.gradient}>
      <View style={styles.container}>
        <Image source={require('../../assets/icon.png')} style={styles.icon} />
        <Text style={styles.appName}>OnAlert</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Já tem conta criada? Criar Conta</Text>
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
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
  },
  loginButtonText: { color: 'white', fontWeight: 'bold' },
  signupText: { color: 'blue', marginTop: 16, textAlign: 'center' },
});

export default LoginScreen;