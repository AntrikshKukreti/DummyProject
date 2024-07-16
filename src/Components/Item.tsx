import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {ItemData} from '../Constants/data';
import {SearchResults} from '../Redux/Slice/slice';
import {useNavigation} from '@react-navigation/native';

type ItemProps = {
  item: SearchResults;
  details: {};
  backgroundColor: string;
  textColor: string;
  categoryColor: string;
  borderColor: string;
};

const Item: FC<ItemProps> = ({
  item,
  backgroundColor,
  textColor,
  borderColor,
  categoryColor,
  details,
}) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          'Item Details',
          //   , {
          //   details: details,
          // }
        );
      }}
      style={[itemStyles.item, {backgroundColor, borderColor}]}>
      <Text style={[itemStyles.category, {color: categoryColor}]}>
        {item?.category}
      </Text>
      <View style={[itemStyles.parentContainer]}>
        <Image
          source={{uri: item.image}}
          resizeMode="contain"
          style={[itemStyles.imageContainer]}
        />
        <View style={[itemStyles.detailsHolder]}>
          <Text
            style={[itemStyles.title, {color: textColor}]}
            numberOfLines={1}>
            {item?.title}
          </Text>
          <Text
            style={[itemStyles.description, {color: textColor}]}
            numberOfLines={2}>
            {item?.description}
          </Text>
          <View style={[itemStyles.priceContainer]}>
            <Text style={[itemStyles.price]}>Price : </Text>
            <Text style={[itemStyles.price, {color: textColor}]}>
              {item?.price}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Item;

const itemStyles = StyleSheet.create({
  detailsHolder: {
    flex: 1,
    marginLeft: 5,
  },
  imageContainer: {
    height: 80,
    width: 60,
  },
  parentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
  description: {
    fontSize: 12,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5,
    marginLeft: 15,
    textShadowColor: 'rgba(135, 206, 235, 1)',
    textShadowOffset: {width: 10, height: 5},
    textShadowRadius: 25,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 15,
    elevation: 5,
    height: 130,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 5,
  },
});
