/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import EDIT_FOLLOWING_MUTATION from 'library/mutations/EDIT_FOLLOWING_MUTATION';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import SINGLE_USER_BASIC from 'library/queries/SINGLE_USER_BASIC';

const FollowButton = ({ userLoggedIn, userToFollow, followersCount, setFollowersCount }) => {
  const [following, setFollowing] = useState(userLoggedIn.following || []);

  const isFollowingInd = following.findIndex(u => u.id === userToFollow.id);
  const isFollowing = isFollowingInd >= 0;

  useEffect(() => {
    setFollowing(userLoggedIn.following);
  }, [userLoggedIn.following]);

  // MUTATIONS - follow, connect
  const [editFollowing, { loading: loadingFollow }] = useMutation(EDIT_FOLLOWING_MUTATION, {
    variables: {
      userID: userToFollow.id,
      newFollow: !isFollowing,
    },
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }, { query: SINGLE_USER_BASIC, variables: { id: userToFollow.id } }],
    onError: e => {
      console.log(e);
      Alert.alert('Oh no!', 'An error occured when trying to follow this user. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  const handleFollowClick = () => {
    if (!loadingFollow) {
      editFollowing();

      if (isFollowing) {
        setFollowersCount(followersCount - 1);
        const newFollowingArray = [...following];
        newFollowingArray.splice(1, isFollowingInd);
        setFollowing([...newFollowingArray]);
      } else {
        setFollowersCount(followersCount + 1);
        setFollowing([...following, { id: userToFollow.id }]);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleFollowClick} activeOpacity={0.5}>
      <View style={isFollowing ? styles.buttonActive : styles.button}>
        <Text style={{ ...defaultStyles.defaultMedium, color: isFollowing ? colors.white : colors.black }}>
          {isFollowing ? 'Following' : 'Follow'}
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
    // borderWidth: 1,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.black,
    borderRadius: 18,
    height: 36,
    // width: 160,
    width: '100%',
    // ...defaultStyles.shadowButton,
  },
  buttonActive: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blueGray,
    borderRadius: 18,
    height: 36,
    // width: 160,
    width: '100%',
    // ...defaultStyles.shadowButton,
  },
});

export default FollowButton;
