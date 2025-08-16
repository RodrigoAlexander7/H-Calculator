import { Stack } from "expo-router";
export default function RegisterLayout(){
   return(
      <Stack screenOptions={{ headerTitle: 'Registro de Paciente'}}>
         <Stack.Screen name="register"/>
      </Stack>
   )
}