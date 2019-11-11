/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';

const Options = ({ onPress, size = 14, color = colors.iconGray }) => {
  return (
    // <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
    //   <Image style={styles.icon} source={require('../../../images/angle-down.png')} />;
    // </TouchableOpacity>

    <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 10, left: 20, bottom: 10, right: 20 }}>
      <Icon name="ellipsis-h" solid size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    opacity: 0.4,
    height: 15,
    width: 15,
  },
});

export default Options;
