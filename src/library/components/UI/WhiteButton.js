/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const ButtonDefault = ({ onPress, buttonStyle, textStyle, children, active = false }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={active ? { ...styles.buttonActive, ...buttonStyle } : { ...styles.button, ...buttonStyle }}>
        <Text
          style={
            active
              ? { ...defaultStyles.defaultSemibold, color: 'white', ...textStyle }
              : { ...defaultStyles.defaultRegular, ...textStyle }
          }
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    height: 32,
    width: 100,
  },
  buttonActive: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    height: 32,
    width: 100,
  },
});

export default ButtonDefault;
