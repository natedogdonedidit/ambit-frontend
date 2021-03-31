/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TextButton = ({ onPress = () => null, buttonStyle, textStyle, children, disabled = false }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={0.5}
      hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
      disabled={disabled}
    >
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Text style={{ ...defaultStyles.defaultMedium, ...styles.buttonText, ...textStyle }}>{children}</Text>
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
  },
});

export default TextButton;
