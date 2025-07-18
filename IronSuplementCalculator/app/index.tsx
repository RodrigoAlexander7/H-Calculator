/* every single file inside app -> represent a route
 index.tsx is the '/' route
 
 if app/hello/index.tsx 
 index.tsx -> represent the route '/hello'
*/
import { Link, useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const route = useRouter();

  return (
    <View style={styles.container}>
      <Text>Bienenido!</Text>
      <Link href='/details'> View </Link>
      <Button 
        title='Go to Details'
        onPress={()=> route.navigate('/details')} 
      />
      <Button 
        title='PONI'
        onPress={()=> route.navigate('https://www.youtube.com/watch?v=ckfrrtk7bgE')} 
      />
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
