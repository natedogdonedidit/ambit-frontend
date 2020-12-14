/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';

const Repost = ({ onPress, size = 16, color = colors.iconGray }) => {
  // return (
  //   <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
  //     <Icon name="share" solid size={size} color={colors.iconGray} />
  //   </TouchableOpacity>
  // );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
      <Feather name="repeat" size={size} color={colors.iconGray} />
    </TouchableOpacity>
  );

  // return (
  //   <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
  //     <Ionicons name="reload-outline" size={18} color={colors.blueGray} />
  //   </TouchableOpacity>
  // );
};

export default Repost;
