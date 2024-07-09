import React, {useEffect, useRef, useState} from 'react';
import DrawerNavigation from './src/Routes/drawerNavigation/drawerNavigation';

import {SafeAreaView, StyleSheet, AppState} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[appStyles.parentBackgroundColor]}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const appStyles = StyleSheet.create({
  parentBackgroundColor: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default App;
