// import { Text, View, StyleSheet} from 'react-native'
// export function HomeScreen( props ) {
//   return (
//     <View>
//       <Text>Home Screen</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create( {
//   homeView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// } )

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import constants from 'expo-constants'
import { ListItem } from '../components/ListItem'
import { TouchableOpacity, Button } from 'react-native'
import { ListSeparator } from '../components/ListSeparator'
import { ListEmpty } from '../components/ListEmpty'
import { ListFooter } from '../components/ListFooter'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient  from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
//import Icon from 'react-native-vector-icons/AntDesign'

// import for navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import firebase config and initializeApp
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'

// Initialise firabase app
initializeApp( firebaseConfig )


export default function App() {

  // Local storage
  const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  });




  //const[ click, setClick ] = useState(0)

  // const LIST = [
  //   { id: '1', name: 'Banana', status: false},
  //   { id: '2', name: 'Pineapple', status: false},
  //   { id: '3', name: 'Eggplant', status: false},
  //   { id: '4', name: 'Durian', status: false},
  // ]

  // Application state
  const [ListData, setListData] = useState([])
  const [input, setInput] = useState('')
  const [ starting, setStarting ] = useState ( true)
  const [qrvalue, setQrvalue] = useState('');
 
  //const [ markedItem, setMarkedItem ] = useState([])




  //reference text input 
  const txtInput = useRef()

  // storage functios
  const saveData = () => {
    storage.save({
      key: 'localListData', // Note: Do not use underscore("_") in key!
      data: JSON.stringify(ListData)
    });  
  }

  const loadData = () => {
  storage
  .load({
    key: 'localListData',
  })
    .then((data) => {
      setListData(JSON.parse(data))
    })
  }


  //Sort recently added item on top of the list
  const sortList = (arr) => {
    let newSortedList = arr.sort (( item1, item2) => {
      return item2.id - item1.id
    })
    setListData(newSortedList)
  }


  // const sortList = (arr) => {
    
  //   arr.sort((item1, item2) => {
  //     return item2.id - item1.id
  //   } )
  //   })
  // }



  //useEffect Hook only when there are changes made 
  useEffect( () => {
    sortList(ListData)
    saveData()
    }, 
    [ ListData] )


  useEffect (() => {
    if (starting) {
      loadData()
      setStarting (false)
    }
  })


  const updateStatus = (itemID) => {
 let newList = ListData.map ( (item) => {
  if (item.id === itemID) {
    return { id: item.id, name: item.name, status: true}
  }
    else {
      return item
    }
  })
    setListData (newList)
  }



  // Function to add input value to the ListData (adding item to our list) 
  const addItem = () => {
    //console.log ('Pressed'); // Test
    // Timestamp to generate unique ID
    let newId = new Date().getTime()
    let newItem = {id: newId, name: input, status: false}
    let newList = ListData.concat( newItem )
    setListData(newList)
    txtInput.current.clear()
  }

  // const getCurrentDate=()=>{

  //   var date = new Date().getDate();
  //   var month = new Date().getMonth() + 1;
  //   var year = new Date().getFullYear();

  //   //Alert.alert(date + '-' + month + '-' + year);
  //   // You can turn it in to your desired format
  //   return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
  // }




  // Function to render list item
  // const renderItem = ({item}) => (
  //   // <View style={ [styles.listItem, styles.listBackground] }>
  //   //   <Text style={styles.listText}> {item.name} </Text>   
  //   // </View>
  //   <ListItem item = {item} />
  // )
  
  // Function to delete input value to the ListData (deleting item to our list) 
  const deleteItem = ( itemId ) => {
    // find the item id
    // remove item with the id from array (ListData)
    const newList = ListData.filter( (item) => {
      if( item.id !== itemId ) {
        return item
      }
    })
    // setListData( new array )
    setListData( newList )
  }

  
  //function to render list item
  const renderItem = ({item}) => (
  <ListItem item={item} remove={ deleteItem } update= {updateStatus} />
  )



  return (

    //<View style={[styles.container] [styles.button]} >
    <View style={styles.container} >

      {/* <Text>Welcome Mike to your first app!</Text>
      <StatusBar style="auto" />
      <MyComponent text="Overriding 1st message from MyComponent class!" color="blue"  size={32}/>
      <MyComponent text="Overriding 2nd message from MyComponent class!" color="green" size={16}/>
      <MyButton />
      <MyButton /> */}
      {/* <View style={styles.container2}>
        <View style={styles.iconBackground}>
          <TouchableOpacity>
            <Image

              style={styles.backImage}
              
              source={require("./images/back.png")} />
          </TouchableOpacity>
          </View>
      </View> */}


    <View>
      <Text style={styles.titleStyle}> Generation of QR Code for task </Text>
        <QRCode
          //QR code value
          value={qrvalue ? qrvalue : 'NA'}
          //size of QR Code
          size={250}
          //Color of the QR Code (Optional)
          color="black"
          //Background Color of the QR Code
          backgroundColor="white"
          logoMargin={2}
          justifyContent='center'
        />
        <Text style={styles.textStyle}>
          Please insert any value to generate QR code
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (input) => setInput(input)
          }
          placeholder="Enter Any Value"
          value={input}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setQrvalue(input)}>
          <Text style={styles.buttonTextStyle}>
            Generate QR Code
          </Text>
        </TouchableOpacity>
    </View>  


      <View>
      <LinearGradient 
      colors={['blue', 'cyan']} 
      start={{
        x: 1,
        y: 1
      }}
      end={{
        x: 0,
        y: 0
      }}
      style={styles.box} />
      </View>
      

      <View style = {styles.header}>
        <TextInput  style = {styles.input} 
          onChangeText={ (value) => setInput(value) }
          ref = {txtInput}
        />

        <TouchableOpacity 
          style={ (input.length < 3) ? styles.buttonDisabled : styles.button}
          onPress={ () => addItem()} 
          disabled = { (input.length < 3) ? true : false }
        >
          <Text style= {(input.length < 3) ? styles.buttonTextDisabled : styles.button}> Add </Text>
        </TouchableOpacity>

      </View>

      
      <FlatList 
        data={ListData}
        keyExtractor={ (item)  => item.id }
        renderItem =  {renderItem}
        
        // renderItem={({renderItem}) => {
        //   return(
        //     <Fragment> 
        //       <Button
        //         onPress={() => setQrvalue(input)}
        //         title='Generate'
        //       >
        //        < Icon name="qrcode" size={20}/>
        //       </Button>
        //     </Fragment
        //   )}}

        ItemSeparatorComponent={ ListSeparator }
        ListEmptyComponent= { ListEmpty } // For no items in the list
        ListFooterComponent={ <ListFooter text="End of List" />}

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
    padding: 10,
  },

  button: {
    backgroundColor: 'green',
    padding: 5,
  },

  buttonText: {
    fontSize: 20,
  },

  buttonDisabled: {
    backgroundColor: "#ccc",
  },

  buttonTextDisabled: {
    backgroundColor: '#ccc',
  },

  box: {
    position: 'absolute',
    width: '100%',
    height: 800,
    opacity: 0.8,
    
  },
  /////////
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },

  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  code: {
    position: 'absolute',
    right: 80,
    justifyContent: 'center',
  },

  /// = editItems
  container: {
    flex: 1,
   
  },
     backImage:{
      width: 17, 
      height: 13,
     resizeMode:'cover'
    },
});


