/* eslint-disable prefer-destructuring */
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POST_COMMENTS_QUERY from 'library/queries/POST_COMMENTS_QUERY';

import Comment from 'library/components/post/Comment';
import SubComment from 'library/components/post/SubComment';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import Section from 'library/components/UI/Section';

const PostComments = ({ navigation, post, updateInd = null }) => {
  if (!post) {
    return null;
  }

  // QUERIES
  const { error, data, refetch, networkStatus } = useQuery(POST_COMMENTS_QUERY, {
    variables: { where: { id: post.id } },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const loading = networkStatus === 1 && !data;
  const refetching = networkStatus === 1 && data;

  // useEffect(() => {
  //   if (networkStatus === 7) {
  //     refetch();
  //   }
  // }, [post.id]);

  if (error) {
    console.log(error);
    return null;
  }
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
    comments = data.post.updates[updateInd].comments;
    // console.log('hehe', comments);
    comments = comments.filter((comment) => !comment.parentComment);
  } else {
    // console.log('hi2', data.post.comments);
    // if comments on a post
    comments = data.post.comments;
    // filter out sub-comments
    comments = comments.filter((comment) => !comment.parentUpdate && !comment.parentComment);
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
      {comments.map((comment) => {
        if (!comment) return null;
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
                  isSubComment
                  showThread={comment.comments.length - 1 !== k}
                  lessTopPadding={k > 0}
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
