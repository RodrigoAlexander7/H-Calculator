import { Tabs } from "expo-router";

export default function TabLayout() {
   return(
      <Tabs screenOptions={{headerShown:false}}>
         <Tabs.Screen name = "(register)"/>
         <Tabs.Screen name = "(diagnostic)"/>
         <Tabs.Screen name = "(treatment)"/>
         <Tabs.Screen name = "(profile)"/>
      </Tabs>
   )
}
