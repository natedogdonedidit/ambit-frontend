import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ConnectionsScreen from 'screens/main/ConnectionsScreen';
import ChatScreen from 'screens/main/ChatScreen';
import ProfileScreen from 'screens/main/ProfileScreen';
import PostScreen from 'screens/main/PostScreen';
import PostMatchesScreen from 'screens/main/PostMatchesScreen';
import UpdateScreen from 'screens/main/UpdateScreen';

const Stack = createStackNavigator();

const PeopleStack = () => {
  return (
    <Stack.Navigator initialRouteName="Connections" headerMode="none">
      <Stack.Screen name="Connections" component={ConnectionsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostMatches" component={PostMatchesScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default PeopleStack;
