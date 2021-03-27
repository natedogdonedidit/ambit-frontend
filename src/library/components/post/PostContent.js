import React from 'react';
import { StyleSheet, View } from 'react-native';

import { isCustomGoalTest } from 'library/utils';

import CoolText from 'library/components/UI/CoolText';
import { useNavigation } from '@react-navigation/native';
import Goal from 'library/components/UI/Goal';
import CustomGoal from 'library/components/UI/CustomGoal';
import PostTopics from './PostTopics';
import PostMedia from './PostMedia';

/// /////////////////////////////////////
// can be used for POST or UPDATE
/// /////////////////////////////////////

const PostContent = ({ post, showDetails }) => {
  const navigation = useNavigation();

  return (
    <>
      {post.isGoal &&
        (isCustomGoalTest(post.goal) ? (
          <CustomGoal navigation={navigation} goal={post.goal} color={post.goalColor} icon={post.goalIcon} />
        ) : (
          <Goal goal={post.goal} subField={post.subField} />
        ))}
      {!!post.content && (
        <View style={styles.content}>
          <CoolText>{post.content}</CoolText>
        </View>
      )}
      <PostTopics post={post} showDetails={showDetails} />
      <PostMedia post={post} />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 10,
  },
});

export default PostContent;
