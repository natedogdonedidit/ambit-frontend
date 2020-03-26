/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const FollowButton = ({ onPress, buttonStyle, textStyle, active = false }) => {
  // const [tempActive, setTempActive] = useState(false);

  // const tempOnPress = () => {
  //   setTempActive(!tempActive);
  // };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={{ ...styles.buttonActive, ...buttonStyle }}>
        <Text style={{ ...defaultStyles.defaultSemibold, color: 'white', ...textStyle }}>{active ? 'Following' : 'Follow'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // button: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   borderWidth: StyleSheet.hairlineWidth,
  //   borderColor: colors.borderBlack,
  //   height: 34,
  //   width: 110,
  // },
  buttonActive: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    borderRadius: 5,
    height: 32,
    width: 150,
  },
});

export default FollowButton;
