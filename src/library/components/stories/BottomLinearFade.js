import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const BottomLinearFade = ({ disable = false }) => {
  if (disable) return null;

  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={['transparent', 'rgba(0,0,0,0.4)']}
      style={styles.linearGradientBottom}
    />
  );
};

const styles = StyleSheet.create({
  linearGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 140,
    width: '100%',
  },
});

export default BottomLinearFade;
