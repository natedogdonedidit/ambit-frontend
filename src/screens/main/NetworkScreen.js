import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

const NetworkScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Network Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#B2CAF2',
    padding: 20,
  },
});

NetworkScreen.navigationOptions = {
  title: 'Network',
};

export default NetworkScreen;
