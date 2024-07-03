// MedicalRecordsScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Switch, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import commonStyles from '../constants/styles';

type MedicalRecord = {
  id?: number;
  patientNumber: string;
  familyDoctor?: string;
  familyDoctorPhone?: string;
  healthCenter?: string;
  healthCenterLocation?: string;
  healthInsuranceNumber?: string;
  allergies?: string[];
  medication?: { name: string; startDate: string }[];
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
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      <TouchableOpacity style={styles.editButton} onPress={() => { setNewRecord(item); setShowForm(true); }}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRecord(item.id!)}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const handleDateChange = (event: any, date: any) => {
    setShowDatePicker(false);
    if (date) {
      setNewRecord(prevState => ({ ...prevState, vitalWillExpiryDate: date.toISOString() }));
    }
  };

  return (
    <View style={styles.container}>
      {showForm ? (
        <ScrollView contentContainerStyle={styles.formContainer}>
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
            style={styles.switchContainer}
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
            style={styles.switchContainer}
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
            style={styles.switchContainer}
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
            style={styles.switchContainer}
          />
          {showAllergiesFields && (
            <>
              <Text style={styles.label}>Alergias</Text>
              <View style={styles.allergyContainer}>
                <TextInput
                  style={styles.input}
                  value={allergy}
                  onChangeText={setAllergy}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddAllergy}>
                  <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
              {newRecord.allergies && newRecord.allergies.map((item, index) => (
                <View key={index} style={styles.allergyItem}>
                  <Text style={styles.subLabel}>{item}</Text>
                  <TouchableOpacity onPress={() => {
                    setNewRecord(prevState => ({
                      ...prevState,
                      allergies: prevState.allergies?.filter((_, i) => i !== index)
                    }));
                  }}>
                    <Text style={styles.removeButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
          <Text style={styles.label}>Está a fazer alguma medicação?</Text>
          <Switch
            value={showMedicationFields}
            onValueChange={setShowMedicationFields}
            style={styles.switchContainer}
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
              <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
              {newRecord.medication && newRecord.medication.map((med, index) => (
                <View key={index} style={styles.allergyItem}>
                  <Text style={styles.subLabel}>{med.name} (Início: {med.startDate})</Text>
                  <TouchableOpacity onPress={() => {
                    setNewRecord(prevState => ({
                      ...prevState,
                      medication: prevState.medication?.filter((_, i) => i !== index)
                    }));
                  }}>
                    <Text style={styles.removeButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
          <Text style={styles.label}>Vacinas em dia?</Text>
          <Switch
            value={newRecord.vaccinesUpToDate}
            onValueChange={value => setNewRecord(prevState => ({ ...prevState, vaccinesUpToDate: value }))}
            style={styles.switchContainer}
          />
          <Text style={styles.label}>Tem testamento vital?</Text>
          <Switch
            value={newRecord.vitalWill}
            onValueChange={value => setNewRecord(prevState => ({ ...prevState, vitalWill: value }))}
            style={styles.switchContainer}
          />
          {newRecord.vitalWill && (
            <>
              <Text style={styles.label}>Data de Expiração do Testamento Vital</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{newRecord.vitalWillExpiryDate ? new Date(newRecord.vitalWillExpiryDate).toLocaleDateString() : 'Selecione a data'}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={newRecord.vitalWillExpiryDate ? new Date(newRecord.vitalWillExpiryDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecord}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowForm(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
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
            <Text style={styles.noRecordsText}>Nenhum registro disponível</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  switchContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noRecordsText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  allergyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  allergyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  removeButtonText: {
    color: 'red',
  },
  editButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default MedicalRecordsScreen;