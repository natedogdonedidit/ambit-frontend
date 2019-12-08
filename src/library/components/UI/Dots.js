/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';

const Dots = ({ onPress, color = colors.iconGray }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="circle" solid size={5} color={color} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 15, paddingTop: 3 }}>
          <Icon name="circle" solid size={5} color={color} />
          <Icon name="circle" solid size={5} color={color} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Dots;
