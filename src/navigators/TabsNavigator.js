import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from 'navigators/HomeStack';
import PeopleStack from 'navigators/PeopleStack';
import NotificationsStack from 'navigators/NotificationsStack';
import SearchStack from 'navigators/SearchStack';
import InboxStack from 'navigators/InboxStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { UserContext } from 'library/utils/UserContext';

import Icon from 'react-native-vector-icons/FontAwesome5';

import MatchesDot from 'library/components/UI/icons/MatchesDot';
import BellDot from 'library/components/UI/icons/BellDot';
import EnvelopeDot from 'library/components/UI/icons/EnvelopeDot';

import colors from 'styles/colors';
import { useSubscription, useApolloClient } from '@apollo/client';
import MESSAGE_SUBSCRIPTION from 'library/subscriptions/MESSAGE_SUBSCRIPTION';
import MESSAGES_CONNECTION from 'library/queries/MESSAGES_CONNECTION';
import CURRENT_USER_CONVOS from 'library/queries/CURRENT_USER_CONVOS';
import CURRENT_USER_UNREAD from 'library/queries/CURRENT_USER_UNREAD';

const Tabs = createBottomTabNavigator();

const TabsNavigator = ({ route }) => {
  const { setActiveTab, currentUserId } = useContext(UserContext);

  const client = useApolloClient();

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) || 'HomeStack';
    setActiveTab(routeName);
  }, [route]);

  // SUBSCRIBE TO NEW MESSAGES IN GROUPS WITH MY ID (IF THE CHAT DOESNT EXIST WHEN A NEW MESSAGE COMES IN THEN FETCH THE CHAT)
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { userId: currentUserId },
    onSubscriptionData: async ({ subscriptionData }) => {
      // console.log('subscriptionData recieved', subscriptionData);
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

        // add new message to convo, merge function in index.js will add it to the front of existing messages
        if (previousData && newMessageSub) {
          // console.log('newMessage', newMessageSub);
          // console.log('previousData', previousData.messages);
          client.writeQuery({
            query: MESSAGES_CONNECTION,
            variables: {
              where: { to: { id: { equals: newMessageSub.to.id } } },
            },
            data: {
              messages: [{ ...newMessageSub }],
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

        // refresh list of convos if this is a new convo
        // client.query({ query: CURRENT_USER_CONVOS });
      }

      // refresh unread messages every time a new message is recieved
      client.query({ query: CURRENT_USER_CONVOS, fetchPolicy: 'network-only' });
      client.query({ query: CURRENT_USER_UNREAD, fetchPolicy: 'network-only' });
    },
  });

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
        options={{ tabBarIcon: ({ focused, color, size }) => <MatchesDot color={color} /> }}
      />
      <Tabs.Screen
        name="NotificationsStack"
        component={NotificationsStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => <BellDot color={color} />,
        }}
      />
      <Tabs.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => <Icon name="search" size={21} color={color} style={{ paddingLeft: 1 }} />,
        }}
      />
      {/* <Tabs.Screen
        name="InboxStack"
        component={InboxStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => <EnvelopeDot color={color} />,
        }}
      /> */}
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
