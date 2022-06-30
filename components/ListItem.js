import { View, Text } from 'react-native'

export function ListItem ( props ) {
    return (
        <View>
            <Text>{ props.item.name} </Text>
        </View>

    )

}