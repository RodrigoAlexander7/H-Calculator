import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout(){
   const colorScheme = useColorScheme();
   const backgroundTheme = colorScheme === 'dark'? DarkTheme : DefaultTheme

   return(
      <ThemeProvider value={backgroundTheme}>
         <Stack>
            <Stack.Screen name = "(tabs)"/>
         </Stack>
      </ThemeProvider>

   )
}