import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Animated } from 'react-native';

const NotificationsScreen = props => {
  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: 'center' }}>Notifications Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
});

export default NotificationsScreen;
