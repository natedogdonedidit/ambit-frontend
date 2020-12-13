import React, { useContext, useEffect, useState } from 'react';
import { YellowBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import * as Sentry from '@sentry/react-native';

import SplashScreen from 'library/components/UI/SplashScreen';
import BenefitsScreen1 from 'screens/onboarding/BenefitsScreen1';
import BenefitsScreen2 from 'screens/onboarding/BenefitsScreen2';
import BenefitsScreen3 from 'screens/onboarding/BenefitsScreen3';
import LoginScreen from 'screens/onboarding/LoginScreen';
import CreateAccountScreen from 'screens/onboarding/CreateAccountScreen';
import OnboardingProfile from 'screens/onboarding/OnboardingProfile';
import OnboardingTopics from 'screens/onboarding/OnboardingTopics';
import OnboardingFreelance from 'screens/onboarding/OnboardingFreelance';
import OnboardingInvest from 'screens/onboarding/OnboardingInvest';
import OnboardingMentor from 'screens/onboarding/OnboardingMentor';
import OnboardingFreelance1 from 'screens/onboarding/OnboardingFreelance1';
import OnboardingInvest1 from 'screens/onboarding/OnboardingInvest1';
import OnboardingMentor1 from 'screens/onboarding/OnboardingMentor1';
import EditLocationModal from 'modals/general/EditLocationModal';

import { UserContext } from 'library/utils/UserContext';

import MainStack from 'navigators/MainStack';

import AsyncStorage from '@react-native-community/async-storage';
import { VERSION } from './src/styles/constants';

Sentry.init({
  release: `ambit@${VERSION}`,
  dsn: 'https://47935ea32c8c4270aff14584c94e17cc@o448985.ingest.sentry.io/5431210',
  enableAutoSessionTracking: true,
});

const Stack = createStackNavigator();

const AppNavigator = () => {
  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
  ]);

  const { currentUserId, loadingToken } = useContext(UserContext);

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // determine if this is the first launch
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (loadingToken || isFirstLaunch === null) {
    return <SplashScreen />;
  }

  // if logged in
  if (currentUserId) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainStack" headerMode="none">
          {/* onboarding / login */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="OnboardingProfile" component={OnboardingProfile} />
          <Stack.Screen name="OnboardingTopics" component={OnboardingTopics} />

          <Stack.Screen name="OnboardingInvest" component={OnboardingInvest} />
          <Stack.Screen name="OnboardingFreelance" component={OnboardingFreelance} />
          <Stack.Screen name="OnboardingMentor" component={OnboardingMentor} />

          <Stack.Screen name="OnboardingInvest1" component={OnboardingInvest1} />
          <Stack.Screen name="OnboardingFreelance1" component={OnboardingFreelance1} />
          <Stack.Screen name="OnboardingMentor1" component={OnboardingMentor1} />
          <Stack.Screen
            name="EditLocationModalRight"
            component={EditLocationModal}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />

          <Stack.Screen name="MainStack" component={MainStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // if first launch
  if (isFirstLaunch) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Benefits1" headerMode="none">
          {/* onboarding / login */}
          <Stack.Screen name="Benefits1" component={BenefitsScreen1} />
          <Stack.Screen name="Benefits2" component={BenefitsScreen2} />
          <Stack.Screen name="Benefits3" component={BenefitsScreen3} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="OnboardingProfile" component={OnboardingProfile} />
          <Stack.Screen name="OnboardingTopics" component={OnboardingTopics} />

          <Stack.Screen name="OnboardingInvest" component={OnboardingInvest} />
          <Stack.Screen name="OnboardingFreelance" component={OnboardingFreelance} />
          <Stack.Screen name="OnboardingMentor" component={OnboardingMentor} />

          <Stack.Screen name="OnboardingInvest1" component={OnboardingInvest1} />
          <Stack.Screen name="OnboardingFreelance1" component={OnboardingFreelance1} />
          <Stack.Screen name="OnboardingMentor1" component={OnboardingMentor1} />
          <Stack.Screen
            name="EditLocationModalRight"
            component={EditLocationModal}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />

          <Stack.Screen name="MainStack" component={MainStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // if it is not the first launch & not logged in
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Benefits1" headerMode="none">
        {/* onboarding / login */}
        <Stack.Screen name="Benefits1" component={BenefitsScreen1} />
        <Stack.Screen name="Benefits2" component={BenefitsScreen2} />
        <Stack.Screen name="Benefits3" component={BenefitsScreen3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="OnboardingProfile" component={OnboardingProfile} />
        <Stack.Screen name="OnboardingTopics" component={OnboardingTopics} />

        <Stack.Screen name="OnboardingInvest" component={OnboardingInvest} />
        <Stack.Screen name="OnboardingFreelance" component={OnboardingFreelance} />
        <Stack.Screen name="OnboardingMentor" component={OnboardingMentor} />

        <Stack.Screen name="OnboardingInvest1" component={OnboardingInvest1} />
        <Stack.Screen name="OnboardingFreelance1" component={OnboardingFreelance1} />
        <Stack.Screen name="OnboardingMentor1" component={OnboardingMentor1} />
        <Stack.Screen
          name="EditLocationModalRight"
          component={EditLocationModal}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
