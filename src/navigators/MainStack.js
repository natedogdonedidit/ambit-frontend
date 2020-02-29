import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import { UserContext } from 'library/utils/UserContext';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import MESSAGES_CONNECTION from 'library/queries/MESSAGES_CONNECTION';
import MESSAGES_CONNECTION_ALL from 'library/queries/MESSAGES_CONNECTION_ALL';
import NEW_NOTIFICATION_SUBSCRIPTION from 'library/subscriptions/NEW_NOTIFICATION_SUBSCRIPTION';
import MESSAGE_SUBSCRIPTION from 'library/subscriptions/MESSAGE_SUBSCRIPTION';

import ALL_CONNECTIONS_QUERY from 'library/queries/ALL_CONNECTIONS_QUERY';

import MainDrawer from 'navigators/MainDrawer';
// modals
import StoryModal from 'screens/main/modals/stories/StoryModal';
import CreateIntroModal from 'screens/main/modals/stories/CreateIntroModal';
import NewPostModal from 'screens/main/modals/post/NewPostModal';
import SelectGoalModal from 'screens/main/modals/post/SelectGoalModal';
import SelectGoalModalSearch from 'screens/main/modals/search/SelectGoalModalSearch';
import SelectGoalFieldModal from 'screens/main/modals/post/SelectGoalFieldModal';
import SelectPostTopicsModal from 'screens/main/modals/post/SelectPostTopicsModal';
import SelectSearchTopicsModal from 'screens/main/modals/search/SelectSearchTopicsModal';
import EditLocationModal from 'screens/main/modals/general/EditLocationModal';
import EditLocationRadiusModal from 'screens/main/modals/general/EditLocationRadiusModal';
import EditProfileModal from 'screens/main/modals/profile/EditProfileModal';
import EditAboutModal from 'screens/main/modals/profile/EditAboutModal';
import EditExperienceModal from 'screens/main/modals/profile/EditExperienceModal';
import EditEducationModal from 'screens/main/modals/profile/EditEducationModal';
import EditSkillsModal from 'screens/main/modals/profile/EditSkillsModal';
import SelectTopicsFocusModal from 'screens/main/modals/profile/SelectTopicsFocusModal';
import SelectTopicsInterestModal from 'screens/main/modals/profile/SelectTopicsInterestModal';
import SelectTopicsFreelanceModal from 'screens/main/modals/profile/SelectTopicsFreelanceModal';
import SelectTopicsInvestModal from 'screens/main/modals/profile/SelectTopicsInvestModal';
import SelectTopicsMentorModal from 'screens/main/modals/profile/SelectTopicsMentorModal';

// popups
import EditSkillsPopup from 'screens/main/modals/profile/EditSkillsPopup';
import EditPostPopup from 'screens/main/modals/post/EditPostPopup';
import YearModal from 'screens/main/modals/general/YearModal';
import MonthModal from 'screens/main/modals/general/MonthModal';
import EditStoryItemPopup from 'screens/main/modals/stories/EditStoryItemPopup';

const Stack = createStackNavigator();

