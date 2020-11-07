/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';

const Chevron = ({ onPress, size = 19, color = colors.iconGray }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
      <Ionicons name="ios-chevron-down" size={size} color={colors.iconGray} />
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({});

export default Chevron;
