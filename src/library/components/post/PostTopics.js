import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Location from './Location';
import Topic from './Topic';

const PostTopics = ({ post, showDetails }) => {
  const navigation = useNavigation();

  const hasDetails = post.topic || post.location;

  if (!showDetails || !hasDetails) return null;

  return (
    <View style={styles.container}>
      {!!post.topic && <Topic navigation={navigation} topicToShow={post.topic} />}
      {!!post.location && (
        <Location
          navigation={navigation}
          location={post.location}
          locationLat={post.locationLat}
          locationLon={post.locationLon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
});

export default PostTopics;
