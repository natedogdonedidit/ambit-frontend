import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SuggestionsScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Suggestions Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#D3D0F2',
    padding: 20,
  },
});

SuggestionsScreen.navigationOptions = {
  title: 'Suggestions',
};

export default SuggestionsScreen;
