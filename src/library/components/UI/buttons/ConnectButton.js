/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const ConnectButton = ({ onPress, buttonStyle, textStyle, active = false }) => {
  const [tempActive, setTempActive] = useState(false);

  const tempOnPress = () => {
    setTempActive(!tempActive);
  };
  return (
    <TouchableOpacity onPress={tempOnPress} activeOpacity={0.5}>
      <View style={tempActive ? styles.buttonActive : styles.button}>
        <Text style={{ ...defaultStyles.defaultMedium, color: tempActive ? colors.white : colors.black }}>
          {tempActive ? 'Connected' : 'Connect'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayButton,
    // borderWidth: 1,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.black,
    borderRadius: 18,
    height: 36,
    // width: 160,
    width: '100%',
    // ...defaultStyles.shadowButton,
  },
  buttonActive: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blueGray,
    borderRadius: 18,
    height: 36,
    // width: 160,
    width: '100%',
    // ...defaultStyles.shadowButton,
  },
});

export default ConnectButton;
