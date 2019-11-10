import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';
import { format } from 'date-fns';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference, timeDifferenceGoal } from 'library/utils';
import LIKE_POST_MUTATION from 'library/mutations/LIKE_POST_MUTATION';
import DELETE_POST_MUTATION from 'library/mutations/DELETE_POST_MUTATION';
import USER_POSTS_QUERY from 'library/queries/USER_POSTS_QUERY';
import TextButton from 'library/components/UI/TextButton';

import ProfilePic from 'library/components/UI/ProfilePic';
import Goal from 'library/components/UI/Goal';
import Heart from 'library/components/UI/Heart';
import Comment from 'library/components/UI/Comment';
import Ellipsis from 'library/components/UI/Ellipsis';
import Options from 'library/components/UI/Options';
import Share from 'library/components/UI/Share';

const Post = ({ post, currentTime, navigation, showDetails = false, showLine = false, hideButtons = false }) => {
  // MUTATIONS - like, share
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

  const [deletePost, payloadDelete] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      owner: post.owner.id,
      id: post.id,
    },
    refetchQueries: () => [{ query: USER_POSTS_QUERY, variables: { id: post.owner.id } }],
    onCompleted: () => {},
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const { currentUserId } = useContext(UserContext);
  const isMyPost = post.owner.id === currentUserId;

  const containsMedia = post.video || post.images.length > 0;

  // for dates
  const createdAt = new Date(post.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, createdAt);
  const formatedDate = format(createdAt, 'M/d/yy h:mm a');

  // for goal remaining time
  const lastUpdated = new Date(post.lastUpdated);

  const handleLike = () => {
    if (!loadingLike) likePost();
  };

  const renderMedia = () => {
    return <Image style={{ width: '100%', height: 160 }} source={{ uri: post.images[0] }} resizeMode="cover" />;
  };

  return (
    <View style={styles.post}>
      <View style={styles.leftColumn}>
        <ProfilePic user={post.owner} intro={post.owner.intro} pitch={post.pitch} navigation={navigation} />
        {showLine && <View style={styles.threadLine} />}
      </View>
      <View style={[{ ...styles.rightColumn }, showLine && { paddingBottom: 10 }]}>
        <View style={styles.topRow}>
          <View style={styles.leftSide}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Profile', { profileId: post.owner.id })}
              hitSlop={{ top: 20, left: 0, bottom: 20, right: 20 }}
            >
              <Text style={defaultStyles.defaultMedium} numberOfLines={1}>
                {post.owner.name}
                {'   '}
                <Text style={{ ...defaultStyles.smallThinMute }}>
                  <Icon name="map-marker-alt" solid size={10} color={colors.darkGray} style={{ opacity: 0.3 }} /> {post.location}
                </Text>
              </Text>
            </TouchableOpacity>
            <View>{post.isGoal && <Text style={defaultStyles.smallThinMute}>is looking to:</Text>}</View>
          </View>

          <View style={styles.rightSide}>
            <Text style={defaultStyles.smallThinMute}>
              {timeDiff} {period}
            </Text>
          </View>
        </View>
        {post.isGoal && (
          <View style={styles.goal}>
            <Goal goal={post.goal} />
          </View>
        )}

        <View style={styles.content}>
          <Text style={defaultStyles.defaultText}>{post.content}</Text>
        </View>

        {containsMedia && <View style={styles.media}>{renderMedia()}</View>}
        {showDetails ? (
          <>
            <View style={styles.date}>
              <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{formatedDate}</Text>
              {/* <TextButton onPress={() => null}>Tags</TextButton> */}
            </View>
            <View style={styles.likesRow}>
              <View style={{ flexDirection: 'row' }}>
                {!!post.likesCount && (
                  <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{post.likesCount} Likes</Text>
                )}
                {!!post.sharesCount && (
                  <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{post.sharesCount} Shares</Text>
                )}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ paddingLeft: 30 }}>
                  <Comment onPress={() => navigation.navigate('Comment', { clicked: post })} />
                </View>
                <View style={{ paddingLeft: 30 }}>
                  <Heart color={post.likedByMe ? colors.peach : colors.darkGrayO} onPress={() => handleLike()} />
                </View>
                <View style={{ paddingLeft: 30 }}>
                  <Share onPress={() => null} />
                </View>
              </View>
            </View>
          </>
        ) : (
          !hideButtons && (
            <View style={styles.buttons}>
              <View style={styles.buttonGroup}>
                <View style={styles.button}>
                  <Comment onPress={() => navigation.navigate('Comment', { clicked: post })} />
                  <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{post.commentsCount}</Text>
                </View>
                <View style={styles.button}>
                  <Heart color={post.likedByMe ? colors.peach : colors.darkGrayO} onPress={() => handleLike()} />
                  <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{post.likesCount}</Text>
                </View>
                <View style={styles.button}>
                  <Share onPress={() => null} />
                  <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{post.sharesCount}</Text>
                </View>
              </View>
              <View style={styles.buttonGroup}>
                <Ellipsis onPress={() => navigation.navigate('EditPostPopup', { post, isMyPost, deletePost })} />
              </View>
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 12,
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 3,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderBlack,
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
  goal: {
    alignSelf: 'flex-start',
    paddingTop: 8,
    paddingBottom: 10,
  },
  content: {
    paddingBottom: 10,
  },
  media: {
    width: '100%',
    // height: 240,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 10,
    overflow: 'hidden',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 11,
    paddingRight: 20,
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
  countdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 6,
    // marginBottom: 10,

    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 5,
    paddingRight: 15,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  likesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
  },
});

export default Post;
