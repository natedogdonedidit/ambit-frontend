import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChatScreen from 'screens/main/ChatScreen';
import NotificationsScreen from 'screens/main/NotificationsScreen';
import ProfileScreen from 'screens/main/ProfileScreen';
import PostScreen from 'screens/main/PostScreen';
import PostMatchesScreen from 'screens/main/PostMatchesScreen';
import UpdateScreen from 'screens/main/UpdateScreen';

const Stack = createStackNavigator();

const NotificationsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Notifications" headerMode="none">
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostMatches" component={PostMatchesScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default NotificationsStack;
