import React, { useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useQuery, useApolloClient } from '@apollo/client';
// import analytics from '@segment/analytics-react-native';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import CURRENT_USER_FOLLOWING from 'library/queries/CURRENT_USER_FOLLOWING';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';

import SplashScreen from 'library/components/UI/SplashScreen';
import MainDrawer from 'navigators/MainDrawer';
// modals
import StoryModal from 'screens/main/modals/stories/StoryModal';
import IntroModal from 'screens/main/modals/stories/IntroModal';
import CameraModal from 'screens/main/modals/stories/CameraModal';
import PostToModal from 'screens/main/modals/stories/PostToModal';
import NewProjectTitleModal from 'screens/main/modals/stories/NewProjectTitleModal';
import NewProjectTopicsModal from 'screens/main/modals/stories/NewProjectTopicsModal';
import SelectStoryTopicsModal from 'screens/main/modals/stories/SelectStoryTopicsModal';
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
import SharePopup from 'screens/main/modals/general/SharePopup';
import DMPostPopup from 'screens/main/modals/general/DMPostPopup';
import EditSkillsPopup from 'screens/main/modals/profile/EditSkillsPopup';
import YearModal from 'screens/main/modals/general/YearModal';
import MonthModal from 'screens/main/modals/general/MonthModal';
import ForYouSettingsPopup from 'screens/main/modals/general/ForYouSettingsPopup';
import EditStoryItemPopup from 'screens/main/modals/stories/EditStoryItemPopup';
import IntroInfoPopup from 'screens/main/modals/stories/IntroInfoPopup';
import { UserContext } from 'library/utils/UserContext';

const Stack = createStackNavigator();

const MainStack = ({ navigation }) => {
  const client = useApolloClient();

  const { logoutCTX } = useContext(UserContext);

  // ////////////////////////////////////////
  // LOAD INITIAL QUERIES HERE
  // ////////////////////////////////////////
  // useEffect(() => {
  //   // pre-fetch stories home
  //   client.query({
  //     query: STORIES_HOME_QUERY,
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

  // CURRENT USER QUERY
  const { data: userData } = useQuery(CURRENT_USER_QUERY);

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

  // this might cause the splash screen to render every time current_user_query runs
  // this should only render upon the first time we are loading the CURRENT_USER_QUERY
  if (!userData) {
    // logoutCTX(); // cant do this!!
    return <SplashScreen />;
  }

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
      <Stack.Screen name="YearModal" component={YearModal} options={halfModalOptions} />
      <Stack.Screen name="MonthModal" component={MonthModal} options={halfModalOptions} />
    </Stack.Navigator>
  );
};

export default MainStack;
