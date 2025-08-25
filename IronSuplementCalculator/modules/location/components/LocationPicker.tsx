import { useLocationData } from '@/modules/location/hooks/useLocationData';
import { getPatientInfo } from '@/modules/patient/services/patient.service';
import { calculateDiagnostic, getPatientData } from '@/modules/patient/services/patientDiagnostic.service';
import { usePatientStore } from '@/modules/patient/store/patientStore';
import departments from '@/utils/json/departments.json';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Picker, TextField } from 'react-native-ui-lib';

export function LocationPicker() {

   const {
      location, setLocation,
      onLocationChange,
      departmentItems,
      provinceItems,
      districtItems,
      townItems,
   } = useLocationData()

   
   const [hb,setHb] = useState<string>('')

   // global patient data -> we import just the methods or const that we want to use
   const { patient,setPatientLocation,
      setHbFixed, setHbObserved,
      setDiagnostic
     } = usePatientStore()
   
   const handleSubmit = ()=>{
      const hbNum = Number(hb);
      const adjustHBNum = parseFloat(String(location.adjustHB).replace(',', '.')) || 0;
      const data = getPatientData(patient)
      const diagnosis = (calculateDiagnostic(
         data.dateBirth,
         data.gender || 'M',
         data.isGestant,
         data.isPuerper,
         data.gestationTime || '0',
         hb,
         location.adjustHB
      ))
      setPatientLocation(location)
      setHbFixed(hbNum)
      setHbObserved(adjustHBNum)
      setDiagnostic(diagnosis || 'No diagnostiic data')
   } 

   useEffect(()=>{
      console.log(JSON.stringify(patient))
   },[patient])

   return(
      <View >
         <View>
            <Text>HB Observada</Text>
            <TextField
               onChangeText={setHb}
               value= {hb}
               keyboardType="number-pad"
            />

         </View>

         <View >
            <Picker
               showSearch
               preset='outline'
               label='Selecciona Departamento'
               placeholder='Departamento'
               items = {departments}
               value={location.department}
               onChange={onLocationChange('department')}
            />
            <Picker
               preset='outline'
               label='Selecciona Provincia'
               placeholder='Provincia'
               editable={location.department !== ''}
               showSearch
               items = {provinceItems}
               value={location.province}
               onChange={onLocationChange('province')}
            />
            <Picker
               preset='outline'
               label='Selecciona Distrito'
               placeholder='Distrito'
               editable={location.province !== ''}
               showSearch
               items = {districtItems}
               value={location.district}
               onChange={onLocationChange('district')}
            />
            <Picker
               preset='outline'
               label='Selecciona Centro Poblado'
               placeholder='Centro Poblado'
               editable={location.district !== ''}
               showSearch
               items = {townItems}
               value={location.town}
               onChange={onLocationChange('town')}
            />

            <Text>Calcular diagnostico</Text>   
            <Button label ='Registrar'
               onPress = {handleSubmit}
            />
         </View>
         <Text>{patient.diagnostic + '\n'+
                getPatientInfo(patient)} </Text>   
      </View>
   )
}