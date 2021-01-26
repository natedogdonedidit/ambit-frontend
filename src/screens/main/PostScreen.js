import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, Text } from 'react-native';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBackLoader from 'library/components/headers/HeaderBackLoader';
import HeaderBack from 'library/components/headers/HeaderBack';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import POST_MATCHES_QUERY from 'library/queries/POST_MATCHES_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import PostComments from 'library/components/post/PostComments';
import PostUpdates from 'library/components/post/PostUpdates';
import Post from 'library/components/post/Post';
import Popover from 'library/components/UI/Popover';
import { isCustomGoalTest } from 'library/utils';

import { UserContext } from 'library/utils/UserContext';
import UPDATE_POST_MUTATION from 'library/mutations/UPDATE_POST_MUTATION';
import { BasicPost } from 'library/queries/_fragments';
import { DAYS_TILL_INACTIVE, DAYS_TILL_INACTIVE_NOTIFY } from 'styles/constants';

const PostScreen = ({ navigation, route }) => {
  // ROUTE PARAMS
  const { post: postToQuery } = route.params; // all the data from parent post down to updates

  if (!postToQuery) {
    navigation.goBack();
    return null;
  }

  const [hidePopover, setHidePopover] = useState(false);

  // HOOKS
  const currentTime = new Date();
  const { currentUserId } = useContext(UserContext);

  // MUTATION
  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to update this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const [getMatches, { loading: loadingMatches, data: dataMatches }] = useLazyQuery(POST_MATCHES_QUERY, {
    variables: { postId: postToQuery.id },
  });

  const matches = dataMatches ? dataMatches.singlePostMatches : [];

  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { where: { id: postToQuery.id } },
  });

  // decide if we should run matches query
  useEffect(() => {
    // if post loaded
    if (data && data.post) {
      // if it is my post, and a goal
      if (post.owner.id === currentUserId && !!post.goal) {
        const isCustomGoal = isCustomGoalTest(post.goal);
        // if not custom goal
        if (!isCustomGoal) {
          getMatches();
        }
      }
    }
  }, [data]);

  if (error) {
    navigation.goBack();
    // console.log(error);
    Alert.alert('Oh no!', 'An error occured when trying to load this post. Try again later!', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title={postToQuery.goal ? 'Goal' : 'Post'} />
        <Loader size="small" loading={loading} full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }

  const post = data ? data.post || null : null;

  if (!post) {
    navigation.goBack();
    return null;
  }

  const isMyPost = post.owner.id === currentUserId;
  const isCustomGoal = isCustomGoalTest(post.goal);
  const showMatches = isMyPost && !!post.goal && !isCustomGoal; // show # of matches only if its a non-custom goal by ME

  const today = new Date();
  const daysSinceUpdated = differenceInCalendarDays(today, new Date(post.lastUpdated));
  const daysRemainingTillInactive = DAYS_TILL_INACTIVE - daysSinceUpdated;
  const isAlmostInactive = daysRemainingTillInactive < DAYS_TILL_INACTIVE_NOTIFY;

  const showPopover = isMyPost && !hidePopover && post.isGoal && post.goalStatus === 'Active' && isAlmostInactive;

  const updateLastUpdated = async () => {
    await updatePost({
      variables: {
        owner: post.owner.id,
        postID: post.id,
        post: {
          lastUpdated: new Date(),
        },
      },
    });
    setHidePopover(true);
  };

  const handlePopoverSelect = () => {
    const options = [
      {
        text: 'Add an Update',
        onPress: () => navigation.navigate('AddUpdateModal', { post }),
        // closeModal: false,
      },
      {
        text: 'Keep Active',
        onPress: () => updateLastUpdated(),
      },
    ];
    navigation.navigate('SelectorModal', { options });
  };

  // CUSTOM FUNCTIONS
  const renderPost = () => {
    return (
      <View>
        <View style={{ height: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
        <Post post={post} currentTime={currentTime} navigation={navigation} showDetails />
      </View>
    );
  };

  const decidePopoverMessage = () => {
    if (daysRemainingTillInactive > 1) {
      return (
        <Text style={{ ...defaultStyles.smallRegular, color: 'white' }}>
          {`Your goal will expire in ${daysRemainingTillInactive} days. To keep your goal active, `}
          <Text style={{ ...defaultStyles.smallSemibold, color: 'white' }}>Add an Update</Text> or select{' '}
          <Text style={{ ...defaultStyles.smallSemibold, color: 'white' }}>Keep Active</Text>.
        </Text>
      );
    }
    if (daysRemainingTillInactive === 1) {
      return (
        <Text style={{ ...defaultStyles.smallRegular, color: 'white' }}>
          Your goal will expire in 1 day. To keep your goal active,{' '}
          <Text style={{ ...defaultStyles.smallSemibold, color: 'white' }}>Add an Update</Text> or select{' '}
          <Text style={{ ...defaultStyles.smallSemibold, color: 'white' }}>Keep Active</Text>.
        </Text>
      );
    }
    return (
      <Text style={{ ...defaultStyles.smallRegular, color: 'white' }}>
        Your goal will expire today. To keep your goal active,{' '}
        <Text style={{ ...defaultStyles.smallSemibold, color: 'white' }}>Add an Update</Text> or select{' '}
        <Text style={{ ...defaultStyles.smallSemibold, color: 'white' }}>Keep Active</Text>.
      </Text>
    );
  };

  const messageComponent = decidePopoverMessage();

  return (
    <View style={styles.container}>
      <HeaderBackLoader
        navigation={navigation}
        title={post.goal ? 'Goal' : 'Post'}
        loading={loadingMatches}
        handleRight={
          showMatches && !loadingMatches
            ? () => navigation.navigate({ name: 'PostMatches', key: `PostMatches:${post.id}`, params: { post } })
            : null
        }
        textRight={showMatches && !loadingMatches ? `${matches.length} Matches` : ''}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
        {renderPost()}
        <PostUpdates navigation={navigation} post={post} currentTime={currentTime} />
        <PostComments navigation={navigation} post={post} />
      </ScrollView>
      {showPopover && <Popover onPress={handlePopoverSelect} messageComponent={messageComponent} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: colors.lightGray,
  },
});

export default PostScreen;
