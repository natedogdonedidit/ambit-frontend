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
        <View style={styles.dotBorder}>
          <View style={styles.dot}>
            <Text style={{ ...defaultStyles.smallMedium, color: colors.white, textAlign: 'center' }}>
              {Math.min(unReadNotifications, 99)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dotBorder: {
    padding: 2,
    backgroundColor: 'white',
    position: 'absolute',
    top: -7,
    left: 17,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
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
