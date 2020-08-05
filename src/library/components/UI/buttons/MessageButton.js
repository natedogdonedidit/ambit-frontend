/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const MessageButton = ({ onPress, buttonStyle, small }) => {
  if (small) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <View style={{ ...styles.buttonSmall, ...buttonStyle }}>
          <Feather name="mail" size={15} color={colors.black} style={{ paddingLeft: 1 }} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Feather name="mail" size={17} color={colors.black} style={{ paddingLeft: 1 }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayButton,
    height: 34,
    width: 34,
    borderRadius: 15,
    // ...defaultStyles.shadowButton,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
  },
  buttonSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayButton,
    height: 28,
    width: 28,
    borderRadius: 8,
    // ...defaultStyles.shadowButton,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
  },
});

export default MessageButton;
