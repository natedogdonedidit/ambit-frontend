import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Topic = ({ navigation, children, type = 'topic' }) => {
  let onPress;
  if (type === 'topic') {
    onPress = () => navigation.navigate('Topic', { topic: children });
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.topic}>
        <Text style={defaultStyles.smallMute}>{children}</Text>
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
    borderRadius: 6,
    paddingHorizontal: 9,
    backgroundColor: colors.grayButton,
    marginRight: 6,
  },
});
