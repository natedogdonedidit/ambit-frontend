import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';
import { format } from 'date-fns';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference, timeDifferenceGoal } from 'library/utils';
import LIKE_COMMENT_MUTATION from 'library/mutations/LIKE_COMMENT_MUTATION';
import DELETE_COMMENT_MUTATION from 'library/mutations/DELETE_COMMENT_MUTATION';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';

import ProfilePic from 'library/components/UI/ProfilePic';
import Heart from 'library/components/UI/Heart';
import Options from 'library/components/UI/Options';
import Share from 'library/components/UI/Share';
import CommentIcon from 'library/components/UI/Comment';
import Loader from 'library/components/UI/Loader';

const Comment = ({
  comment,
  currentTime,
  navigation,
  editable = false,
  showLine = false,
  // broke = false,
  hideButtons = false,
  isSubComment = false,
}) => {
  // console.log(comment);
  // MUTATIONS - like, comment, share
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

  const { currentUserId } = useContext(UserContext);
  const isMyPost = comment.owner.id === currentUserId;

  const containsMedia = !!comment.image;

  // for dates
  const createdAt = new Date(comment.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, createdAt);

  const handleLike = () => {
    if (!loadingLike) likeComment();
  };

  const renderMedia = () => {
    return <Image style={{ width: '100%', height: 160 }} source={{ uri: comment.image }} resizeMode="cover" />;
  };

  return (
    <View style={[styles.comment, isSubComment && { paddingTop: 5, marginTop: 0 }]}>
      <View style={[styles.leftColumn, isSubComment && styles.leftColumnSub]}>
        <ProfilePic user={comment.owner} size={30} intro={comment.owner.intro} navigation={navigation} />
        {showLine && <View style={[{ ...styles.threadLine }]} />}
      </View>
      <View style={[styles.rightColumn, showLine && { paddingBottom: 24 }]}>
        <View style={styles.topRow}>
          <View style={styles.leftSide}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Profile', { profileId: comment.owner.id })}
              hitSlop={{ top: 20, left: 0, bottom: 20, right: 20 }}
            >
              <Text style={defaultStyles.defaultMedium} numberOfLines={1}>
                {comment.owner.name}
                {'   '}
                <Text style={{ ...defaultStyles.smallThinMute }}>
                  <Icon name="map-marker-alt" solid size={10} color={colors.darkGray} style={{ opacity: 0.3 }} />{' '}
                  {comment.owner.location}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rightSide}>
            <Text style={defaultStyles.smallThinMute}>
              {timeDiff} {period}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={defaultStyles.defaultText}>{comment.content}</Text>
        </View>

        {containsMedia && <View style={styles.media}>{renderMedia()}</View>}

        {!hideButtons && (
          <View style={[{ ...styles.buttons }]}>
            <View style={styles.button}>
              <CommentIcon onPress={() => navigation.navigate('Comment', { clicked: comment, isComment: true })} />
              <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{comment.commentsCount}</Text>
            </View>
            <View style={styles.button}>
              <Heart color={comment.likedByMe ? colors.peach : colors.darkGrayO} onPress={() => handleLike()} />
              <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{comment.likesCount}</Text>
            </View>
          </View>
        )}
      </View>
      {isMyPost && (
        <View style={{ position: 'absolute', top: 30, right: 15 }}>
          <Options
            onPress={() => {
              // navigation.navigate('EditPostPopup', { deletePost });
              // setPostToEdit({ id: comment.id, owner: comment.owner.id });
              // setModalVisibleEditPost(true);
              deleteComment();
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 12,
    backgroundColor: 'white',
    marginTop: 5,
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
    width: 64,
  },
  leftColumnSub: {
    alignItems: 'flex-start',
    paddingLeft: 48,
    width: 96,
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingRight: 15,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  leftSide: {},
  rightSide: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
    alignItems: 'center',
  },
  button: {
    width: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Comment;
