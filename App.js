import React, { useContext } from 'react';
import { YellowBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from 'library/components/UI/SplashScreen';
import { UserContext } from 'library/utils/UserContext';

import AuthStack from 'navigators/AuthStack';
import MainStack from 'navigators/MainStack';

const Stack = createStackNavigator();

const AppNavigator = () => {
  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
  ]);

  const { currentUserId, loadingToken } = useContext(UserContext);

  if (loadingToken) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={currentUserId ? 'MainStack' : 'AuthStack'} headerMode="none">
        {currentUserId ? (
          <Stack.Screen name="MainStack" component={MainStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
