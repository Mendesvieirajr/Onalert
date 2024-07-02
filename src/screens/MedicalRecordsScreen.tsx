import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Switch, FlatList } from 'react-native';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

type MedicalRecord = {
  id?: number;
  patientNumber: string;
  familyDoctor?: string;
  familyDoctorPhone?: string;
  healthCenter?: string;
  healthCenterLocation?: string;
  healthInsuranceNumber?: string;
  allergies?: string[];
  medication?: { name: string, startDate: string }[];
  vaccinesUpToDate: boolean;
  vitalWill: boolean;
  vitalWillExpiryDate?: string;
};

const MedicalRecordsScreen = () => {
  const { isAuthenticated } = useAuth();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [newRecord, setNewRecord] = useState<MedicalRecord>({
    patientNumber: '',
    vaccinesUpToDate: false,
    vitalWill: false,
  });
  const [showForm, setShowForm] = useState(false);

  const [showFamilyDoctorFields, setShowFamilyDoctorFields] = useState(false);
  const [showHealthCenterFields, setShowHealthCenterFields] = useState(false);
  const [showHealthInsuranceFields, setShowHealthInsuranceFields] = useState(false);
  const [showAllergiesFields, setShowAllergiesFields] = useState(false);
  const [showMedicationFields, setShowMedicationFields] = useState(false);
  const [allergy, setAllergy] = useState('');
  const [medication, setMedication] = useState({ name: '', startDate: '' });

  useEffect(() => {
    if (isAuthenticated) {
      fetchRecords();
    }
  }, [isAuthenticated]);

  const fetchRecords = async () => {
    try {
      const response = await api.get('/medical-records');
      setMedicalRecords(response.data);
    } catch (error: any) {
      console.error('Failed to fetch records:', error);
      Alert.alert('Error', `Failed to fetch records: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleSaveRecord = async () => {
    try {
      if (newRecord.id) {
        await api.put(`/medical-records/${newRecord.id}`, newRecord);
      } else {
        await api.post('/medical-records', newRecord);
      }
      Alert.alert('Success', 'Record saved successfully');
      setShowForm(false);
      setNewRecord({ patientNumber: '', vaccinesUpToDate: false, vitalWill: false });
      fetchRecords();
    } catch (error: any) {
      console.error('Failed to save record:', error);
      Alert.alert('Error', `Failed to save record: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleAddAllergy = () => {
    if (allergy) {
      setNewRecord(prevState => ({
        ...prevState,
        allergies: [...(prevState.allergies || []), allergy],
      }));
      setAllergy('');
    }
  };

  const handleAddMedication = () => {
    if (medication.name && medication.startDate) {
      setNewRecord(prevState => ({
        ...prevState,
        medication: [...(prevState.medication || []), medication],
      }));
      setMedication({ name: '', startDate: '' });
    }
  };

  const handleDeleteRecord = async (id: number) => {
    try {
      await api.delete(`/medical-records/${id}`);
      Alert.alert('Success', 'Record deleted successfully');
      fetchRecords();
    } catch (error: any) {
      console.error('Failed to delete record:', error);
      Alert.alert('Error', `Failed to delete record: ${error.response?.data?.error || error.message}`);
    }
  };

  const renderItem = ({ item }: { item: MedicalRecord }) => (
    <View style={styles.recordContainer}>
      <Text style={styles.label}>Número de Utente: {item.patientNumber}</Text>
      {item.familyDoctor && <Text style={styles.label}>Médico de Família: {item.familyDoctor}</Text>}
      {item.familyDoctorPhone && <Text style={styles.label}>Telefone do Médico: {item.familyDoctorPhone}</Text>}
      {item.healthCenter && <Text style={styles.label}>Centro de Saúde: {item.healthCenter}</Text>}
      {item.healthCenterLocation && <Text style={styles.label}>Localização: {item.healthCenterLocation}</Text>}
      {item.healthInsuranceNumber && <Text style={styles.label}>Número do Seguro: {item.healthInsuranceNumber}</Text>}
      {item.allergies && (
        <View>
          <Text style={styles.label}>Alergias:</Text>
          {item.allergies.map((allergy, index) => (
            <Text key={index} style={styles.subLabel}>{allergy}</Text>
          ))}
        </View>
      )}
      {item.medication && (
        <View>
          <Text style={styles.label}>Medicação:</Text>
          {item.medication.map((med, index) => (
            <Text key={index} style={styles.subLabel}>{med.name} (Início: {med.startDate})</Text>
          ))}
        </View>
      )}
      <Text style={styles.label}>Vacinas em Dia: {item.vaccinesUpToDate ? 'Sim' : 'Não'}</Text>
      <Text style={styles.label}>Testamento Vital: {item.vitalWill ? 'Sim' : 'Não'}</Text>
      {item.vitalWill && item.vitalWillExpiryDate && (
        <Text style={styles.label}>Data de Expiração: {new Date(item.vitalWillExpiryDate).toLocaleDateString()}</Text>
      )}
      <Button title="Editar" onPress={() => { setNewRecord(item); setShowForm(true); }} />
      <Button title="Deletar" onPress={() => handleDeleteRecord(item.id!)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {showForm ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.label}>Número de Utente</Text>
          <TextInput
            style={styles.input}
            value={newRecord.patientNumber}
            onChangeText={text => setNewRecord(prevState => ({ ...prevState, patientNumber: text }))}
            />
          <Text style={styles.label}>Tem médico de família?</Text>
          <Switch
            value={showFamilyDoctorFields}
            onValueChange={setShowFamilyDoctorFields}
          />
          {showFamilyDoctorFields && (
            <>
              <Text style={styles.label}>Médico de Família</Text>
              <TextInput
                style={styles.input}
                value={newRecord.familyDoctor}
                onChangeText={text => setNewRecord(prevState => ({ ...prevState, familyDoctor: text }))}
              />
              <Text style={styles.label}>Telefone do Médico de Família</Text>
              <TextInput
                style={styles.input}
                value={newRecord.familyDoctorPhone}
                onChangeText={text => setNewRecord(prevState => ({ ...prevState, familyDoctorPhone: text }))}
              />
            </>
          )}
          <Text style={styles.label}>Tem centro de saúde?</Text>
          <Switch
            value={showHealthCenterFields}
            onValueChange={setShowHealthCenterFields}
          />
          {showHealthCenterFields && (
            <>
              <Text style={styles.label}>Centro de Saúde</Text>
              <TextInput
                style={styles.input}
                value={newRecord.healthCenter}
                onChangeText={text => setNewRecord(prevState => ({ ...prevState, healthCenter: text }))}
              />
              <Text style={styles.label}>Localização do Centro de Saúde</Text>
              <TextInput
                style={styles.input}
                value={newRecord.healthCenterLocation}
                onChangeText={text => setNewRecord(prevState => ({ ...prevState, healthCenterLocation: text }))}
              />
            </>
          )}
          <Text style={styles.label}>Tem seguro de saúde?</Text>
          <Switch
            value={showHealthInsuranceFields}
            onValueChange={setShowHealthInsuranceFields}
          />
          {showHealthInsuranceFields && (
            <>
              <Text style={styles.label}>Número do Seguro de Saúde</Text>
              <TextInput
                style={styles.input}
                value={newRecord.healthInsuranceNumber}
                onChangeText={text => setNewRecord(prevState => ({ ...prevState, healthInsuranceNumber: text }))}
              />
            </>
          )}
          <Text style={styles.label}>Tem alergias?</Text>
          <Switch
            value={showAllergiesFields}
            onValueChange={setShowAllergiesFields}
          />
          {showAllergiesFields && (
            <>
              <Text style={styles.label}>Alergias</Text>
              <TextInput
                style={styles.input}
                value={allergy}
                onChangeText={setAllergy}
              />
              <Button title="Adicionar Alergia" onPress={handleAddAllergy} />
            </>
          )}
          <Text style={styles.label}>Está a fazer alguma medicação?</Text>
          <Switch
            value={showMedicationFields}
            onValueChange={setShowMedicationFields}
          />
          {showMedicationFields && (
            <>
              <Text style={styles.label}>Nome do Medicamento</Text>
              <TextInput
                style={styles.input}
                value={medication.name}
                onChangeText={text => setMedication(prevState => ({ ...prevState, name: text }))}
              />
              <Text style={styles.label}>Data de Início</Text>
              <TextInput
                style={styles.input}
                value={medication.startDate}
                onChangeText={text => setMedication(prevState => ({ ...prevState, startDate: text }))}
              />
              <Button title="Adicionar Medicamento" onPress={handleAddMedication} />
            </>
          )}
          <Text style={styles.label}>Vacinas em dia?</Text>
          <Switch
            value={newRecord.vaccinesUpToDate}
            onValueChange={value => setNewRecord(prevState => ({ ...prevState, vaccinesUpToDate: value }))}
          />
          <Text style={styles.label}>Tem testamento vital?</Text>
          <Switch
            value={newRecord.vitalWill}
            onValueChange={value => setNewRecord(prevState => ({ ...prevState, vitalWill: value }))}
          />
          {newRecord.vitalWill && (
            <>
              <Text style={styles.label}>Data de Expiração do Testamento Vital</Text>
              <TextInput
                style={styles.input}
                value={newRecord.vitalWillExpiryDate}
                onChangeText={text => setNewRecord(prevState => ({ ...prevState, vitalWillExpiryDate: text }))}
              />
            </>
          )}
          <Button title="Salvar Registro" onPress={handleSaveRecord} />
          <Button title="Cancelar" onPress={() => setShowForm(false)} />
        </ScrollView>
      ) : (
        <>
          <Button title="Adicionar Informações" onPress={() => setShowForm(true)} />
          {medicalRecords.length > 0 ? (
            <FlatList
              data={medicalRecords}
              renderItem={renderItem}
              keyExtractor={item => item.id!.toString()}
            />
          ) : (
            <Text>Nenhum registro disponível</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  recordContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default MedicalRecordsScreen;