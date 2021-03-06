import React, { useEffect, useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useQuery, useMutation } from '@apollo/client';
import { getApnToken } from 'library/utils/apnUtil';
// import analytics from '@segment/analytics-react-native';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import CURRENT_USER_APN_TOKEN from 'library/queries/CURRENT_USER_APN_TOKEN';
import STORIES_FORYOU_QUERY from 'library/queries/STORIES_FORYOU_QUERY';
import POSTS_FORYOU_QUERY from 'library/queries/POSTS_FORYOU_QUERY';
import POSTS_FOLLOWING_QUERY from 'library/queries/POSTS_FOLLOWING_QUERY';
import UPDATE_USER_MUTATION from 'library/mutations/UPDATE_USER_MUTATION';

import SplashScreen from 'library/components/UI/SplashScreen';
import MainDrawer from 'navigators/MainDrawer';

// modals
import StoryModalForYou from 'modals/stories/StoryModalForYou';
import StoryModalTopic from 'modals/stories/StoryModalTopic';
import StoryModalUser from 'modals/stories/StoryModalUser';

import StoryCameraModal from 'modals/stories/StoryCameraModal';
import SelectProjectPopup from 'modals/stories/SelectProjectPopup';
import PostClipModal from 'modals/stories/PostClipModal';
import NewProjectTopicsModal from 'modals/stories/NewProjectTopicsModal';
import SelectStoryTopicsModal from 'modals/stories/SelectStoryTopicsModal';
import NewPostModal from 'modals/post/NewPostModal';
import CustomGoalModal from 'modals/post/CustomGoalModal';
import SelectGoalModal from 'modals/post/SelectGoalModal';
import SelectGoalModalSearch from 'modals/search/SelectGoalModalSearch';
import SelectGoalFieldModal from 'modals/post/SelectGoalFieldModal';
import SelectPostTopicsModal from 'modals/post/SelectPostTopicsModal';
import SelectSearchTopicsModal from 'modals/search/SelectSearchTopicsModal';
import EditLocationModal from 'modals/general/EditLocationModal';
import EditLocationRadiusModal from 'modals/general/EditLocationRadiusModal';
import ImageViewerModal from 'modals/general/ImageViewerModal';
import EditProfileModal from 'modals/profile/EditProfileModal';
import EditAboutModal from 'modals/profile/EditAboutModal';
import EditExperienceModal from 'modals/profile/EditExperienceModal';
import EditEducationModal from 'modals/profile/EditEducationModal';
import EditSkillsModal from 'modals/profile/EditSkillsModal';
import SelectTopicsFocusModal from 'modals/profile/SelectTopicsFocusModal';
import SelectTopicsInterestModal from 'modals/profile/SelectTopicsInterestModal';
import SelectTopicsFreelanceModal from 'modals/profile/SelectTopicsFreelanceModal';
import SelectTopicsInvestModal from 'modals/profile/SelectTopicsInvestModal';
import SelectTopicsMentorModal from 'modals/profile/SelectTopicsMentorModal';
import MyMentorModal from 'modals/general/MyMentorModal';
import MyFreelanceModal from 'modals/general/MyFreelanceModal';
import MyInvestModal from 'modals/general/MyInvestModal';
import MyNetworkModal from 'modals/general/MyNetworkModal';
import AddUpdateModal from 'modals/post/AddUpdateModal';
import AddCommentModal from 'modals/post/AddCommentModal';

// popups
import PopupTest from 'modals/general/PopupTest';
import GenericPopupMenu from 'modals/general/GenericPopupMenu';
import SharePopup from 'modals/general/SharePopup';
import DMPostPopup from 'modals/general/DMPostPopup';
import EditSkillsPopup from 'modals/profile/EditSkillsPopup';
import YearModal from 'modals/general/YearModal';
import MonthModal from 'modals/general/MonthModal';
import ForYouSettingsPopup from 'modals/general/ForYouSettingsPopup';
import EditStoryItemPopup from 'modals/stories/EditStoryItemPopup';
import IntroInfoPopup from 'modals/stories/IntroInfoPopup';
import { UserContext } from 'library/utils/UserContext';

const Stack = createStackNavigator();

// config for "popups"
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

