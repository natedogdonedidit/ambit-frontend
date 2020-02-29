import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MessagesScreen from 'screens/main/MessagesScreen';
import ChatScreen from 'screens/main/ChatScreen';
import ProfileScreen from 'screens/main/ProfileScreen';
import PostScreen from 'screens/main/PostScreen';
import PostMatchesScreen from 'screens/main/PostMatchesScreen';
import UpdateScreen from 'screens/main/UpdateScreen';

const Stack = createStackNavigator();

const InboxStack = () => {
  return (
    <Stack.Navigator initialRouteName="Messages" headerMode="none">
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostMatches" component={PostMatchesScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ tabBarVisible: false }} />
    </Stack.Navigator>
  );
};

export default InboxStack;
