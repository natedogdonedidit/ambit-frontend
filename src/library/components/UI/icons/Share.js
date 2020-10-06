/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';

const Share = ({ onPress, size = 18, color = colors.iconGray, shared = false }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
      <Icon name="share" solid size={size} color={shared ? colors.green : colors.iconGray} />
    </TouchableOpacity>
  );

  // return (
  //   <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
  //     <Ionicons name="arrow-redo-outline" size={size} color={colors.blueGray} />
  //   </TouchableOpacity>
  // );

  // return (
  //   <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
  //     <Feather name="send" size={18} color={colors.blueGray} />
  //   </TouchableOpacity>
  // );
};

export default Share;
