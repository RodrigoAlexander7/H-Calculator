import { Button, Text, View } from 'react-native-ui-lib';

export default function DiagnosticScreen() {
   return(
      <View useSafeArea>
         <View centerH>
            <Text>Calcular diagnostico</Text>   
            <Button
               label='Calcular'   
               onPress = {()=>console.log('si funka')}
            />
         </View>   
      </View>
   )
}