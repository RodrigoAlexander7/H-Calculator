import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";


export default function TabLayout() {
   return (
      <Tabs screenOptions={{ headerShown: false }}>
         <Tabs.Screen 
            name="(register)"
            options={{
               title: 'Registro',
               tabBarIcon: ({color,size}) => (
                  <FontAwesome5
                     name="user-plus"
                     size={size}
                     color={color}
                  />
               )
            }}
         />
         <Tabs.Screen 
            name="(diagnostic)"
            options={{
               title: 'Diagnostico',
               tabBarIcon: ({color,size}) => (
                  <MaterialIcons 
                     name="medical-services" 
                     size={size} 
                     color={color}  
                  />
               )
            }}
         />
         <Tabs.Screen name="(treatment)"
            options={{
               title: 'Tratamiento',
               tabBarIcon: ({color,size}) => (
                  <FontAwesome6 
                     name="hand-holding-medical" 
                     size={size} 
                     color={color} 
                  />
               )
            }} />
         <Tabs.Screen name="(profile)"
            options={{
               title: 'Perfil',
               tabBarIcon: ({color,size}) => (
                  <FontAwesome5 
                     name="user-alt" 
                     size={size} 
                     color={color}
                  />
               )
            }} />
      </Tabs>
   )
}
