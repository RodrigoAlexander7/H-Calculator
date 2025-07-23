import { useState } from 'react';
import { Button, Picker, PickerValue, Text, View } from 'react-native-ui-lib';
import departments from '../../../utils/departments.json';

type Province = string

export default function DiagnosticScreen() {
   const [province,setProvince] = useState<Province>('')



   const onDataChange = (value:PickerValue) => {
      if(typeof value === 'string') setProvince(value)
      else console.warn('invalid province value')
   }

   return(
      <View useSafeArea>
         <View centerH>
            <Picker
               preset='outline'
               label='Selecciona Departamento'
               labelColor= 'black'
               placeholder='Departamento'
               items = {departments}
               value={province}
               onChange={onDataChange}
            />

            <Text>Calcular diagnostico</Text>   
            <Button
               label='Calcular'   
               onPress = {()=>console.log('si funka')}
            />
         </View>   
      </View>
   )
}