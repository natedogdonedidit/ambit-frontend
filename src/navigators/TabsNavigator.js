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
  const [getMessages, { data: userData, refetch: refetchMessages }] = useLazyQuery(CURRENT_USER_MESSAGES);

  // NOTIFICATIONS QUERY
  const [getNotifications, { data: notificationsData }] = useLazyQuery(NOTIFICATIONS_QUERY, {
    variables: {
      where: { targetId: { equals: currentUserId } },
      first: 20,
      orderBy: [{ createdAt: 'desc' }],
    },
    pollInterval: 60000, // 60 seconds
  });

  // on first render - set a timer for 10s, then get initial batch of notifications & messages
  useEffect(() => {
    const timer = setTimeout(() => {
      getMessages(); // this just gets the information for the Group & latest message & unread
      getNotifications();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // UPDATE # OF UNSEEN MESSAGES EVERYTIME NEW NOTIFICATIONS DATA COMES IN
  const unReadMessagesCount = useMemo(() => {
    if (userData && userData.userLoggedIn && userData.userLoggedIn.unReadMessagesCount) {
      return userData.userLoggedIn.unReadMessagesCount;
    }

    return 0;
  }, [userData]);

  // UPDATE # OF UNSEEN NOTIFICATIONS EVERYTIME NEW NOTIFICATIONS DATA COMES IN
  const unReadNotificationsCount = useMemo(() => {
    if (notificationsData && notificationsData.notifications) {
      const unRead = [...notificationsData.notifications].reduce((num, notification) => {
        if (!notification.seen) return num + 1;
        return num;
      }, 0);

      return unRead;
    }

    return 0;
  }, [notificationsData]);

  // SUBSCRIBE TO NEW MESSAGES IN GROUPS WITH MY ID (IF THE CHAT DOESNT EXIST WHEN A NEW MESSAGE COMES IN THEN IGNORE IT)
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { userId: currentUserId },
    onSubscriptionData: async ({ subscriptionData }) => {
      // console.log('subscriptionData', subscriptionData);
      const { newMessageSub } = subscriptionData.data;
      try {
        // GET THE CONVERSATION FROM CACHE
        const previousData = await client.readQuery({
          query: MESSAGES_CONNECTION,
          variables: {
            where: { to: { id: { equals: newMessageSub.to.id } } },
          },
        });

        // IF MESSAGE CONNECTION DOES NOT EXIST YET WE WILL ENTER CATCH STATEMENT
        if (previousData && newMessageSub) {
          // console.log('newMessage', newMessageSub);
          // console.log('previousData', previousData.messages);
          client.writeQuery({
            query: MESSAGES_CONNECTION,
            variables: {
              where: { to: { id: { equals: newMessageSub.to.id } } },
            },
            data: {
              messages: [{ ...newMessageSub, __typename: 'Message' }],
            },
          });
        }
      } catch (e) {
        console.log('new message from a chat that was not fetched yet - fetching chat now');
        client.query({
          query: MESSAGES_CONNECTION,
          variables: {
            where: { to: { id: { equals: newMessageSub.to.id } } },
            first: 10,
            orderBy: [{ createdAt: 'desc' }],
          },
        });
      }

      // ADD THE MESSAGE TO UNREAD MESSAGES
      refetchMessages();
    },
  });

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
          tabBarIcon: ({ focused, color, size }) => <BellDot color={color} unReadNotifications={unReadNotificationsCount || 0} />,
        }}
      />
      <Tabs.Screen
        name="InboxStack"
        component={InboxStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => <EnvelopeDot color={color} unReadMessages={unReadMessagesCount || 0} />,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
