import React, { useEffect, useMemo, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLazyQuery, useSubscription, useApolloClient } from '@apollo/client';

import HomeStack from 'navigators/HomeStack';
import PeopleStack from 'navigators/PeopleStack';
import NotificationsStack from 'navigators/NotificationsStack';
import InboxStack from 'navigators/InboxStack';

import { UserContext } from 'library/utils/UserContext';
import CURRENT_USER_MESSAGES from 'library/queries/CURRENT_USER_MESSAGES';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import MESSAGES_CONNECTION from 'library/queries/MESSAGES_CONNECTION';
import MESSAGE_SUBSCRIPTION from 'library/subscriptions/MESSAGE_SUBSCRIPTION';

import Icon from 'react-native-vector-icons/FontAwesome5';
import BellDot from 'library/components/UI/icons/BellDot';
import EnvelopeDot from 'library/components/UI/icons/EnvelopeDot';
import colors from 'styles/colors';

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const client = useApolloClient();
  const { currentUserId } = useContext(UserContext);

  // MESSAGES QUERY
  // const [getMessages, { data: messagesData, refetch: refetchMessages }] = useLazyQuery(CURRENT_USER_MESSAGES);

  // NOTIFICATIONS QUERY
  // const [getNotifications, { data: notificationsData }] = useLazyQuery(NOTIFICATIONS_QUERY, {
  //   pollInterval: 60000, // 60 seconds
  // });

  // on first render - set a timer for 10s, then get initial batch of notifications & messages
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     getMessages(); // this just gets the information for the Group & latest message & unread
  //     getNotifications();
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, []);

  // UPDATE # OF UNSEEN MESSAGES EVERYTIME NEW NOTIFICATIONS DATA COMES IN
  // const unReadMessagesCount = useMemo(() => {
  //   if (messagesData && messagesData.userMessages && messagesData.userMessages.unReadMessagesCount) {
  //     return messagesData.userMessages.unReadMessagesCount;
  //   }

  //   return 0;
  // }, [messagesData]);

  // UPDATE # OF UNSEEN NOTIFICATIONS EVERYTIME NEW NOTIFICATIONS DATA COMES IN
  // const unReadNotificationsCount = useMemo(() => {
  //   if (notificationsData && notificationsData.myNotifications) {
  //     const unRead = [...notificationsData.myNotifications].reduce((num, notification) => {
  //       if (!notification.seen) return num + 1;
  //       return num;
  //     }, 0);

  //     return unRead;
  //   }

  //   return 0;
  // }, [notificationsData]);

  // SUBSCRIBE TO NEW MESSAGES IN GROUPS WITH MY ID (IF THE CHAT DOESNT EXIST WHEN A NEW MESSAGE COMES IN THEN IGNORE IT)
  // useSubscription(MESSAGE_SUBSCRIPTION, {
  //   variables: { id: currentUserId },
  //   onSubscriptionData: async ({ subscriptionData }) => {
  //     // console.log('subscriptionData', subscriptionData);
  //     const { newMessageToMe } = subscriptionData.data;
  //     try {
  //       const previousData = await client.readQuery({
  //         query: MESSAGES_CONNECTION,
  //         variables: { groupID: newMessageToMe.to.id },
  //       });

  //       // IF MESSAGE CONNECTION DOES NOT EXIST YET WE WILL ENTER CATCH STATEMENT
  //       if (previousData && newMessageToMe) {
  //         console.log('newMessage', newMessageToMe);
  //         console.log('previousData', previousData.messages);
  //         client.writeQuery({
  //           query: MESSAGES_CONNECTION,
  //           variables: { groupID: newMessageToMe.to.id },
  //           data: {
  //             messages: {
  //               ...previousData.messages,
  //               edges: [
  //                 { node: newMessageToMe, __typename: 'MessageEdge' }, // new message
  //                 ...previousData.messages.edges, // previous messages
  //               ],
  //             },
  //           },
  //         });
  //       }
  //     } catch (e) {
  //       console.log('new message from a chat that was not fetched yet - fetching chat now');
  //       client.query({
  //         query: MESSAGES_CONNECTION,
  //         variables: { groupID: newMessageToMe.to.id },
  //       });
  //     }

  //     // ADD THE MESSAGE TO UNREAD MESSAGES
  //     refetchMessages();
  //   },
  // });

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
      {/* <Tabs.Screen
        name="NotificationsStack"
        component={NotificationsStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => <BellDot color={color} unReadNotifications={unReadNotificationsCount || 0} />,
        }}
      />
      <Tabs.Screen
        name="InboxStack"
        component={InboxStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => <EnvelopeDot color={color} unReadMessages={unReadMessagesCount || 0} />,
        }}
      /> */}
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
