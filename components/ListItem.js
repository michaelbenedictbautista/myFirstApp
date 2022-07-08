import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//import { Icon } from 'react-native-vector-icons/Icon'
import Icon from 'react-native-vector-icons/AntDesign'

export function ListItem ( props ) {
    return (
    <View style={ styles.item }>
      
      <Text style={ styles.itemText}>{ props.item.name }</Text>
      
      {/* <View style={ styles.icon}>
      < Icon name="arrowsalt" size={20} color="blue" onPress={ () => props.remove(props.item.id) }/>
      </View> */}
      
      
    
      
      <TouchableOpacity style={ styles.touch} onPress={ () => props.remove(props.item.id) }>
      
      < Icon name="arrowsalt" size={20} color="blue" onPress={ () => props.remove(props.item.id) }/>
      
      </TouchableOpacity>
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

    touch: {
      
      position: 'absolute',
      right: 20,
      justifyContent: 'center',
    },

  })

 