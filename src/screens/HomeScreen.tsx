import React from 'react';
import { View, Text, TouchableOpacity, Linking, useColorScheme } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles, { commonStyles } from '../constants/styles';
import Colors from '../constants/Colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';
import EmergencyButton from '../components/EmergencyButton';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isAuthenticated } = useAuth();
  const iconSize = styles.iconSize.fontSize;

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerText}>OnAlert</Text>
        {isAuthenticated ? (
          <TouchableOpacity style={commonStyles.iconButton} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={iconSize} color={Colors.light.background} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={commonStyles.iconButton} onPress={() => navigation.navigate('Login')}>
            <Ionicons name="log-in-outline" size={iconSize} color={Colors.light.background} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[commonStyles.contentContainer, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
        {isAuthenticated && (
          <View style={commonStyles.grid}>
            <TouchableOpacity style={[commonStyles.gridItem, commonStyles.medicalButton]} onPress={() => navigation.navigate('MedicalRecords')}>
              <Ionicons name="document-text-outline" size={iconSize} color="#fff" />
              <Text style={commonStyles.gridItemText}>Registos Médicos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[commonStyles.gridItem, commonStyles.contactsButton]} onPress={() => navigation.navigate('EmergencyContacts')}>
              <MaterialIcons name="contacts" size={iconSize} color="#fff" />
              <Text style={commonStyles.gridItemText}>Contactos de Emergência</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={[commonStyles.gridItem, commonStyles.emergencyButton]}
          onPress={() => Linking.openURL('tel:112')}
        >
          <Ionicons name="call-outline" size={iconSize} color="#fff" />
          <Text style={commonStyles.gridItemText}>EMERGÊNCIA 112</Text>
        </TouchableOpacity>
        <EmergencyButton />
        <TouchableOpacity
          style={[commonStyles.gridItem, commonStyles.infoButton]}
          onPress={() => navigation.navigate('TOS')}
        >
          <Ionicons name="information-circle-outline" size={iconSize} color="#fff" />
          <Text style={commonStyles.gridItemText}>Informações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;