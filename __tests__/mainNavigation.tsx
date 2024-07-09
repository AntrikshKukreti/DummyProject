import * as React from 'react';
import {screen, render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from '../src/Routes/drawerNavigation/drawerNavigation';

test('shows profile screen when View Profile is pressed', () => {
  render(
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>,
  );

  fireEvent.press(screen.getByText('View Profile'));
// .toBeOnTheScreen()
  expect(screen.getByText('Home'));
});
