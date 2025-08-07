import { LocationPicker } from '@/location/components/LocationPicker'
import { ScrollView } from 'react-native'
import { PaperProvider } from 'react-native-paper'

export default function RegisterScreen() {
  return (
    <PaperProvider>
      <ScrollView>
        <LocationPicker />
      </ScrollView>
    </PaperProvider>
  )
}
