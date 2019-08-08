import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const LoginScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
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

LoginScreen.navigationOptions = {
  title: 'Login',
};

export default LoginScreen;
