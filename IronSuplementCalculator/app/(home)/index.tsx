import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { Button } from 'react-native-ui-lib';


const commonButtonStyle = {
   width: 300,
   marginVertical: 8,
   borderRadius: 50
};

const blurhash =
   '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function RegisterScreen() {
   const route = useRouter()
   return (
      <ScrollView
         style={{ flex: 1 }}
         contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <Text style={styles.text}>Dosis de Fe</Text>
         <View style={styles.container}>
            <Image
               style={styles.image}
               source={require('../../assets/icons/ImageIcon.png')}
               placeholder={{ blurhash }}
               contentFit="cover"
               transition={1000}
            />
         </View>
         <Button label="Calcular dosis" size={Button.sizes.large} style={commonButtonStyle} 
         onPress ={()=> route.navigate('/(tabs)/(register)/register')} />
         <Button label="Valores Normales de HB" size={Button.sizes.large} style={commonButtonStyle} />
         <Button label="Ajuste por altura" size={Button.sizes.large} style={commonButtonStyle} />
         <Button label="Tipo de suplementacion" size={Button.sizes.large} style={commonButtonStyle} />
      </ScrollView>
   );
}
const styles = StyleSheet.create({
   container: {
      backgroundColor: '#ffffffff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   image: {
      width: 250,
      height: 250,
      borderRadius: 50,
   },
   text: {
      fontSize: 25,
      fontWeight: 'bold'
   }
});