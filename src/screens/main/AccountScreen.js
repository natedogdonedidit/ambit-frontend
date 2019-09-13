import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

const AccountScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Account Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'powderblue',
    padding: 20,
  },
});

AccountScreen.navigationOptions = {
  title: 'Account',
};

export default AccountScreen;
