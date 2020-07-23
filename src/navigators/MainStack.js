import React, { useContext, useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import analytics from '@segment/analytics-react-native';

import { UserContext } from 'library/utils/UserContext';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import MESSAGES_CONNECTION from 'library/queries/MESSAGES_CONNECTION';
import MESSAGES_CONNECTION_ALL from 'library/queries/MESSAGES_CONNECTION_ALL';
import NEW_NOTIFICATION_SUBSCRIPTION from 'library/subscriptions/NEW_NOTIFICATION_SUBSCRIPTION';
import MESSAGE_SUBSCRIPTION from 'library/subscriptions/MESSAGE_SUBSCRIPTION';

import ALL_CONNECTIONS_QUERY from 'library/queries/ALL_CONNECTIONS_QUERY';

import MainDrawer from 'navigators/MainDrawer';
// modals
import StoryModal from 'screens/main/modals/stories/StoryModal';
import IntroModal from 'screens/main/modals/stories/IntroModal';
import CameraModal from 'screens/main/modals/stories/CameraModal';
import PostToModal from 'screens/main/modals/stories/PostToModal';
import NewProjectTitleModal from 'screens/main/modals/stories/NewProjectTitleModal';
import NewProjectTopicsModal from 'screens/main/modals/stories/NewProjectTopicsModal';
import SelectStoryTopicsModal from 'screens/main/modals/stories/SelectStoryTopicsModal';
import CreateIntroModal from 'screens/main/modals/stories/CreateIntroModal';
import NewPostModal from 'screens/main/modals/post/NewPostModal';
import CustomGoalModal from 'screens/main/modals/post/CustomGoalModal';
import SelectGoalModal from 'screens/main/modals/post/SelectGoalModal';
import SelectGoalModalSearch from 'screens/main/modals/search/SelectGoalModalSearch';
import SelectGoalFieldModal from 'screens/main/modals/post/SelectGoalFieldModal';
import SelectPostTopicsModal from 'screens/main/modals/post/SelectPostTopicsModal';
import SelectSearchTopicsModal from 'screens/main/modals/search/SelectSearchTopicsModal';
import EditLocationModal from 'screens/main/modals/general/EditLocationModal';
import EditLocationRadiusModal from 'screens/main/modals/general/EditLocationRadiusModal';
import ImageViewerModal from 'screens/main/modals/general/ImageViewerModal';
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
import SelectorModal from 'screens/main/modals/general/SelectorModal';
import EditSkillsPopup from 'screens/main/modals/profile/EditSkillsPopup';
import YearModal from 'screens/main/modals/general/YearModal';
import MonthModal from 'screens/main/modals/general/MonthModal';
import ForYouSettingsPopup from 'screens/main/modals/general/ForYouSettingsPopup';
import EditStoryItemPopup from 'screens/main/modals/stories/EditStoryItemPopup';
import IntroInfoPopup from 'screens/main/modals/stories/IntroInfoPopup';

const Stack = createStackNavigator();

const MainStack = () => {
  const { setUnReadNotifications, currentUserId } = useContext(UserContext);

  // ////////////////////////////////////////
  // LOAD INITIAL QUERIES HERE
  // ////////////////////////////////////////
  useQuery(ALL_CONNECTIONS_QUERY);
  const { refetch: refetchMessageConnections } = useQuery(MESSAGES_CONNECTION_ALL);

  // CURRENT USER QUERY (USED TO COUNT UNREAD MESSAGES & REFETCH GROUPS)
  const { data: userData, networkStatus: networkStatusUser, refetch: refetchUser } = useQuery(CURRENT_USER_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  const userOk = networkStatusUser === 7;

  // NOTIFICATIONS QUERY
  const {
    data: notificationsData,
    networkStatus: networkStatusNotifications,
    subscribeToMore: subscribeToMoreNotifications,
  } = useQuery(NOTIFICATIONS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  const notificationsOk = networkStatusNotifications === 7;

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
    if (notificationsOk && notificationsData.myNotifications) {
      // get # of unseen
      const { myNotifications } = notificationsData;
      const unRead = myNotifications.reduce((num, notification) => {
        if (!notification.seen) return num + 1;
        return num;
      }, 0);

      if (unRead > 0) {
        setUnReadNotifications(unRead);
      } else {
        setUnReadNotifications(0);
      }
    }
  }, [notificationsData]);

  // SUBSCRIBE TO NEW MESSAGES IN GROUPS WITH MY ID (IF THE CHAT DOESNT EXIST WHEN A NEW MESSAGE COMES IN THEN IGNORE IT)
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { id: currentUserId },
    onSubscriptionData: async ({ client, subscriptionData }) => {
      // console.log('subscriptionData', subscriptionData);
      const { newMessageToMe } = subscriptionData.data;
      try {
        const previousData = await client.readQuery({
          query: MESSAGES_CONNECTION,
          variables: { groupID: newMessageToMe.to.id },
        });

        // IF MESSAGE CONNECTION DOES NOT EXIST YET WE WILL ENTER CATCH STATEMENT

        if (previousData && newMessageToMe) {
          const newEdges = [{ node: newMessageToMe, __typename: 'MessageEdge' }, ...previousData.messages.edges];

          client.writeQuery({
            query: MESSAGES_CONNECTION,
            variables: { groupID: newMessageToMe.to.id },
            data: {
              messages: { ...previousData.messages, edges: newEdges },
            },
          });
        }
      } catch (e) {
        console.log('new message from a chat that was not fetched yet');
        refetchMessageConnections();
      }

      // ADD THE MESSAGE TO UNREAD MESSAGES
      refetchUser();
    },
  });

  const halfModalOptions = {
    cardStyle: { backgroundColor: 'transparent' },
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.7, 0.9, 1],
        }),
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
          extrapolate: 'clamp',
        }),
      },
    }),
  };

  return (
    <Stack.Navigator
      initialRouteName="MainDrawer"
      // screenOptions={}
      mode="modal"
      headerMode="none"
    >
      <Stack.Screen name="MainDrawer" component={MainDrawer} />

      {/* modals */}
      <Stack.Screen name="StoryModal" component={StoryModal} />
      <Stack.Screen name="IntroModal" component={IntroModal} />
      <Stack.Screen name="CameraModal" component={CameraModal} />
      <Stack.Screen
        name="PostToModal"
        component={PostToModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="NewProjectTitleModal"
        component={NewProjectTitleModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="NewProjectTopicsModal"
        component={NewProjectTopicsModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SelectStoryTopicsModal"
        component={SelectStoryTopicsModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen name="CreateIntroModal" component={CreateIntroModal} />
      <Stack.Screen name="NewPostModal" component={NewPostModal} />
      <Stack.Screen name="ImageViewerModal" component={ImageViewerModal} />
      <Stack.Screen
        name="CustomGoalModal"
        component={CustomGoalModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SelectGoalModal"
        component={SelectGoalModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SelectGoalFieldModal"
        component={SelectGoalFieldModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SelectPostTopicsModal"
        component={SelectPostTopicsModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SelectSearchTopicsModal"
        component={SelectSearchTopicsModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SelectGoalModalSearch"
        component={SelectGoalModalSearch}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen name="EditLocationModal" component={EditLocationModal} />
      <Stack.Screen
        name="EditLocationModalRight"
        component={EditLocationModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen name="EditLocationRadiusModal" component={EditLocationRadiusModal} />
      <Stack.Screen name="EditProfileModal" component={EditProfileModal} />
      <Stack.Screen name="EditAboutModal" component={EditAboutModal} />
      <Stack.Screen name="EditSkillsModal" component={EditSkillsModal} />
      <Stack.Screen name="EditSkillsPopup" component={EditSkillsPopup} options={halfModalOptions} />
      <Stack.Screen name="SelectorModal" component={SelectorModal} options={halfModalOptions} />
      <Stack.Screen name="EditStoryItemPopup" component={EditStoryItemPopup} options={halfModalOptions} />
      <Stack.Screen name="IntroInfoPopup" component={IntroInfoPopup} options={halfModalOptions} />
      <Stack.Screen name="ForYouSettingsPopup" component={ForYouSettingsPopup} options={halfModalOptions} />
      <Stack.Screen name="EditEducationModal" component={EditEducationModal} />
      <Stack.Screen name="EditExperienceModal" component={EditExperienceModal} />
      <Stack.Screen
        name="SelectTopicsFocusModal"
        component={SelectTopicsFocusModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SelectTopicsInterestModal"
        component={SelectTopicsInterestModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SelectTopicsFreelanceModal"
        component={SelectTopicsFreelanceModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SelectTopicsInvestModal"
        component={SelectTopicsInvestModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="SelectTopicsMentorModal"
        component={SelectTopicsMentorModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen name="YearModal" component={YearModal} options={halfModalOptions} />
      <Stack.Screen name="MonthModal" component={MonthModal} options={halfModalOptions} />
    </Stack.Navigator>
  );
};

export default MainStack;
