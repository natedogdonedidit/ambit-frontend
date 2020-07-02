import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import analytics from '@segment/analytics-react-native';

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
import FollowersScreen from 'screens/main/FollowersScreen';
import FollowingScreen from 'screens/main/FollowingScreen';
import { UserContext } from 'library/utils/UserContext';

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
    const unsubscribe = navigation.addListener('tabPress', e => {
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
            console.log('User opened Home Screen')
            analytics.screen('Home Screen')
          },
        }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        listeners={{
          focus: () => {
            console.log('User opened Profile Screen')
            analytics.screen('Profile Screen')
          },
        }}
      />
      <Stack.Screen 
        name="Post" 
        component={PostScreen}
        listeners={{
          focus: () => {
            console.log('User opened Post Screen')
            analytics.screen('Post Screen')
          },
        }}
      />
      <Stack.Screen name="PostMatches" component={PostMatchesScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="UpdatePost" component={UpdatePostScreen} />
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
      <Stack.Screen name="MyTopics" component={MyTopicsScreen} />
      <Stack.Screen name="MyHats" component={MyHatsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
