import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import Comment from 'library/components/post/Comment';
import Post from 'library/components/post/Post';
import Update from 'library/components/post/Update';

const UpdateScreen = ({ navigation }) => {
  // PARAMS
  const postToQuery = navigation.getParam('post', null); // all the data from parent post down to updates
  const updateInd = navigation.getParam('updateInd', 0);

  // CONSTANTS

  // QUERIES - this gets the comments for a POST
  // this could be optimized to only retrieve comments of clicked on Post/Update
  // right now it queries ALL comments in the Post & down stream updates
  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { id: postToQuery.id },
  });

  if (error) return <Error error={error} />;
  const currentTime = new Date();
  const post = data.singlePost || null;
  const update = post ? post.updates[updateInd] : null;

  // CUSTOM FUNCTIONS
  const renderUpdate = () => {
    return (
      <>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
          <Post post={post} currentTime={currentTime} navigation={navigation} showLine hideButtons />
        </TouchableOpacity>
        <Update
          post={post}
          update={update}
          updateInd={updateInd}
          currentTime={currentTime}
          navigation={navigation}
          showDetails
          hideTopLine
        />
      </>
    );
  };

  const renderComments = () => {
    const { comments } = update;

    if (comments.length < 1) {
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
              // borderBottomWidth: StyleSheet.hairlineWidth,
              // borderBottomColor: colors.borderBlack,
            }}
          >
            <Text style={defaultStyles.headerSmall}>Comments</Text>
            <Text style={{ ...defaultStyles.defaultMuteItalic, paddingTop: 5, paddingLeft: 2 }}>No comments yet</Text>
          </View>
        </>
      );
    }

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
            // borderBottomWidth: StyleSheet.hairlineWidth,
            // borderBottomColor: colors.borderBlack,
          }}
        >
          <Text style={defaultStyles.headerSmall}>Comments</Text>
        </View>
        {comments.map(comment => {
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
      <HeaderWhite handleLeft={() => navigation.goBack()} handleRight={() => null} textLeft="Back" textRight="" title="Update" />
      {loading ? (
        <Loader loading={loading} full={false} />
      ) : (
        <ScrollView style={styles.scrollView}>
          {!loading && renderUpdate()}
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

export default UpdateScreen;
