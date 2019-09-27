/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const BigButton = ({ onPress, buttonStyle, textStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={{ ...styles.button, ...defaultStyles.shadow3, ...buttonStyle }}>
        <Text style={{ ...defaultStyles.largeBold, color: 'white', ...textStyle }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    borderRadius: 10,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
    height: 40,
    width: 200,
  },
});

export default BigButton;
