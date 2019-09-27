import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Error = ({ error }) => {
  return (
    <SafeAreaView style={styles.error}>
      <Text style={styles.errorText}>Oh no! {error.message}</Text>
    </SafeAreaView>
  );
};

export default Error;

const styles = StyleSheet.create({
  error: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  errorText: {
    ...defaultStyles.defaultMedium,
    color: colors.peach,
    fontSize: 14,
    marginTop: 15,
  },
});
