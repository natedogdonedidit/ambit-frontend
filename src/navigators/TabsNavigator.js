import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from 'navigators/HomeStack';
import PeopleStack from 'navigators/PeopleStack';
import NotificationsStack from 'navigators/NotificationsStack';
import InboxStack from 'navigators/InboxStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { UserContext } from 'library/utils/UserContext';

import Icon from 'react-native-vector-icons/FontAwesome5';

import BellDot from 'library/components/UI/icons/BellDot';
import EnvelopeDot from 'library/components/UI/icons/EnvelopeDot';
import colors from 'styles/colors';

const Tabs = createBottomTabNavigator();

const TabsNavigator = ({ route }) => {
  const { setActiveTab } = useContext(UserContext);

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) || 'HomeStack';
    setActiveTab(routeName);
  }, [route]);

  return (
    <Tabs.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={{ activeTintColor: colors.purp, inactiveTintColor: colors.iconGray, showLabel: false }}
      lazy={false}
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
          tabBarIcon: ({ focused, color, size }) => <BellDot color={color} />,
        }}
      />
      <Tabs.Screen
        name="InboxStack"
        component={InboxStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => <EnvelopeDot color={color} />,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;

// SUBSCRIBE TO NEW MESSAGES IN GROUPS WITH MY ID (IF THE CHAT DOESNT EXIST WHEN A NEW MESSAGE COMES IN THEN IGNORE IT)
// useSubscription(MESSAGE_SUBSCRIPTION, {
//   variables: { userId: currentUserId },
//   onSubscriptionData: async ({ subscriptionData }) => {
//     console.log('subscriptionData', subscriptionData);
//     const { newMessageSub } = subscriptionData.data;
//     try {
//       // GET THE CONVERSATION FROM CACHE
//       const previousData = await client.readQuery({
//         query: MESSAGES_CONNECTION,
//         variables: {
//           where: { to: { id: { equals: newMessageSub.to.id } } },
//         },
//       });

//       // IF MESSAGE CONNECTION DOES NOT EXIST YET WE WILL ENTER CATCH STATEMENT
//       if (previousData && newMessageSub) {
//         // console.log('newMessage', newMessageSub);
//         // console.log('previousData', previousData.messages);
//         client.writeQuery({
//           query: MESSAGES_CONNECTION,
//           variables: {
//             where: { to: { id: { equals: newMessageSub.to.id } } },
//           },
//           data: {
//             messages: [{ ...newMessageSub, __typename: 'Message' }],
//           },
//         });
//       }
//     } catch (e) {
//       console.log('new message from a chat that was not fetched yet - fetching chat now');
//       client.query({
//         query: MESSAGES_CONNECTION,
//         variables: {
//           where: { to: { id: { equals: newMessageSub.to.id } } },
//           first: 10,
//           orderBy: [{ createdAt: 'desc' }],
//         },
//       });
//     }

//     // ADD THE MESSAGE TO UNREAD MESSAGES
//     refetchMessages();
//   },
// });
