/* eslint-disable react/prop-types */

import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import EDIT_TOPICS_MUTATION from 'library/mutations/EDIT_TOPICS_MUTATION';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';

// import { MinimalUser } from 'library/queries/_fragments';
import { UserContext } from 'library/utils/UserContext';

const TopicFollowButtonMentor = ({ topicID, showX }) => {
  const { currentUserId } = useContext(UserContext);

  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  // QUERY - GET MY TOPICS
  const { data: dataTopics } = useQuery(CURRENT_USER_TOPICS);

  // MUTATIONS
  const [updateOneUser, { loading: loadingMutation, error: errorMutation }] = useMutation(EDIT_TOPICS_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
    refetchQueries: () => [{ query: CURRENT_USER_TOPICS }],
  });

  // 3 - AFTER MUTATION COMES BACK - UPDATE STATE TO MATCH CACHE
  useEffect(() => {
    if (dataTopics && dataTopics.userLoggedIn && dataTopics.userLoggedIn.topicsMentor) {
      const topicsIDonly = dataTopics.userLoggedIn.topicsMentor.map((topic) => topic.id);

      const alreadyFollowing = topicsIDonly.includes(topicID);
      setIsFollowing(alreadyFollowing);
    }
  }, [dataTopics]);

  // 2 - AFTER BUTTON PRESSED & STATE UPDATED - SEND MUTATION
  useEffect(() => {
    if (buttonPressed) {
      setButtonPressed(false);
      if (isFollowing) {
        // send follow mutation
        updateOneUser({
          variables: {
            where: { id: currentUserId }, // userLoggedIn
            data: {
              topicsMentor: { connect: [{ id: topicID }] },
            },
          },
        });
      } else {
        // send infollow mutation
        updateOneUser({
          variables: {
            where: { id: currentUserId }, // userLoggedIn
            data: {
              topicsMentor: { disconnect: [{ id: topicID }] },
            },
          },
        });
      }
    }
  }, [isFollowing]);

  // FUNCTIONS
  // 1 - BUTTON PRESSED - UPDATE STATE
  const onPressFollow = async () => {
    if (isFollowing && !loadingMutation) {
      // UNFOLLOW
      // console.log('set isFollowing to false');
      setButtonPressed(true);
      setIsFollowing(false);
    } else if (!isFollowing && !loadingMutation) {
      // FOLLOW
      // console.log('set isFollowing to true');
      setButtonPressed(true);
      setIsFollowing(true);
    }
  };

  if (showX) {
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => onPressFollow()}
        hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
      >
        <Ionicons name="md-close" size={20} color={colors.iconGray} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={() => onPressFollow()} activeOpacity={0.7}>
      <View style={isFollowing ? styles.buttonActiveSmall : styles.buttonSmall}>
        <Text style={{ ...defaultStyles.followButton, color: isFollowing ? colors.white : colors.black }}>
          {isFollowing ? 'Added' : 'Add'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // small version // row
  buttonSmall: {
    // paddingHorizontal: 8,
    height: 34,
    width: 68,
    borderRadius: 17,
    backgroundColor: colors.grayButton,
    justifyContent: 'center',
    alignItems: 'center',
    // ...defaultStyles.shadowButton,
  },
  buttonActiveSmall: {
    // paddingHorizontal: 8,
    height: 34,
    width: 68,
    borderRadius: 17,
    backgroundColor: colors.purp,
    justifyContent: 'center',
    alignItems: 'center',
    // ...defaultStyles.shadowButton,
  },
});

export default TopicFollowButtonMentor;
