import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

import colors from 'styles/colors';
import ButtonDefault from 'library/components/UI/ButtonDefault';

const OnboardingScreen1 = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Onboarding #1</Text>

        <View style={styles.nextBack}>
          <ButtonDefault
            buttonStyle={styles.buttonStyle}
            onPress={() => navigation.navigate('Onboarding1')}
          >
            Back
          </ButtonDefault>
          <ButtonDefault
            buttonStyle={styles.buttonStyle}
            onPress={() => navigation.navigate('Onboarding2')}
          >
            Next
          </ButtonDefault>
        </View>
        <View style={styles.circles}>
          <View style={styles.circleFilled} />
          <View style={styles.circle} />
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
  buttonStyle: {
    width: 80,
  },
});

OnboardingScreen1.navigationOptions = {
  title: 'Onboarding1',
};

export default OnboardingScreen1;
