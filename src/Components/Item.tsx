import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ItemData} from '../Constants/data';

type ItemProps = {
  item: ItemData;
  onPress?: () => void;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
};

const Item: FC<ItemProps> = ({
  item,
  backgroundColor,
  textColor,
  borderColor,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[itemStyles.item, {backgroundColor, borderColor}]}>
    <Text style={[itemStyles.title, {color: textColor}]}>{item.name}</Text>
  </TouchableOpacity>
);
export default Item;

const itemStyles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 15,
    elevation:5
  },
  title: {
    fontSize: 32,
  },
});
