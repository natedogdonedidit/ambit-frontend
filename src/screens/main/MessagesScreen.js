import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

const MessagesScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Messages Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F0CACA',
    padding: 20,
  },
});

MessagesScreen.navigationOptions = {
  title: 'Messages',
};

export default MessagesScreen;
