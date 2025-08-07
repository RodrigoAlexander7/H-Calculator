import { useLocationData } from '@/location/hooks/useLocationData';
import { usePatientStore } from '@/patient/store/patientStore';
import { calculateDiagnostic, getPatientData } from '@/utils/diagnostic';
import departments from '@/utils/json/departments.json';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Picker } from 'react-native-ui-lib';

export function GetLocationButton(){
   // these are the locations from expo-location to get the phone location
   const [deviceLocation, setDeviceLocation] = useState<Location.LocationObject | null>(null);
   useEffect(()=>{
      async function getCurrentLocation(){
         // using destructing to get the status property from Location.req...
         let {status} = await Location.requestForegroundPermissionsAsync()
         if (status !== 'granted'){
            console.warn('Error Permission to acces location was denied');
            return;
         }

         let location = await Location.getCurrentPositionAsync();
         setDeviceLocation(location) 
      }
      getCurrentLocation()
   },[]);
   return(
      <View>
         <Button mode='contained-tonal'
         onPress={
            ()=> console.log(JSON.stringify(deviceLocation))
         }>
            Ubicacion Automatica
         </Button>
      </View>
   )
   
}

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
            <Button mode='contained-tonal' 
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
                  console.log(patient)
               }}
            >Calcular</Button>
         </View>
         <Text>{diagnosis} </Text>   
      </View>
   )
}