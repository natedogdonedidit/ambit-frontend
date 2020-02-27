import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const SplashScreen = () => {
  return (
    <>
      <View style={styles.fullScreen}>
        <Text style={{ ...defaultStyles.ambitLogoSplash, color: colors.white }}>ambit.</Text>
        <View style={{ height: 100, width: '100%' }}>
          <ActivityIndicator style={styles.fillComponent} size="large" color={colors.white} animating />
        </View>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purp,
    opacity: 0.8,
  },
  fillComponent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
