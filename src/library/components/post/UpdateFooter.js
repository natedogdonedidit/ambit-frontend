import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Heart from 'library/components/UI/icons/Heart';
import Comment from 'library/components/UI/icons/Comment';
import ShareIcon from 'library/components/UI/icons/Share';

import LIKE_UPDATE_MUTATION from 'library/mutations/LIKE_UPDATE_MUTATION';
import UNLIKE_UPDATE_MUTATION from 'library/mutations/UNLIKE_UPDATE_MUTATION';

import { UserContext } from 'library/utils/UserContext';

const UpdateFooter = ({ post, update, showDetails, hideButtons, formatedDate }) => {
  const navigation = useNavigation();
  const { currentUserId } = useContext(UserContext);
  const [likedByMe, setLikedByMe] = useState(update.likedByMe);
  const [likesCount, setLikesCount] = useState(update.likesCount);

  // when cache update comes in...update state!
  useEffect(() => {
    setLikedByMe(update.likedByMe);
    setLikesCount(update.likesCount);
  }, [update.likedByMe, update.likesCount]);

  // MUTATIONS
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

  const handleLike = async () => {
    requestAnimationFrame(() => {
      if (likedByMe) {
        setLikedByMe(false);
        setLikesCount(likesCount - 1);
        unlikeUpdate();
      } else if (!likedByMe) {
        setLikedByMe(true);
        setLikesCount(likesCount + 1);
        likeUpdate();
      }
    });
  };

  if (showDetails) {
    return (
      <>
        <View style={styles.date}>
          <Text style={{ ...defaultStyles.smallMute, paddingRight: 15 }}>{formatedDate}</Text>
        </View>
        <View style={styles.likesRow}>
          <View style={{ flexDirection: 'row' }}>
            {!!likesCount && (
              <Text style={{ ...defaultStyles.smallMute, paddingRight: 15 }}>
                {likesCount === 0 ? null : `${likesCount} Like${likesCount > 1 ? 's' : ''}`}
              </Text>
            )}
            {!!update.sharesCount && (
              <Text style={{ ...defaultStyles.smallMute, paddingRight: 15 }}>{update.sharesCount} Shares</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingLeft: 30 }}>
              <Comment onPress={() => navigation.navigate('AddCommentModal', { post, update, isUpdate: true })} />
            </View>
            <View style={{ paddingLeft: 30 }}>
              <Heart liked={likedByMe} onPress={() => handleLike()} />
            </View>
            {/* <View style={{ paddingLeft: 30 }}>
              <ShareIcon
                shared={update.repostedByMe}
                onPress={() => navigation.navigate('SharePopup', { handleRepost, postId: update.id })}
              />
            </View> */}
          </View>
        </View>
      </>
    );
  }

  if (hideButtons) return null;

  return (
    <View style={styles.buttons}>
      <View style={styles.button}>
        <Comment onPress={() => navigation.navigate('AddCommentModal', { post, update, isUpdate: true })} />
        <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>
          {update.commentsCount <= 0 ? null : update.commentsCount}
        </Text>
      </View>
      <View style={styles.button}>
        <Heart liked={likedByMe} onPress={() => handleLike()} />
        <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{likesCount <= 0 ? null : likesCount}</Text>
      </View>
      {/* <View style={styles.button}>
            <Repost onPress={() => navigation.navigate('SharePopup', { handleRepost, postId: update.id })} />
            <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{update.sharesCount}</Text>
          </View> */}
      {/* <View style={styles.button}>
        <ShareIcon
          shared={update.repostedByMe}
          onPress={() => navigation.navigate('SharePopup', { handleRepost, postId: update.id })}
        />
        <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{update.sharesCount <= 0 ? null : update.sharesCount}</Text>
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

export default UpdateFooter;

// {
//   showDetails ? (
//     <>
//       <View style={styles.date}>
//         <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{formatedDate}</Text>
//       </View>
//       <View style={styles.likesRow}>
//         <View style={{ flexDirection: 'row' }}>
//           {!!update.likesCount && (
//             <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{update.likesCount} Likes</Text>
//           )}
//           {!!update.sharesCount && (
//             <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{update.sharesCount} Shares</Text>
//           )}
//         </View>
//         <View style={{ flexDirection: 'row' }}>
//           <View style={{ paddingLeft: 25 }}>
//             <Comment onPress={() => navigation.navigate('AddCommentModal', { post, update, isUpdate: true })} />
//           </View>
//           <View style={{ paddingLeft: 25 }}>
//             <Heart liked={update.likedByMe} onPress={handleLike} />
//           </View>
//           <View style={{ paddingLeft: 25 }}>
//             <Share onPress={() => null} />
//           </View>
//         </View>
//       </View>
//     </>
//   ) : (
//     !hideButtons && (
//       <View style={styles.buttons}>
//         <View style={styles.buttonGroup}>
//           <View style={styles.button}>
//             <Comment onPress={() => navigation.navigate('AddCommentModal', { post, update, isUpdate: true })} />
//             <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{update.commentsCount || ''}</Text>
//           </View>
//           <View style={styles.button}>
//             <Heart liked={update.likedByMe} onPress={handleLike} />
//             <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>
//               {update.likesCount === 0 ? null : update.likesCount}
//             </Text>
//           </View>
//           <View style={styles.button}>
//             <Share onPress={() => null} />
//             <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{update.sharesCount || ''}</Text>
//           </View>
//         </View>
//       </View>
//     )
//   );
// }
