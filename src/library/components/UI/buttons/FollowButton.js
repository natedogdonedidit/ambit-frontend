/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import EDIT_FOLLOWING_MUTATION from 'library/mutations/EDIT_FOLLOWING_MUTATION';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import SINGLE_USER_BASIC from 'library/queries/SINGLE_USER_BASIC';

const FollowButton = ({ userToFollow, setFollowersAdjustment }) => {
  const { data } = useQuery(CURRENT_USER_QUERY);

  // MUTATIONS - follow, connect
  const [editFollowing, { loading: loadingFollow }] = useMutation(EDIT_FOLLOWING_MUTATION, {
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }, { query: SINGLE_USER_BASIC, variables: { id: userToFollow.id } }],
    onError: (e) => {
      console.log(e);
      Alert.alert('Oh no!', 'An error occured when trying to follow this user. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  if (!data) {
    return null;
  }

  const { userLoggedIn } = data;

  if (!userLoggedIn) {
    return null;
  }

  if (!userLoggedIn.following) {
    return null;
  }

  const alreadyFollowingInd = userLoggedIn.following.findIndex((u) => u.id === userToFollow.id);
  const alreadyFollowing = alreadyFollowingInd >= 0;

  const handleFollowClick = () => {
    if (!loadingFollow) {
      // need to do optimistic response here for followers/following count so this button can live anywhere
      // opt reponse will update CURRENT_USER_QUERY and SINGLE_USER_BIO for userToFollow

      // create following array
      const newFollowing = [...userLoggedIn.following];
      if (alreadyFollowing) {
        // remove from array
        newFollowing.splice(alreadyFollowingInd, 1);
        if (setFollowersAdjustment) {
          setFollowersAdjustment(-1);
        }
      } else {
        // add to beginning of array
        newFollowing.unshift(userToFollow);
        if (setFollowersAdjustment) {
          setFollowersAdjustment(1);
        }
      }

      editFollowing({
        variables: {
          userID: userToFollow.id,
          newFollow: !alreadyFollowing,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          editFollowing: {
            __typename: 'User',
            ...userLoggedIn,
            following: newFollowing,
          },
        },
        update: (proxy, { data: dataReturned }) => {
          proxy.writeQuery({
            query: CURRENT_USER_QUERY,
            data: {
              userLoggedIn: dataReturned.editFollowing,
            },
          });
        },
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleFollowClick} activeOpacity={0.5}>
      <View style={alreadyFollowing ? styles.buttonActive : styles.button}>
        <Text style={{ ...defaultStyles.defaultMedium, color: alreadyFollowing ? colors.white : colors.black }}>
          {alreadyFollowing ? 'Following' : 'Follow'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayButton,
    borderRadius: 17,
    height: 34,
    paddingHorizontal: 15,
  },
  buttonActive: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    borderRadius: 17,
    height: 34,
    paddingHorizontal: 15,
  },
});

export default FollowButton;
