/*
a _layout -> contains shared components in all the child routes  
*/
import { Stack } from "expo-router";

export default function RootLayout() {
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