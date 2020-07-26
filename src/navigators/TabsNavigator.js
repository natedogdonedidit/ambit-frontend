import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute, useNavigation } from '@react-navigation/native';
import { UserContext } from 'library/utils/UserContext';
import { useQuery } from '@apollo/client';
import analytics from '@segment/analytics-react-native';

import HomeStack from 'navigators/HomeStack';
import PeopleStack from 'navigators/PeopleStack';
import NotificationsStack from 'navigators/NotificationsStack';
import InboxStack from 'navigators/InboxStack';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

import Icon from 'react-native-vector-icons/FontAwesome5';
import BellDot from 'library/components/UI/icons/BellDot';
import EnvelopeDot from 'library/components/UI/icons/EnvelopeDot';
import colors from 'styles/colors';

const Tabs = createBottomTabNavigator();

const TabsNavigator = ({ navigation }) => {
  const { unReadNotifications, currentUserId } = useContext(UserContext);

  const { data: userData, networkStatus: networkStatusUser } = useQuery(CURRENT_USER_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const { userLoggedIn } = userData;

  // any time this page loads or a new user id logs in...send the identify event
  useEffect(() => {
    if (currentUserId && userLoggedIn) {
      const { name, email } = userLoggedIn;

      console.log(`sending identify for ${currentUserId}, ${name}, ${email}`);

      analytics.identify(currentUserId, {
        name,
        email,
      });
    }
  }, [currentUserId]);

  let unReadMessagesCount = 0;
  if (userData) {
    if (userData.userLoggedIn) {
      if (userData.userLoggedIn.unReadMessagesCount) {
        unReadMessagesCount = userData.userLoggedIn.unReadMessagesCount;
      }
    }
  }

  return (
    <Tabs.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={{ activeTintColor: colors.purp, inactiveTintColor: colors.iconGray, showLabel: false }}
    >
      <Tabs.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ tabBarIcon: ({ focused, color, size }) => <Icon name="home" size={22} color={color} solid /> }}
      />
      <Tabs.Screen
        name="PeopleStack"
        component={PeopleStack}
        options={{ tabBarIcon: ({ focused, color, size }) => <Icon name="user-friends" size={22} color={color} solid /> }}
      />
      <Tabs.Screen
        name="NotificationsStack"
        component={NotificationsStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => <BellDot color={color} unReadNotifications={unReadNotifications} />,
        }}
      />
      <Tabs.Screen
        name="InboxStack"
        component={InboxStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => <EnvelopeDot color={color} unReadMessages={unReadMessagesCount} />,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
