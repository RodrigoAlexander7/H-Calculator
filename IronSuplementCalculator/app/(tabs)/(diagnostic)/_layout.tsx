import { Stack } from "expo-router";
export default function DiagnosticLayout(){
   return(
      <Stack screenOptions={{ headerTitle: 'Diagnostico de Paciente'}}>
         <Stack.Screen name="diagnostic"/>
      </Stack>
   )
}