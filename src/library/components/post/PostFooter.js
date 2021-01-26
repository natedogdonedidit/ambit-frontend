import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Heart from 'library/components/UI/icons/Heart';
import Comment from 'library/components/UI/icons/Comment';
import ShareIcon from 'library/components/UI/icons/Share';
import GoalStatus from 'library/components/post/GoalStatus';

import LIKE_POST_MUTATION from 'library/mutations/LIKE_POST_MUTATION';
import UNLIKE_POST_MUTATION from 'library/mutations/UNLIKE_POST_MUTATION';
import REPOST_POST_MUTATION from 'library/mutations/REPOST_POST_MUTATION';
import UNDO_REPOST_POST_MUTATION from 'library/mutations/UNDO_REPOST_POST_MUTATION';
import { UserContext } from 'library/utils/UserContext';
import ButtonSmall from 'library/components/UI/buttons/ButtonSmall';

const PostFooter = ({ post, showDetails, hideButtons, updateGoalStatus, isMyPost, formatedDate }) => {
  const navigation = useNavigation();
  const { currentUserId } = useContext(UserContext);
  const [likedByMe, setLikedByMe] = useState(post.likedByMe);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  // when cache update comes in...update state!
  useEffect(() => {
    setLikedByMe(post.likedByMe);
    setLikesCount(post.likesCount);
  }, [post.likedByMe, post.likesCount]);

  // MUTATIONS
  const [likePost, { loading: loadingLike }] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      where: {
        id: post.id,
      },
      data: {
        likes: {
          connect: [{ id: currentUserId }],
        },
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      likePost: {
        __typename: 'Post',
        ...post,
        likedByMe: true,
        likesCount: post.likesCount + 1,
      },
    },
  });

  const [unlikePost, { loading: loadingUnlike }] = useMutation(UNLIKE_POST_MUTATION, {
    variables: {
      where: {
        id: post.id,
      },
      data: {
        likes: {
          disconnect: [{ id: currentUserId }],
        },
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      unlikePost: {
        __typename: 'Post',
        ...post,
        likedByMe: false,
        likesCount: post.likesCount - 1,
      },
    },
    onError: () => null,
  });

  // MUTATION FOR REPOST
  const [rePost] = useMutation(REPOST_POST_MUTATION, {
    variables: {
      where: { id: post.id },
      data: {
        reposts: { connect: [{ id: currentUserId }] },
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      rePost: {
        __typename: 'Post',
        ...post,
        repostedByMe: true,
        sharesCount: post.sharesCount + 1,
      },
    },
  });

  const [undoRePost] = useMutation(UNDO_REPOST_POST_MUTATION, {
    variables: {
      where: { id: post.id },
      data: {
        reposts: { disconnect: [{ id: currentUserId }] },
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      undoRePost: {
        __typename: 'Post',
        ...post,
        repostedByMe: false,
        sharesCount: post.sharesCount - 1,
      },
    },
    onError: () => null,
  });

  const handleLike = async () => {
    requestAnimationFrame(() => {
      if (likedByMe) {
        setLikedByMe(false);
        setLikesCount(likesCount - 1);
        unlikePost();
      } else if (!likedByMe) {
        setLikedByMe(true);
        setLikesCount(likesCount + 1);
        likePost();
      }
    });
  };

  const handleRepost = async () => {
    requestAnimationFrame(() => {
      if (post.repostedByMe) {
        // setIsLiked(false);
        // setLikesCount(likesCount - 1);
        undoRePost();
      } else if (!post.repostedByMe) {
        // setIsLiked(true);
        // setLikesCount(likesCount + 1);
        rePost();
      }
    });
  };

  if (showDetails) {
    return (
      <>
        <View style={styles.date}>
          <Text style={{ ...defaultStyles.smallMute, paddingRight: 15 }}>{formatedDate}</Text>
          {!!post.isGoal && (
            <GoalStatus navigation={navigation} post={post} updateGoalStatus={updateGoalStatus} isMyPost={isMyPost} />
          )}
        </View>
        <View style={styles.likesRow}>
          <View style={{ flexDirection: 'row' }}>
            {!!likesCount && (
              <Text style={{ ...defaultStyles.smallMute, paddingRight: 15 }}>
                {likesCount === 0 ? null : `${likesCount} Like${likesCount > 1 ? 's' : ''}`}
              </Text>
            )}
            {!!post.sharesCount && (
              <Text style={{ ...defaultStyles.smallMute, paddingRight: 15 }}>{post.sharesCount} Shares</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingLeft: 30 }}>
              <Comment onPress={() => navigation.navigate('AddCommentModal', { post })} />
            </View>
            <View style={{ paddingLeft: 30 }}>
              <Heart liked={likedByMe} onPress={() => handleLike()} />
            </View>
            <View style={{ paddingLeft: 30 }}>
              <ShareIcon
                shared={post.repostedByMe}
                onPress={() => navigation.navigate('SharePopup', { handleRepost, postId: post.id })}
              />
            </View>
          </View>
        </View>
      </>
    );
  }

  if (hideButtons) return null;

  return (
    <View style={styles.buttons}>
      <View style={styles.button}>
        <Comment onPress={() => navigation.navigate('AddCommentModal', { post })} />
        <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{post.commentsCount <= 0 ? null : post.commentsCount}</Text>
      </View>
      <View style={styles.button}>
        <Heart liked={likedByMe} onPress={() => handleLike()} />
        <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{likesCount <= 0 ? null : likesCount}</Text>
      </View>
      {/* <View style={styles.button}>
            <Repost onPress={() => navigation.navigate('SharePopup', { handleRepost, postId: post.id })} />
            <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{post.sharesCount}</Text>
          </View> */}
      <View style={styles.button}>
        <ShareIcon
          shared={post.repostedByMe}
          onPress={() => navigation.navigate('SharePopup', { handleRepost, postId: post.id })}
        />
        <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{post.sharesCount <= 0 ? null : post.sharesCount}</Text>
      </View>
      {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Text style={{ textAlign: 'right', ...defaultStyles.defaultMedium, color: colors.iosBlue }}>Update</Text>
        <View>
          <ButtonSmall onPress={() => navigation.navigate('AddUpdateModal', { post })}>Update</ButtonSmall>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 65,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 6,
    paddingRight: 15,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  likesRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 15,
  },
});

export default PostFooter;
