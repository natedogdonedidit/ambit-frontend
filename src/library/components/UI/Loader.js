import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

import colors from 'styles/colors';

const Loader = ({ active, size = 'large', color = colors.peach }) => {
  return <ActivityIndicator style={styles.activityIndicator} size={size} color={color} animating={active} />;
};

export default Loader;

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.8,
  },
});
