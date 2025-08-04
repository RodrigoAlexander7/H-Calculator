import DateTimePicker from '@react-native-community/datetimepicker';

import { usePatientForm } from '@/hooks/usePatientForm';
import dayjs from 'dayjs';
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, PaperProvider, RadioButton, TextInput } from 'react-native-paper';

export function PatientForm(){
   const [showPicker, setShowPicker] = useState<boolean>(false)
   
   const {
      name, setName,
      lastname, setLastname,
      birthDate, setBirthDate,
      gender, setGender,
      femaleAditional, SetFemaleAditional,
      gestationTime, SetGestationTime,
      patient,
      isValid,
   } = usePatientForm()


   return(
      <PaperProvider>
         <ScrollView>
            <Text>Registro de Paciente</Text>
            <View>
               <TextInput
                  label= 'Ingrese Nombre'
                  style={{backgroundColor:'white'}}
                  onChangeText = {setName}
                  value={name}
               />
               <TextInput
                  label= 'Ingrese Apellido'
                  style={{backgroundColor:'white'}}
                  onChangeText={setLastname}
                  value={lastname}
               />

               <TouchableOpacity onPress={()=> setShowPicker(true)}> 
                  <TextInput
                     label='Fecha de Nacimiento'
                     editable={false}
                     style={{backgroundColor:'white'}}
                     value = {dayjs(birthDate).format('DD-MMMM-YYYY')}
                  />
               </TouchableOpacity>

               {showPicker && (
                  <DateTimePicker
                  mode= 'date'
                  display='compact'
                  value={birthDate.toDate()}   
                  onChange={(e, selectDate)=>{
                     selectDate && setBirthDate(dayjs(selectDate))
                     setShowPicker(false)
                  }}   
               />
               )}
               <Text>Seleccione Genero</Text>
               <RadioButton.Group onValueChange={(v)=>{
                  if(v === 'M' ||v === 'F') setGender(v)
               }} value = {gender}>
                  <RadioButton.Item label='Masculino' value='M'/>
                  <RadioButton.Item label='Femenino' value='F'/>
               </RadioButton.Group>

               {gender === 'F' && (
                  <View>
                     <Text>Por favor especifique</Text>                  
                     <RadioButton.Group onValueChange={(v)=>{
                        if(v === 'G'||v==='P')   SetFemaleAditional(v)
                        else if (v === '') SetFemaleAditional(null)
                     }} value = {''}>
                        <RadioButton.Item label='Sin Adicional' value=''/>
                        <RadioButton.Item label='Gestante' value='G'/>
                        <RadioButton.Item label='Puerpera' value='P'/>
                     </RadioButton.Group> 
                  </View>
               )}

               {femaleAditional === 'G' && (
                  <View>
                     <Text>Tiempo de Gestacion</Text>                  
                     <RadioButton.Group onValueChange={(v)=>{
                        if(v ==='1'||v==='2' || v==='3') SetGestationTime(v)
                     }} value = {'1'}>
                        <RadioButton.Item label='1er Trimestre' value='1'/>
                        <RadioButton.Item label='2do Trimestre' value='2'/>
                        <RadioButton.Item label='3er Trimestre' value='3'/>
                     </RadioButton.Group> 
                  </View>
               )}

               <Button mode='contained-tonal' onPress={()=>{
                  console.log(patient)  
                  if(isValid()) return patient
                  }
               }>
                  Registrar
               </Button>

            </View>
         </ScrollView>
      </PaperProvider>
   )
}