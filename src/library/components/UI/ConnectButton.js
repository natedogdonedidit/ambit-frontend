/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const FollowButton = ({ onPress, buttonStyle, textStyle, active = false }) => {
  const [tempActive, setTempActive] = useState(false);

  const tempOnPress = () => {
    setTempActive(!tempActive);
  };
  return (
    <TouchableOpacity onPress={tempOnPress} activeOpacity={0.5}>
      <View style={tempActive ? { ...styles.button, ...buttonStyle } : { ...styles.buttonActive, ...buttonStyle }}>
        <Text
          style={
            // tempActive
            //   ? { ...defaultStyles.defaultSemibold, color: 'white', ...textStyle }
            { ...defaultStyles.defaultRegular, ...textStyle }
          }
        >
          {tempActive ? 'Connected' : 'Connect'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonActive: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    height: 32,
    width: 150,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    height: 32,
    width: 150,
  },
});

export default FollowButton;
