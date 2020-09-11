/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import LIKE_COMMENT_MUTATION from 'library/mutations/LIKE_COMMENT_MUTATION';
import UNLIKE_COMMENT_MUTATION from 'library/mutations/UNLIKE_COMMENT_MUTATION';

import ProfilePic from 'library/components/UI/ProfilePic';
import Heart from 'library/components/UI/icons/Heart';
import CommentIcon from 'library/components/UI/icons/Comment';
import Chevron from 'library/components/UI/icons/Chevron';
import DELETE_COMMENT_MUTATION from 'library/mutations/DELETE_COMMENT_MUTATION';
import POST_COMMENTS_QUERY from 'library/queries/POST_COMMENTS_QUERY';
import { CommentFragment } from 'library/queries/_fragments';
import CoolText from 'library/components/UI/CoolText';

function Comment({
  comment,
  currentTime,
  // navigation,
  showLine = false,
  hideButtons = false,
  lessPadding = false,
  disableVideo = false,
}) {
  // HOOKS
  const { currentUserId } = useContext(UserContext);
  const navigation = useNavigation();
  const client = useApolloClient();

  // const [isLiked, setIsLiked] = useState(comment.likedByMe); // this is the source of truth
  // const [likesCount, setLikesCount] = useState(comment.likesCount); // this is the source of truth

  // MUTATIONS - like, share, delete
  const [likeComment] = useMutation(LIKE_COMMENT_MUTATION, {
    variables: {
      where: { id: comment.id },
      data: {
        likes: {
          connect: [{ id: currentUserId }],
        },
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      likeComment: {
        __typename: 'Comment',
        ...comment,
        likedByMe: true,
        likesCount: comment.likesCount + 1,
      },
    },
  });

  const [unlikeComment] = useMutation(UNLIKE_COMMENT_MUTATION, {
    variables: {
      where: { id: comment.id },
      data: {
        likes: {
          disconnect: [{ id: currentUserId }],
        },
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      unlikeComment: {
        __typename: 'Comment',
        ...comment,
        likedByMe: false,
        likesCount: comment.likesCount - 1,
      },
    },
    onError: () => null,
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
  const containsMedia = !!comment.image;
  // const hasSubComments = comment.comments ? comment.comments.length > 0 : false;
  // console.log(`${comment.content} ${hasSubComments}`);
  // for dates
  const createdAt = new Date(comment.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, createdAt);
  const isMyPost = currentUserId === comment.owner.id;

  // CUSTOM FUNCTIONS
  const handleLike = async () => {
    requestAnimationFrame(() => {
      if (comment.likedByMe) {
        // setIsLiked(false);
        // setLikesCount(likesCount - 1);
        unlikeComment();
      } else if (!comment.likedByMe) {
        // setIsLiked(true);
        // setLikesCount(likesCount + 1);
        likeComment();
      }
    });
  };

  const handleDelete = () => {
    deleteOneComment();
    // deleteOneComment({
    //   optimisticResponse: {
    //     __typename: 'Mutation',
    //     deleteOneComment: { __typename: 'Comment', id: comment.id },
    //   },
    //   update(cache, { data }) {
    //     // We get a single item from cache.
    //     const commentInCache = cache.readFragment({
    //       id: `Comment:${comment.id}`,
    //       fragment: CommentFragment,
    //       fragmentName: 'CommentFragment',
    //     });
    //     // Then, we update it.
    //     if (commentInCache) {
    //       cache.writeFragment({
    //         id: `Comment:${comment.id}`,
    //         fragment: CommentFragment,
    //         fragmentName: 'CommentFragment',
    //         data: {
    //           ...comment,
    //           _deleted: true,
    //         },
    //       });
    //     }
    //   },
    // });
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
        onPress: () => navigation.goBack(),
      },
    ];
  };

  const handleMoreButton = () => {
    const options = determineOptions();
    navigation.navigate('SelectorModal', { options });
  };

  const renderMedia = () => {
    return (
      <View style={{ width: '100%', height: 160 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ImageViewerModal', { images: [comment.image], index: 0 })}
        >
          <Image style={{ width: '100%', height: '100%' }} source={{ uri: comment.image }} resizeMode="cover" />
        </TouchableOpacity>
      </View>
    );
  };

  if (comment._deleted) return null;

  return (
    <View style={styles.commentContainer}>
      <View style={lessPadding ? styles.commentNoLine : styles.comment}>
        <View style={[styles.leftColumn]}>
          <ProfilePic
            user={comment.owner}
            size="small"
            navigation={navigation}
            enableIntro={!disableVideo}
            enableStory={!disableVideo}
          />
          {showLine && <View style={[{ ...styles.threadLine }]} />}
        </View>
        <View style={[styles.rightColumn, showLine && { paddingBottom: 24 }]}>
          <View style={styles.topRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Profile', { profileId: comment.owner.id })}
              hitSlop={{ top: 5, left: 0, bottom: 20, right: 20 }}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={styles.name}>
                <View style={{ flexShrink: 1 }}>
                  <Text style={{ ...defaultStyles.largeSemibold, paddingRight: 3 }} numberOfLines={1}>
                    {comment.owner.name}
                    <Text style={{ ...defaultStyles.largeMute }}> @{comment.owner.username} </Text>
                  </Text>
                </View>
                <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="circle" solid size={2} color={colors.blueGray} style={{ alignSelf: 'center', paddingRight: 5 }} />
                  <Text style={{ ...defaultStyles.largeMute }} numberOfLines={1}>
                    {timeDiff}
                    {period}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {!hideButtons && isMyPost && (
              <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <Chevron onPress={() => handleMoreButton()} />
              </View>
            )}
          </View>

          {!!comment.content && (
            <View style={styles.content}>
              <CoolText>{comment.content}</CoolText>
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
                        parentComment: comment,
                        isComment: true,
                        isUpdate: !!comment.parentUpdate,
                      })
                    }
                  />
                  <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{comment.commentsCount || ''}</Text>
                </View>
                <View style={styles.button}>
                  <Heart color={comment.likedByMe ? colors.peach : colors.iconGray} onPress={handleLike} />
                  <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>
                    {comment.likesCount === 0 ? null : comment.likesCount}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    width: '100%',
    backgroundColor: 'white',
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
    paddingLeft: 4,
    width: 76,
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
    paddingBottom: 4,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
  },
  headlineRow: {
    flexDirection: 'row',
    paddingBottom: 4,
    alignItems: 'center',
  },
  content: {
    paddingBottom: 8,
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

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  if (prevProps.comment === nextProps.comment) return true;

  return false;
}

export default React.memo(Comment, areEqual);
