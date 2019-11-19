import React from 'react';
import Animated, { Easing } from 'react-native-reanimated';
// import { TransitionPresets } from 'react-navigation';

import { createStackNavigator, TransitionPresets, TransitionSpecs, CardStyleInterpolators } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { forVerticalIOSCustom } from 'library/utils/types.tsx';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from 'styles/colors';
import CustomDrawer from 'library/components/CustomDrawer';
import AccountScreen from './AccountScreen';
import SettingsScreen from './SettingsScreen';
import HomeScreen from './HomeScreen';
import SuggestionsScreen from './SuggestionsScreen';
import MessagesScreen from './MessagesScreen';
import JobsScreen from './JobsScreen';
import ProfileScreen from './ProfileScreen';
import PostScreen from './PostScreen';
import UpdateScreen from './UpdateScreen';
import CommentScreen from './CommentScreen';
import UpdatePostScreen from './UpdatePostScreen';
import RequestsScreen from './RequestsScreen';
import CustomSearchScreen from './CustomSearchScreen';
// modals
import StoryModal from './modals/StoryModal';
import CreateIntroModal from './modals/CreateIntroModal';
import NewPostModal from './modals/NewPostModal';
import SelectGoalModal from './modals/SelectGoalModal';
import SelectGoalFieldModal from './modals/SelectGoalFieldModal';
import RollModal from './modals/RollModal';
import EditLocationModal from './modals/EditLocationModal';
import EditLocationRadiusModal from './modals/EditLocationRadiusModal';
import EditNameModal from './modals/EditNameModal';
import EditProfessionModal from './modals/EditProfessionModal';
import EditBioModal from './modals/EditBioModal';
import EditAboutModal from './modals/EditAboutModal';
import EditExperienceModal from './modals/EditExperienceModal';
import EditEducationModal from './modals/EditEducationModal';
import EditSkillsModal from './modals/EditSkillsModal';
import SelectIndustryModal from './modals/SelectIndustryModal';
import SelectFreelanceModal from './modals/SelectFreelanceModal';
import SelectInvestorModal from './modals/SelectInvestorModal';
import SelectMentorModal from './modals/SelectMentorModal';

// popups
import EditSkillsPopup from './modals/EditSkillsPopup';
import EditPostPopup from './modals/EditPostPopup';
import YearModal from './modals/YearModal';
import MonthModal from './modals/MonthModal';

const { cond, interpolate } = Animated;

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: {
      screen: ProfileScreen,
    },
    Post: {
      screen: PostScreen,
    },
    Update: {
      screen: UpdateScreen,
    },
    UpdatePost: {
      screen: UpdatePostScreen,
    },
    Comment: {
      screen: CommentScreen,
    },
    CustomSearch: {
      screen: CustomSearchScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);

const JobsStack = createStackNavigator(
  {
    Jobs: JobsScreen,
    Profile: {
      screen: ProfileScreen,
    },
    Post: {
      screen: PostScreen,
    },
    Update: {
      screen: UpdateScreen,
    },
  },
  {
    initialRouteName: 'Jobs',
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);

const PeopleStack = createStackNavigator(
  {
    Suggestions: SuggestionsScreen,
    Profile: {
      screen: ProfileScreen,
    },
    Post: {
      screen: PostScreen,
    },
    Update: {
      screen: UpdateScreen,
    },
  },
  {
    initialRouteName: 'Suggestions',
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);

const InboxStack = createStackNavigator(
  {
    Messages: MessagesScreen,
    Requests: RequestsScreen,
    Profile: {
      screen: ProfileScreen,
    },
    Post: {
      screen: PostScreen,
    },
    Update: {
      screen: UpdateScreen,
    },
  },
  {
    initialRouteName: 'Messages',
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    People: PeopleStack,
    Jobs: JobsStack,
    Inbox: InboxStack,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        // console.log(navigation);

        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'People') {
          iconName = `account-search`;
        } else if (routeName === 'Inbox') {
          iconName = `email-outline`;
        } else if (routeName === 'Jobs') {
          iconName = `briefcase-search-outline`;
        }

        // You can return any component that you like here!
        return (
          <>
            <Icon name={iconName} size={25} color={tintColor} />
          </>
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.purp,
      inactiveTintColor: 'rgba(64, 64, 64, 0.2)',
      showLabel: false,
    },
  }
);

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: colors.purp,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerLeft: (
        <Icon
          name="account-circle"
          size={25}
          color={colors.purp}
          style={{ paddingLeft: 15 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      // headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Tabs')} />,
    }),
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: colors.purp,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerLeft: (
        <Icon
          name="account-circle"
          size={25}
          color={colors.purp}
          style={{ paddingLeft: 15 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      // headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Tabs')} />,
    }),
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Tabs: TabNavigator,
    Account: AccountStack,
    Settings: SettingsStack,
  },
  {
    initialRouteName: 'Tabs',
    drawerPosition: 'left',
    drawerType: 'slide',
    contentComponent: CustomDrawer,
    drawerWidth: 300,
  }
);

const MainNavWithModal = createStackNavigator(
  {
    Main: {
      screen: MainNavigator,
    },
    StoryModal: {
      screen: StoryModal,
    },
    CreateIntroModal: {
      screen: CreateIntroModal,
    },
    NewPostModal: {
      screen: NewPostModal,
    },
    SelectGoalModal: {
      screen: SelectGoalModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    SelectGoalFieldModal: {
      screen: SelectGoalFieldModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    RollModal: {
      screen: RollModal,
    },
    EditLocationModal: {
      screen: EditLocationModal,
    },
    EditLocationModalRight: {
      screen: EditLocationModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    EditLocationRadiusModal: {
      screen: EditLocationRadiusModal,
    },
    EditNameModal: {
      screen: EditNameModal,
    },
    EditProfessionModal: {
      screen: EditProfessionModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    EditBioModal: {
      screen: EditBioModal,
    },
    EditAboutModal: {
      screen: EditAboutModal,
    },
    EditSkillsModal: {
      screen: EditSkillsModal,
    },
    EditSkillsPopup: {
      screen: EditSkillsPopup,
      navigationOptions: {
        cardStyleInterpolator: forVerticalIOSCustom,
      },
    },
    EditPostPopup: {
      screen: EditPostPopup,
      navigationOptions: {
        cardStyleInterpolator: forVerticalIOSCustom,
      },
    },
    EditExperienceModal: {
      screen: EditExperienceModal,
    },
    EditEducationModal: {
      screen: EditEducationModal,
    },
    SelectIndustryModal: {
      screen: SelectIndustryModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    SelectFreelanceModal: {
      screen: SelectFreelanceModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    SelectInvestorModal: {
      screen: SelectInvestorModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    SelectMentorModal: {
      screen: SelectMentorModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    YearModal: {
      screen: YearModal,
      navigationOptions: {
        cardStyleInterpolator: forVerticalIOSCustom,
      },
    },
    MonthModal: {
      screen: MonthModal,
      navigationOptions: {
        cardStyleInterpolator: forVerticalIOSCustom,
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',

    defaultNavigationOptions: {
      // ...TransitionPresets.ModalPresentationIOS,
      // ...TransitionPresets.ModalTransition,
      // ...TransitionSpecs.TransitionIOSSpec,
      ...TransitionPresets.ModalSlideFromBottomIOS,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      cardTransparent: true,
      gestureResponseDistance: {
        vertical: 500,
      },
    },
  }
);

export default MainNavWithModal;
