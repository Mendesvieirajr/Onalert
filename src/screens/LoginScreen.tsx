import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: { navigation: LoginScreenNavigationProp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    // Mock login, replace with actual login logic
    const token = 'fake-jwt-token';
    login(token);
    navigation.navigate('HomeTabs');
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
});

export default LoginScreen;

