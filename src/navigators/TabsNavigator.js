import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from 'library/utils/UserContext';

import HomeStack from 'navigators/HomeStack';
import PeopleStack from 'navigators/PeopleStack';
import NotificationsStack from 'navigators/NotificationsStack';
import InboxStack from 'navigators/InboxStack';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Bell from 'library/components/UI/Bell';
import BellDot from 'library/components/UI/BellDot';
import colors from 'styles/colors';

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const { unseenNotifications } = useContext(UserContext);

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
          tabBarIcon: ({ focused, color, size }) => {
            if (unseenNotifications > 0) {
              return <BellDot color={color} />;
            }
            return <Bell color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="InboxStack"
        component={InboxStack}
        options={{ tabBarIcon: ({ focused, color, size }) => <Icon name="envelope" size={22} color={color} solid /> }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
