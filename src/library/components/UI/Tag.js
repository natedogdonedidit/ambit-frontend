/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from 'styles/colors';

const Tag = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
      <Text style={{ ...styles.text }}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.tagBlue,
    fontSize: 11,
    fontWeight: '600',
    paddingRight: 6,
    paddingBottom: 1,
  },
});

export default Tag;
