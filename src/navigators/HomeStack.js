import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import analytics from '@segment/analytics-react-native';

import { UserContext } from 'library/utils/UserContext';

import HomeScreen from 'screens/main/HomeScreen';
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

const HomeStack = ({ navigation, route }) => {
  const { homePosition, setHomePosition } = useContext(UserContext);

  // hides the tabs in Chat screen
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.routes ? !(route.state.routes[route.state.routes.length - 1].name === 'Chat') : null,
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior

      // Do something manually
      setHomePosition(0);
    });

    // return unsubscribe;
  }, [navigation]);

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

export default HomeStack;
