import React, { useState, useContext, useMemo } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';

import ProfilePic from 'library/components/UI/ProfilePic';

import Chevron from 'library/components/UI/icons/Chevron';
import DELETE_COMMENT_MUTATION from 'library/mutations/DELETE_COMMENT_MUTATION';
import POST_COMMENTS_QUERY from 'library/queries/POST_COMMENTS_QUERY';
import { CommentFragment } from 'library/queries/_fragments';
import PostHeader from './PostHeader';
import Threadline from './Threadline';
import PostContent from './PostContent';
import CommentFooter from './CommentFooter';
import REPORT_CONTENT from '../../mutations/REPORT_CONTENT';

const SubComment = ({
  comment,
  parentComment,
  currentTime,
  showThread = false,
  hideButtons = false,
  disableVideo = false,
  lessTopPadding = false,
}) => {
  // HOOKS
  const { currentUserId, currentUsername } = useContext(UserContext);
  const navigation = useNavigation();
  const client = useApolloClient();

  // const [isLiked, setIsLiked] = useState(comment.likedByMe); // this is the source of truth
  // const [likesCount, setLikesCount] = useState(comment.likesCount); // this is the source of truth

  // MUTATIONS - like, share, delete

  // REPORT CONTENT
  const [report] = useMutation(REPORT_CONTENT, {
    variables: {
      text:
        `<p>Content Type: Comment</p>` +
        `<p>Date Reported: ${new Date()}</p>` +
        `<p>CommentID: ${comment.id}</p>` +
        `<p>Comment Text: ${comment.content || 'no content'}</p>` +
        `<p>Content Owner: ${comment.owner.name}, ${comment.owner.username}, ${comment.owner.id}</p>` +
        `<p>Reported By: ${currentUsername}, ${currentUserId}</p>`,
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to report content. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // DELETE MUTATIONS
  const [deleteOneComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      where: {
        id: comment.id,
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteOneComment: { __typename: 'Comment', id: comment.id },
    },
    update(cache, { data: deleteOneComment }) {
      // remove from cache
      cache.evict({ id: cache.identify({ __typename: 'Comment', id: comment.id }) });
      cache.gc();
    },
    refetchQueries: () => [{ query: POST_COMMENTS_QUERY, variables: { where: { id: comment.parentPost.id } } }],
    // onCompleted: () =>
    //   Alert.alert('Done!', "You're comment was successfully deleted", [{ text: 'OK', onPress: () => console.log('OK Pressed') }]),
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this comment. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // when cache update comes in...update state!
  // useEffect(() => {
  //   setIsLiked(comment.likedByMe);
  //   setLikesCount(comment.likesCount);
  // }, [comment.likedByMe, comment.likesCount]);

  // VARIABLES
  // CALCULATE THESE VARIABLES ONCE UPON RENDER - THEY SHOULD NEVER CHANGE
  const isMyPost = useMemo(() => {
    return currentUserId === comment.owner.id;
  }, [comment, currentUserId]);

  // CALCULATE THESE VARIABLES ONCE UPON RENDER - THEY SHOULD NEVER CHANGE
  const { timeDiff, period } = useMemo(() => {
    // for dates
    const createdAt1 = new Date(comment.createdAt);
    const { timeDiff: timeDiff1, period: period1 } = timeDifference(currentTime, createdAt1);

    return {
      timeDiff: Math.max(timeDiff1, 0),
      period: period1,
    };
  }, [comment]);

  // CUSTOM FUNCTIONS

  const handleDelete = () => {
    deleteOneComment();
  };

  const determineOptions = () => {
    if (isMyPost) {
      return [
        {
          text: 'Delete comment',
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

  return (
    <View style={styles.commentContainer}>
      <View style={lessTopPadding ? styles.commentNoLine : styles.comment}>
        <View style={styles.leftColumn}>
          <ProfilePic user={comment.owner} size="small" enableIntro={!disableVideo} enableStory={!disableVideo} />
          <Threadline showThread={showThread} />
        </View>
        <View style={[{ ...styles.rightColumn }, showThread && { paddingBottom: 20 }]}>
          <PostHeader user={comment.owner} timeDiff={timeDiff} period={period} />
          <PostContent post={comment} showDetails={false} />
          <CommentFooter comment={comment} hideButtons={hideButtons} parentComment={parentComment} isSubComment />
          {!hideButtons && (
            <View style={{ position: 'absolute', top: -2, right: 0 }}>
              <Chevron onPress={handleMoreButton} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: 56,
  },
  comment: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 12,
    paddingRight: 12,
    marginTop: 0,
    backgroundColor: 'white',

    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
  },
  commentNoLine: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 12,
    marginTop: 0,
    backgroundColor: 'white',
  },
  threadLine: {
    flex: 1,
    width: 2,
    marginTop: 5,
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
    borderBottomLeftRadius: 1.5,
    borderBottomRightRadius: 1.5,
    backgroundColor: colors.iconGray,
    opacity: 0.6,
  },
  leftColumn: {
    alignItems: 'center',
    paddingRight: 4,
    width: 56,
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingBottom: 10,
  },
});

export default SubComment;
