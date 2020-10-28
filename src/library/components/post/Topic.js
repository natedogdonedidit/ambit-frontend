import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { getTopicFromID } from 'library/utils';

const Topic = ({ navigation, topicToShow }) => {
  // get the full topic
  const { name, parentTopic, topicID } = useMemo(() => getTopicFromID(topicToShow), [topicToShow]);

  const isSubTopic = !!parentTopic;

  const mainTopicID = isSubTopic ? parentTopic.topicID : topicID;
  const subTopic = isSubTopic ? topicID : null;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Topic', { topicID: topicToShow })} activeOpacity={0.3}>
      <View style={styles.topic}>
        <Text style={defaultStyles.smallMute}>{name}</Text>
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
