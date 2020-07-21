/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';

const Comment = ({ onPress, size = 16, color = colors.iconGray }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}>
      <Icon name="comment" solid size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Comment;
