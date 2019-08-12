import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const HomeScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#9CD6A4',
    padding: 20,
  },
});

HomeScreen.navigationOptions = {
  title: 'Home',
};

export default HomeScreen;
