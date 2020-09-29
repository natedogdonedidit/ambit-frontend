/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from 'styles/colors';

const Heart = ({ onPress, size = 18, liked }) => {
  if (liked) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
        <Icon name="heart" solid size={size} color={colors.peach} />
      </TouchableOpacity>
    );
    // return (
    //   <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
    //     <Ionicons name="heart" solid size={21} color={colors.peach} />
    //   </TouchableOpacity>
    // );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
      <Icon name="heart" solid size={size} color={colors.iconGray} />
    </TouchableOpacity>
  );
  // return (
  //   <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
  //     <Ionicons name="heart-outline" solid size={21} color={colors.blueGray} />
  //   </TouchableOpacity>
  // );
};

export default Heart;
