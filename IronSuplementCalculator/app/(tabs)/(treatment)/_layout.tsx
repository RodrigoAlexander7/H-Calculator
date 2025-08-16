import { Stack } from "expo-router";
export default function CalculatorLayout() {
   return(
      
      <Stack screenOptions={{ headerTitle: 'Tratamiento'}}>
         <Stack.Screen name="index" />
         <Stack.Screen name="treatment" />
      </Stack>
   )
}