import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { useQuery, useSubscription, useApolloClient, useLazyQuery } from '@apollo/client';

import ChatScreen from 'screens/main/ChatScreen';
import NotificationsScreen from 'screens/main/NotificationsScreen';
import ProfileScreen from 'screens/main/ProfileScreen';
import PostScreen from 'screens/main/PostScreen';
import PostMatchesScreen from 'screens/main/PostMatchesScreen';
import UpdateScreen from 'screens/main/UpdateScreen';

// import { UserContext } from 'library/utils/UserContext';
// import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
// import NEW_NOTIFICATION_SUBSCRIPTION from 'library/subscriptions/NEW_NOTIFICATION_SUBSCRIPTION';

const Stack = createStackNavigator();

const NotificationsStack = ({ navigation, route }) => {
  // hides the tabs in Chat screen
  useEffect(() => {
    if (route.state) {
      navigation.setOptions({
        tabBarVisible: route.state.routes ? !(route.state.routes[route.state.routes.length - 1].name === 'Chat') : null,
      });
    }
  }, [route]);

  return (
    <Stack.Navigator initialRouteName="Notifications" headerMode="none">
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      {/* <Stack.Screen name="Notifications" component={BlankScreen} /> */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostMatches" component={PostMatchesScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default NotificationsStack;
