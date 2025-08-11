import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CalculatorScree() {
   const route = useRouter()
   return(
      <View>
         <Text>Entry Point Screen</Text>
         <Button
            title = 'go to main screen'
            onPress = {()=> route.navigate('/(tabs)/(register)/register')}
         />
      </View>
   )
}
