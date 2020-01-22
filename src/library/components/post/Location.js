import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Location = ({ navigation, location }) => {
  const getOnPress = () => {
    // if (type === 'topic') {
    //   const group = topicsList.find(item => item.topic === topicToShow || item.subTopics.includes(topicToShow));
    //   // the topicToShow is not a master Topic or a subtopic
    //   if (!group) return () => null;
    //   // the topicToShow is a master Topic
    //   if (group.topic === topicToShow) return () => navigation.navigate('Topic', { topic: topicToShow });
    //   // the topicToShow is a subTopic
    //   if (group.subTopics.includes(topicToShow))
    //     return () => navigation.navigate('Topic', { topic: group.topic, subTopic: topicToShow });
    //   return () => null;
    // }
    return null;
  };

  return (
    <TouchableOpacity onPress={getOnPress()} activeOpacity={0.9}>
      <View style={styles.topic}>
        <Text style={defaultStyles.smallMute}>{location}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Location;

const styles = StyleSheet.create({
  topic: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    borderRadius: 6,
    paddingHorizontal: 9,
    backgroundColor: colors.grayButton,
    marginRight: 6,
    marginBottom: 6,
  },
});
