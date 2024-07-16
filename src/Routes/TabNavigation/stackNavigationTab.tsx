import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../../Screens/mainScreen';
import Test from '../../Screens/test';
const Stack = createNativeStackNavigator();

const StackNavigationRoutes = () => {
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
const SecondRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Screen"
        component={Test}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export {StackNavigationRoutes, SecondRoutes};
