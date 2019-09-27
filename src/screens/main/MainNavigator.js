import React from 'react';
import { createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
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
import StoryModal from './StoryModal';
import CustomSearchScreen from './CustomSearchScreen';

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
      header: null,
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
      header: null,
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
      header: null,
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
      header: null,
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
    // RollModal: {
    //   screen: RollModal,
    // },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default MainNavWithModal;
