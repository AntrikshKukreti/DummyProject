import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../../Screens/mainScreen';

const Stack = createNativeStackNavigator();

const MainRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainRoutes;
