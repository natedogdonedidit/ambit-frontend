/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';

const Comment = ({ onPress, size = 14, color = colors.darkGrayO }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
      <Icon name="comment" solid size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Comment;
