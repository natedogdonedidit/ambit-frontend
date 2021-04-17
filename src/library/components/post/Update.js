import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { format } from 'date-fns';
import { useMutation, useApolloClient } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';

import ProfilePic from 'library/components/UI/ProfilePic';
import Chevron from 'library/components/UI/icons/Chevron';
import DELETE_UPDATE_MUTATION from 'library/mutations/DELETE_UPDATE_MUTATION';
import POST_COMMENTS_QUERY from 'library/queries/POST_COMMENTS_QUERY';
import { UserContext } from 'library/utils/UserContext';
import PostHeader from './PostHeader';
import Threadline from './Threadline';
import PostContent from './PostContent';
import UpdateFooter from './UpdateFooter';

function Update({
  post,
  update,
  navigation,
  showDetails = false,
  showThread = false,
  hideButtons = false,
  disableVideo = false,
  showTopBorder = false,
  lessTopPadding = false,
}) {
  // HOOKS
  const client = useApolloClient();
  const { currentUserId } = useContext(UserContext);
  const currentTime = new Date();

  // const [isLiked, setIsLiked] = useState(update.likedByMe); // this is the source of truth
  // const [likesCount, setLikesCount] = useState(update.likesCount); // this is the source of truth

  // MUTATIONS - like, share, delete

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
      navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } });
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

  // VARIABLES
  // CALCULATE THESE VARIABLES ONCE UPON RENDER - THEY SHOULD NEVER CHANGE
  const isMyPost = useMemo(() => {
    return currentUserId === post.owner.id;
  }, [post, currentUserId]);

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
    navigation.navigate('GenericPopupMenu', { options });
  };

  return (
    <View
      style={[
        { ...styles.postContainer },
        showTopBorder && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.borderBlack },
        showThread && { borderBottomWidth: 0 },
        lessTopPadding && { paddingTop: 5 },
      ]}
    >
      <View style={styles.post}>
        <View style={styles.leftColumn}>
          <ProfilePic user={post.owner} size="small" enableIntro={!disableVideo} enableStory={!disableVideo} />
          <Threadline showThread={showThread} />
        </View>
        <View style={[{ ...styles.rightColumn }, showThread && { paddingBottom: 20 }]}>
          <PostHeader user={post.owner} timeDiff={timeDiff} period={period} />
          <PostContent post={update} showDetails={showDetails} />
          <UpdateFooter
            post={post}
            update={update}
            showDetails={showDetails}
            hideButtons={hideButtons}
            formatedDate={formatedDate}
          />
          {!hideButtons && (
            <View style={{ position: 'absolute', top: -2, right: 0 }}>
              <Chevron onPress={handleMoreButton} />
            </View>
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
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderBlack,
    paddingTop: 10,
  },
  post: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  leftColumn: {
    alignItems: 'center',
    paddingLeft: 4,
    width: 76,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 10,
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
