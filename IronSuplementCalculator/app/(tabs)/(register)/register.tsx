import DateTimePicker from '@react-native-community/datetimepicker';

import { Patient, patientSchema } from '@/src/dto/patient.dto';
import dayjs from 'dayjs';
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, PaperProvider, RadioButton, TextInput } from 'react-native-paper';

export default function RegisterScreen(){
   const [name, setName] = useState('')
   const [lastname, setLastname] = useState('')
   const [birthDate, setBirthDate] = useState<dayjs.Dayjs>(dayjs())
   const [showPicker, setShowPicker] = useState<boolean>(false)
   const [gender, setGender] = useState<'M'| 'F'>('M')
   const [femaleAditional, SetFemaleAditional] = useState<'G'|'P'|null>(null)
   const [gestationTime, SetGestationTime] = useState<'1'|'2'|'3'|null>(null)



   const handleSubmit = ()=>{
      const patient:Patient = {
         name,
         lastname,
         birthDate: birthDate.toISOString(),
         gender,
         femaleState: femaleAditional,
         hbObserved: 0,
         hbFixed: 0,
         diagnostic: '',
         location: {
            department: 'notAsignedYet',
            province: 'notAsignedYet',
            district: 'notAsignedYet',
            town: 'notAsignedYet',
         }
      }
      const result = patientSchema.safeParse(patient)
      if(!result.success){
         console.log('Errors found', result.error.format())
      }
      console.log(result.data)

   }

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

               <Button mode='contained-tonal' onPress={()=>{handleSubmit()}
               }>
                  Registrar
               </Button>

            </View>
         </ScrollView>
      </PaperProvider>
   )
}