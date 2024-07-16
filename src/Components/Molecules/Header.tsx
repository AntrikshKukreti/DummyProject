import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, DrawerActions} from '@react-navigation/native';

interface HeaderProps {
  title: string;
}

const Header = ({title}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={[headerStyles.headerContainer]}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Entypo name="menu" size={30} color={'#7393B3'} />
      </TouchableOpacity>
      <Text style={[headerStyles.title]}>{title}</Text>
    </View>
  );
};

export default Header;

const headerStyles = StyleSheet.create({
  title: {
    color: '#7393B3',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 48,
    marginBottom: 5,
    elevation: 5,
  },
});
