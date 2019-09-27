import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

import colors from 'styles/colors';

const Loader = ({ active, size = 'large', color = colors.purp, full = true }) => {
  return (
    <ActivityIndicator
      style={full ? { ...styles.fullScreen } : { ...styles.fillComponent }}
      size={size}
      color={color}
      animating={active}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({
  fullScreen: {
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
  fillComponent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.8,
  },
});
