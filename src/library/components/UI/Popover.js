import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Popover = ({ messageComponent, onPress }) => {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        position: 'absolute',
        left: 10,
        bottom: insets.bottom + 10,
        width: width - 20,
        height: 56,
        backgroundColor: colors.purp,
        borderRadius: 10,
      }}
    >
      <View
        onPress={onPress}
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingLeft: 14,
          paddingRight: 8,
        }}
      >
        <View style={{ flex: 1 }}>{messageComponent}</View>
        <View style={{ paddingLeft: 10 }}>
          <Ionicons name="ios-chevron-forward" size={18} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Popover;
