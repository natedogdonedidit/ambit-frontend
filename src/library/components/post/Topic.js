import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';

const Topic = ({ navigation, topicToShow }) => {
  const isSubTopic = !!topicToShow.parentTopic;
  const mainTopicID = isSubTopic ? topicToShow.parentTopic.topicID : topicToShow.topicID;
  const subTopic = isSubTopic ? topicToShow.topicID : null;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Topic', { topicID: mainTopicID, subTopic })} activeOpacity={0.3}>
      <View style={styles.topic}>
        <Text style={defaultStyles.smallMute}>{topicToShow.name}</Text>
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
