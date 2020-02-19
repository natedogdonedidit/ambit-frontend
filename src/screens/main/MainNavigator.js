import React from 'react';
import Animated, { Easing } from 'react-native-reanimated';
// import { TransitionPresets } from 'react-navigation';

import { createStackNavigator, TransitionPresets, TransitionSpecs, CardStyleInterpolators } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { forVerticalIOSCustom } from 'library/utils/types.tsx';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import CustomDrawer from 'library/components/CustomDrawer';
import AccountScreen from './AccountScreen';
import SettingsScreen from './SettingsScreen';
import HomeScreen from './HomeScreen';
import ConnectionsScreen from './ConnectionsScreen';
import MessagesScreen from './MessagesScreen';
import ChatScreen from './ChatScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';
import PostScreen from './PostScreen';
import PostMatchesScreen from './PostMatchesScreen';
import UpdateScreen from './UpdateScreen';
import CommentScreen from './CommentScreen';
import UpdatePostScreen from './UpdatePostScreen';
import TopicScreen from './TopicScreen';
import SearchScreen from './SearchScreen';
import MyTopicsScreen from './MyTopicsScreen';
import MyHatsScreen from './MyHatsScreen';

// modals
import StoryModal from './modals/stories/StoryModal';
import CreateIntroModal from './modals/stories/CreateIntroModal';
import NewPostModal from './modals/post/NewPostModal';
import SelectGoalModal from './modals/post/SelectGoalModal';
import SelectGoalModalSearch from './modals/search/SelectGoalModalSearch';
import SelectGoalFieldModal from './modals/post/SelectGoalFieldModal';
import SelectPostTopicsModal from './modals/post/SelectPostTopicsModal';
import SelectSearchTopicsModal from './modals/search/SelectSearchTopicsModal';
import EditLocationModal from './modals/general/EditLocationModal';
import EditLocationRadiusModal from './modals/general/EditLocationRadiusModal';
import EditProfileModal from './modals/profile/EditProfileModal';
import EditAboutModal from './modals/profile/EditAboutModal';
import EditExperienceModal from './modals/profile/EditExperienceModal';
import EditEducationModal from './modals/profile/EditEducationModal';
import EditSkillsModal from './modals/profile/EditSkillsModal';
import SelectTopicsFocusModal from './modals/profile/SelectTopicsFocusModal';
import SelectTopicsInterestModal from './modals/profile/SelectTopicsInterestModal';
import SelectTopicsFreelanceModal from './modals/profile/SelectTopicsFreelanceModal';
import SelectTopicsInvestModal from './modals/profile/SelectTopicsInvestModal';
import SelectTopicsMentorModal from './modals/profile/SelectTopicsMentorModal';

// popups
import EditSkillsPopup from './modals/profile/EditSkillsPopup';
import EditPostPopup from './modals/post/EditPostPopup';
import YearModal from './modals/general/YearModal';
import MonthModal from './modals/general/MonthModal';
import EditStoryItemPopup from './modals/stories/EditStoryItemPopup';

// const { cond, interpolate } = Animated;

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: {
      screen: ProfileScreen,
    },
    Post: {
      screen: PostScreen,
    },
    PostMatches: {
      screen: PostMatchesScreen,
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
    Topic: {
      screen: TopicScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    MyTopics: {
      screen: MyTopicsScreen,
    },
    MyHats: {
      screen: MyHatsScreen,
    },
    Chat: {
      screen: ChatScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);
// required for GiftedChat TextInput whitespace offset issue
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName === 'Chat') {
      tabBarVisible = false;
    }
  }

  return {
    tabBarVisible,
  };
};

const PeopleStack = createStackNavigator(
  {
    Connections: ConnectionsScreen,
    Profile: {
      screen: ProfileScreen,
    },
    Post: {
      screen: PostScreen,
    },
    PostMatches: {
      screen: PostMatchesScreen,
    },
    Update: {
      screen: UpdateScreen,
    },
    Chat: {
      screen: ChatScreen,
    },
  },
  {
    initialRouteName: 'Connections',
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);
// required for GiftedChat TextInput whitespace offset issue
PeopleStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName === 'Chat') {
      tabBarVisible = false;
    }
  }

  return {
    tabBarVisible,
  };
};

const NotificationsStack = createStackNavigator(
  {
    Notifications: NotificationsScreen,
    Profile: {
      screen: ProfileScreen,
    },
    Post: {
      screen: PostScreen,
    },
    PostMatches: {
      screen: PostMatchesScreen,
    },
    Update: {
      screen: UpdateScreen,
    },
    Chat: {
      screen: ChatScreen,
    },
  },
  {
    initialRouteName: 'Notifications',
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);
// required for GiftedChat TextInput whitespace offset issue
NotificationsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName === 'Chat') {
      tabBarVisible = false;
    }
  }

  return {
    tabBarVisible,
  };
};

const InboxStack = createStackNavigator(
  {
    Messages: MessagesScreen,
    Chat: {
      screen: ChatScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Post: {
      screen: PostScreen,
    },
    PostMatches: {
      screen: PostMatchesScreen,
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

// required for GiftedChat TextInput whitespace offset issue
InboxStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName === 'Chat') {
      tabBarVisible = false;
    }
  }

  return {
    tabBarVisible,
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    People: PeopleStack,
    Notifications: NotificationsStack,
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
          iconName = `user-friends`;
        } else if (routeName === 'Notifications') {
          iconName = `bell`;
        } else if (routeName === 'Inbox') {
          iconName = `envelope`;
        }

        // You can return any component that you like here!
        return (
          <>
            <Icon name={iconName} size={22} color={tintColor} solid />
          </>
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.purp,
      inactiveTintColor: colors.iconGray,
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
          name="user-circle"
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
          name="user-circle"
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
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    SelectGoalModal: {
      screen: SelectGoalModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      },
    },
    SelectGoalFieldModal: {
      screen: SelectGoalFieldModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      },
    },
    SelectPostTopicsModal: {
      screen: SelectPostTopicsModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      },
    },
    SelectSearchTopicsModal: {
      screen: SelectSearchTopicsModal,
    },
    SelectGoalModalSearch: {
      screen: SelectGoalModalSearch,
    },

    EditLocationModal: {
      screen: EditLocationModal,
    },
    EditLocationModalRight: {
      screen: EditLocationModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      },
    },
    EditLocationRadiusModal: {
      screen: EditLocationRadiusModal,
    },
    EditProfileModal: {
      screen: EditProfileModal,
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
    EditStoryItemPopup: {
      screen: EditStoryItemPopup,
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
    SelectTopicsFocusModal: {
      screen: SelectTopicsFocusModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      },
    },
    SelectTopicsInterestModal: {
      screen: SelectTopicsInterestModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      },
    },
    SelectTopicsFreelanceModal: {
      screen: SelectTopicsFreelanceModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      },
    },
    SelectTopicsInvestModal: {
      screen: SelectTopicsInvestModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      },
    },
    SelectTopicsMentorModal: {
      screen: SelectTopicsMentorModal,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      },
    },
    // SelectFreelanceModal: {
    //   screen: SelectFreelanceModal,
    //   navigationOptions: {
    //     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    //     gestureEnabled: false,
    //   },
    // },
    // SelectInvestorModal: {
    //   screen: SelectInvestorModal,
    //   navigationOptions: {
    //     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    //     gestureEnabled: false,
    //   },
    // },
    // SelectMentorModal: {
    //   screen: SelectMentorModal,
    //   navigationOptions: {
    //     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    //     gestureEnabled: false,
    //   },
    // },
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
