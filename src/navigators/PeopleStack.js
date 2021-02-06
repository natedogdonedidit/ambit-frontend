import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import ConnectionsScreen from 'screens/main/ConnectionsScreen';
import ChatScreen from 'screens/main/ChatScreen';
import ProfileScreen from 'screens/main/ProfileScreen';
import PostScreen from 'screens/main/PostScreen';
import PostMatchesScreen from 'screens/main/PostMatchesScreen';
import UpdateScreen from 'screens/main/UpdateScreen';
import TopicScreen from 'screens/main/TopicScreen';
import SearchScreen from 'screens/main/SearchScreen';
import FollowersScreen from 'screens/main/FollowersScreen';
import FollowingScreen from 'screens/main/FollowingScreen';

const Stack = createStackNavigator();

const PeopleStack = ({ navigation, route }) => {
  // hides the tabs in Chat screen
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) || 'HomeStack';

    navigation.setOptions({
      tabBarVisible: routeName !== 'Chat',
    });
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="Connections" headerMode="none">
      <Stack.Screen name="Connections" component={ConnectionsScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostMatches" component={PostMatchesScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="Topic" component={TopicScreen} />
      <Stack.Screen name="Followers" component={FollowersScreen} />
      <Stack.Screen name="Following" component={FollowingScreen} />
      {/* <Stack.Screen
        name="Search"
        component={SearchScreen}
        initialParams={{
          goalToSearch: null,
          topicToSearch: '',
          locationToSearch: null,
          locationLatToSearch: null,
          locationLonToSearch: null,
        }}
      /> */}

      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default PeopleStack;
