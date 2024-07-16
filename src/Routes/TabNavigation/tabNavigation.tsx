import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SecondRoutes, StackNavigationRoutes} from './stackNavigationTab';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator screenOptions={ScreenOptions}>
      <Tab.Screen name="Home" component={StackNavigationRoutes} />
      <Tab.Screen name="Test" component={SecondRoutes} />
    </Tab.Navigator>
  );
};
const ScreenOptions = ({route}: any) => ({
  tabBarIcon: ({focused}: any) => {
    let icon;
    switch (route.name) {
      case 'Home':
        icon = (
          <AntDesign
            name="clockcircle"
            size={22}
            color={focused ? '#12403C' : '#9C9AA5'}
          />
        );
        break;
      case 'Test':
        icon = (
          <FontAwesome
            name="user"
            size={22}
            color={focused ? '#12403C' : '#9C9AA5'}
          />
        );
        break;
      default:
        null;
    }
    return icon;
  },
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: '#12403C',
  tabBarInactiveTintColor: '#6C6C6C',
  tabBarIconStyle: {
    marginTop: 12,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    marginBottom: 8,
  },
  tabBarStyle: [
    {
      backgroundColor: 'white',
      height: 65,
    },
    null,
  ],
});

export {TabRoutes};
