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
    <View
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
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          paddingHorizontal: 14,
        }}
      >
        <Text style={{ ...defaultStyles.smallRegular, color: 'white' }}>{messageComponent}</Text>
        <Ionicons name="ios-chevron-forward" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Popover;
