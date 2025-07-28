import { Stack } from "expo-router";
export default function CalculatorLayout() {
   return(
      <Stack>
         <Stack.Screen name="calculator" />
         <Stack.Screen name="index" />
      </Stack>
   )
}