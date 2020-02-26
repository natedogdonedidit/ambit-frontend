import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from 'styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BellDot = ({ color }) => {
  return (
    <View style={{ width: 32, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="bell" size={22} color={color} solid />
      <View style={styles.dot} />
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: colors.peach,
  },
});

export default BellDot;
