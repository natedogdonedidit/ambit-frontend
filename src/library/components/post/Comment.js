import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import LIKE_COMMENT_MUTATION from 'library/mutations/LIKE_COMMENT_MUTATION';
import DELETE_COMMENT_MUTATION from 'library/mutations/DELETE_COMMENT_MUTATION';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';

import ProfilePic from 'library/components/UI/ProfilePic';
import Heart from 'library/components/UI/icons/Heart';
import CommentIcon from 'library/components/UI/icons/Comment';
import Chevron from 'library/components/UI/icons/Chevron';

const Comment = ({
  comment,
  currentTime,
  navigation,
  showLine = false,
  hideButtons = false,
  isSubComment = false,
  hideTopLine = false,
}) => {
  // ////////////////////////////////////////////////////////////////
  // MUTATIONS - like, share, delete
  const [likeComment, { loading: loadingLike }] = useMutation(LIKE_COMMENT_MUTATION, {
    variables: {
      id: comment.id,
    },
    refetchQueries: {},
    optimisticResponse: {
      __typename: 'Mutation',
      likeComment: {
        id: comment.id,
        __typename: 'Comment',
        ...comment,
        likedByMe: !comment.likedByMe,
        likesCount: comment.likedByMe ? comment.likesCount - 1 || null : comment.likesCount + 1,
      },
    },
    onCompleted: () => {
      // closeModal();
    },
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to like this comment. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  const [deleteComment, { loading: loadingDelete }] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      owner: comment.owner.id,
      id: comment.id,
    },
    refetchQueries: () => [{ query: SINGLE_POST_QUERY, variables: { id: comment.parentPost.id } }],
    onCompleted: () => {},
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this comment. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // ////////////////////////////////////////////////////////////////
  // HOOKS & VARIABLES
  const { currentUserId } = useContext(UserContext);
  const isMyPost = comment.owner.id === currentUserId;
  const containsMedia = !!comment.image;
  // for dates
  const createdAt = new Date(comment.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, createdAt);

  // ////////////////////////////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const handleLike = () => {
    if (!loadingLike) likeComment();
  };

  const renderMedia = () => {
    return <Image style={{ width: '100%', height: 160 }} source={{ uri: comment.image }} resizeMode="cover" />;
  };

  return (
    <View style={[styles.commentContainer, isSubComment && { paddingLeft: 48 }]}>
      <View
        style={[
          styles.comment,
          !isSubComment &&
            !hideTopLine && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.borderBlack, paddingTop: 12 },
        ]}
      >
        <View style={[styles.leftColumn]}>
          <ProfilePic user={comment.owner} size={30} intro={comment.owner.intro} navigation={navigation} />
          {showLine && <View style={[{ ...styles.threadLine }]} />}
        </View>
        <View style={[styles.rightColumn, showLine && { paddingBottom: 24 }]}>
          <View style={styles.topRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Profile', { profileId: comment.owner.id })}
              hitSlop={{ top: 20, left: 0, bottom: 20, right: 20 }}
            >
              <View style={styles.name}>
                <Text style={{ ...defaultStyles.defaultSemibold }} numberOfLines={1}>
                  {comment.owner.name}
                </Text>
              </View>
            </TouchableOpacity>

            {!hideButtons && isMyPost && (
              <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <Chevron
                  onPress={() =>
                    navigation.navigate('EditPostPopup', {
                      post: comment,
                      isMyPost,
                      deleteFunction: deleteComment,
                      type: 'comment',
                    })
                  }
                />
              </View>
            )}
          </View>

          <View style={styles.headlineRow}>
            <Text style={{ ...defaultStyles.smallMute, paddingRight: 5 }}>{comment.owner.headline}</Text>
            <Icon
              name="circle"
              solid
              size={3}
              color={colors.blueGray}
              style={{ opacity: 0.6, alignSelf: 'center', paddingRight: 5 }}
            />
            <Text style={{ ...defaultStyles.smallMute }}>
              {timeDiff} {period}
            </Text>
          </View>

          {!!comment.content && (
            <View style={styles.content}>
              <Text style={defaultStyles.defaultText}>{comment.content}</Text>
            </View>
          )}

          {containsMedia && <View style={styles.media}>{renderMedia()}</View>}

          {!hideButtons && (
            <View style={styles.buttons}>
              <View style={styles.buttonGroup}>
                <View style={styles.button}>
                  <CommentIcon onPress={() => navigation.navigate('Comment', { clicked: comment, isComment: true })} />
                  <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{comment.commentsCount}</Text>
                </View>
                <View style={styles.button}>
                  <Heart color={comment.likedByMe ? colors.peach : colors.iconGray} onPress={() => handleLike()} />
                  <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{comment.likesCount}</Text>
                </View>
              </View>
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  comment: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 5,
    marginTop: 0,
    backgroundColor: 'white',
  },
  threadLine: {
    flex: 1,
    width: 3,
    marginTop: 5,
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
    borderBottomLeftRadius: 1.5,
    borderBottomRightRadius: 1.5,
    backgroundColor: 'black',
    opacity: 0.12,
  },
  leftColumn: {
    alignItems: 'center',
    width: 48,
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingBottom: 10,
    paddingLeft: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
  },
  headlineRow: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  content: {
    paddingBottom: 6,
  },
  media: {
    width: '100%',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 10,
    overflow: 'hidden',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Comment;
