/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';
// import defaultStyles from 'styles/defaultStyles';

const ButtonDefault = ({ onPress, buttonStyle, textStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Text style={{ ...styles.buttonText, ...textStyle }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 26,
    width: 90,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonText: {
    color: colors.darkGray,
    fontSize: 12,
    fontWeight: '400',
  },
});

export default ButtonDefault;
