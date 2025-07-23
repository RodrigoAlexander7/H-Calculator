import { useState } from 'react';
import { Button, Picker, PickerValue, Text, View } from 'react-native-ui-lib';
import department_province from '../../../utils/department_province.json';
import departments from '../../../utils/departments.json';

type Location = string

export default function DiagnosticScreen() {
   const [department,setDepartment] = useState<Location>('')
   const [province,setProvince] = useState<Location>('')

   const provinceList = 
   department_province.find((d) => d.department === department)?.province || []

   const provinceItems = 
   provinceList.map((prov)=>(
      {
         label: prov,
         value: prov
      }
   ))

   const onLocationChange = (key:'department'|'province') =>(value:PickerValue) => {
      if(typeof value !== 'string'){
         console.warn('invalid province value')
         return
      } 
      
      if(key === 'department'){
         setDepartment(value)
         setProvince('')
      } 
      if(key === 'province') setProvince(value)
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
               value={department}
               onChange={onLocationChange('department')}
            />
            <Picker
               preset='outline'
               label='Selecciona Provincia'
               labelColor= 'black'
               placeholder='Provincia'
               items = {provinceItems}
               value={province}
               onChange={onLocationChange('province')}
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