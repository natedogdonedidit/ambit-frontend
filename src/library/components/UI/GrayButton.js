/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const ButtonDefault = ({ onPress, buttonStyle, textStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Text style={{ ...styles.buttonText, ...defaultStyles.largeThin, ...textStyle }}>
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
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    height: 40,
    width: '100%',
  },
  buttonText: {},
});

export default ButtonDefault;
