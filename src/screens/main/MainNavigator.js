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
import NetworkScreen from './NetworkScreen';
import ProfileScreen from './ProfileScreen';
import PostScreen from './PostScreen';
import UpdatePostScreen from './UpdatePostScreen';
import RequestsScreen from './RequestsScreen';
import CustomSearchScreen from './CustomSearchScreen';
// modals
import StoryModal from './modals/StoryModal';
import NewPostModal from './modals/NewPostModal';
import SelectGoalModal from './modals/SelectGoalModal';
import RollModal from './modals/RollModal';
import EditLocationModal from './modals/EditLocationModal';
import EditLocationRadiusModal from './modals/EditLocationRadiusModal';
import EditNameModal from './modals/EditNameModal';
import EditProfessionModal from './modals/EditProfessionModal';
import EditBioModal from './modals/EditBioModal';
import EditExperienceModal from './modals/EditExperienceModal';
import EditEducationModal from './modals/EditEducationModal';
import EditSkillsModal from './modals/EditSkillsModal';
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
    UpdatePost: {
      screen: UpdatePostScreen,
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

const PeopleStack = createStackNavigator(
  {
    Suggestions: SuggestionsScreen,
    Profile: {
      screen: ProfileScreen,
    },
    Post: {
      screen: PostScreen,
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
  },
  {
    initialRouteName: 'Messages',
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);

const NetworkStack = createStackNavigator(
  {
    Network: NetworkScreen,
    Profile: {
      screen: ProfileScreen,
    },
    Post: {
      screen: PostScreen,
    },
  },
  {
    initialRouteName: 'Network',
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    People: PeopleStack,
    Inbox: InboxStack,
    Network: NetworkStack,
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
        } else if (routeName === 'Network') {
          iconName = `gamepad-circle`;
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
    NewPostModal: {
      screen: NewPostModal,
    },
    SelectGoalModal: {
      screen: SelectGoalModal,
    },
    RollModal: {
      screen: RollModal,
    },
    EditLocationModal: {
      screen: EditLocationModal,
    },
    EditLocationRadiusModal: {
      screen: EditLocationRadiusModal,
    },
    EditNameModal: {
      screen: EditNameModal,
    },
    EditProfessionModal: {
      screen: EditProfessionModal,
    },
    EditBioModal: {
      screen: EditBioModal,
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
