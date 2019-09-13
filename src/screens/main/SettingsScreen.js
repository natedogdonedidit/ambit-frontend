import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

const SettingsScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Settings Screen</Text>
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

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

export default SettingsScreen;
