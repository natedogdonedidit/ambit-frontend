import React, { useContext, useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { format } from 'date-fns';
import { useMutation, useApolloClient } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import LIKE_UPDATE_MUTATION from 'library/mutations/LIKE_UPDATE_MUTATION';
import UNLIKE_UPDATE_MUTATION from 'library/mutations/UNLIKE_UPDATE_MUTATION';

import ProfilePic from 'library/components/UI/ProfilePic';
import Heart from 'library/components/UI/icons/Heart';
import Comment from 'library/components/UI/icons/Comment';
import Share from 'library/components/UI/icons/Share';
import Chevron from 'library/components/UI/icons/Chevron';
import DELETE_UPDATE_MUTATION from 'library/mutations/DELETE_UPDATE_MUTATION';
import POST_COMMENTS_QUERY from 'library/queries/POST_COMMENTS_QUERY';
import { UserContext } from 'library/utils/UserContext';
import { UpdateFragment } from 'library/queries/_fragments';
import CoolText from 'library/components/UI/CoolText';

function Update({
  post,
  update,
  updateInd,
  navigation,
  showDetails = false,
  hideButtons = false,
  disableVideo = false,
  showLine = false,
  hideTopLine = false,
}) {
  // HOOKS
  const client = useApolloClient();
  const { currentUserId } = useContext(UserContext);
  const currentTime = new Date();

  // const [isLiked, setIsLiked] = useState(update.likedByMe); // this is the source of truth
  // const [likesCount, setLikesCount] = useState(update.likesCount); // this is the source of truth

  // MUTATIONS - like, share, delete
  const [likeUpdate] = useMutation(LIKE_UPDATE_MUTATION, {
    variables: {
      where: { id: update.id },
      data: {
        likes: {
          connect: [{ id: currentUserId }],
        },
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      likeUpdate: {
        __typename: 'Update',
        ...update,
        likedByMe: true,
        likesCount: update.likesCount + 1,
      },
    },
    onError: () => null,
  });

  const [unlikeUpdate] = useMutation(UNLIKE_UPDATE_MUTATION, {
    variables: {
      where: { id: update.id },
      data: {
        likes: {
          disconnect: [{ id: currentUserId }],
        },
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      unlikeUpdate: {
        __typename: 'Update',
        ...update,
        likedByMe: false,
        likesCount: update.likesCount - 1,
      },
    },
    onError: () => null,
  });

  // DELETE MUTATION
  const [deleteOneUpdate] = useMutation(DELETE_UPDATE_MUTATION, {
    variables: {
      where: {
        id: update.id,
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteOneUpdate: { __typename: 'Update', id: update.id },
    },
    update(cache, { data: deleteOneUpdate }) {
      navigation.navigate('Post', { post });
      // remove from cache
      cache.evict({ id: cache.identify({ __typename: 'Update', id: update.id }) });
      cache.gc();
    },
    refetchQueries: () => [{ query: POST_COMMENTS_QUERY, variables: { where: { id: update.parentPost.id } } }],
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this update. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // when cache update comes in...update state!
  // useEffect(() => {
  //   setIsLiked(update.likedByMe);
  //   setLikesCount(update.likesCount);
  // }, [update.likedByMe, update.likesCount]);

  // VARIABLES
  // for dates
  // CALCULATE THESE VARIABLES ONCE UPON RENDER - THEY SHOULD NEVER CHANGE

  // CALCULATE THESE VARIABLES ONCE UPON RENDER - THEY SHOULD NEVER CHANGE
  const { containsMedia, isMyPost } = useMemo(() => {
    const containsMedia1 = !!update.image;
    const isMyPost1 = currentUserId === post.owner.id;

    return {
      containsMedia: containsMedia1,
      isMyPost: isMyPost1,
    };
  }, [post, update]);

  // CALCULATE THESE VARIABLES ONCE UPON RENDER - THEY SHOULD NEVER CHANGE
  const { timeDiff, period, formatedDate } = useMemo(() => {
    // for dates
    const createdAt1 = new Date(update.createdAt);
    const { timeDiff: timeDiff1, period: period1 } = timeDifference(currentTime, createdAt1);
    const formatedDate1 = format(createdAt1, 'M/d/yy h:mm a');

    return {
      timeDiff: Math.max(timeDiff1, 0),
      period: period1,
      formatedDate: formatedDate1,
    };
  }, [update]);

  // CUSTOM FUNCTIONS
  const handleLike = async () => {
    requestAnimationFrame(() => {
      if (update.likedByMe) {
        // setIsLiked(false);
        // setLikesCount(likesCount - 1);
        unlikeUpdate();
      } else if (!update.likedByMe) {
        // setIsLiked(true);
        // setLikesCount(likesCount + 1);
        likeUpdate();
      }
    });
  };

  const determineOptions = () => {
    if (isMyPost) {
      return [
        {
          text: 'Delete update',
          color: colors.peach,
          onPress: deleteOneUpdate,
        },
      ];
    }

    // if just a normal post
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
          onPress={() => navigation.navigate('ImageViewerModal', { images: [update.image], index: 0 })}
        >
          <Image style={{ width: '100%', height: '100%' }} source={{ uri: update.image }} resizeMode="cover" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={hideTopLine ? styles.updateContainerNoLine : styles.updateContainer}>
      <View style={styles.update}>
        <View style={styles.leftColumn}>
          <ProfilePic
            navigation={navigation}
            user={post.owner}
            size="small"
            enableIntro={!disableVideo}
            enableStory={!disableVideo}
          />
          {showLine && <View style={styles.threadLine} />}
        </View>
        <View style={[{ ...styles.rightColumn }, showLine && { paddingBottom: 25 }]}>
          <View style={styles.topRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Profile', { username: post.owner.username })}
              hitSlop={{ top: 20, left: 0, bottom: 20, right: 20 }}
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
              <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <Chevron onPress={() => handleMoreButton()} />
              </View>
            )}
          </View>

          <View style={styles.content}>
            <CoolText>{update.content}</CoolText>
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
                    <Comment onPress={() => navigation.navigate('Comment', { post, update, isUpdate: true })} />
                  </View>
                  <View style={{ paddingLeft: 25 }}>
                    <Heart liked={update.likedByMe} onPress={handleLike} />
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
                    <Comment onPress={() => navigation.navigate('Comment', { post, update, isUpdate: true })} />
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{update.commentsCount || ''}</Text>
                  </View>
                  <View style={styles.button}>
                    <Heart liked={update.likedByMe} onPress={handleLike} />
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>
                      {update.likesCount === 0 ? null : update.likesCount}
                    </Text>
                  </View>
                  <View style={styles.button}>
                    <Share onPress={() => null} />
                    <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{update.sharesCount || ''}</Text>
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
  updateContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    paddingTop: 12,
  },
  updateContainerNoLine: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 5,
  },
  update: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',

    paddingRight: 12,
  },
  // updateLine: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   backgroundColor: 'white',
  //   paddingTop: 5,
  // },
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
  updateNumber: {
    alignSelf: 'flex-start',
    paddingBottom: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
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
  media: {
    width: '100%',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 10,
    overflow: 'hidden',
  },
});

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  if (prevProps.post === nextProps.post && prevProps.update === nextProps.update) return true;

  return false;
}

export default React.memo(Update, areEqual);
