/* every single file inside app -> represent a route
 index.tsx is the '/' route
 
 if app/hello/index.tsx 
 index.tsx -> represent the route '/hello'
*/
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Bienvenido!</Text>
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
