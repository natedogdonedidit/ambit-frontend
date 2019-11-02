/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const ThreeDotsButton = ({ onPress, buttonStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Icon name="ellipsis-h" size={15} color={colors.darkGray} style={{ opacity: 0.7 }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    height: 34,
    width: 34,
  },
});

export default ThreeDotsButton;
