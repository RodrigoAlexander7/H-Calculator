import { Stack } from "expo-router";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout(){
   return(
       <GestureHandlerRootView style={{ flex: 1 }}>
         <SafeAreaProvider>
            <Stack screenOptions={{headerShown:false}}>
               <Stack.Screen name = "(tabs)"/>
            </Stack>
         </SafeAreaProvider>

       </GestureHandlerRootView>

   )
}