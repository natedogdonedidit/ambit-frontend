import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const OnboardingScreen3 = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Onboarding #3</Text>
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

OnboardingScreen3.navigationOptions = {
  title: 'Onboarding3',
};

export default OnboardingScreen3;
