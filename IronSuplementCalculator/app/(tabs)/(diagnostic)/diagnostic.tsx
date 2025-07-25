import { useState } from 'react';
import { Button, Picker, PickerValue, Text, View } from 'react-native-ui-lib';
import department_province from '../../../utils/department_province.json';
import departments from '../../../utils/departments.json';
import district_town from '../../../utils/district_town.json';
import province_district from '../../../utils/province_district.json';
import townAdjustHbJson from '../../../utils/town_adjustHB.json';

// adding this cause otherwise don't read it cause is too large
const town_adjustHB:       TupleJson = townAdjustHbJson       as TupleJson;

type Location = string
type LocationKey = 'department'|'province'|'district'|'town'|'adjustHB'
type Tuple = {
   location: string;
   sublocation: string[];
}
type TupleJson = Tuple[]


const getItem = (tuple: TupleJson, location:Location) => {
   const locationList = tuple.find((d) => d.location === location )?.sublocation || []
   const sublocation = locationList.map((sub)=>(
      {
         label: sub,
         value: sub,
      }
   ))
   return sublocation
}


export default function DiagnosticScreen() {
   const [department,setDepartment] = useState<Location>('')
   const [province,setProvince] = useState<Location>('')
   const [district,setDistrict] = useState<Location>('')
   const [town,setTown] = useState<Location>('')
   const [adjustHB,setAdjustHB] = useState<Location>('')

   const provinceItems = getItem(department_province, department)
   const districtItems = getItem(province_district, province)
   const townItems = getItem(district_town, district)


   const onLocationChange = (key:LocationKey) =>(value:PickerValue) => {
      if(typeof value !== 'string'){
         console.warn('invalid province value')
         return
      } 
      if(key === 'department'){
         setDepartment(value)
         setProvince('')
      } 
      if(key === 'province'){
         setProvince(value)
      } 
      if(key === 'district'){
         setDistrict(value)
      }
      if(key === 'town'){
         setTown(value)
         const numberHB = getItem(town_adjustHB, value)
         setAdjustHB(numberHB[0].value)
      }
      if(key === 'adjustHB'){
      }
   }

   return(
      <View useSafeArea>
         <View centerH>
            <Picker
               showSearch
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
               editable={department !== ''}
               showSearch
               searchStyle={{color:'black'}}
               items = {provinceItems}
               value={province}
               onChange={onLocationChange('province')}
            />
            <Picker
               preset='outline'
               label='Selecciona Distrito'
               labelColor= 'black'
               placeholder='Distrito'
               editable={province !== ''}
               showSearch
               searchStyle={{color:'black'}}
               items = {districtItems}
               value={district}
               onChange={onLocationChange('district')}
            />
            <Picker
               preset='outline'
               label='Selecciona Centro Poblado'
               labelColor= 'black'
               placeholder='Centro Poblado'
               editable={district !== ''}
               showSearch
               searchStyle={{color:'black'}}
               items = {townItems}
               value={town}
               onChange={onLocationChange('town')}
            />

            <Text>Calcular diagnostico</Text>   
            <Button
               label='Calcular'   
               onPress = {()=>console.log(adjustHB)}
            />
         </View>   
      </View>
   )
}