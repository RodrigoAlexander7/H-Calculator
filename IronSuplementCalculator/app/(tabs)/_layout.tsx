import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";


export default function TabLayout() {
   return (
      <Tabs screenOptions={{ headerShown: false }}>
         <Tabs.Screen name="(register)"
            options={{
               title: 'Registro',
               tabBarIcon: () => (
                  <FontAwesome5
                     name="user-plus"
                     size={24}
                     color='#4a9fffff'
                  />
               )
            }}
         />
         <Tabs.Screen name="(diagnostic)"
            options={{
               title: 'Diagnostico',
               tabBarIcon: () => (
                  <MaterialIcons 
                     name="medical-services" 
                     size={24} 
                     color='#4a9fffff' 
                  />
               )
            }}
         />
         <Tabs.Screen name="(treatment)"
            options={{
               title: 'Tratamiento',
               tabBarIcon: () => (
                  <FontAwesome6 
                     name="hand-holding-medical" 
                     size={24} 
                     color="#4a9fffff" 
                  />
               )
            }} />
         <Tabs.Screen name="(profile)"
            options={{
               title: 'Perfil',
               tabBarIcon: () => (
                  <FontAwesome5 
                     name="user-alt" 
                     size={22} 
                     color="#4a9fffff"
                  />
               )
            }} />
      </Tabs>
   )
}
