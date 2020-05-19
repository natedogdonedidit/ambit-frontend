import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';
import { format } from 'date-fns';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import LIKE_POST_MUTATION from 'library/mutations/LIKE_POST_MUTATION';

import ProfilePic from 'library/components/UI/ProfilePic';
import Goal from 'library/components/UI/Goal';
import Heart from 'library/components/UI/icons/Heart';
import Comment from 'library/components/UI/icons/Comment';
import Chevron from 'library/components/UI/icons/Chevron';
import Share from 'library/components/UI/icons/Share';
import Topic from 'library/components/post/Topic';
import Location from 'library/components/post/Location';
import GoalStatus from 'library/components/post/GoalStatus';
import { UserContext } from 'library/utils/UserContext';
import DELETE_POST_MUTATION from 'library/mutations/DELETE_POST_MUTATION';
import USER_POSTS_QUERY from 'library/queries/USER_POSTS_QUERY';

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

  // MUTATIONS - like, share, delete
  const [likePost, { loading: loadingLike }] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      postId: post.id,
    },
    refetchQueries: {},
    optimisticResponse: {
      __typename: 'Mutation',
      likePost: {
        id: post.id,
        __typename: 'Post',
        ...post,
        likedByMe: !post.likedByMe,
        likesCount: post.likedByMe ? post.likesCount - 1 || null : post.likesCount + 1,
      },
    },
    onCompleted: () => {
      // closeModal();
    },
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to like this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // DELETE POST MUTATION
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      id: post.id,
      ownerID: post.owner.id,
    },
    refetchQueries: () => [{ query: USER_POSTS_QUERY, variables: { id: currentUserId } }],
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // VARIABLES
  const containsMedia = post.video || post.images.length > 0;
  const containsTopics = !!post.subField || post.topics.length > 0;
  const isMyPost = currentUserId === post.owner.id;

  // for dates
  const createdAt = new Date(post.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, createdAt);
  const formatedDate = format(createdAt, 'M/d/yy h:mm a');
  // for goal remaining time
  // const lastUpdated = new Date(post.lastUpdated);

  // CUSTOM FUNCTIONS
  const determineOptions = () => {
    if (isMyPost && post.goal) {
      return [
        {
          text: 'Add an update',
          onPress: () => navigation.navigate('UpdatePost', { post }),
          closeModal: false,
        },
        {
          text: 'Delete post',
          color: colors.peach,
          onPress: deletePost,
        },
      ];
    }

    if (isMyPost) {
      return [
        {
          text: 'Delete post',
          color: colors.peach,
          onPress: deletePost,
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

  const handleLike = () => {
    if (!loadingLike) likePost();
  };

  const renderMedia = () => {
    return <Image style={{ width: '100%', height: 160 }} source={{ uri: post.images[0] }} resizeMode="cover" />;
  };

  return (
    <View style={[{ ...styles.postContainer }, showLine && { borderBottomWidth: 0 }]}>
      <View style={styles.post}>
        <View style={styles.leftColumn}>
          <ProfilePic size="medium" user={post.owner} navigation={navigation} disableVideo={disableVideo} />
          {showLine && <View style={styles.threadLine} />}
        </View>
        <View style={[{ ...styles.rightColumn }, showLine && { paddingBottom: 20 }]}>
          <View style={styles.topRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Profile', { profileId: post.owner.id })}
              hitSlop={{ top: 20, left: 0, bottom: 20, right: 20 }}
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

          {post.isGoal && (
            <View style={styles.goalView}>
              <Goal navigation={navigation} goal={post.goal} subField={post.subField} />
            </View>
          )}

          <View style={styles.content}>
            <Text style={defaultStyles.defaultText}>{post.content}</Text>
          </View>

          {showDetails && (
            <View style={styles.topics}>
              {post.topics.length > 0 &&
                post.topics.map(topic => <Topic key={topic.id} navigation={navigation} topicToShow={topic} />)}
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
                {!!post.isGoal && <GoalStatus navigation={navigation} post={post} />}
              </View>
              <View style={styles.likesRow}>
                <View style={{ flexDirection: 'row' }}>
                  {!!post.likesCount && (
                    <Text style={{ ...defaultStyles.smallMute, paddingRight: 15 }}>{post.likesCount} Likes</Text>
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
                    <Heart color={post.likedByMe ? colors.peach : colors.iconGray} onPress={() => handleLike()} />
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
                    <Heart color={post.likedByMe ? colors.peach : colors.iconGray} onPress={() => handleLike()} />
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{post.likesCount}</Text>
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
    paddingBottom: 10,
  },
  goalView: {
    flexDirection: 'row',
    paddingBottom: 8,
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
    marginBottom: 8,
    overflow: 'hidden',
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
