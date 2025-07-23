import { useState } from 'react';
import { Button, Picker, PickerValue, Text, View } from 'react-native-ui-lib';

type Province = string

export default function DiagnosticScreen() {
   const [province,setProvince] = useState<Province>('')

   const items = [
      { label:'Arequipa', value: 'arequipa',},
      { label:'Lima', value: 'lima',}
   ]

   const onProvinceChange = (value:PickerValue) => {
      if(typeof value === 'string') setProvince(value)
      else console.warn('invalid province value')
   }

   return(
      <View useSafeArea>
         <View centerH>
            <Picker
               preset='outline'
               label='Selecciona Provincia'
               labelColor= 'black'
               placeholder='Provincia'
               items = {items}
               value={province}
               onChange={onProvinceChange}
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