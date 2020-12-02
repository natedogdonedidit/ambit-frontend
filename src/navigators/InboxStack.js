import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ConvosScreen from 'screens/main/ConvosScreen';
import ChatScreen from 'screens/main/ChatScreen';
import ProfileScreen from 'screens/main/ProfileScreen';
import PostScreen from 'screens/main/PostScreen';
import PostMatchesScreen from 'screens/main/PostMatchesScreen';
import UpdateScreen from 'screens/main/UpdateScreen';
import TopicScreen from 'screens/main/TopicScreen2';
import SearchScreen from 'screens/main/SearchScreen';
import FollowersScreen from 'screens/main/FollowersScreen';
import FollowingScreen from 'screens/main/FollowingScreen';

const Stack = createStackNavigator();

const InboxStack = ({ navigation, route }) => {
  // hides the tabs in Chat screen
  useEffect(() => {
    if (route.state) {
      navigation.setOptions({
        tabBarVisible: route.state.routes ? !(route.state.routes[route.state.routes.length - 1].name === 'Chat') : null,
      });
    }
  }, [route]);

  return (
    <Stack.Navigator initialRouteName="Convos" headerMode="none">
      <Stack.Screen name="Convos" component={ConvosScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostMatches" component={PostMatchesScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="Topic" component={TopicScreen} />
      <Stack.Screen name="Followers" component={FollowersScreen} />
      <Stack.Screen name="Following" component={FollowingScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        initialParams={{
          goalToSearch: null,
          topicToSearch: '',
          locationToSearch: null,
          locationLatToSearch: null,
          locationLonToSearch: null,
        }}
      />

      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default InboxStack;
