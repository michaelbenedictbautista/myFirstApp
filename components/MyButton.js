import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useState } from 'react'

export function MyButton( props ) {
  const[ click, setClick ] = useState(0)  
    return (
         <TouchableOpacity style= { styles.button } onPress= { () => { setClick(click+1) }}>
            <Text style= { styles.buttonText }> Received {click} clicks </Text>
            <Text onPress= { () => { setClick(0) }} style= { styles.buttonText }> Reset {click} </Text>
         </TouchableOpacity>
           
    )  
}

    // const Init = () => {
    //   setSecret( generate() )
    //   setGuess(null)
    //   setMessage(null)
    //   setChance(5)
    // }

    // cont

const styles =  StyleSheet.create ({
  button: {
    backgroundColor: "black",
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: "white"
    
  }

})