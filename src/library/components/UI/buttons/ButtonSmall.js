/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const ButtonSmall = ({ onPress, buttonStyle, textStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Text style={{ ...defaultStyles.defaultMedium, color: 'white', ...textStyle }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    borderRadius: 20,
    height: 30,
    paddingHorizontal: 11,
  },
});

export default ButtonSmall;
