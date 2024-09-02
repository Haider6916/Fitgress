import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const selectableFlatList = ({ data, onPressFunc }) => {


    const Item = ({ item, onPress }) => (
        <TouchableOpacity 
        onPress={onPress} 
        >
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        return (
          <Item
            item={item}
            onPress={() => onPressFunc}
          />
        );
      };

    return (
        <FlatList
        data={data}
        rednerItem={renderItem}
        />
    )
}

export default selectableFlatList