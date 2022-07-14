import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,ScrollView,SafeAreaView } from 'react-native';
import { useState, useEffect} from 'react'


export default class EditItem extends Component {

    
    render() {
        
        const [currentDate,setcurrentDate]= useState('')
        const [title, setTitle] = useState('');
        const [desc, setDesc] = useState('');
        const [date, setDate] = useState('');
      
      useEffect(() => {
        
    
        var date = new Date().getDate()
        var month = new Date().getMonth()+1
        var year = new Date().getFullYear()
        var hours = new Date().getHours()
        var mins = new Date().getMinutes()
        var sec = new Date().getSeconds()
        setcurrentDate(
            date + '/'+ month + '/' + year + '/' + hours + ':' + mins + ':'+ sec
        )
            return () =>{
      
           }
      
          },[])
      
        return (
            <View>
                    <Text> This is edit Screen</Text>
            </View>

        )
    }
}