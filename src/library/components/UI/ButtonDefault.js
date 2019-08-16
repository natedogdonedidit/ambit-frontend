/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';

const ButtonDefault = ({ onPress, buttonStyle, textStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Text style={{ ...styles.buttonText, ...textStyle }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    borderRadius: 10,
    height: 40,
  },
  buttonText: {
    color: 'white',
  },
});

export default ButtonDefault;
