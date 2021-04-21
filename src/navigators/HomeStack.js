import React, { useLayoutEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import analytics from '@segment/analytics-react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeScreen from 'screens/main/HomeScreen';
import ChatScreen from 'screens/main/ChatScreen';
import ProfileScreen from 'screens/main/ProfileScreen';
import PostScreen from 'screens/main/PostScreen';
import PostMatchesScreen from 'screens/main/PostMatchesScreen';
import UpdateScreen from 'screens/main/UpdateScreen';
import TopicScreen from 'screens/main/TopicScreen';
import ConvosScreen from 'screens/main/ConvosScreen';
import FollowersScreen from 'screens/main/FollowersScreen';
import FollowingScreen from 'screens/main/FollowingScreen';
import BlockedUsersScreen from 'screens/main/BlockedUsersScreen';
import SettingsScreen from 'modals/general/SettingsScreen';
import MyTopicsList from 'screens/main/MyTopicsList';

const Stack = createStackNavigator();

const HomeStack = ({ navigation, route }) => {
  // hides the tabs in Chat screen
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) || 'HomeStack';

    navigation.setOptions({
      tabBarVisible: routeName !== 'Chat',
    });
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        listeners={{
          focus: () => {
            // console.log('User opened Home Screen');
            // analytics.screen('Home Screen');
          },
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostMatches" component={PostMatchesScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="Topic" component={TopicScreen} />
      <Stack.Screen name="Followers" component={FollowersScreen} />
      <Stack.Screen name="Following" component={FollowingScreen} />
      <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
      <Stack.Screen name="Convos" component={ConvosScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="MyTopicsList" component={MyTopicsList} />

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

export default HomeStack;
