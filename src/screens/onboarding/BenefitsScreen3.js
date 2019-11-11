import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

import colors from 'styles/colors';
import ButtonDefault from 'library/components/UI/ButtonDefault';

const BenefitsScreen3 = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  useEffect(() => {
    const timer = setTimeout(() => navigation.navigate('Benefits1'), 2000);

    return function cleanup() {
      clearTimeout(timer);
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Benefits #3</Text>
        <ButtonDefault onPress={() => navigation.navigate('Login')}>Get Started</ButtonDefault>
        <View style={styles.circles}>
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circleFilled} />
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
    borderColor: colors.darkGray1,
    margin: 5,
  },
  circleFilled: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.darkGray1,
    backgroundColor: colors.darkGray1,
    margin: 5,
  },
});

BenefitsScreen3.navigationOptions = {
  title: 'Benefits3',
};

export default BenefitsScreen3;
