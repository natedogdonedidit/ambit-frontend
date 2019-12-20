/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const BigButton = ({ onPress, buttonStyle, textStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Text style={{ ...defaultStyles.largeMedium, color: 'white', ...textStyle }}>{children}</Text>
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
    height: 40,
    paddingHorizontal: 30,
  },
});

export default BigButton;
