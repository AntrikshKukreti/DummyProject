import {createDrawerNavigator} from '@react-navigation/drawer';
import MainRoutes from '../mainNavigation/mainNavigation';
import MainScreen from '../../Screens/mainScreen';
import FlatListScreeen from '../../Screens/flatList';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={MainScreen}
        // options={{title: ''}}
      />
      <Drawer.Screen
        name="Flat List"
        component={FlatListScreeen}
        // options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
