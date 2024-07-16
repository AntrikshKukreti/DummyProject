import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TabRoutes} from '../TabNavigation/tabNavigation';
import {FlatlistNavigationRoutes} from './stackNavigationDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="TabHome">
      <Drawer.Screen
        name="TabHome"
        component={TabRoutes}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Flat List"
        component={FlatlistNavigationRoutes}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
