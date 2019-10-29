import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import PostGroupTL from 'library/components/post/PostGroupTL';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import Comment from 'library/components/post/Comment';
import Post from 'library/components/post/Post';
import Update from 'library/components/post/Update';

const PostScreen = ({ navigation }) => {
  // PARAMS
  const postToQuery = navigation.getParam('post', null); // all the data from parent post down to updates
  const isUpdate = navigation.getParam('isUpdate', false);
  const updateInd = navigation.getParam('updateInd', null);

  // CONSTANTS
  // const idForComments = isUpdate ? post.updates[updateInd].id : post.id;

  // QUERIES - this gets the comments for a POST
  // this could be optimized to only retrieve comments of clicked on Post/Update
  // right now it queries ALL comments in the Post & down stream updates
  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { id: postToQuery.id },
  });

  if (error) return <Error error={error} />;
  const currentTime = new Date();
  const post = data.singlePost || null;
  // console.log(post);

  // CUSTOM FUNCTIONS
  const renderPost = () => {
    // if its just a stand-alone Post
    if (!isUpdate) {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post })}>
          <Post post={post} currentTime={currentTime} navigation={navigation} showDetails />
        </TouchableOpacity>
      );
    }

    // if showing an update
    return <PostGroupTL post={post} currentTime={currentTime} navigation={navigation} lastOne={updateInd} showDetails />;
  };

  const renderUpdates = () => {
    if (isUpdate || post.updates.length < 1) return null;

    return (
      <>
        <View style={{ height: 30, justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
          <Text style={defaultStyles.largeLight}>
            {post.updates.length} Update{post.updates.length > 1 ? 's' : ''}
          </Text>
        </View>
        {post.updates.map((update, i) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Post', { post, isUpdate: true, updateInd: i })}
            >
              <Update post={post} update={update} currentTime={currentTime} navigation={navigation} updateInd={i} isStandalone />
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  const renderComments = () => {
    // decide to show Update or Post comments
    const comments = isUpdate ? post.updates[updateInd].comments : post.comments;

    if (comments.length < 1)
      return (
        <View style={{ height: 30, justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
          <Text style={defaultStyles.largeLight}>No Comments</Text>
        </View>
      );

    return (
      <>
        <View style={{ height: 30, justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
          <Text style={defaultStyles.largeLight}>
            {comments.length} Comment{comments.length > 1 ? 's' : ''}
          </Text>
        </View>
        {comments.map((comment, i) => {
          if (!comment.parentComment) {
            if (comment.comments.length > 0) {
              return (
                <View key={comment.id}>
                  <Comment comment={comment} navigation={navigation} currentTime={currentTime} />
                  {comment.comments.map((subComment, k) => (
                    <Comment
                      key={subComment.id}
                      comment={subComment}
                      navigation={navigation}
                      currentTime={currentTime}
                      isSubComment
                      // showLine={comment.comments.length - 1 !== k}
                    />
                  ))}
                </View>
              );
            }

            return <Comment key={comment.id} comment={comment} navigation={navigation} currentTime={currentTime} />;
          }
          return null;
        })}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWhite
        handleLeft={() => navigation.goBack()}
        handleRight={() => null}
        textLeft="Back"
        textRight=""
        title={isUpdate ? 'Update' : 'Post'}
      />
      {loading ? (
        <Loader loading={loading} full={false} />
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* <PostGroupTL post={post} currentTime={currentTime} navigation={navigation} lastOne={updateInd} showAll={!isUpdate} /> */}
          {!loading && renderPost()}
          {!loading && renderUpdates()}
          {!loading && <View style={styles.commentsView}>{renderComments()}</View>}
        </ScrollView>
      )}
    </SafeAreaView>
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
  commentsView: {
    width: '100%',
  },
});

PostScreen.navigationOptions = {
  title: 'Post',
};

export default PostScreen;
