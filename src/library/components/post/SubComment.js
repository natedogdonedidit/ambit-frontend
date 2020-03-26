import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import LIKE_COMMENT_MUTATION from 'library/mutations/LIKE_COMMENT_MUTATION';

import ProfilePic from 'library/components/UI/ProfilePic';
import Heart from 'library/components/UI/icons/Heart';
import CommentIcon from 'library/components/UI/icons/Comment';
import Chevron from 'library/components/UI/icons/Chevron';

const SubComment = ({
  comment,
  parentComment,
  currentTime,
  navigation,
  showLine = false,
  hideButtons = false,
  lessPadding = false,
  disableVideo = false,
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

  // HOOKS & VARIABLES
  const { currentUserId } = useContext(UserContext);
  const isMyPost = comment.owner.id === currentUserId;
  const containsMedia = !!comment.image;

  // for dates
  const createdAt = new Date(comment.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, createdAt);

  // CUSTOM FUNCTIONS
  const handleLike = () => {
    if (!loadingLike) likeComment();
  };

  const renderMedia = () => {
    return <Image style={{ width: '100%', height: 160 }} source={{ uri: comment.image }} resizeMode="cover" />;
  };

  // console.log(comment.content, isSubComment, lessPadding, lessTopPadding);

  return (
    <View style={styles.commentContainer}>
      <View style={lessPadding ? styles.commentNoLine : styles.comment}>
        <View style={[styles.leftColumn]}>
          <ProfilePic user={comment.owner} size="small" navigation={navigation} disableVideo={disableVideo} />
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
                <Text style={{ ...defaultStyles.largeSemibold }} numberOfLines={1}>
                  {comment.owner.name}
                </Text>
              </View>
            </TouchableOpacity>

            {!hideButtons && isMyPost && (
              <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <Chevron onPress={() => navigation.navigate('EditCommentPopup', { comment })} />
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
                  <CommentIcon
                    onPress={() =>
                      navigation.navigate('Comment', {
                        post: comment.parentPost,
                        update: comment.parentUpdate,
                        comment,
                        parentComment,
                        isComment: true,
                        isSubComment: true,
                        isUpdate: !!comment.parentUpdate,
                      })
                    }
                  />
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

export default SubComment;
