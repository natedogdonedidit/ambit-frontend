import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import colors from 'styles/colors';

const LoaderTiny = ({ color = colors.purp }) => {
  return (
    <View style={{ width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ transform: [{ scaleX: 0.65 }, { scaleY: 0.65 }] }}>
        <ActivityIndicator style={styles.fillComponent} size="small" color={color} animating />
      </View>
    </View>
  );
};

export default LoaderTiny;

const styles = StyleSheet.create({
  fillComponent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
});
