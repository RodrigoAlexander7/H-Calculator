import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CalculatorScree() {
   const route = useRouter()
   return(
      <View>
         <Text>Entry Point Screen</Text>
         <Button
            title = 'go to calculator screen'
            onPress = {()=> route.navigate('/calculator')}
         />
      </View>
   )
}
