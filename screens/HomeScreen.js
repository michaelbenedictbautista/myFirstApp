// import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, Share } from 'react-native'
// import constants from 'expo-constants'

// Components
import { ListItem } from '../components/ListItem'
import { ListSeparator } from '../components/ListSeparator'
import { ListEmpty } from '../components/ListEmpty'
import { ListFooter }  from '../components/ListFooter'

// External Lib
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {LinearGradient}  from 'expo-linear-gradient'
import QRCode from 'react-native-qrcode-svg'
//import Icon from 'react-native-vector-icons/AntDesign'


export function HomeScreen ( navigation) {

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
  const [starting, setStarting ] = useState ( true)
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


const generateCode = (itemId) => {
  let newGeneratedItem = ([])
  ListData.map ((item) => {
    if (item.id === itemId) {
      return newGeneratedItem = { id: item.id, name: item.name, date: item.fullDate, status: true }
    }
    else {
      return item
    }
  })
  setQrvalue(newGeneratedItem.name)
}


let myQRCode = useRef();
const shareQRCode = () => {
  myQRCode.toDataURL((dataURL) => {
    console.log(dataURL);
    let shareImageBase64 = {
      title: 'React Native',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link', //  for email
    };
    Share.share(shareImageBase64).catch((error) => console.log(error));
  });
};





  
  //function to render list item
  const renderItem = ({item}) => (
  <ListItem item={item} remove={ deleteItem } update= {updateStatus} generateQRCode = {generateCode}/>
  );


  return (

    // <View style={[styles.container] [styles.button]} >
    <View style={styles.container} >
      <View>
        <Text style={styles.titleStyle}> Generation of QR Code for task </Text>
        <QRCode

          getRef={(ref) => (myQRCode = ref)}

          //QR code value
          value={qrvalue ? qrvalue : 'NA'}
          //size of QR Code
          size={150}
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
        {/* <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (input) => setInput(input)
          }
          placeholder="Enter Any Value"
          value={input}
        /> */}
        {/* <TouchableOpacity
          style={styles.buttonStyle}
          // onPress={() => setQrvalue(input)}>
          onPress={() => generateCode()}>

          <Text style={styles.buttonTextStyle}>
            Generate QR Code
          </Text>
        </TouchableOpacity> */}


        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={shareQRCode}>
          <Text style={styles.buttonTextStyle}>
            Share QR Code
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
        
        // renderItem={({item}) => {
        //   return(
        //     <ListItem item={item} remove={ deleteItem } update= {updateStatus} />
        //   )}}

        ItemSeparatorComponent={ ListSeparator }
        ListEmptyComponent= { ListEmpty } // For no items in the list
        ListFooterComponent={ <ListFooter text="End of List" />}
      />
    </View>


    // // ////////////////////sample/////////////////////////
    // <View style={styles.container}>
    // <Text>Welcome to Home Screen page</Text>
    //  <TouchableOpacity onPress={ () => navigation.navigate('Home')}>
    //     <Text>Go to Sign in</Text>
    //  </TouchableOpacity>
    //  </View> 


  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: constants.statusBarHeight,
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
    padding: 2,
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

  // /// = editItems
  // container: {
  //   flex: 1,
   
  // },
  //    backImage:{
  //     width: 17, 
  //     height: 13,
  //    resizeMode:'cover'
  //   },
})




