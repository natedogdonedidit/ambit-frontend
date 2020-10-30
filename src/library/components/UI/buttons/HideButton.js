/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation, useApolloClient } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import UPDATE_POST_MUTATION from 'library/mutations/UPDATE_POST_MUTATION';
import POST_MATCHES_QUERY from 'library/queries/POST_MATCHES_QUERY';

const HideButton = ({ postId, userId, setIsHidden, selectedUser, setSelectedUser }) => {
  const client = useApolloClient();

  const [clickedOnce, setClickedOnce] = useState(false);

  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: {
      where: { id: postId },
      data: { hiddenUsers: { connect: [{ id: userId }] } },
      // refetchQueries: () => [{ query: POST_MATCHES_QUERY, variables: { postId } }],
      // onCompleted: () => {
      //   // 1. get the previous list of matches
      //   const previousMatches = client.readQuery({
      //     query: POST_MATCHES_QUERY,
      //     variables: { postId },
      //   });

      //   console.log('previous matches', previousMatches);

      //   // 2. remove the user you are hiding

      //   // 3. update the query in cache
      //   // proxy.writeQuery({
      //   //   query: POST_MATCHES_QUERY,
      //   //   variables: { postId },
      //   //   data: {
      //   //     iFollow: [...dataReturned.unfollowUser],
      //   //   },
      //   // });
      // }
    },
  });

  // clears the hide button if another user is selected
  useEffect(() => {
    if (selectedUser !== userId) {
      setClickedOnce(false);
    }
  }, [selectedUser]);

  const onPress = () => {
    // this will hide the user optimisitally until mutation completes
    setIsHidden(true);

    // run the backend mutation
    updatePost();

    // 1. get the previous list of matches
    const previousMatches = client.readQuery({
      query: POST_MATCHES_QUERY,
      variables: { postId },
    });

    if (previousMatches) {
      console.log('previous matches', previousMatches);

      // 2. remove the user you are hiding
      const newMatches = previousMatches.singlePostMatches.filter((match) => match.id !== userId);

      // 3. update the query in cache
      client.writeQuery({
        query: POST_MATCHES_QUERY,
        variables: { postId },
        data: {
          singlePostMatches: [...newMatches],
        },
      });
    }
  };

  const handleClickedOnce = () => {
    setClickedOnce(true);
    setSelectedUser(userId);
  };

  if (clickedOnce) {
    return (
      <TouchableOpacity
        style={{
          height: 22,
          width: 46,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.lightGray,
        }}
        onPress={onPress}
        activeOpacity={0.5}
        hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
      >
        <Text style={{ ...defaultStyles.smallMedium, textAlign: 'center' }}>Hide</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handleClickedOnce} activeOpacity={0.5} hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}>
      <Ionicons name="md-close" size={20} color={colors.iconGray} />
    </TouchableOpacity>
  );
};

export default HideButton;
