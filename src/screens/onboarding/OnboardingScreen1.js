import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const OnboardingScreen1 = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Onboarding #1</Text>
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

OnboardingScreen1.navigationOptions = {
  title: 'Onboarding1',
};

export default OnboardingScreen1;
