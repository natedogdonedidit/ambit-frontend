import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { getTopicFromID } from 'library/utils';

const Topic = ({ navigation, topicToShow }) => {
  // get the full topic
  const topic = getTopicFromID(topicToShow.topicID);

  const isSubTopic = !!topic.parentTopic;
  
  const mainTopicID = isSubTopic ? topic.parentTopic.topicID : topic.topicID;
  const subTopic = isSubTopic ? topic.topicID : null;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Topic', { topicID: mainTopicID, subTopic })} activeOpacity={0.3}>
      <View style={styles.topic}>
        <Text style={defaultStyles.smallMute}>{topic.name}</Text>
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
    borderRadius: 10,
    paddingHorizontal: 9,
    backgroundColor: colors.systemGray6,
    marginRight: 6,
    marginBottom: 6,
  },
});
