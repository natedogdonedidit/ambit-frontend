import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const RequestsScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Requests Screen</Text>
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

RequestsScreen.navigationOptions = {
  title: 'Requests',
};

export default RequestsScreen;
