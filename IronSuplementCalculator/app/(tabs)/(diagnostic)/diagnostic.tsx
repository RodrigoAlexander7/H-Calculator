import { GetLocationButton, LocationPicker } from '@/location/components/LocationPicker'
import { ScrollView } from 'react-native'

export default function RegisterScreen() {
   return (
      <ScrollView>
         <GetLocationButton />
         <LocationPicker />
      </ScrollView>
  )
}
