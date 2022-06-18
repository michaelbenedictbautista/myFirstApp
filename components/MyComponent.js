import { View, Text } from 'react-native'

export function MyComponent( props ) {
    return (
      <View> 
        <Text style={{ color: props.color, fontSize: props.size}} > { props.text } </Text>
      </View>
    )
}