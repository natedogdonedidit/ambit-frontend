import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Animated } from 'react-native';

const NetworkScreen = props => {
  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text>NetworkScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default NetworkScreen;
