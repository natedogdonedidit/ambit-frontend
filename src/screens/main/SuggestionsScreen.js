import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

import PersonalTimeline from 'library/components/PersonalTimeline';

const SuggestionsScreen = props => {
  // state declaration

  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Suggestions Screen</Text>
      {/* <PersonalTimeline /> */}
    </SafeAreaView>
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
  test: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
  },
});

SuggestionsScreen.navigationOptions = {
  title: 'Suggestions',
};

export default SuggestionsScreen;
