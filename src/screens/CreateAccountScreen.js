import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const CreateAccountScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Create Account Screen</Text>
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

CreateAccountScreen.navigationOptions = {
  title: 'Create Account',
};

export default CreateAccountScreen;
