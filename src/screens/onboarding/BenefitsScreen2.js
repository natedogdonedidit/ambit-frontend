import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

import colors from 'res/colors';
import ButtonPurp from 'library/components/UI/ButtonPurp';

const BenefitsScreen2 = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  useEffect(() => {
    const timer = setTimeout(() => navigation.navigate('Benefits3'), 2000);

    return function cleanup() {
      clearTimeout(timer);
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Benefits #2</Text>
        <ButtonPurp height={40} width={200} onPress={() => navigation.navigate('Login')}>
          Get Started
        </ButtonPurp>
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
    backgroundColor: 'powderblue',
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
});

BenefitsScreen2.navigationOptions = {
  title: 'Benefits2',
};

export default BenefitsScreen2;
