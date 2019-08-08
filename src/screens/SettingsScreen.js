import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SettingsScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
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
