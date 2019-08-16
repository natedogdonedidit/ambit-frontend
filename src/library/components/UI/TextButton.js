/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';

const ButtonDefault = ({ onPress, buttonStyle, textStyle, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Text style={{ ...styles.buttonText, ...textStyle }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.iosBlue,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default ButtonDefault;