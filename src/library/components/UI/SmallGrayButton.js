/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const SmallGraybutton = ({ onPress, buttonStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Text style={defaultStyles.defaultMedium}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayButton,
    height: 36,
    paddingHorizontal: 15,
    borderRadius: 18,
  },
});

export default SmallGraybutton;
