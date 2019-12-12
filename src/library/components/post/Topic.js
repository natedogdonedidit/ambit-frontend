import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Topic = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.topic}>
        <Text style={defaultStyles.defaultMute}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Topic;

const styles = StyleSheet.create({
  topic: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    borderRadius: 5,
    paddingHorizontal: 9,
    backgroundColor: colors.grayButton,
    marginRight: 6,
  },
});
