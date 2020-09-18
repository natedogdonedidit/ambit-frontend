import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const EnvelopeDot = ({ color, unReadMessages }) => {
  return (
    <View style={{ width: 32, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="envelope" size={22} color={color} solid />
      {unReadMessages > 0 && (
        <View style={styles.dot}>
          <Text style={{ ...defaultStyles.smallMedium, color: colors.white, textAlign: 'center' }}>{unReadMessages}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    top: -7,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    minWidth: 20,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: colors.peach,
    borderColor: 'white',
    borderWidth: 2,
    // ...defaultStyles.shadow3,
  },
});

export default EnvelopeDot;
