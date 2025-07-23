import { useState } from 'react';
import { Button, Picker, Text, View } from 'react-native-ui-lib';

export default function DiagnosticScreen() {
   type ProovinceItem = {
      label: string;
      value: number;
   }

   const items:ProovinceItem[] = [
      { label:'Opcion 01', value: 1,},
      { label:'Opcion 02', value: 2,}
   ]

   const [province,setProvince] = useState()
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
               onChange={setProvince}
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