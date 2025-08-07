import { useLocationData } from '@/location/hooks/useLocationData';
import { usePatientStore } from '@/patient/store/patientStore';
import { calculateDiagnostic, getPatientData } from '@/utils/diagnostic';
import departments from '@/utils/json/departments.json';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { PaperProvider, TextInput } from 'react-native-paper';
import { Button, Picker } from 'react-native-ui-lib';


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

   // global patient data
   const { patient, setPatientLocation } = usePatientStore()
   
   return(
      <PaperProvider>
         <View >
            <View>

               <TextInput
                  label='HB Observada'
                  onChangeText={setHb}
                  value= {hb}
                  keyboardType='numeric'
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
               <Button
                  label='Calcular'   
                  onPress = {()=>{
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
                     setPatientLocation(location);
                  }}
               />
            </View>
            <Text>{diagnosis} </Text>   
         </View>
      </PaperProvider>
   )
}