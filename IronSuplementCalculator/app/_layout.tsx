import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout(){
   const colorScheme = useColorScheme();
   const backgroundColor = colorScheme === 'dark'? '#000000' : '#eae9e9ff'

   return(
      <Stack 
         screenOptions={{
            headerShown:false,
            contentStyle:{
               backgroundColor:backgroundColor,
            }

         }}>
         <Stack.Screen name = "(tabs)"/>
      </Stack>
   )
}