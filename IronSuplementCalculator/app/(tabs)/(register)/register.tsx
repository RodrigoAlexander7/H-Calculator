import { PatientForm } from '@/patient/components/PatientForm'
import { ScrollView } from 'react-native'
import { PaperProvider } from 'react-native-paper'

export default function RegisterScreen() {
  return (
    <PaperProvider>
      <ScrollView>
        <PatientForm />
      </ScrollView>
    </PaperProvider>
  )
}
