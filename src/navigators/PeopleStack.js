import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ConnectionsScreen from 'screens/main/ConnectionsScreen';
import ChatScreen from 'screens/main/ChatScreen';
import ProfileScreen from 'screens/main/ProfileScreen';
import PostScreen from 'screens/main/PostScreen';
import PostMatchesScreen from 'screens/main/PostMatchesScreen';
import UpdateScreen from 'screens/main/UpdateScreen';
import SearchScreen from 'screens/main/SearchScreen';
import CommentScreen from 'screens/main/CommentScreen';
import UpdatePostScreen from 'screens/main/UpdatePostScreen';
import TopicScreen from 'screens/main/TopicScreen';
import FollowersScreen from 'screens/main/FollowersScreen';
import FollowingScreen from 'screens/main/FollowingScreen';

const Stack = createStackNavigator();

const PeopleStack = ({ navigation, route }) => {
  // hides the tabs in Chat screen
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.routes ? !(route.state.routes[route.state.routes.length - 1].name === 'Chat') : null,
    });
  }

  return (
    <Stack.Navigator initialRouteName="Connections" headerMode="none">
      <Stack.Screen name="Connections" component={ConnectionsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostMatches" component={PostMatchesScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="UpdatePost" component={UpdatePostScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Comment" component={CommentScreen} />
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
    </Stack.Navigator>
  );
};

export default PeopleStack;
