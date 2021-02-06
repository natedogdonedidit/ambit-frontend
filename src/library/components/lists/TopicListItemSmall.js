import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const picExample =
  'https://images.unsplash.com/photo-1592320937521-84c88747a68a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80';

const TopicListItemSmall = ({ topic, onPress }) => {
  const { topicID, image, name } = topic;

  const navigation = useNavigation();

  return (
    <TouchableOpacity key={topicID} style={styles.topic} activeOpacity={0.7} onPress={onPress}>
      <Image
        style={{ width: 36, height: 36, borderRadius: 18 }}
        resizeMode="cover"
        source={{
          uri: image || picExample,
        }}
      />
      <Text style={{ ...defaultStyles.defaultMedium, paddingLeft: 10 }}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topic: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    height: 52,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
});

export default TopicListItemSmall;
