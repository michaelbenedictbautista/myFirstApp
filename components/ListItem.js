import { View, useState, Button, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/AntDesign'



export function ListItem ( props ) {
    return (
    <View style={ styles.item }>
      
      <Text style={ styles.itemText}>{ props.item.name }</Text>
      
      {/* <View style={ styles.icon}>
      < Icon name="arrowsalt" size={20} color="blue" onPress={ () => props.remove(props.item.id) }/>
      </View> */}

      <TouchableOpacity style={ styles.remove} onPress={ () => props.remove(props.item.id) }>
        < Icon name="delete" size={20} color="white" onPress={ () => props.remove(props.item.id) }/>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.markDone} disabled={(props.item.status ) ? true: false } onPress={ () => props.update(props.item.id) }>
        < Icon name="checkcircleo" size={20} color="white" onPress={ () => props.update(props.item.id) }/>
      </TouchableOpacity>


      <TouchableOpacity style={ styles.code} onPress={() => props.generateQRCode(props.item.id) } >
      < Icon name="qrcode" size={20}/>
      </TouchableOpacity>

      {/* <TouchableOpacity style={ styles.code} onPress={() => props.generateQrCode(input) } >
      < Icon name="qrcode" size={20}/>
      </TouchableOpacity> */}


    </View>

    )

}

const styles = StyleSheet.create({
    item: {
      padding: 10,
      flex: 1,
      justifyContent: 'center',
    },

    itemText: {
      fontSize: 20,  
    },

    itemTextDone: {
        fontSize: 40,
    },

    remove: {
      position: 'absolute',
      right: 20,
      justifyContent: 'center',
    },

    markDone: {
      position: 'absolute',
      right: 50,
      justifyContent: 'center',
    },

    code: {
      position: 'absolute',
      right: 80,
      justifyContent: 'center',
    },
  })

 