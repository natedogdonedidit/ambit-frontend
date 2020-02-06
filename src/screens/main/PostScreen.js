import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBack from 'library/components/headers/HeaderBack';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import Comment from 'library/components/post/Comment';
import Post from 'library/components/post/Post';
import Update from 'library/components/post/Update';
import SuggestedConnection from 'library/components/lists/SuggestedConnection';
import TextButton from 'library/components/UI/buttons/TextButton';
import { getGoalInfo } from 'library/utils';
import { UserContext } from 'library/utils/UserContext';

const PostScreen = ({ navigation }) => {
  // ROUTE PARAMS
  const postToQuery = navigation.getParam('post', null); // all the data from parent post down to updates

  // QUERIES
  // this could be optimized to retrieve the comments seperately
  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    // fetchPolicy: 'cache-and-network',
    // notifyOnNetworkStatusChange: true,
    variables: { id: postToQuery.id },
  });

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title={postToQuery.goal ? 'Goal' : 'Post'} />
        <Loader loading={loading} full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }
  const currentTime = new Date();
  const { currentUserId } = useContext(UserContext);

  const post = data.singlePost.post || null;
  const matches = data.singlePost.matches || null;
  const isMyPost = post.owner.id === currentUserId;

  // CUSTOM FUNCTIONS
  const renderPost = () => {
    return (
      <View style={{}}>
        <View style={{ height: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
        <Post post={post} currentTime={currentTime} navigation={navigation} showDetails />
      </View>
    );
  };

  const renderMatches = () => {
    if (!matches || !isMyPost) return null;

    if (matches.length < 1) {
      return (
        <>
          <View style={styles.sectionHeader}>
            <Text style={defaultStyles.headerSmall}>Matches</Text>
          </View>
          <View style={styles.emptyComponent}>
            <Text style={{ ...defaultStyles.defaultMuteItalic, textAlign: 'center' }}>No matches yet...check back later!</Text>
          </View>
        </>
      );
    }

    return (
      <>
        <View style={styles.sectionHeader}>
          <Text style={defaultStyles.headerSmall}>Matches</Text>
          {matches.length > 3 && (
            <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('PostMatches', { matches })}>
              Show All
            </TextButton>
          )}
        </View>
        {matches.map((item, i) => {
          if (i > 2) return null;
          return (
            <View key={item.user.id}>
              <SuggestedConnection item={item} navigation={navigation} />
            </View>
          );
        })}
      </>
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

    if (comments.length < 1) return null;

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
      <HeaderBack navigation={navigation} title={post.goal ? 'Goal' : 'Post'} />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
        {renderPost()}
        {renderMatches()}
        {renderUpdates()}
        {renderComments()}
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
});

PostScreen.navigationOptions = {
  title: 'Post',
};

export default PostScreen;
