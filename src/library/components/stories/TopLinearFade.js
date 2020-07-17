import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TopLinearFade = ({ disable = false }) => {
  const insets = useSafeArea();

  if (disable) return null;

  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={['rgba(0,0,0,0.6)', 'transparent']}
      style={{ ...styles.linearGradientTop, height: insets.top + 160 }}
    />
  );
};

const styles = StyleSheet.create({
  linearGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 60,
    width: '100%',
  },
});

export default TopLinearFade;
