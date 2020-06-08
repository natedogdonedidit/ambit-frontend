import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BellDot = ({ color, unReadNotifications }) => {
  return (
    <View style={{ width: 32, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="bell" size={22} color={color} solid />
      {unReadNotifications > 0 && (
        <View style={styles.dot}>
          <Text style={{ ...defaultStyles.smallMedium, color: colors.white, textAlign: 'center' }}>{unReadNotifications}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    top: -7,
    right: -8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 18,
    minWidth: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: colors.peach,
  },
});

export default BellDot;
