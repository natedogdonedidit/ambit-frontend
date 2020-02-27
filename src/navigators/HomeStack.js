import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'screens/main/HomeScreen';
import ChatScreen from 'screens/main/ChatScreen';
import ProfileScreen from 'screens/main/ProfileScreen';
import PostScreen from 'screens/main/PostScreen';
import PostMatchesScreen from 'screens/main/PostMatchesScreen';
import UpdateScreen from 'screens/main/UpdateScreen';
import CommentScreen from 'screens/main/CommentScreen';
import UpdatePostScreen from 'screens/main/UpdatePostScreen';
import TopicScreen from 'screens/main/TopicScreen';
import SearchScreen from 'screens/main/SearchScreen';
import MyTopicsScreen from 'screens/main/MyTopicsScreen';
import MyHatsScreen from 'screens/main/MyHatsScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostMatches" component={PostMatchesScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="UpdatePost" component={UpdatePostScreen} />
      <Stack.Screen name="Comment" component={CommentScreen} />
      <Stack.Screen name="Topic" component={TopicScreen} />
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
      <Stack.Screen name="MyTopics" component={SearchScreen} />
      <Stack.Screen name="MyHats" component={MyHatsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