const MainStack = ({ navigation }) => {
  const { currentUsername } = useContext(UserContext);

  // ////////////////////////////////////////
  // MUTATION TO SAVE APN TOKEN TO DATABASE
  // ////////////////////////////////////////
  const [writeApn, { loading: loadingApnWrite }] = useMutation(UPDATE_USER_MUTATION);

  // ////////////////////////////////////////
  // PRE-FETCH INITIAL QUERIES HERE
  // ////////////////////////////////////////
  const { data: userData, loading: loadingUser } = useQuery(CURRENT_USER_QUERY);
  const { data: userApnTokenData, loading: loadingUserApnToken } = useQuery(CURRENT_USER_APN_TOKEN);
  const { data: storyData, loading: loadingStories } = useQuery(STORIES_FORYOU_QUERY, {
    variables: { feed: 'foryou' },
  });
  const { data: postsData, loading: loadingPosts } = useQuery(POSTS_FOLLOWING_QUERY, {
    variables: {
      feed: 'following',
      take: 10,
      // cursor: null,
    },
  });
  const { data: postsData2, loading: loadingPosts2 } = useQuery(POSTS_FORYOU_QUERY, {
    variables: {
      feed: 'foryou',
      take: 10,
      // cursor: null,
    },
  });

  const readyToDisplay = userData && storyData && postsData && postsData2;

  // write the APN device code to the DB if the one in Async Storage does not match the one in the DB
  // Async Storage will always hold the latest APN device code for the user
  useEffect(() => {
    const compareAPN = async () => {
      if (userApnTokenData && userApnTokenData.userApnToken) {
        // 1. grab apn token from Database
        const databaseApn = userApnTokenData.userApnToken.apnToken || '';

        // 2. grab apn token from AsyncStorage
        const apnToken = await getApnToken();

        // 3. save Async Storage apn to the database if they don't match
        if (!!currentUsername && !!apnToken && apnToken !== databaseApn) {
          console.log('writing apn token to database');
          console.log('db:', databaseApn, 'async:', apnToken);
          await writeApn({
            variables: {
              where: { username: currentUsername },
              data: { apnToken: apnToken },
            },
          });
        }
      }
    };

    compareAPN();
  }, [userApnTokenData]);

  // this might cause the splash screen to render every time current_user_query runs
  // this should only render upon the first time we are loading the CURRENT_USER_QUERY
  if (!readyToDisplay) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="MainDrawer"
      mode="modal"
      headerMode="none"
      screenOptions={{
        gestureResponseDistance: { vertical: 500 },
      }}>
      <Stack.Screen name="MainDrawer" component={MainDrawer} />

      {/* modals */}
      <Stack.Screen name="StoryModalForYou" component={StoryModalForYou} />
      <Stack.Screen name="StoryModalTopic" component={StoryModalTopic} />
      <Stack.Screen name="StoryModalUser" component={StoryModalUser} />

      <Stack.Screen name="StoryCameraModal" component={StoryCameraModal} />
      <Stack.Screen name="SelectProjectPopup" component={SelectProjectPopup} options={halfModalOptions} />

      {/* <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        // options={{
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // }}
      /> */}
      <Stack.Screen
        name="PostClipModal"
        component={PostClipModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: false,
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
      <Stack.Screen name="NewPostModal" component={NewPostModal} />
      <Stack.Screen
        name="MyFreelance"
        component={MyFreelanceModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="MyInvest"
        component={MyInvestModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="MyMentor"
        component={MyMentorModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="MyNetwork"
        component={MyNetworkModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
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

      <Stack.Screen name="PopupTest" component={PopupTest} options={halfModalOptions} />
      <Stack.Screen name="EditLocationRadiusModal" component={EditLocationRadiusModal} />
      <Stack.Screen name="EditProfileModal" component={EditProfileModal} />
      <Stack.Screen name="EditAboutModal" component={EditAboutModal} />
      <Stack.Screen name="EditSkillsModal" component={EditSkillsModal} />
      <Stack.Screen name="EditSkillsPopup" component={EditSkillsPopup} options={halfModalOptions} />
      <Stack.Screen name="GenericPopupMenu" component={GenericPopupMenu} options={halfModalOptions} />
      <Stack.Screen name="SharePopup" component={SharePopup} options={halfModalOptions} />
      <Stack.Screen name="DMPostPopup" component={DMPostPopup} options={halfModalOptions} />
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
      <Stack.Screen
        name="AddUpdateModal"
        component={AddUpdateModal}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="AddCommentModal"
        component={AddCommentModal}
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

// ////////////////////////////////////////
// LOAD INITIAL QUERIES HERE
// ////////////////////////////////////////
// useEffect(() => {
//   // pre-fetch stories home
//   client.query({
//     query: STORIES_FORYOU_QUERY,
//   });

//   // pre-fetch my topics
//   client.query({
//     query: CURRENT_USER_TOPICS,
//   });

//   // pre-fetch people I follow
//   client.query({
//     query: CURRENT_USER_FOLLOWING,
//   });
// }, []);
