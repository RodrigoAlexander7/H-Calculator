import { useLocationData } from '@/features/location/hooks/useLocationData';
import { usePatientStore } from '@/features/patient/store/patientStore';
import { calculateDiagnostic, getPatientData } from '@/utils/diagnostic';
import departments from '@/utils/json/departments.json';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Picker, TextField } from 'react-native-ui-lib';


export function LocationPicker() {

   const {
      location, setLocation,
      onLocationChange,
      departmentItems,
      provinceItems,
      districtItems,
      townItems
   } = useLocationData()

   const [diagnosis ,setDiagnosis] = useState<string|undefined>('')
   
   const [hb,setHb] = useState<string>('')

   // global patient data -> we import just the methods or const that we want to use
   const { patient,setPatientLocation  } = usePatientStore()
   
   return(
      <View >
         <View>
            <Text>HB Observada</Text>
            <TextField
               onChangeText={setHb}
               value= {hb}
               keyboardType="number-pad"
               style={
                  {backgroundColor: 'white'}
               }
            />

         </View>

         <View >
            <Picker
               showSearch
               preset='outline'
               label='Selecciona Departamento'
               labelColor= 'black'
               placeholder='Departamento'
               items = {departments}
               value={location.department}
               onChange={onLocationChange('department')}
            />
            <Picker
               preset='outline'
               label='Selecciona Provincia'
               labelColor= 'black'
               placeholder='Provincia'
               editable={location.department !== ''}
               showSearch
               searchStyle={{color:'black'}}
               items = {provinceItems}
               value={location.province}
               onChange={onLocationChange('province')}
            />
            <Picker
               preset='outline'
               label='Selecciona Distrito'
               labelColor= 'black'
               placeholder='Distrito'
               editable={location.province !== ''}
               showSearch
               searchStyle={{color:'black'}}
               items = {districtItems}
               value={location.district}
               onChange={onLocationChange('district')}
            />
            <Picker
               preset='outline'
               label='Selecciona Centro Poblado'
               labelColor= 'black'
               placeholder='Centro Poblado'
               editable={location.district !== ''}
               showSearch
               searchStyle={{color:'black'}}
               items = {townItems}
               value={location.town}
               onChange={onLocationChange('town')}
            />

            <Text>Calcular diagnostico</Text>   
            <Button label ='Registrar'
               onPress = {()=>{
                  setPatientLocation(location);
                  console.log(location)
                  console.log(location.adjustHB)
                  const data = getPatientData(patient)
                  console.log(`print data ${JSON.stringify(data)}\n`)
                  setDiagnosis(calculateDiagnostic(
                     data.dateBirth,
                     data.gender || 'M',
                     data.isGestant,
                     data.isPuerper,
                     data.gestationTime || '0',
                     hb,
                     location.adjustHB
                  ))
                  
                  console.log(patient)
               }}
            />
         </View>
         <Text>{diagnosis} </Text>   
      </View>
   )
}