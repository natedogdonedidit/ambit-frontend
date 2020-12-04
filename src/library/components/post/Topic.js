import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { getTopicFromID } from 'library/utils';
import { useNavigation } from '@react-navigation/native';

const Topic = ({ topicToShow, isPostToModal = false, touchable = true }) => {
  const navigation = useNavigation();

  // get the full topic
  const { name } = useMemo(() => getTopicFromID(topicToShow), [topicToShow]);

  // const isSubTopic = !!parentTopic;

  // const mainTopicID = isSubTopic ? parentTopic.topicID : topicID;
  // const subTopic = isSubTopic ? topicID : null;

  if (isPostToModal) {
    return (
      <View style={styles.topicLarge}>
        <Text style={defaultStyles.largeMedium}>{name}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate({ name: 'Topic', key: `Topic:${topicToShow}`, params: { topicID: topicToShow } })}
      activeOpacity={0.3}
      disabled={!touchable}
    >
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
  topicLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.systemGray6,
  },
});
