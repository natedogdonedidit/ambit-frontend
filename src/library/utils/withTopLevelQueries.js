import React, { useEffect, useContext } from 'react';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import NEW_NOTIFICATION_SUBSCRIPTION from 'library/subscriptions/NEW_NOTIFICATION_SUBSCRIPTION';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from 'library/utils/UserContext';
import { NavigationActions, NavigationContext } from 'react-navigation';

export default function withTopLevelQueries(Wrapped) {
  return function hey(props) {
    const { navigation } = props;
    const { currentUserId } = useContext(UserContext);

    // get all notifications & subscribe to more (might be a better locations for initial loading queries!!)
    const {
      data: notificationsData,
      networkStatus: networkStatusNotifications,
      subscribeToMore: subscribeToMoreNotifications,
    } = useQuery(NOTIFICATIONS_QUERY, {
      notifyOnNetworkStatusChange: true,
    });

    const ok = networkStatusNotifications === 7;

    useEffect(() => {
      console.log('running effect in topLevelQueries');
      if (ok && notificationsData.myNotifications) {
        console.log('counting number of unseen in topLevel Queries');
        // get # of unseen
        const { myNotifications } = notificationsData;
        const unSeen = myNotifications.reduce((num, notification) => {
          if (!notification.seen) return num + 1;
          return num;
        }, 0);

        // pass unseen to navigation params
        const setParamsAction = NavigationActions.setParams({
          params: { unSeen },
          key: 'NotificationsTab',
        });
        navigation.dispatch(setParamsAction);
      }
    }, [notificationsData]);
    // }, [networkStatusNotifications]);

    const more = () => {
      if (currentUserId) {
        console.log(`subscribing to more notifications for ${currentUserId}`);
        subscribeToMoreNotifications({
          document: NEW_NOTIFICATION_SUBSCRIPTION,
          variables: { id: currentUserId },
          updateQuery: (previousData, { subscriptionData }) => {
            // console.log('subscriptionData', subscriptionData);
            // console.log('previousData', previousData);
            if (!subscriptionData.data) return previousData;
            const newNotifation = subscriptionData.data.newNotification;
            // console.log('newMessage', newMessage);
            const newList = [newNotifation, ...previousData.myNotifications];

            // try this - to put dot on tab indicating a new notification came in
            const setParamsAction = NavigationActions.setParams({
              params: { unSeen: 1 },
              key: 'NotificationsTab',
            });
            navigation.dispatch(setParamsAction);

            return {
              myNotifications: newList,
            };
          },
        });
      }
    };

    useEffect(() => {
      more();
    }, [currentUserId]);

    return <Wrapped {...props} />;
  };
}
