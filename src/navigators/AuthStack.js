import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BenefitsScreen1 from 'screens/onboarding/BenefitsScreen1';
import BenefitsScreen2 from 'screens/onboarding/BenefitsScreen2';
import BenefitsScreen3 from 'screens/onboarding/BenefitsScreen3';
import LoginScreen from 'screens/onboarding/LoginScreen';
import CreateAccountScreen from 'screens/onboarding/CreateAccountScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Benefits1" headerMode="none">
      <Stack.Screen name="Benefits1" component={BenefitsScreen1} />
      <Stack.Screen name="Benefits2" component={BenefitsScreen2} />
      <Stack.Screen name="Benefits3" component={BenefitsScreen3} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Create Account" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
