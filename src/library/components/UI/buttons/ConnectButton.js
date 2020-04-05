/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const ConnectButton = ({ onPress, buttonStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={{ ...styles.button, ...buttonStyle }}>
        {/* <Icon name="user-plus" size={16} color={colors.black} /> */}
        <Feather name="user-plus" size={18} color={colors.black} style={{ paddingLeft: 2 }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayButton,
    height: 34,
    width: 34,
    borderRadius: 17,
    // borderWidth: 1,
    // borderColor: colors.purp,
  },
});

export default ConnectButton;
