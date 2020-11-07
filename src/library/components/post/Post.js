/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation, useApolloClient } from '@apollo/client';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference, isCustomGoalTest } from 'library/utils';
import UPDATE_POST_MUTATION from 'library/mutations/UPDATE_POST_MUTATION';
import LIKE_POST_MUTATION from 'library/mutations/LIKE_POST_MUTATION';
import UNLIKE_POST_MUTATION from 'library/mutations/UNLIKE_POST_MUTATION';
import REPOST_POST_MUTATION from 'library/mutations/REPOST_POST_MUTATION';
import UNDO_REPOST_POST_MUTATION from 'library/mutations/UNDO_REPOST_POST_MUTATION';
import DELETE_POST_MUTATION from 'library/mutations/DELETE_POST_MUTATION';

import { BasicPost } from 'library/queries/_fragments';

import ProfilePic from 'library/components/UI/ProfilePic';
import Goal from 'library/components/UI/Goal';
import CustomGoal from 'library/components/UI/CustomGoal';
import Heart from 'library/components/UI/icons/Heart';
import Comment from 'library/components/UI/icons/Comment';
import Chevron from 'library/components/UI/icons/Chevron';
// import Ellipsis from 'library/components/UI/icons/Ellipsis';

import ShareIcon from 'library/components/UI/icons/Share';
import Repost from 'library/components/UI/icons/Repost';

import Topic from 'library/components/post/Topic';
import Location from 'library/components/post/Location';
import GoalStatus from 'library/components/post/GoalStatus';
import { UserContext } from 'library/utils/UserContext';
import CoolText from 'library/components/UI/CoolText';
import RepostedBy from 'library/components/post/RepostedBy';

