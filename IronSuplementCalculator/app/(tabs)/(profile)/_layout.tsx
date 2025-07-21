/*
a _layout -> contains shared UI in all the child routes  
*/
import { Stack } from "expo-router";
// the layout inside app contains the RootLayout (the entry point)
export default function ProfileLayout() {
  return (
    <Stack screenOptions={stylesScreenOptions}>
      <Stack.Screen name="index" />
      <Stack.Screen name="details" />
    </Stack>
  );
}

const stylesScreenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold' as 'bold',
  },
}