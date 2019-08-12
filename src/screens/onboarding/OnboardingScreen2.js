import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const OnboardingScreen2 = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Onboarding #2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#9CD6A4',
    padding: 20,
  },
});

OnboardingScreen2.navigationOptions = {
  title: 'Onboarding1',
};

export default OnboardingScreen2;
