import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
// import { MyComponent } from './components/MyComponent'
// import { MyButton } from './components/MyButton'
import { useState } from 'react'
import constants from 'expo-constants'
import { ListItem } from './components/ListItem'
import { TouchableOpacity } from 'react-native'


export default function App() {
  //const[ click, setClick ] = useState(0)

  const LIST = [
    { id: '1', name: 'Banana', status: false},
    { id: '2', name: 'Pineapple', status: false},
    { id: '3', name: 'Eggplant', status: false},
    { id: '4', name: 'Durian', status: false},
  ]

  // Application state
  const [ListData, setListData] = useState(LIST)

  const [input, setInput] = useState('')

  // Function to add input value to the ListData (adding item to our list) 
  const addItem = () => {
    //console.log ('Pressed'); // Test
    // Timestamp to generate unique ID
    let newId = new Date().getTime()
    let newItem = {id: newId, name: input, status: false}
    let newList = ListData.concat( newItem )
    setListData(newList)
  }

  // Function to render list item
  const renderItem = ({item}) => (
    // <View style={ [styles.listItem, styles.listBackground] }>
    //   <Text style={styles.listText}> {item.name} </Text>   
    // </View>

    <ListItem item = {item} />
  )
  
  return (
    <View style={styles.container}>
      {/* <Text>Welcome Mike to your first app!</Text>
      <StatusBar style="auto" />
      <MyComponent text="Overriding 1st message from MyComponent class!" color="blue"  size={32}/>
      <MyComponent text="Overriding 2nd message from MyComponent class!" color="green" size={16}/>
      <MyButton />
      <MyButton /> */}

      <View style = {styles.header}>
        <TextInput  style = {styles.input} onChangeText={ (value) => setInput(value) }/>
        <TouchableOpacity 
          style={ (input.length < 3) ? styles.buttonDisabled : styles.button}
          onPress={ () => addItem()} 
          disabled = { (input.length < 3) ? true : false }>
    
          <Text style= {(input.length < 3) ? styles.buttonTextDisabled : styles.button}> Add </Text>
        </TouchableOpacity>
      </View>
        
      <FlatList 
        data={ListData}
        keyExtractor={ (item)  => item.id }
        renderItem =  {renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#0bcdd4',
    //alignItems: 'center',
    justifyContent: 'center',
  },

  listItem: {
    padding: 10,
  },

  listText: {
    fontSize: 20,
  },

  listBackground: {
    backgroundColor: 'white',
  },

  input: {
    padding: 5,
    fontSize: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#14913a',
    pading: 5,
  },

  buttonText: {
    fontSize: 20,
  },

  buttonDisabled: {
    backgroundColor: "#ccc",
  },

  buttonTextDisabled: {
    backgroundColor: '#ccc',
  }
  
});

