import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Components/Molecules/Header';

type Props = {};

const Test = (props: Props) => {
  return (
    <View style={{flex: 1}}>
      <Header title="TEST" />
      <Text style={{color: '#000'}}>test</Text>
    </View>
  );
};

export default Test;

const Teststyles = StyleSheet.create({});
