import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import Comment from 'library/components/post/Comment';
import Post from 'library/components/post/Post';
import Update from 'library/components/post/Update';
import { getGoalInfo } from 'library/utils';

const PostScreen = ({ navigation }) => {
  // ////////////////////////////////////////////////////////////////
  // ROUTE PARAMS
  const postToQuery = navigation.getParam('post', null); // all the data from parent post down to updates

  // ////////////////////////////////////////////////////////////////
  // QUERIES

  // this could be optimized to retrieve the comments seperately
  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { id: postToQuery.id },
  });

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderWhite handleLeft={() => navigation.goBack()} handleRight={() => null} textLeft="Back" textRight="" title="Post" />
        <Loader loading={loading} full={false} />
      </View>
    );
  }
  const currentTime = new Date();
  const post = data.singlePost.post || null;
  const matches = data.singlePost.matches || [];
  console.log(post);

  // CUSTOM FUNCTIONS
  const renderPost = () => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
        <Post post={post} currentTime={currentTime} navigation={navigation} showDetails />
      </TouchableOpacity>
    );
  };

  const renderUpdates = () => {
    if (post.updates.length < 1) return null;

    return (
      <>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingVertical: 12,
            paddingHorizontal: 15,
            marginTop: 15,
            backgroundColor: 'white',
          }}
        >
          <Text style={defaultStyles.headerSmall}>Updates</Text>
        </View>
        {post.updates.map((update, i) => {
          return (
            <TouchableOpacity
              key={update.id}
              activeOpacity={1}
              onPress={() => navigation.navigate('Update', { post, updateInd: i })}
            >
              <Update post={post} update={update} currentTime={currentTime} navigation={navigation} updateInd={i} isStandalone />
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  const renderComments = () => {
    const { comments } = post;

    if (comments.length < 1) {
      return (
        <>
          <View style={styles.sectionHeader}>
            <Text style={defaultStyles.headerSmall}>Comments</Text>
            <Text style={{ ...defaultStyles.defaultMuteItalic, paddingTop: 15, paddingLeft: 2 }}>No comments yet</Text>
          </View>
        </>
      );
    }

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

  return (
    <View style={styles.container}>
      <HeaderWhite handleLeft={() => navigation.goBack()} handleRight={() => null} textLeft="Back" textRight="" title="Post" />

      <ScrollView style={styles.scrollView}>
        {matches.length > 0 && (
          <View style={{ ...styles.showMatchesButton, backgroundColor: colors.iconGray }}>
            <View style={{ width: 20 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center', ...defaultStyles.defaultBold, color: 'white' }}>
                We found {matches.length} potential connections for your goal!
              </Text>
            </View>
            <View style={{ width: 20 }}>
              <Ionicons name="ios-arrow-forward" size={20} color="white" style={{ alignSelf: 'flex-end' }} />
            </View>
          </View>
        )}
        {!loading && renderPost()}
        {!loading && renderUpdates()}
        {!loading && <View style={styles.commentsView}>{renderComments()}</View>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: colors.lightGray,
  },
  sectionHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 15,
    backgroundColor: 'white',
  },
  commentsView: {
    width: '100%',
    marginBottom: 15,
  },
  // for matches component
  showMatchesButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.goalPeach,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
});

PostScreen.navigationOptions = {
  title: 'Post',
};

export default PostScreen;
