import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../../Screens/mainScreen';
import FlatListScreeen from '../../Screens/flatList';
import ItemDetails from '../../Screens/subScreens/ItemDetails';

const Stack = createNativeStackNavigator();

const HomeNavigationRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainHome"
        component={MainScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const FlatlistNavigationRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main Flat List"
        component={FlatListScreeen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Item Details"
        component={ItemDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export {HomeNavigationRoutes, FlatlistNavigationRoutes};
