/* eslint-disable react/prop-types */

import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import FOLLOW_MUTATION from 'library/mutations/FOLLOW_MUTATION';
import UNFOLLOW_MUTATION from 'library/mutations/UNFOLLOW_MUTATION';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import SINGLE_USER_BASIC from 'library/queries/SINGLE_USER_BASIC';

const FollowButton = ({ userToFollow, setFollowersCount, small = false }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  // MUTATIONS - follow, connect
  const [followUser, { loading: loadingFollow }] = useMutation(FOLLOW_MUTATION, {
    // refetchQueries: () => [{ query: CURRENT_USER_QUERY }, { query: SINGLE_USER_BASIC, variables: { id: userToFollow.id } }],
    refetchQueries: () => [{ query: SINGLE_USER_BASIC, variables: { id: userToFollow.id } }],
    onError: () => null,
  });

  const [unfollowUser, { loading: loadingUnfollow }] = useMutation(UNFOLLOW_MUTATION, {
    // refetchQueries: () => [{ query: CURRENT_USER_QUERY }, { query: SINGLE_USER_BASIC, variables: { id: userToFollow.id } }],
    refetchQueries: () => [{ query: SINGLE_USER_BASIC, variables: { id: userToFollow.id } }],
    onError: () => null,
  });

  // QUERY - need this to know if we're following this user or not
  const { data, loadingUser, errorUser } = useQuery(CURRENT_USER_QUERY);

  // syncs isFollowing with cache (should only update once because cache-only)
  useEffect(() => {
    if (data && data.userLoggedIn && data.userLoggedIn.following) {
      const alreadyFollowingInd = userLoggedIn.following.findIndex((u) => u.id === userToFollow.id);
      const alreadyFollowing = alreadyFollowingInd >= 0;
      // console.log('set isFollowing to::', alreadyFollowing);
      setIsFollowing(alreadyFollowing);
    }
  }, [data]);

  // sends the mutation AFTER button pressed and state updated
  useEffect(() => {
    if (buttonPressed) {
      setButtonPressed(false);
      if (isFollowing) {
        // send follow mutation
        // console.log('sending follow mutation');
        followMutation();
      } else {
        // send infollow mutation
        // console.log('sending unfollow mutation');
        unfollowMutation();
      }
    }
  }, [isFollowing]);

  const followMutation = async () => {
    // create new following array with new user in it
    // const newFollowing = [{ __typename: 'User', ...userToFollow }, ...data.userLoggedIn.following];

    followUser({
      variables: { userID: userToFollow.id },
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   followUser: {
      //     __typename: 'User',
      //     ...data.userLoggedIn,
      //     following: newFollowing,
      //   },
      // },
      // update: (proxy, { data: dataReturned }) => {
      //   proxy.writeQuery({
      //     query: CURRENT_USER_QUERY,
      //     data: {
      //       userLoggedIn: dataReturned.followUser,
      //     },
      //   });
      // },
    });
  };

  const unfollowMutation = async () => {
    // create new array
    // const newFollowing = [...data.userLoggedIn.following];
    // find the index of the user we are unfollowing
    // const alreadyFollowingInd = userLoggedIn.following.findIndex((u) => u.id === userToFollow.id);
    // remove user from array
    // newFollowing.splice(alreadyFollowingInd, 1);

    unfollowUser({
      variables: { userID: userToFollow.id },
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   unfollowUser: {
      //     __typename: 'User',
      //     ...data.userLoggedIn,
      //     following: newFollowing,
      //   },
      // },
      // update: (proxy, { data: dataReturned }) => {
      //   proxy.writeQuery({
      //     query: CURRENT_USER_QUERY,
      //     data: {
      //       userLoggedIn: dataReturned.unfollowUser,
      //     },
      //   });
      // },
    });
  };

  // FUNCTIONS
  const onPressFollow = async () => {
    // UNFOLLOW
    if (isFollowing && !loadingUnfollow) {
      // console.log('set isFollowing to false');
      setButtonPressed(true);
      setIsFollowing(false);

      // if we're givin the set function from Profile, subtract one from the followersCount
      if (setFollowersCount) {
        setFollowersCount((prev) => Math.max(prev - 1, 0)); // mininum of 0
      }

      // requestAnimationFrame(() => {
      //   unfollowMutation();
      // });
      // FOLLOW
    } else if (!isFollowing && !loadingFollow) {
      // console.log('set isFollowing to true');
      setButtonPressed(true);
      setIsFollowing(true);

      // if we're givin the set function from Profile, add one to the followersCount
      if (setFollowersCount) {
        setFollowersCount((prev) => prev + 1);
      }

      setButtonPressed(true);
      // requestAnimationFrame(() => {
      //   followMutation();
      // });
    }
  };

  // RENDER FUNCTIONS
  if (loadingUser || errorUser) {
    return null;
  }

  const { userLoggedIn } = data;

  if (!userLoggedIn || !userLoggedIn.following) {
    return null;
  }

  if (small) {
    return (
      <TouchableOpacity onPress={() => requestAnimationFrame(onPressFollow)} activeOpacity={0.5}>
        <View style={isFollowing ? styles.buttonActiveSmall : styles.buttonSmall}>
          <Text style={{ ...defaultStyles.smallSemibold, color: isFollowing ? colors.white : colors.white }}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={() => requestAnimationFrame(onPressFollow)} activeOpacity={0.5}>
      <View style={isFollowing ? styles.buttonActive : styles.button}>
        <Text style={{ ...defaultStyles.defaultMedium, color: isFollowing ? colors.black : colors.white }}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    borderRadius: 15,
    height: 34,
    paddingHorizontal: 15,
    // ...defaultStyles.shadowButton,
  },
  buttonActive: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayButton,
    borderRadius: 15,
    height: 34,
    paddingHorizontal: 14,
    // ...defaultStyles.shadowButton,
  },

  // small version
  buttonSmall: {
    paddingHorizontal: 8,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.purp,
    justifyContent: 'center',
    alignItems: 'center',
    ...defaultStyles.shadowButton,
  },
  buttonActiveSmall: {
    paddingHorizontal: 8,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    ...defaultStyles.shadowButton,
  },
});

export default FollowButton;
