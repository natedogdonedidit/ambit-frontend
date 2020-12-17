import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Heart from 'library/components/UI/icons/Heart';
import Comment from 'library/components/UI/icons/Comment';

import LIKE_COMMENT_MUTATION from 'library/mutations/LIKE_COMMENT_MUTATION';
import UNLIKE_COMMENT_MUTATION from 'library/mutations/UNLIKE_COMMENT_MUTATION';

import { UserContext } from 'library/utils/UserContext';

const CommentFooter = ({ comment, parentComment, isSubComment, hideButtons }) => {
  const navigation = useNavigation();
  const { currentUserId } = useContext(UserContext);
  const [likedByMe, setLikedByMe] = useState(comment.likedByMe);
  const [likesCount, setLikesCount] = useState(comment.likesCount);

  // when cache update comes in...update state!
  useEffect(() => {
    setLikedByMe(comment.likedByMe);
    setLikesCount(comment.likesCount);
  }, [comment.likedByMe, comment.likesCount]);

  // MUTATIONS
  const [likeComment] = useMutation(LIKE_COMMENT_MUTATION, {
    variables: {
      where: { id: comment.id },
      data: {
        likes: {
          connect: [{ id: currentUserId }],
        },
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      likeComment: {
        __typename: 'Comment',
        ...comment,
        likedByMe: true,
        likesCount: comment.likesCount + 1,
      },
    },
  });

  const [unlikeComment] = useMutation(UNLIKE_COMMENT_MUTATION, {
    variables: {
      where: { id: comment.id },
      data: {
        likes: {
          disconnect: [{ id: currentUserId }],
        },
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      unlikeComment: {
        __typename: 'Comment',
        ...comment,
        likedByMe: false,
        likesCount: comment.likesCount - 1,
      },
    },
    onError: () => null,
  });

  const handleLike = async () => {
    requestAnimationFrame(() => {
      if (likedByMe) {
        setLikedByMe(false);
        setLikesCount(likesCount - 1);
        unlikeComment();
      } else if (!likedByMe) {
        setLikedByMe(true);
        setLikesCount(likesCount + 1);
        likeComment();
      }
    });
  };

  if (hideButtons) return null;

  return (
    <View style={styles.buttons}>
      <View style={styles.button}>
        <Comment
          onPress={() =>
            navigation.navigate('AddCommentModal', {
              post: comment.parentPost,
              update: comment.parentUpdate,
              comment,
              parentComment,
              isComment: true,
              isSubComment,
              isUpdate: !!comment.parentUpdate,
            })
          }
        />
        <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>
          {comment.commentsCount <= 0 ? null : comment.commentsCount}
        </Text>
      </View>
      <View style={styles.button}>
        <Heart liked={likedByMe} onPress={() => handleLike()} />
        <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{likesCount <= 0 ? null : likesCount}</Text>
      </View>
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

export default CommentFooter;

// {
//   showDetails ? (
//     <>
//       <View style={styles.date}>
//         <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{formatedDate}</Text>
//       </View>
//       <View style={styles.likesRow}>
//         <View style={{ flexDirection: 'row' }}>
//           {!!comment.likesCount && (
//             <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{comment.likesCount} Likes</Text>
//           )}
//           {!!comment.sharesCount && (
//             <Text style={{ ...defaultStyles.smallRegular, opacity: 0.6, paddingRight: 15 }}>{comment.sharesCount} Shares</Text>
//           )}
//         </View>
//         <View style={{ flexDirection: 'row' }}>
//           <View style={{ paddingLeft: 25 }}>
//             <Comment onPress={() => navigation.navigate('AddCommentModal', { post, update, isUpdate: true })} />
//           </View>
//           <View style={{ paddingLeft: 25 }}>
//             <Heart liked={comment.likedByMe} onPress={handleLike} />
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
//             <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{comment.commentsCount || ''}</Text>
//           </View>
//           <View style={styles.button}>
//             <Heart liked={comment.likedByMe} onPress={handleLike} />
//             <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>
//               {comment.likesCount === 0 ? null : comment.likesCount}
//             </Text>
//           </View>
//           <View style={styles.button}>
//             <Share onPress={() => null} />
//             <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{comment.sharesCount || ''}</Text>
//           </View>
//         </View>
//       </View>
//     )
//   );
// }
