import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ProfileScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