function Post({
  post,
  navigation,
  showDetails = false,
  showLine = false,
  hideButtons = false,
  disableVideo = false,
  showTopBorder,
  showRepost = false,
}) {
  if (!post) {
    navigation.goBack();
    return null;
  }

  // HOOKS
  const client = useApolloClient();
  const { currentUserId } = useContext(UserContext);
  const route = useRoute();
  const currentTime = new Date();

  // useEffect(() => {
  //   console.log('post data', post);
  // }, [post]);

  // STATE
  // const [isLiked, setIsLiked] = useState(post.likedByMe); // this is the source of truth
  // const [likesCount, setLikesCount] = useState(post.likesCount); // this is the source of truth

  // MUTATIONS - like, share, delete
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
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

  const [unlikePost] = useMutation(UNLIKE_POST_MUTATION, {
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
      Alert.alert('Oh no!', 'An error occured when trying to delete this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // DELETE POST MUTATION
  const [editGoalStatus] = useMutation(UPDATE_POST_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to update this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // when cache update comes in...update state!
  // useEffect(() => {
  //   setIsLiked(post.likedByMe);
  //   setLikesCount(post.likesCount);
  // }, [post.likedByMe, post.likesCount]);

  // CALCULATE THESE VARIABLES ONCE UPON RENDER - THEY SHOULD NEVER CHANGE
  const { containsMedia, isMyPost } = useMemo(() => {
    const containsMedia1 = post.video || post.images.length > 0;
    const isMyPost1 = currentUserId === post.owner.id;

    return {
      containsMedia: containsMedia1,
      isMyPost: isMyPost1,
    };
  }, [post, currentUserId]);

  // CALCULATE THESE VARIABLES ONCE UPON RENDER - THEY SHOULD NEVER CHANGE
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

  // CUSTOM FUNCTIONS
  const handleLike = async () => {
    requestAnimationFrame(() => {
      if (post.likedByMe) {
        // setIsLiked(false);
        // setLikesCount(likesCount - 1);
        unlikePost();
      } else if (!post.likedByMe) {
        // setIsLiked(true);
        // setLikesCount(likesCount + 1);
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

  const handleDelete = () => {
    // if on post screen, navigate back first
    // console.log(route.name);
    // if (route.name === 'Post') {
    //   navigation.goBack();
    // }
    deleteOnePost();
  };

  const updateGoalStatus = (newStatus) => {
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

  const determineOptions = () => {
    if (isMyPost && post.goal && post.goalStatus === 'Active') {
      return [
        {
          text: 'Add an update',
          onPress: () => navigation.navigate('UpdatePost', { post }),
          closeModal: false,
        },
        {
          text: 'Mark goal Complete',
          onPress: () => updateGoalStatus('Complete'),
        },
        {
          text: 'Mark goal Inactive',
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
          onPress: () => navigation.navigate('UpdatePost', { post }),
          closeModal: false,
        },
        {
          text: 'Mark goal Active',
          onPress: () => updateGoalStatus('Active'),
        },
        {
          text: 'Mark goal Complete',
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
          onPress: () => updateGoalStatus('Active'),
        },
        {
          text: 'Add an update',
          onPress: () => navigation.navigate('UpdatePost', { post }),
          closeModal: false,
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
        onPress: () => navigation.goBack(),
      },
    ];
  };

  const handleMoreButton = () => {
    const options = determineOptions();
    navigation.navigate('SelectorModal', { options });
  };

  const renderMedia = () => {
    if (post.images.length === 1) {
      return (
        <View style={{ width: '100%', height: 160 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ImageViewerModal', { images: post.images, index: 0 })}
          >
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.images[0] }} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      );
    }
    if (post.images.length === 2) {
      return (
        <>
          <View style={{ width: '50%', height: 160, borderRightWidth: StyleSheet.hairlineWidth, borderColor: colors.lightGray }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ImageViewerModal', { images: post.images, index: 0 })}
            >
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.images[0] }} resizeMode="cover" />
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', height: 160 }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ImageViewerModal', { images: post.images, index: 1 })}
            >
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.images[1] }} resizeMode="cover" />
            </TouchableOpacity>
          </View>
        </>
      );
    }
    if (post.images.length === 3) {
      return (
        <>
          <View
            style={{ width: '100%', height: 120, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.lightGray }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ImageViewerModal', { images: post.images, index: 0 })}
            >
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.images[0] }} resizeMode="cover" />
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', height: 120, borderRightWidth: StyleSheet.hairlineWidth, borderColor: colors.lightGray }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ImageViewerModal', { images: post.images, index: 1 })}
            >
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.images[1] }} resizeMode="cover" />
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', height: 120 }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ImageViewerModal', { images: post.images, index: 2 })}
            >
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.images[2] }} resizeMode="cover" />
            </TouchableOpacity>
          </View>
        </>
      );
    }
    if (post.images.length === 4) {
      return (
        <>
          <View
            style={{
              width: '50%',
              height: 120,
              borderRightWidth: StyleSheet.hairlineWidth,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: colors.lightGray,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ImageViewerModal', { images: post.images, index: 0 })}
            >
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.images[0] }} resizeMode="cover" />
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', height: 120 }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ImageViewerModal', { images: post.images, index: 1 })}
            >
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.images[1] }} resizeMode="cover" />
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', height: 120 }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ImageViewerModal', { images: post.images, index: 2 })}
            >
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.images[2] }} resizeMode="cover" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '50%',
              height: 120,
              borderLeftWidth: StyleSheet.hairlineWidth,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderColor: colors.lightGray,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ImageViewerModal', { images: post.images, index: 3 })}
            >
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: post.images[3] }} resizeMode="cover" />
            </TouchableOpacity>
          </View>
        </>
      );
    }
    return null;
  };

  // if (post._deleted) return null;

  return (
    <View
      style={[
        { ...styles.postContainer },
        showLine && { borderBottomWidth: 0 },
        showTopBorder && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.borderBlack },
        showRepost && { paddingTop: 7 },
      ]}
    >
      {showRepost && <RepostedBy postId={post.id} />}
      <View style={styles.post}>
        <View style={styles.leftColumn}>
          <ProfilePic
            size="medium"
            user={post.owner}
            navigation={navigation}
            enableIntro={!disableVideo}
            enableStory={!disableVideo}
          />
          {showLine && <View style={styles.threadLine} />}
        </View>
        <View style={[{ ...styles.rightColumn }, showLine && { paddingBottom: 20 }]}>
          <View style={styles.topRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Profile', { username: post.owner.username })}
              hitSlop={{ top: 5, left: 0, bottom: 20, right: 20 }}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={styles.name}>
                <View style={{ flexShrink: 1 }}>
                  <Text style={{ ...defaultStyles.largeSemibold, paddingRight: 3 }} numberOfLines={1}>
                    {post.owner.name}
                    <Text style={{ ...defaultStyles.largeMute }}> @{post.owner.username} </Text>
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

            {!hideButtons && (
              <View style={{ position: 'absolute', top: -2, right: 0 }}>
                <Chevron onPress={handleMoreButton} />
              </View>
            )}
          </View>
          {/* <View style={styles.headlineRow}>
            {!!post.goal && <Text style={{ ...defaultStyles.smallMute, paddingRight: 5 }}>has a goal:</Text>}
          </View> */}

          {/* <View style={styles.headlineRow}>
            {post.owner.headline && (
              <>
                <Text style={{ ...defaultStyles.smallMute, paddingRight: 5 }}>has a goal:</Text>
                <Icon name="circle" solid size={2} color={colors.blueGray} style={{ alignSelf: 'center', paddingRight: 5 }} />
              </>
            )}
            <Text style={{ ...defaultStyles.smallMute }}>
              {timeDiff}
              {period} ago
            </Text>
          </View> */}

          {post.isGoal &&
            (isCustomGoalTest(post.goal) ? (
              // <View style={styles.goalView}>
              <CustomGoal navigation={navigation} goal={post.goal} color={post.goalColor} icon={post.goalIcon} />
            ) : (
              // </View>
              <Goal navigation={navigation} goal={post.goal} subField={post.subField} />
            ))}

          <View style={styles.content}>
            <CoolText>{post.content}</CoolText>
          </View>

          {showDetails && (
            <View style={styles.topics}>
              {!!post.topic && <Topic navigation={navigation} topicToShow={post.topic} />}
              {!!post.location && (
                <Location
                  navigation={navigation}
                  location={post.location}
                  locationLat={post.locationLat}
                  locationLon={post.locationLon}
                />
              )}
            </View>
          )}

          {containsMedia && <View style={styles.media}>{renderMedia()}</View>}
          {showDetails ? (
            <>
              <View style={styles.date}>
                <Text style={{ ...defaultStyles.smallMute, paddingRight: 15 }}>{formatedDate}</Text>
                {!!post.isGoal && (
                  <GoalStatus navigation={navigation} post={post} updateGoalStatus={updateGoalStatus} isMyPost={isMyPost} />
                )}
              </View>
              <View style={styles.likesRow}>
                <View style={{ flexDirection: 'row' }}>
                  {!!post.likesCount && (
                    <Text style={{ ...defaultStyles.smallMute, paddingRight: 15 }}>
                      {post.likesCount === 0 ? null : `${post.likesCount} Like${post.likesCount > 1 ? 's' : ''}`}
                    </Text>
                  )}
                  {!!post.sharesCount && (
                    <Text style={{ ...defaultStyles.smallMute, paddingRight: 15 }}>{post.sharesCount} Shares</Text>
                  )}
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ paddingLeft: 30 }}>
                    <Comment onPress={() => navigation.navigate('Comment', { post })} />
                  </View>
                  <View style={{ paddingLeft: 30 }}>
                    <Heart liked={post.likedByMe} onPress={() => handleLike()} />
                  </View>
                  <View style={{ paddingLeft: 30 }}>
                    {/* <ShareIcon onPress={onShare} /> */}
                    <ShareIcon
                      shared={post.repostedByMe}
                      onPress={() => navigation.navigate('SharePopup', { handleRepost, postId: post.id })}
                    />
                  </View>
                </View>
              </View>
            </>
          ) : (
            !hideButtons && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.buttons}>
                  <View style={styles.button}>
                    <Comment onPress={() => navigation.navigate('Comment', { post })} />
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>
                      {post.commentsCount <= 0 ? null : post.commentsCount}
                    </Text>
                  </View>
                  <View style={styles.button}>
                    <Heart liked={post.likedByMe} onPress={() => handleLike()} />
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>
                      {post.likesCount <= 0 ? null : post.likesCount}
                    </Text>
                  </View>
                  {/* <View style={styles.button}>
                    <Repost onPress={() => navigation.navigate('SharePopup', { postId: post.id })} />
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{post.sharesCount}</Text>
                  </View> */}
                  <View style={styles.button}>
                    <ShareIcon
                      shared={post.repostedByMe}
                      onPress={() => navigation.navigate('SharePopup', { handleRepost, postId: post.id })}
                    />
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>
                      {post.sharesCount <= 0 ? null : post.sharesCount}
                    </Text>
                  </View>
                </View>
              </View>
            )
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
    minHeight: 30,
  },
  leftColumn: {
    alignItems: 'center',
    paddingLeft: 4,
    width: 76,
    // paddingTop: 10,
  },
  rightColumn: {
    flex: 1,
    // flexDirection: 'column', defaults to this
    alignItems: 'flex-start',
    // paddingTop: 4,
    // paddingLeft: 8,
    // paddingTop: 10,
    paddingBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
  },
  name: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 24,
    paddingBottom: 1,
  },
  headlineRow: {
    flexDirection: 'row',
    paddingBottom: 6,
    alignItems: 'center',
  },
  goalView: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingBottom: 6,
    // backgroundColor: 'pink',
  },
  content: {
    paddingBottom: 10,
  },
  topics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  media: {
    width: '100%',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  if (prevProps.post === nextProps.post) return true;

  // console.log(prevProps.post.id);

  return false;
}

export default React.memo(Post, areEqual);
