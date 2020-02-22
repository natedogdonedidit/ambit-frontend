import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { format } from 'date-fns';
import { useMutation } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import LIKE_UPDATE_MUTATION from 'library/mutations/LIKE_UPDATE_MUTATION';
import DELETE_UPDATE_MUTATION from 'library/mutations/DELETE_UPDATE_MUTATION';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';

import ProfilePic from 'library/components/UI/ProfilePic';
import Heart from 'library/components/UI/icons/Heart';
import Comment from 'library/components/UI/icons/Comment';
import Share from 'library/components/UI/icons/Share';
import Chevron from 'library/components/UI/icons/Chevron';

const Update = ({
  post,
  update,
  currentTime,
  navigation,
  showDetails = false,
  showLine = false,
  hideButtons = false,
  hideTopLine = false,
  updateInd,
}) => {
  // ////////////////////////////////////////////////////////////////
  // MUTATIONS - like, share, delete
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

  const [deleteUpdate, { loading: loadingDelete }] = useMutation(DELETE_UPDATE_MUTATION, {
    variables: {
      owner: post.owner.id,
      id: update.id,
    },
    refetchQueries: () => [{ query: SINGLE_POST_QUERY, variables: { id: update.parentPost.id } }],
    onCompleted: () => {},
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this update. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // ////////////////////////////////////////////////////////////////
  // HOOKS & VARIABLES
  const { currentUserId } = useContext(UserContext);
  const isMyPost = post.owner.id === currentUserId;
  const containsMedia = !!update.image;
  // for dates
  const createdAt = new Date(update.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, createdAt);
  const formatedDate = format(createdAt, 'M/d/yy h:mm a');

  // ////////////////////////////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const handleLike = () => {
    if (!loadingLike) likeUpdate();
  };

  const renderMedia = () => {
    return <Image style={{ width: '100%', height: 160 }} source={{ uri: update.image }} resizeMode="cover" />;
  };

  return (
    <View style={styles.updateContainer}>
      <View style={hideTopLine ? styles.updateNoLine : styles.update}>
        <View style={styles.leftColumn}>
          <ProfilePic navigation={navigation} user={post.owner} size={30} />
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
                <Text style={{ ...defaultStyles.defaultSemibold }} numberOfLines={1}>
                  {post.owner.name}
                </Text>
              </View>
            </TouchableOpacity>

            {!hideButtons && (
              <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <Chevron
                  onPress={() =>
                    navigation.navigate('EditPostPopup', {
                      post: update,
                      isMyPost,
                      deleteFunction: deleteUpdate,
                      type: 'update',
                    })
                  }
                />
              </View>
            )}
          </View>

          <View style={styles.headlineRow}>
            <Text style={{ ...defaultStyles.smallMute, paddingRight: 5 }}>Update #{updateInd + 1}</Text>
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

          <View style={styles.content}>
            <Text style={defaultStyles.defaultText}>{update.content}</Text>
          </View>

          {containsMedia && <View style={styles.media}>{renderMedia()}</View>}

          {showDetails ? (
            <>
              <View style={styles.date}>
                <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{formatedDate}</Text>
              </View>
              <View style={styles.likesRow}>
                <View style={{ flexDirection: 'row' }}>
                  {!!update.likesCount && (
                    <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>
                      {update.likesCount} Likes
                    </Text>
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
              </View>
            )
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  updateContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingRight: 12,
  },
  update: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 12,
    paddingRight: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
  },
  updateNoLine: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 5,
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
  },
  leftColumn: {
    alignItems: 'center',
    width: 64,
    paddingLeft: 4,
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingBottom: 10,
  },
  updateNumber: {
    alignSelf: 'flex-start',
    paddingBottom: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headlineRow: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
  },
  content: {
    paddingBottom: 8,
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

export default Update;
