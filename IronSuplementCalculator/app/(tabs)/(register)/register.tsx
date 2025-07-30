import DateTimePicker from '@react-native-community/datetimepicker';

import dayjs from 'dayjs';
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, PaperProvider, RadioButton, TextInput } from 'react-native-paper';

export default function RegisterScreen(){
   const [name, setName] = useState('')
   const [lastname, setLastname] = useState('')
   const [date, setDate] = useState<dayjs.Dayjs>(dayjs())
   const [showPicker, setShowPicker] = useState<boolean>(false)
   const [gender, setGender] = useState<string>('')
   const [fameleAditional, SetFameleAditional] = useState<string>('none')
   const [gestationTime, SetGestationTime] = useState<string>('none')

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
                     value = {dayjs(date).format('DD-MMMM-YYYY')}
                  />
               </TouchableOpacity>

               {showPicker && (
                  <DateTimePicker
                  mode= 'date'
                  display='compact'
                  value={date.toDate()}   
                  onChange={(e, selectDate)=>{
                     selectDate && setDate(dayjs(selectDate))
                     setShowPicker(false)
                  }}   
               />
               )}
               <Text>Seleccione Genero</Text>
               <RadioButton.Group onValueChange={setGender} value = {gender}>
                  <RadioButton.Item label='Masculino' value='M'/>
                  <RadioButton.Item label='Femenino' value='F'/>
               </RadioButton.Group>

               {gender === 'F' && (
                  <View>
                     <Text>Por favor especifique</Text>                  
                     <RadioButton.Group onValueChange={SetFameleAditional} value = {fameleAditional}>
                        <RadioButton.Item label='Sin Adicional' value='none'/>
                        <RadioButton.Item label='Gestante' value='G'/>
                        <RadioButton.Item label='Puerpera' value='P'/>
                     </RadioButton.Group> 
                  </View>
               )}

               {fameleAditional === 'G' && (
                  <View>
                     <Text>Tiempo de Gestacion</Text>                  
                     <RadioButton.Group onValueChange={SetGestationTime} value = {gestationTime}>
                        <RadioButton.Item label='1er Trimestre' value='1'/>
                        <RadioButton.Item label='2do Trimestre' value='2'/>
                        <RadioButton.Item label='3er Trimestre' value='3'/>
                     </RadioButton.Group> 
                  </View>
               )}

               <Button mode='contained-tonal'>
                  Registrar
               </Button>

            </View>
         </ScrollView>
      </PaperProvider>
   )
}