/* eslint-disable prefer-destructuring */
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POST_COMMENTS_QUERY from 'library/queries/POST_COMMENTS_QUERY';

import Comment from 'library/components/post/Comment';
import SubComment from 'library/components/post/SubComment';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import Section from 'library/components/UI/Section';

const PostComments = ({ navigation, post, updateInd = null }) => {
  // QUERIES
  const { error, data, refetch, networkStatus } = useQuery(POST_COMMENTS_QUERY, {
    variables: { id: post.id },
    notifyOnNetworkStatusChange: true,
  });

  const loading = networkStatus === 1;
  const refetching = networkStatus === 4;

  useEffect(() => {
    if (networkStatus === 7) {
      refetch();
    }
  }, [post.id]);

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <Section text="Comments">
        <View style={styles.loaderView}>
          <Loader size="small" loading={loading} full backgroundColor={colors.white} />
        </View>
      </Section>
    );
  }

  const currentTime = new Date();

  let comments = [];
  if (updateInd >= 0 && updateInd !== null) {
    // if comments on an update
    comments = data.singlePost.updates[updateInd].comments;
  } else {
    // if comments on a post
    comments = data.singlePost.comments;
    // filter out comments on updates
    comments = comments.filter(comment => !comment.parentUpdate);
  }
  if (!comments) comments = [];

  if (comments.length < 1) {
    return (
      <Section text="Comments">
        <View style={styles.emptyComponent}>
          <Text style={{ ...defaultStyles.defaultMuteItalic, textAlign: 'center' }}>Be the first to comment!</Text>
        </View>
      </Section>
    );
  }

  return (
    <Section text="Comments" loading={refetching}>
      {comments.map(comment => {
        return (
          <View key={comment.id}>
            <Comment comment={comment} navigation={navigation} currentTime={currentTime} />
            {comment.comments.length > 0 &&
              comment.comments.map((subComment, k) => (
                <SubComment
                  key={subComment.id}
                  comment={subComment}
                  parentComment={comment}
                  navigation={navigation}
                  currentTime={currentTime}
                  lessPadding
                  isSubComment
                  hideTopLine
                  // showLine={comment.comments.length - 1 !== k}
                />
              ))}
          </View>
        );
      })}
    </Section>
  );
};

export default PostComments;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  loaderView: {
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    height: 60,
  },
  emptyComponent: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
  },
});
