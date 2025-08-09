import { usePatientForm } from '@/patient/hooks/usePatientForm';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, RadioButton, RadioGroup, TextField } from 'react-native-ui-lib';
import { usePatientStore } from '../store/patientStore';

   dayjs.locale('es');

   export function PatientForm() {
      const [showPicker, setShowPicker] = useState<boolean>(false);
      const [auxWeight, setAuxWeight] = useState<string>('');

      const {
         idDocument, setIdDocument,
         birthDate, setBirthDate,
         gender, setGender,
         weight, setWeight,
         femaleAditional, setFemaleAditional,
         gestationTime, setGestationTime,
         patient,
         isValid,
      } = usePatientForm();

      const handleDateChange = (event: any, selectedDate?: Date) => {
         // En Android llega event.type: 'set' | 'dismissed'
         if (event?.type === 'dismissed') {
         setShowPicker(false);
         return;
         }
         if (selectedDate) {
         setBirthDate(dayjs(selectedDate));
         }
         // En iOS también cerramos luego de seleccionar
         setShowPicker(false);
      };

      return (
         <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>
            Registro de Paciente
            </Text>

            <View style={{ gap: 16 }}>
            <View>
               <Text>Ingrese DNI</Text>
               <TextField
                  onChangeText={setIdDocument}
                  value={idDocument}
                  keyboardType="number-pad"
                  maxLength={8}
               />

               <Text>Peso del paciente</Text>
               <TextField
                  onChangeText = {setAuxWeight}
                  value={auxWeight}
                  keyboardType="number-pad"
               />


            </View>

            <View>
               <Text>Fecha de nacimiento</Text>
               <TouchableOpacity onPress={() => setShowPicker(true)}>
                  <TextField
                     editable={false}
                     value={birthDate ? dayjs(birthDate).format('DD-MMMM-YYYY') : ''}
                     pointerEvents="none"
                  />
               </TouchableOpacity>

         
               {showPicker &&
                  <DateTimePicker
                     mode="date"
                     display={Platform.OS === 'ios' ? 'compact' : 'calendar'}
                     value={birthDate?.toDate?.() ?? new Date()}
                     maximumDate={new Date()}
                     onChange={handleDateChange}
                  />
               }
            </View>

            <View>
               <Text>Seleccione Género</Text>
               <RadioGroup
                  onValueChange={(v: string) => {
                  if (v === 'F') setGender(v);
                  if (v === 'M') {
                     setGender(v);
                     setFemaleAditional(null);
                  }
                  }}
                  initialValue={gender}
               >
                  <RadioButton label="Masculino" value="M" />
                  <RadioButton label="Femenino" value="F" />
               </RadioGroup>
            </View>

            
            <View style={gender === 'F' ? {} : { display: 'none' }}>
               <Text>Por favor especifique</Text>
               <RadioGroup
                  onValueChange={(v: string) => {
                     if (v === 'G' || v === 'P') setFemaleAditional(v);
                     else if (v === '') setFemaleAditional(null);
                  }}
                  initialValue={femaleAditional || ''}
               >
                  <RadioButton label="Sin Adicional" value="" />
                  <RadioButton label="Gestante" value="G" />
                  <RadioButton label="Puerpera" value="P" />
               </RadioGroup>
            </View>
            

            <View style={femaleAditional === 'G' ? {} : { display: 'none' }} >
               <Text>Tiempo de Gestación</Text>
               <RadioGroup
                  onValueChange={(v: string) => {
                     if (v === '1' || v === '2' || v === '3') setGestationTime(v);
                  }}
                  initialValue={gestationTime || '1'}
               >
                  <RadioButton label="1er Trimestre" value="1" />
                  <RadioButton label="2do Trimestre" value="2" />
                  <RadioButton label="3er Trimestre" value="3" />
               </RadioGroup>
            </View>

            <Button
               label="Registrar"
               disabled={!isValid()}
               onPress={() => {
                  if (!isValid()) return;
                  setWeight(Number(auxWeight))
                  usePatientStore.getState().setPatient(patient);
                  router.push('/(tabs)/(diagnostic)/diagnostic');
               }}
            />
            </View>
         </ScrollView>
      );
   }
