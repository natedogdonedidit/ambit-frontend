/* eslint-disable no-underscore-dangle */
import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import UPDATE_POST_MUTATION from 'library/mutations/UPDATE_POST_MUTATION';
import DELETE_POST_MUTATION from 'library/mutations/DELETE_POST_MUTATION';
import Chevron from 'library/components/UI/icons/Chevron';
import ProfilePic from 'library/components/UI/ProfilePic';
import { UserContext } from 'library/utils/UserContext';
import RepostedBy from 'library/components/post/RepostedBy';
import REPORT_CONTENT from 'library/mutations/REPORT_CONTENT';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import Threadline from './Threadline';
import PostContent from './PostContent';
import GoalHeader from './GoalHeader';

function Post({
  post,
  navigation,
  showDetails = false,
  showThread = false,
  hideButtons = false,
  disableVideo = false,
  showTopBorder,
  showRepost = false,
  // disableNav = false,
}) {
  if (!post) {
    navigation.goBack();
    return null;
  }

  // HOOKS
  const { currentUserId, currentUsername } = useContext(UserContext);
  const currentTime = new Date();
  const route = useRoute();

  // REPORT CONTENT
  const [report] = useMutation(REPORT_CONTENT, {
    variables: {
      text:
        '<p>Content Type: Post</p>' +
        `<p>Date Reported: ${new Date()}</p>` +
        `<p>PostID: ${post.id}</p>` +
        `<p>Post Text: ${post.content || 'no content'}</p>` +
        `<p>Content Owner: ${post.owner.name}, ${post.owner.username}, ${post.owner.id}</p>` +
        `<p>Reported By: ${currentUsername}, ${currentUserId}</p>`,
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to report content. Try again later!', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]),
  });

  // DELETE POST MUTATION
  const [editGoalStatus] = useMutation(UPDATE_POST_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to update this post. Try again later!', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]),
  });

  // DELETE POST MUTATION
  const [deleteOnePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { where: { id: post.id } },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteOnePost: { __typename: 'Post', id: post.id },
    },
    update(cache, { data: deleteOnePost }) {
      if (route.name === 'Post') {
        navigation.navigate('Home');
      }

      // remove from cache
      cache.evict({ id: cache.identify({ __typename: 'Post', id: post.id }) });
      cache.gc();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this post. Try again later!', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]),
  });

  // CALCULATE THESE VARIABLES ONCE - THEY SHOULD NEVER CHANGE
  const isMyPost = useMemo(() => {
    return currentUserId === post.owner.id;
  }, [post, currentUserId]);

  // CALCULATE THESE VARIABLES ONCE - THEY SHOULD NEVER CHANGE
  const { timeDiff, period, formatedDate } = useMemo(() => {
    // for dates
    const createdAt1 = new Date(post.createdAt);
    const { timeDiff: timeDiff1, period: period1 } = timeDifference(currentTime, createdAt1);
    const formatedDate1 = format(createdAt1, 'M/d/yy h:mm a');

    return {
      timeDiff: Math.max(timeDiff1, 0),
      period: period1,
      formatedDate: formatedDate1,
    };
  }, [post]);

  const handleDelete = () => {
    deleteOnePost();
  };

  const determineOptions = () => {
    if (isMyPost && post.goal && post.goalStatus === 'Active') {
      return [
        {
          text: 'Add an update',
          onPress: () => navigation.navigate('AddUpdateModal', { post }),
          // closeModal: false,
        },
        {
          text: 'Mark goal Complete',
          color: colors.purp,
          onPress: () => updateGoalStatus('Complete'),
        },
        {
          text: 'Mark goal Inactive',
          color: colors.orange,
          onPress: () => updateGoalStatus('Inactive'),
        },
        {
          text: 'Delete post',
          color: colors.peach,
          onPress: handleDelete,
        },
      ];
    }

    if (isMyPost && post.goal && post.goalStatus === 'Inactive') {
      return [
        {
          text: 'Add an update',
          onPress: () => navigation.navigate('AddUpdateModal', { post }),
          // closeModal: false,
        },
        {
          text: 'Mark goal Active',
          color: colors.green,
          onPress: () => updateGoalStatus('Active'),
        },
        {
          text: 'Mark goal Complete',
          color: colors.purp,
          onPress: () => updateGoalStatus('Complete'),
        },
        {
          text: 'Delete post',
          color: colors.peach,
          onPress: handleDelete,
        },
      ];
    }

    if (isMyPost && post.goal && post.goalStatus === 'Complete') {
      return [
        {
          text: 'Mark goal Active',
          color: colors.green,
          onPress: () => updateGoalStatus('Active'),
        },
        {
          text: 'Add an update',
          onPress: () => navigation.navigate('AddUpdateModal', { post }),
          // closeModal: false,
        },
        {
          text: 'Delete post',
          color: colors.peach,
          onPress: handleDelete,
        },
      ];
    }

    if (isMyPost) {
      return [
        {
          text: 'Delete post',
          color: colors.peach,
          onPress: handleDelete,
        },
      ];
    }

    // if its not my post
    return [
      {
        text: 'Report',
        onPress: () => report(),
      },
    ];
  };

  const handleMoreButton = () => {
    const options = determineOptions();
    navigation.navigate('GenericPopupMenu', { options });
  };

  // CUSTOM FUNCTIONS
  const updateGoalStatus = newStatus => {
    editGoalStatus({
      variables: {
        where: {
          id: post.id,
        },
        data: {
          goalStatus: newStatus,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateOnePost: {
          __typename: 'Post',
          ...post,
          goalStatus: newStatus,
        },
      },
    });
  };

  return (
    <View
      style={[
        { ...styles.postContainer },
        showTopBorder && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.borderBlack },
        showThread && { borderBottomWidth: 0 },
        showRepost && { paddingTop: 7 },
      ]}>
      {showRepost && <RepostedBy postId={post.id} />}
      {!!post.goal && <GoalHeader goalStatus={post.goalStatus} hasUpdates={!!post.updates && Array.isArray(post.updates) && post.updates.length > 0} />}
      <View style={styles.post}>
        <View style={styles.leftColumn}>
          <ProfilePic user={post.owner} size="medium" enableIntro={!disableVideo} enableStory={!disableVideo} />
          <Threadline showThread={showThread} />
        </View>
        <View style={[{ ...styles.rightColumn }, showThread && { paddingBottom: 20 }]}>
          <PostHeader post={post} user={post.owner} timeDiff={timeDiff} period={period} />
          <PostContent post={post} showDetails={showDetails} />
          <PostFooter
            post={post}
            showDetails={showDetails}
            hideButtons={hideButtons}
            updateGoalStatus={updateGoalStatus}
            isMyPost={isMyPost}
            formatedDate={formatedDate}
          />
          {!hideButtons && (
            <View style={{ position: 'absolute', top: -2, right: 0 }}>
              <Chevron onPress={handleMoreButton} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingRight: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    paddingTop: 10,
  },
  post: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  leftColumn: {
    alignItems: 'center',
    paddingLeft: 4,
    width: 76,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
});

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  if (prevProps.post === nextProps.post) {
    return true;
  }

  // console.log(prevProps.post.id);

  return false;
}

export default React.memo(Post, areEqual);
