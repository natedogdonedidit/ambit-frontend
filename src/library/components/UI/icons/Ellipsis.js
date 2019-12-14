/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from 'styles/colors';

const Ellipsis = ({ onPress, size = 20, color = colors.iconGray }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
      <Icon name="dots-horizontal" solid size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Ellipsis;
