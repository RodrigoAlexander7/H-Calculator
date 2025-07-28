import DateTimePicker from '@react-native-community/datetimepicker';

import dayjs from 'dayjs';
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from 'react-native-paper';

export default function RegisterScreen(){
   const [name, setName] = useState('')
   const [lastname, setLastname] = useState('')
   const [date, setDate] = useState(dayjs())
   console.log(date)
   const [showPicker, setShowPicker] = useState(false)


   return(
      <View>
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

         </View>
      </View>
   )
}