import { Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff'
  },
  title: {
    fontSize: 24,
    color: 'black'
  },
});

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido!</Text>
      <Button title="Iniciar cálculos" />
    </View>
  );
}
