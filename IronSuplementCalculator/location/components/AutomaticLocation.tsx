/*
UNUSED COMPONENT TO AVOID ERRORS WITH INTEGRATION
- After use the automatic locaition button (that works) the app cause
   error when tried to use a Text Input
*/

import * as Location from 'expo-location';
import { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';


export function AutomaticLocation(){
   // these are the locations from expo-location to get the phone location
   const [deviceLocation, setDeviceLocation] = useState<Location.LocationObject | null>(null);
   
   const getCurrentLocation = async () => {
      // using destructing to get the status property from Location.req...
      let {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted'){
         console.warn('Error Permission to acces location was denied');
         return;
      }

      let location = await Location.getCurrentPositionAsync();
      setDeviceLocation(location) 
   }

   return(
      <View>
         <Button mode='contained-tonal'
         onPress={
            ()=> {
               getCurrentLocation()
               console.log(JSON.stringify(deviceLocation))
            }
         }>
            Ubicacion Automatica
         </Button>
      </View>
   )
   
}