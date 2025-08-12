/* every single file inside app -> represent a route
 index.tsx is the '/' route
 
 if app/hello/index.tsx 
 index.tsx -> represent the route '/hello'
*/
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const route = useRouter();

  return (
    <View style={styles.container}>
      <Text>Bienenido!</Text>
      <Text>Esta Seccion aun esta en sesarrollo, vuelve pronto!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
