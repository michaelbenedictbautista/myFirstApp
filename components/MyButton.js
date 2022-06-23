import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useState } from 'react'

export function MyButton( props ) {
  const[ click, setClick ] = useState(0)  
    return (
         <TouchableOpacity style= { styles.button } onPress= { () => { setClick(click+1) }}>
            <Text style= { styles.buttonText }> Number of click: {click}  </Text>
            <Text onPress= { () => { setClick(Math.floor(Math.random() * 100) + 1) }} style= { styles.buttonText }> Generate number: {click} </Text>
            <Text onPress= { () => { setClick(0) }} style= { styles.buttonText } textAlign="center"> Reset </Text>
         </TouchableOpacity>
           
    )  
}

    // const Init = () => {
    //   setSecret( generate() )
    //   setGuess(null)
    //   setMessage(null)
    //   setChance(5)
    // }

const styles =  StyleSheet.create ({
  button: {
    backgroundColor: "black",
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: "white",
    textAlign: 'center',
    
  }

    // fontWeight: 'bold',
    // fontSize: 18,
    // marginTop: 0,
    // width: 200,
    // backgroundColor: 'yellow',
})