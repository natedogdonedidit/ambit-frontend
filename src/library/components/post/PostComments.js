import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POST_COMMENTS_QUERY from 'library/queries/POST_COMMENTS_QUERY';

import Comment from 'library/components/post/Comment';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';

const PostComments = ({ navigation, post, updateInd = null }) => {
  // QUERIES
  const { loading, error, data } = useQuery(POST_COMMENTS_QUERY, {
    variables: { id: post.id },
  });

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={defaultStyles.headerSmall}>Comments</Text>
        </View>
        <View style={styles.whiteView}>
          <Loader size="small" loading={loading} full backgroundColor={colors.white} />
        </View>
      </View>
    );
  }

  let comments = [];

  if (updateInd >= 0 && updateInd !== null) {
    comments = data.singlePost.updates[updateInd].comments;
  } else {
    comments = data.singlePost.comments;
  }

  if (!comments) comments = [];

  if (comments.length < 1) {
    return (
      <>
        <View style={styles.sectionHeader}>
          <Text style={defaultStyles.headerSmall}>Comments</Text>
        </View>
        <View style={styles.emptyComponent}>
          <Text style={{ ...defaultStyles.defaultMuteItalic, textAlign: 'center' }}>Be the first to comment!</Text>
        </View>
      </>
    );
  }

  const currentTime = new Date();

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={defaultStyles.headerSmall}>Comments</Text>
      </View>
      {comments.map(comment => {
        // if its a direct comment on the post
        if (!comment.parentComment && !comment.parentUpdate) {
          // if there are subComments
          if (comment.comments.length > 0) {
            return (
              <View key={comment.id}>
                <Comment comment={comment} navigation={navigation} currentTime={currentTime} hideTopMargin />
                {comment.comments.map((subComment, k) => (
                  <Comment
                    key={subComment.id}
                    comment={subComment}
                    navigation={navigation}
                    currentTime={currentTime}
                    isSubComment
                    showLine={comment.comments.length - 1 !== k}
                  />
                ))}
              </View>
            );
          }

          // if there are no sub comments
          return <Comment key={comment.id} comment={comment} navigation={navigation} currentTime={currentTime} hideTopMargin />;
        }
        return null;
      })}
    </>
  );
};

export default PostComments;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  emptyComponent: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    padding: 16,
  },
  whiteView: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    height: 60,
  },
});
