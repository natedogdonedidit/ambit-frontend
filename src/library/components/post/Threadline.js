import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';

const Threadline = ({ showThread }) => {
  if (!showThread) return null;
  return <View style={styles.threadlin} />;
};

const styles = StyleSheet.create({
  threadlin: {
    flex: 1,
    width: 2,
    marginTop: 5,
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
    borderBottomLeftRadius: 1.5,
    borderBottomRightRadius: 1.5,
    backgroundColor: colors.iconGray,
    opacity: 0.6,
    minHeight: 30,
  },
});

export default Threadline;
