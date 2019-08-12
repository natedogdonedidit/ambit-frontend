import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

import colors from 'res/colors';
import ButtonPurp from 'library/components/UI/ButtonPurp';

const OnboardingScreen2 = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Onboarding #2</Text>

        <View style={styles.nextBack}>
          <ButtonPurp height={40} width={80} onPress={() => navigation.navigate('Onboarding1')}>
            Back
          </ButtonPurp>
          <ButtonPurp height={40} width={80} onPress={() => navigation.navigate('Onboarding3')}>
            Next
          </ButtonPurp>
        </View>
        <View style={styles.circles}>
          <View style={styles.circle} />
          <View style={styles.circleFilled} />
          <View style={styles.circle} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
    padding: 20,
  },
  circles: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.darkGray,
    margin: 5,
  },
  circleFilled: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.darkGray,
    backgroundColor: colors.darkGray,
    margin: 5,
  },
  nextBack: {
    flexDirection: 'row',
    width: '100%',
    margin: 20,
    justifyContent: 'space-between',
  },
});

OnboardingScreen2.navigationOptions = {
  title: 'Onboarding2',
};

export default OnboardingScreen2;
