import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MyComponent } from './components/MyComponent'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello there, this is your first App!</Text>
      <StatusBar style="auto" />
      <MyComponent text = "Make this colour red!"  color = "red" size = {32} />
      <MyComponent text = "Make this colour green!" color = "green" size = {16} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  



});
