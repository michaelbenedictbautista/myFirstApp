import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, } from 'react-native'
import { MyComponent } from './components/MyComponent'
import { MyButton } from './components/MyButton'
import { useState } from 'react'

export default function App() {
  const[ click, setClick ] = useState(0)
  return (
    <View style={styles.container}>
      <Text>Welcome Mike to your first app!</Text>
      <StatusBar style="auto" />
      <MyComponent text="Overriding 1st message from MyComponent class!" color="blue"  size={32}/>
      <MyComponent text="Overriding 2nd message from MyComponent class!" color="green" size={16}/>
      <MyButton />

 

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
