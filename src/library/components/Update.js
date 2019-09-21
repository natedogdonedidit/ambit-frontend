import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';
import { parseISO, format } from 'date-fns';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference, timeDifferenceGoal } from 'library/utils';
import LIKE_POST_MUTATION from 'library/mutations/LIKE_POST_MUTATION';
import TextButton from 'library/components/UI/TextButton';

import SmallProfilePic from 'library/components/UI/SmallProfilePic';
import Goal from 'library/components/UI/Goal';
import Tag from 'library/components/UI/Tag';
import Heart from 'library/components/UI/Heart';
import Comment from 'library/components/UI/Comment';
import Options from 'library/components/UI/Options';
import Share from 'library/components/UI/Share';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Update = ({
  post,
  update,
  currentTime,
  navigation,
  setModalVisibleEditPost,
  setPostToEdit,
  editable = false,
  showDetails = false,
  showLine = false,
}) => {
  // MUTATIONS - like, comment, share
  // const [likePost, { loading: loadingLike }] = useMutation(LIKE_POST_MUTATION, {
  //   variables: {
  //     postId: post.id,
  //   },
  //   optimisticResponse: {
  //     __typename: 'Mutation',
  //     likePost: {
  //       id: post.id,
  //       __typename: 'Post',
  //       ...post,
  //       likedByMe: !post.likedByMe,
  //       likesCount: post.likedByMe ? post.likesCount - 1 : post.likesCount + 1,
  //     },
  //   },
  //   onCompleted: () => {
  //     // closeModal();
  //   },
  //   onError: error => {
  //     console.log(error);
  //     Alert.alert('Oh no!', 'An error occured when trying to like this post. Try again later!', [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ]);
  //   },
  // });

  const { currentUserId } = useContext(UserContext);
  const isMyPost = post.owner.id === currentUserId;

  const containsMedia = !!update.image;

  // for dates
  const createdAt = new Date(update.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, createdAt);
  const formatedDate = format(createdAt, 'M/d/yy h:mm a');

  // for goal remaining time
  // const lastUpdated = !isUpdate ? new Date(post.lastUpdated) : null;
  // const { timeRemaining, period: per } = timeDifferenceGoal(currentTime, lastUpdated);

  // for potential updates

  const handleLike = () => {
    // if (!loadingLike) likePost();
  };

  // const renderTags = () => {
  //   return post.tags.map((tag, i) => (
  //     <Tag key={i} onPress={() => null}>
  //       {tag}
  //     </Tag>
  //   ));
  // };

  // const renderMedia = () => {};

  return (
    <View style={styles.post}>
      <View style={styles.leftColumn}>
        <SmallProfilePic pic={post.owner.profilePic} />
        {showLine && <View style={styles.threadLine} />}
      </View>
      <View style={[{ ...styles.rightColumn }, showLine && { paddingBottom: 0 }]}>
        <View style={styles.topRow}>
          <View style={styles.leftSide}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Profile', { profileId: post.owner.id })}
              hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
            >
              <Text style={defaultStyles.defaultMedium} numberOfLines={1}>
                {post.owner.name}
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
          <Text style={defaultStyles.defaultText}>{update.content}</Text>
        </View>

        {/* {post.tags.length > 0 && <View style={styles.tags}>{renderTags()}</View>} */}
        {/* {containsMedia && <View style={styles.media}>{renderMedia()}</View>} */}
        {/* {isMyPost && post.isGoal && editable && (
            <View style={styles.countdown}>
              <Text style={{ ...defaultStyles.defaultText, opacity: 0.6, paddingRight: 15 }}>
                This goal will expire in {timeRemaining} {per}
              </Text>
              <TextButton onPress={() => navigation.navigate('Post', { post, isUpdate: true })}>Update</TextButton>
            </View>
          )} */}
        {showDetails ? (
          <>
            <View style={styles.date}>
              <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{formatedDate}</Text>
              <TextButton onPress={() => null}>Tags</TextButton>
            </View>
            <View style={styles.likesRow}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>
                  {update.likesCount || 0} Likes
                </Text>
                <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>
                  {update.sharesCount || 0} Shares
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ paddingLeft: 15 }}>
                  <Comment onPress={() => null} />
                </View>
                <View style={{ paddingLeft: 15 }}>
                  <Heart color={update.likedByMe ? colors.peach : colors.darkGrayO} onPress={() => handleLike()} />
                </View>
                <View style={{ paddingLeft: 15 }}>
                  <Share onPress={() => null} />
                </View>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Comment onPress={() => null} />
              {!showDetails && <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{getRandomInt(100)}</Text>}
            </View>
            <View style={styles.button}>
              <Heart color={update.likedByMe ? colors.peach : colors.darkGrayO} onPress={() => handleLike()} />
              {!showDetails && (
                <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>
                  {update.likesCount < 1 ? '' : update.likesCount}
                </Text>
              )}
            </View>
            <View style={styles.button}>
              <Share onPress={() => null} />
              {!showDetails && <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{getRandomInt(100)}</Text>}
            </View>
          </View>
        )}
      </View>
      {/* {isMyPost && editable && (
        <View style={{ position: 'absolute', top: 30, right: 10 }}>
          <Options
            onPress={() => {
              setPostToEdit({ id: post.id, owner: post.owner.id });
              setModalVisibleEditPost(true);
            }}
          />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 3,
  },
  threadLine: {
    flex: 1,
    width: 5,
    marginTop: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'black',
    opacity: 0.2,
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
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  goal: {
    alignSelf: 'flex-start',
    paddingTop: 5,
    paddingBottom: 15,
  },
  content: {
    paddingBottom: 8,
    // paddingRight: 15,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 11,
    paddingRight: 20,
  },
  buttons: {
    flexDirection: 'row',
    // paddingBottom: 10,
    alignItems: 'center',
  },
  button: {
    width: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countdown: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 15,

    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 5,
    paddingRight: 15,

    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
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

    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderBlack,
  },
});

export default Update;
