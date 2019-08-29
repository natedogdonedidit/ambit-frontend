import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';

const HeaderBackground = () => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[colors.blueGradient, colors.purpGradient]}
      style={styles.linearGradient}
    />
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 300, // 200
    width: '100%',
  },
});

export default HeaderBackground;
