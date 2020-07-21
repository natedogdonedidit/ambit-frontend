/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { format } from 'date-fns';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference, isCustomGoalTest } from 'library/utils';
import LIKE_POST_MUTATION from 'library/mutations/LIKE_POST_MUTATION';
import UNLIKE_POST_MUTATION from 'library/mutations/UNLIKE_POST_MUTATION';
import { BasicPost } from 'library/queries/_fragments';

import ProfilePic from 'library/components/UI/ProfilePic';
import Goal from 'library/components/UI/Goal';
import CustomGoal from 'library/components/UI/CustomGoal';
import Heart from 'library/components/UI/icons/Heart';
import Comment from 'library/components/UI/icons/Comment';
import Chevron from 'library/components/UI/icons/Chevron';
import Share from 'library/components/UI/icons/Share';
import Topic from 'library/components/post/Topic';
import Location from 'library/components/post/Location';
import GoalStatus from 'library/components/post/GoalStatus';
import { UserContext } from 'library/utils/UserContext';
import DELETE_POST_MUTATION from 'library/mutations/DELETE_POST_MUTATION';
import EDIT_GOALSTATUS_MUTATION from 'library/mutations/EDIT_GOALSTATUS_MUTATION';

const Post = ({
  post,
  currentTime,
  navigation,
  showDetails = false,
  showLine = false,
  hideButtons = false,
  disableVideo = false,
}) => {
  // HOOKS
  const { currentUserId } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(post.likedByMe); // this is the source of truth
  const [likesCount, setLikesCount] = useState(post.likesCount); // this is the source of truth

  const client = useApolloClient();

  // MUTATIONS - like, share, delete
  const [likePost, { loading: loadingLike }] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      postId: post.id,
    },
    update: (proxy, { data: dataReturned }) => {
      client.writeFragment({
        id: `Post:${post.id}`,
        fragment: BasicPost,
        fragmentName: 'BasicPost',
        data: {
          // __typename: 'Post',
          ...dataReturned.likePost,
        },
      });
    },
  });

  const [unlikePost, { loading: loadingUnlike }] = useMutation(UNLIKE_POST_MUTATION, {
    variables: {
      postId: post.id,
    },
    update: (proxy, { data: dataReturned }) => {
      client.writeFragment({
        id: `Post:${post.id}`,
        fragment: BasicPost,
        fragmentName: 'BasicPost',
        data: {
          ...dataReturned.unlikePost,
        },
      });
    },
    onError: () => null,
  });

  // DELETE POST MUTATION
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      id: post.id,
      ownerID: post.owner.id,
    },
    onCompleted: () =>
      Alert.alert('Done!', "You're post was successfully deleted", [{ text: 'OK', onPress: () => console.log('OK Pressed') }]),
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // DELETE POST MUTATION
  const [editGoalStatus] = useMutation(EDIT_GOALSTATUS_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to update this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // when cache update comes in...update state!
  useEffect(() => {
    setIsLiked(post.likedByMe);
    setLikesCount(post.likesCount);
  }, [post.likedByMe, post.likesCount]);

  // VARIABLES
  const containsMedia = post.video || post.images.length > 0;
  const isMyPost = currentUserId === post.owner.id;

  // for dates
  const createdAt = new Date(post.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, createdAt);
  const formatedDate = format(createdAt, 'M/d/yy h:mm a');

  // CUSTOM FUNCTIONS
  const handleLike = async () => {
    if (isLiked && !loadingUnlike && !loadingLike) {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
      unlikePost();
    } else if (!isLiked && !loadingLike && !loadingUnlike) {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
      likePost();
    }
  };

  const handleDelete = () => {
    deletePost({
      optimisticResponse: {
        __typename: 'Mutation',
        deletePost: { __typename: 'Post', id: post.id },
      },
      update(cache, { data }) {
        // We get a single item from cache.
        const postInCache = cache.readFragment({
          id: `Post:${post.id}`,
          fragment: BasicPost,
          fragmentName: 'BasicPost',
        });
        // Then, we update it.
        if (postInCache) {
          cache.writeFragment({
            id: `Post:${post.id}`,
            fragment: BasicPost,
            fragmentName: 'BasicPost',
            data: {
              ...post,
              _deleted: true,
            },
          });
        }
      },
    });
  };

  const updateGoalStatus = (newStatus) => {
    editGoalStatus({
      variables: {
        id: post.id,
        ownerID: post.owner.id,
        goalStatus: newStatus,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        editGoalStatus: {
          __typename: 'Post',
          ...post,
          goalStatus: newStatus,
        },
      },
      update(cache, { data: dataReturned }) {
        // We get a single item from cache.
        const postInCache = cache.readFragment({
          id: `Post:${post.id}`,
          fragment: BasicPost,
          fragmentName: 'BasicPost',
        });
        // Then, we update it.
        if (postInCache) {
          cache.writeFragment({
            id: `Post:${post.id}`,
            fragment: BasicPost,
            fragmentName: 'BasicPost',
            data: {
              ...dataReturned.editGoalStatus,
            },
          });
        }
      },
    });
  };

  const determineOptions = () => {
    if (isMyPost && post.goal && post.goalStatus === 'Active') {
      return [
        {
          text: 'Mark goal Complete',
          onPress: () => updateGoalStatus('Complete'),
        },
        {
          text: 'Mark goal Inactive',
          onPress: () => updateGoalStatus('Inactive'),
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

    if (isMyPost && post.goal && post.goalStatus === 'Inactive') {
      return [
        {
          text: 'Mark goal Active',
          onPress: () => updateGoalStatus('Active'),
        },
        {
          text: 'Mark goal Complete',
          onPress: () => updateGoalStatus('Complete'),
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

  if (post._deleted) return null;

  return (
    <View style={[{ ...styles.postContainer }, showLine && { borderBottomWidth: 0 }]}>
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
        <View style={[{ ...styles.rightColumn }, showLine && { paddingBottom: 0 }]}>
          <View style={styles.topRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Profile', { profileId: post.owner.id })}
              hitSlop={{ top: 5, left: 0, bottom: 20, right: 20 }}
            >
              <View style={styles.name}>
                <Text style={{ ...defaultStyles.largeSemibold }} numberOfLines={1}>
                  {post.owner.name}
                </Text>
              </View>
            </TouchableOpacity>

            {!hideButtons && (
              <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <Chevron onPress={handleMoreButton} />
              </View>
            )}
          </View>

          <View style={styles.headlineRow}>
            {post.owner.headline && (
              <>
                <Text style={{ ...defaultStyles.smallMute, paddingRight: 5 }}>{post.owner.headline}</Text>
                <Icon name="circle" solid size={2} color={colors.blueGray} style={{ alignSelf: 'center', paddingRight: 5 }} />
              </>
            )}
            <Text style={{ ...defaultStyles.smallMute }}>
              {timeDiff}
              {period} ago
            </Text>
          </View>

          {post.isGoal &&
            (isCustomGoalTest(post.goal) ? (
              <View style={styles.goalView}>
                <CustomGoal navigation={navigation} goal={post.goal} />
              </View>
            ) : (
              <View style={styles.goalView}>
                <Goal navigation={navigation} goal={post.goal} subField={post.subField} />
              </View>
            ))}

          <View style={styles.content}>
            <Text style={defaultStyles.defaultText}>{post.content}</Text>
          </View>

          {showDetails && (
            <View style={styles.topics}>
              {!!post.topics > 0 &&
                post.topics.map((topic) => <Topic key={topic.id} navigation={navigation} topicToShow={topic} />)}
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
                    <Comment onPress={() => navigation.navigate('Comment', { post })} />
                  </View>
                  <View style={{ paddingLeft: 30 }}>
                    <Heart color={isLiked ? colors.peach : colors.iconGray} onPress={() => handleLike()} />
                  </View>
                  <View style={{ paddingLeft: 30 }}>
                    <Share onPress={() => null} />
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
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{post.commentsCount}</Text>
                  </View>
                  <View style={styles.button}>
                    <Heart color={isLiked ? colors.peach : colors.iconGray} onPress={() => handleLike()} />
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{likesCount === 0 ? null : likesCount}</Text>
                  </View>
                  <View style={styles.button}>
                    <Share onPress={() => null} />
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{post.sharesCount}</Text>
                  </View>
                </View>
              </View>
            )
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingRight: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
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
  },
  leftColumn: {
    alignItems: 'center',
    paddingLeft: 4,
    width: 76,
    paddingTop: 10,
  },
  rightColumn: {
    flex: 1,
    // flexDirection: 'column', defaults to this
    alignItems: 'stretch',
    // paddingTop: 4,
    // paddingLeft: 8,
    paddingTop: 10,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
    paddingBottom: 1,
  },
  headlineRow: {
    flexDirection: 'row',
    paddingBottom: 6,
    alignItems: 'center',
  },
  goalView: {
    flexDirection: 'row',
    paddingBottom: 6,
    // backgroundColor: 'pink',
  },
  content: {
    paddingBottom: 8,
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
    marginBottom: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 6,
    paddingRight: 15,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  likesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 15,
  },
});

export default Post;
