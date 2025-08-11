import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from 'react-native-ui-lib';
import "../utils/styles/styles";
import "../utils/styles/themes";

export default function RootLayout(){
   const colorScheme = useColorScheme();
   const backgroundTheme = colorScheme === 'dark'? DarkTheme : DefaultTheme
   Colors.setScheme(useColorScheme() === 'dark' ? 'dark' : 'light');

   return(
      <ThemeProvider value={backgroundTheme}>
         <Stack screenOptions={{
            headerShown:false,
         }}>
            <Stack.Screen name = "(tabs)"/>
         </Stack>
      </ThemeProvider>

   )
}