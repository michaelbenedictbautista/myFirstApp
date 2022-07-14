import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
// import { MyComponent } from './components/MyComponent'
// import { MyButton } from './components/MyButton'
import { useState, useEffect, useRef } from 'react'
import constants from 'expo-constants'
import { ListItem } from './components/ListItem'
import { TouchableOpacity, Button } from 'react-native'
import { ListSeparator } from './components/ListSeparator'
import { ListEmpty } from './components/ListEmpty'
import { ListFooter } from './components/ListFooter'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
//import { createNativeStackNavigato, createAppContainer } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/AntDesign'

// import for navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import { HomeScreen } from './screens/HomeScreen';

// Import firebase config and initializeApp
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'

// Initialise firabase app
initializeApp( firebaseConfig )

const Stack = createNativeStackNavigator()


export default function App() {
  return (

    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component= {HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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


