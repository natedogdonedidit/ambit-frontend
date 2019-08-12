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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MainNavigator from './src/screens/main/MainNavigator';

import AuthLoadingScreen from './src/screens/onboarding/AuthLoadingScreen';
import BenefitsScreen1 from './src/screens/onboarding/BenefitsScreen1';
import BenefitsScreen2 from './src/screens/onboarding/BenefitsScreen2';
import BenefitsScreen3 from './src/screens/onboarding/BenefitsScreen3';
import OnboardingScreen1 from './src/screens/onboarding/OnboardingScreen1';
import OnboardingScreen2 from './src/screens/onboarding/OnboardingScreen2';
import OnboardingScreen3 from './src/screens/onboarding/OnboardingScreen3';
import LoginScreen from './src/screens/onboarding/LoginScreen';
import CreateAccountScreen from './src/screens/onboarding/CreateAccountScreen';

useScreens();

const AuthNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Benefits1: BenefitsScreen1,
    Benefits2: BenefitsScreen2,
    Benefits3: BenefitsScreen3,
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: '#5A50CC',
      headerStyle: {
        backgroundColor: '#fff',
      },
    }),
    initialRouteName: 'AuthLoading',
  }
);

const OnboardingNavigator = createStackNavigator(
  {
    Onboarding1: OnboardingScreen1,
    Onboarding2: OnboardingScreen2,
    Onboarding3: OnboardingScreen3,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: '#5A50CC',
      headerStyle: {
        backgroundColor: '#fff',
      },
    }),
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Onboarding: OnboardingNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Auth',
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
