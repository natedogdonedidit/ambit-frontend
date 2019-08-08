import React from 'react';
import { useScreens } from 'react-native-screens';
import {
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  HeaderBackButton,
} from 'react-navigation';
import { Text } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import WelcomeScreen from './src/screens/WelcomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LoginScreen from './src/screens/LoginScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import CustomDrawer from './src/components/CustomDrawer';

import HomeScreen from './src/screens/HomeScreen';
import SuggestionsScreen from './src/screens/SuggestionsScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import NetworkScreen from './src/screens/NetworkScreen';

import ProfileScreen from './src/screens/ProfileScreen';
import RequestsScreen from './src/screens/RequestsScreen';

useScreens();

/**
 *  - AppSwitchNavigator (switchNavigator)
 *    - WelcomeScreen1
 *    - WelcomeScreen2
 *    - WelcomeScreen3
 *    - MainScreen (drawerNavigator)
 *      - TabsNavigator (bottomTabsNavigator)
 *        - Home (stackNavigator)
 *          - UserProfile
 *        - People (stackNavigator)
 *          - UserProfile
 *        - Inbox (stackNavigator)
 *          - UserProfile
 *        - Network (stackNavigator)
 *      - Account (stackNavigator - goes back to Tabs)
 *      - Settings (stackNavigator - goes back to Tabs)
 *      - Create Account
 *      - Login
 */

// create tab navigator
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: '#5A50CC',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerLeft: (
        <Icon
          name="account-circle"
          size={25}
          color="#5A50CC"
          style={{ paddingLeft: 15 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
    }),
  }
);

const PeopleStack = createStackNavigator(
  {
    Suggestions: SuggestionsScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Suggestions',
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: '#5A50CC',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerLeft: (
        <Icon
          name="account-circle"
          size={25}
          color="#5A50CC"
          style={{ paddingLeft: 15 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
    }),
  }
);

const InboxStack = createStackNavigator(
  {
    Messages: MessagesScreen,
    Requests: RequestsScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Messages',
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: '#5A50CC',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerLeft: (
        <Icon
          name="account-circle"
          size={25}
          color="#5A50CC"
          style={{ paddingLeft: 15 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
    }),
  }
);

const NetworkStack = createStackNavigator(
  {
    Network: NetworkScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Network',
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: '#5A50CC',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerLeft: (
        <Icon
          name="account-circle"
          size={25}
          color="#5A50CC"
          style={{ paddingLeft: 15 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
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
        console.log(navigation);

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
      activeTintColor: '#5A50CC',
      inactiveTintColor: 'rgba(64, 64, 64, 0.2)',
      showLabel: false,
    },
  }
);

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: '#5A50CC',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerLeft: (
        <Icon
          name="account-circle"
          size={25}
          color="#5A50CC"
          style={{ paddingLeft: 15 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      // headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Tabs')} />,
    }),
  }
);

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: '#5A50CC',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerLeft: (
        <Icon
          name="account-circle"
          size={25}
          color="#5A50CC"
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
      headerTintColor: '#5A50CC',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerLeft: (
        <Icon
          name="account-circle"
          size={25}
          color="#5A50CC"
          style={{ paddingLeft: 15 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      // headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Tabs')} />,
    }),
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Tabs: TabNavigator,
    Login: LoginStack,
    Account: AccountStack,
    Settings: SettingsStack,
  },
  {
    initialRouteName: 'Tabs',
    drawerPosition: 'left',
    drawerType: 'slide',
    contentComponent: CustomDrawer,
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  // Welcome: WelcomeScreen,
  Main: AppDrawerNavigator,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
