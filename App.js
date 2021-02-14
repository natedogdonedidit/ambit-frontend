import React, { useContext, useEffect, useState } from 'react';
import { YellowBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import * as Sentry from '@sentry/react-native';

import SplashScreen from 'library/components/UI/SplashScreen';
import BenefitsScreen1 from 'screens/onboarding/BenefitsScreen1';
import BenefitsScreen2 from 'screens/onboarding/BenefitsScreen2';
import BenefitsScreen3 from 'screens/onboarding/BenefitsScreen3';
import WelcomeScreen from 'screens/onboarding/WelcomeScreen';
import PhoneNumber from 'screens/onboarding/PhoneNumber';
import PhoneNumberVerify from 'screens/onboarding/PhoneNumberVerify';

import LoginScreen from 'screens/onboarding/LoginScreen';
import CreateAccountScreen from 'screens/onboarding/CreateAccountScreen';
import OnboardingEmail from 'screens/onboarding/OnboardingEmail';
import OnboardingLocation from 'screens/onboarding/OnboardingLocation';
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

  const { loadingApp, loadingToken, currentUserId } = useContext(UserContext);

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

  // if awaiting initial login or firstLaunch check
  if (loadingApp || isFirstLaunch === null) {
    return <SplashScreen />;
  }

  // decide initial route - this will only take effect on the very first render below
  // changing this variable after the initial render will do nothing
  let initialRoute = 'Welcome';
  if (isFirstLaunch) {
    // console.log('initial route: Onboarding');
    initialRoute = 'Benefits1';
  } else if (currentUserId) {
    // console.log('initial route: MainStack');
    initialRoute = 'MainStack';
  } else {
    // console.log('initial route: Welcome / login screen');
  }

  // // if logged in - GO STRAIGHT TO APP
  // if (currentUserId) {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName="MainStack" headerMode="none">
  //         {/* LOGIN / CREATE FLOWS ONLY HERE INCASE THE USER LOGS OUT - NEED SOMEWHERE TO NAVIGATE TO */}
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //         <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
  //         <Stack.Screen name="OnboardingProfile" component={OnboardingProfile} />
  //         <Stack.Screen name="OnboardingTopics" component={OnboardingTopics} />
  //         <Stack.Screen name="OnboardingInvest" component={OnboardingInvest} />
  //         <Stack.Screen name="OnboardingFreelance" component={OnboardingFreelance} />
  //         <Stack.Screen name="OnboardingMentor" component={OnboardingMentor} />
  //         <Stack.Screen name="OnboardingInvest1" component={OnboardingInvest1} />
  //         <Stack.Screen name="OnboardingFreelance1" component={OnboardingFreelance1} />
  //         <Stack.Screen name="OnboardingMentor1" component={OnboardingMentor1} />
  //         <Stack.Screen
  //           name="EditLocationModalRight"
  //           component={EditLocationModal}
  //           options={{
  //             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  //           }}
  //         />

  //         {/* START HERE */}
  //         {/* THE MAIN APP IS HERE */}
  //         <Stack.Screen name="MainStack" component={MainStack} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  // // if first launch - SHOW BENEFTIS SCREENS
  // if (isFirstLaunch) {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName="Benefits1" headerMode="none">
  //         {/* START HERE */}
  //         <Stack.Screen name="Benefits1" component={BenefitsScreen1} />
  //         <Stack.Screen name="Benefits2" component={BenefitsScreen2} />
  //         <Stack.Screen name="Benefits3" component={BenefitsScreen3} />

  //         <Stack.Screen name="Welcome" component={WelcomeScreen} />
  //         <Stack.Screen name="Login" component={LoginScreen} />

  //         {/* ONLY GET HERE IF CREATING NEW ACCOUNT */}
  //         <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
  //         <Stack.Screen name="OnboardingProfile" component={OnboardingProfile} />
  //         <Stack.Screen name="OnboardingTopics" component={OnboardingTopics} />

  //         <Stack.Screen name="OnboardingInvest" component={OnboardingInvest} />
  //         <Stack.Screen name="OnboardingFreelance" component={OnboardingFreelance} />
  //         <Stack.Screen name="OnboardingMentor" component={OnboardingMentor} />

  //         <Stack.Screen name="OnboardingInvest1" component={OnboardingInvest1} />
  //         <Stack.Screen name="OnboardingFreelance1" component={OnboardingFreelance1} />
  //         <Stack.Screen name="OnboardingMentor1" component={OnboardingMentor1} />
  //         <Stack.Screen
  //           name="EditLocationModalRight"
  //           component={EditLocationModal}
  //           options={{
  //             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  //           }}
  //         />

  //         {/* THE MAIN APP IS HERE */}
  //         <Stack.Screen name="MainStack" component={MainStack} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  // if it is not the first launch & not logged in - SHOW LOGIN SCREEN
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} headerMode="none">
        <Stack.Screen name="Benefits1" component={BenefitsScreen1} />
        <Stack.Screen name="Benefits2" component={BenefitsScreen2} />
        <Stack.Screen name="Benefits3" component={BenefitsScreen3} />

        {/* START HERE */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />

        <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{ gestureEnabled: false }} />
        <Stack.Screen name="PhoneNumberVerify" component={PhoneNumberVerify} options={{ gestureEnabled: false }} />

        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ gestureEnabled: false }} />

        {/* ONLY GET HERE IF CREATING NEW ACCOUNT */}
        <Stack.Screen name="OnboardingEmail" component={OnboardingEmail} options={{ gestureEnabled: false }} />
        <Stack.Screen name="OnboardingLocation" component={OnboardingLocation} options={{ gestureEnabled: false }} />
        <Stack.Screen name="OnboardingProfile" component={OnboardingProfile} options={{ gestureEnabled: false }} />
        <Stack.Screen name="OnboardingTopics" component={OnboardingTopics} options={{ gestureEnabled: false }} />

        <Stack.Screen name="OnboardingInvest" component={OnboardingInvest} options={{ gestureEnabled: false }} />
        <Stack.Screen name="OnboardingFreelance" component={OnboardingFreelance} options={{ gestureEnabled: false }} />
        <Stack.Screen name="OnboardingMentor" component={OnboardingMentor} options={{ gestureEnabled: false }} />

        <Stack.Screen name="OnboardingInvest1" component={OnboardingInvest1} options={{ gestureEnabled: false }} />
        <Stack.Screen name="OnboardingFreelance1" component={OnboardingFreelance1} options={{ gestureEnabled: false }} />
        <Stack.Screen name="OnboardingMentor1" component={OnboardingMentor1} options={{ gestureEnabled: false }} />
        <Stack.Screen
          name="EditLocationModal"
          component={EditLocationModal}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />

        {/* THE MAIN APP IS HERE */}
        <Stack.Screen name="MainStack" component={MainStack} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