const MainStack = () => {
  const { setUnseenNotifications, currentUserId } = useContext(UserContext);

  // ////////////////////////////////////////
  // LOAD INITIAL QUERIES HERE
  // ////////////////////////////////////////
  useQuery(ALL_CONNECTIONS_QUERY);
  useQuery(MESSAGES_CONNECTION_ALL);

  // NOTIFICATIONS QUERY
  const {
    data: notificationsData,
    networkStatus: networkStatusNotifications,
    subscribeToMore: subscribeToMoreNotifications,
  } = useQuery(NOTIFICATIONS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  const ok = networkStatusNotifications === 7;

  const moreNotifications = () => {
    subscribeToMoreNotifications({
      document: NEW_NOTIFICATION_SUBSCRIPTION,
      variables: { id: currentUserId },
      updateQuery: (previousData, { subscriptionData }) => {
        if (!subscriptionData.data) return previousData;
        const newNotifation = subscriptionData.data.newNotification;
        const newList = [newNotifation, ...previousData.myNotifications];

        return {
          myNotifications: newList,
        };
      },
    });
  };

  // SUBSCRIBE TO MORE NOTIFICATIONS ON FIRST RENDER
  useEffect(() => {
    moreNotifications();
  }, []);

  // UPDATE # OF UNSEEN NOTIFICATIONS EVERYTIME NEW NOTIFICATIONS DATA COMES IN
  useEffect(() => {
    if (ok && notificationsData.myNotifications) {
      // get # of unseen
      const { myNotifications } = notificationsData;
      const unSeen = myNotifications.reduce((num, notification) => {
        if (!notification.seen) return num + 1;
        return num;
      }, 0);

      if (unSeen > 0) {
        setUnseenNotifications(true);
      } else {
        setUnseenNotifications(false);
      }
    }
  }, [notificationsData]);

  // SUBSCRIBE TO NEW MESSAGES IN GROUPS WITH MY ID (IF THE CHAT DOESNT EXIST WHEN A NEW MESSAGE COMES IN THEN IGNORE IT)
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { id: currentUserId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { newMessageToMe } = subscriptionData.data;
      try {
        const previousData = client.readQuery({
          query: MESSAGES_CONNECTION,
          variables: { groupID: newMessageToMe.to.id },
        });

        const newEdges = [{ node: newMessageToMe, __typename: 'MessageEdge' }, ...previousData.messages.edges];

        client.writeQuery({
          query: MESSAGES_CONNECTION,
          variables: { groupID: newMessageToMe.to.id },
          data: {
            messages: { ...previousData.messages, edges: newEdges },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  // SUBSCRIBE TO NEW GROUPS WITH MY ID (IF THE CHAT DOESNT EXIST WHEN A NEW MESSAGE COMES IN THEN IGNORE IT)

  // UPDATE # OF UNSEEN MESSAGES EVERYTIME NEW MESSAGE DATA COMES IN

  return (
    <Stack.Navigator initialRouteName="MainDrawer" mode="modal" headerMode="none">
      <Stack.Screen name="MainDrawer" component={MainDrawer} />

      {/* modals */}
      <Stack.Screen name="StoryModal" component={StoryModal} />
      <Stack.Screen name="CreateIntroModal" component={CreateIntroModal} />
      <Stack.Screen name="NewPostModal" component={NewPostModal} />
      <Stack.Screen name="SelectGoalModal" component={SelectGoalModal} />
      <Stack.Screen name="SelectGoalFieldModal" component={SelectGoalFieldModal} />
      <Stack.Screen name="SelectPostTopicsModal" component={SelectPostTopicsModal} />
      <Stack.Screen name="SelectSearchTopicsModal" component={SelectSearchTopicsModal} />
      <Stack.Screen name="SelectGoalModalSearch" component={SelectGoalModalSearch} />
      <Stack.Screen name="EditLocationModal" component={EditLocationModal} />
      <Stack.Screen name="EditLocationModalRight" component={EditLocationModal} />
      <Stack.Screen name="EditLocationRadiusModal" component={EditLocationRadiusModal} />
      <Stack.Screen name="EditProfileModal" component={EditProfileModal} />
      <Stack.Screen name="EditAboutModal" component={EditAboutModal} />
      <Stack.Screen name="EditSkillsModal" component={EditSkillsModal} />
      <Stack.Screen name="EditSkillsPopup" component={EditSkillsPopup} />
      <Stack.Screen name="EditPostPopup" component={EditPostPopup} />
      <Stack.Screen name="EditStoryItemPopup" component={EditStoryItemPopup} />
      <Stack.Screen name="EditExperienceModal" component={EditExperienceModal} />
      <Stack.Screen name="EditEducationModal" component={EditEducationModal} />
      <Stack.Screen name="SelectTopicsFocusModal" component={SelectTopicsFocusModal} />
      <Stack.Screen name="SelectTopicsInterestModal" component={SelectTopicsInterestModal} />
      <Stack.Screen name="SelectTopicsFreelanceModal" component={SelectTopicsFreelanceModal} />
      <Stack.Screen name="SelectTopicsInvestModal" component={SelectTopicsInvestModal} />
      <Stack.Screen name="SelectTopicsMentorModal" component={SelectTopicsMentorModal} />
      <Stack.Screen name="YearModal" component={YearModal} />
      <Stack.Screen name="MonthModal" component={MonthModal} />
    </Stack.Navigator>
  );
};

export default MainStack;
