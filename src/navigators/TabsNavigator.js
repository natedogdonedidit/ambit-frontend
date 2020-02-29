import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute, useNavigation } from '@react-navigation/native';
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

const TabsNavigator = ({ navigation }) => {
  const { unseenNotifications } = useContext(UserContext);

  // const activeRoute = useRoute();
  // console.log(activeRoute);

  // add listener? setOptions?
  // console.log(navigation);

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
        options={{
          // tabBarVisible: activeRoute.name !== 'Chat',
          tabBarIcon: ({ focused, color, size }) => <Icon name="envelope" size={22} color={color} solid />,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
