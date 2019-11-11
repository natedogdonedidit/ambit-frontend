import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { format } from 'date-fns';
import { useMutation } from '@apollo/react-hooks';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import LIKE_UPDATE_MUTATION from 'library/mutations/LIKE_UPDATE_MUTATION';
import TextButton from 'library/components/UI/TextButton';

import ProfilePic from 'library/components/UI/ProfilePic';
import Heart from 'library/components/UI/Heart';
import Comment from 'library/components/UI/Comment';
import Share from 'library/components/UI/Share';
import Ellipsis from 'library/components/UI/Ellipsis';

const Update = ({
  post,
  update,
  currentTime,
  navigation,
  showDetails = false,
  showLine = false,
  hideButtons = false,
  isStandalone = false,
  updateInd,
}) => {
  // MUTATIONS - like, share
  const [likeUpdate, { loading: loadingLike }] = useMutation(LIKE_UPDATE_MUTATION, {
    variables: {
      updateId: update.id,
    },
    refetchQueries: {},
    optimisticResponse: {
      __typename: 'Mutation',
      likeUpdate: {
        id: update.id,
        __typename: 'Update',
        ...update,
        likedByMe: !update.likedByMe,
        likesCount: update.likedByMe ? update.likesCount - 1 || null : update.likesCount + 1,
      },
    },
    onCompleted: () => {
      // closeModal();
    },
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to like this update. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  const { currentUserId } = useContext(UserContext);
  const isMyPost = post.owner.id === currentUserId;

  const containsMedia = !!update.image;

  // for dates
  const createdAt = new Date(update.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, createdAt);
  const formatedDate = format(createdAt, 'M/d/yy h:mm a');

  // for potential updates

  const handleLike = () => {
    if (!loadingLike) likeUpdate();
  };

  // const renderMedia = () => {};

  return (
    <View style={[styles.update, isStandalone && { paddingTop: 12, marginTop: 5 }]}>
      <View style={styles.leftColumn}>
        <ProfilePic navigation={navigation} user={post.owner} size={30} disableVideo />
        {showLine && <View style={styles.threadLine} />}
      </View>
      <View style={[{ ...styles.rightColumn }, showLine && { paddingBottom: 20 }]}>
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
            <Text style={defaultStyles.smallMute}>
              {timeDiff} {period}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={defaultStyles.defaultText}>{update.content}</Text>
        </View>
        {showDetails ? (
          <>
            <View style={styles.date}>
              <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{formatedDate}</Text>
              <TextButton onPress={() => null}>Tags</TextButton>
            </View>
            <View style={styles.likesRow}>
              <View style={{ flexDirection: 'row' }}>
                {!!update.likesCount && (
                  <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{update.likesCount} Likes</Text>
                )}
                {!!update.sharesCount && (
                  <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>
                    {update.sharesCount} Shares
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ paddingLeft: 25 }}>
                  <Comment onPress={() => navigation.navigate('Comment', { clicked: update, isUpdate: true, updateInd })} />
                </View>
                <View style={{ paddingLeft: 25 }}>
                  <Heart color={update.likedByMe ? colors.peach : colors.iconGray} onPress={() => handleLike()} />
                </View>
                <View style={{ paddingLeft: 25 }}>
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
                  <Comment onPress={() => navigation.navigate('Comment', { clicked: update, isUpdate: true, updateInd })} />
                  <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{update.commentsCount}</Text>
                </View>
                <View style={styles.button}>
                  <Heart color={update.likedByMe ? colors.peach : colors.iconGray} onPress={() => handleLike()} />
                  <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{update.likesCount}</Text>
                </View>
                <View style={styles.button}>
                  <Share onPress={() => null} />
                  <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{update.sharesCount}</Text>
                </View>
              </View>
              <View style={styles.buttonGroup}>
                <Ellipsis onPress={() => null} />
              </View>
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  update: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 3,
  },
  threadLine: {
    flex: 1,
    width: 3,
    marginTop: 3,
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
  updateNumber: {
    alignSelf: 'flex-start',
    paddingBottom: 2,
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
