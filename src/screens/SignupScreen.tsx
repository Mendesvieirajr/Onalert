import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
    }
  };

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
});

export default SignupScreen;