import { LocationPicker } from '@/features/location/components/LocationPicker'
import { router } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { Button } from 'react-native-ui-lib'

export default function RegisterScreen() {
   return (
      <ScrollView>
         <LocationPicker />
         
         <View>
            <Button label='Ir a Tratamiento'
               onPress = {()=>{
                  router.navigate('/(tabs)/(treatment)/treatment')
               }}      
            
            />
         </View>
      </ScrollView>
  )
}
