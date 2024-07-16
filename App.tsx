import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/Redux/Store/store';
import {SafeAreaView, StyleSheet, AppState} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/Routes/drawerNavigation/drawerNavigation';
import Header from './src/Components/Molecules/Header';

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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            {/* <Header title='HEADER'/> */}
            <DrawerNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

const appStyles = StyleSheet.create({
  parentBackgroundColor: {
    flex: 1,
  },
});

export default App;
