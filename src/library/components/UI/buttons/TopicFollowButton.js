/* eslint-disable react/prop-types */

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import EDIT_TOPICS_MUTATION from 'library/mutations/EDIT_TOPICS_MUTATION';
import UNFOLLOW_MUTATION from 'library/mutations/UNFOLLOW_MUTATION';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
// import { MinimalUser } from 'library/queries/_fragments';
import { UserContext } from 'library/utils/UserContext';

const TopicFollowButton = ({ topicID, onRow = false }) => {
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
    let isCancelled = false;
    if (!isCancelled && dataTopics && dataTopics.userLoggedIn && dataTopics.userLoggedIn.topicsFocus) {
      const topicsIDonly = dataTopics.userLoggedIn.topicsFocus.map((topic) => topic.id);

      const alreadyFollowing = topicsIDonly.includes(topicID);
      setIsFollowing(alreadyFollowing);
    }
    return () => {
      isCancelled = true;
    };
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
              topicsFocus: { connect: [{ id: topicID }] },
            },
          },
        });
      } else {
        // send infollow mutation
        updateOneUser({
          variables: {
            where: { id: currentUserId }, // userLoggedIn
            data: {
              topicsFocus: { disconnect: [{ id: topicID }] },
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

  if (onRow) {
    // if (isFollowing) return null;

    return (
      <TouchableOpacity onPress={() => onPressFollow()} activeOpacity={0.7}>
        <View style={isFollowing ? styles.buttonActiveSmall : styles.buttonSmall}>
          <Text style={{ ...defaultStyles.followButton, color: isFollowing ? colors.white : colors.black }}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={() => onPressFollow()} activeOpacity={0.7}>
      <View style={isFollowing ? styles.buttonActive : styles.button}>
        {/* <View style={{ paddingRight: 6 }}>
          <Ionicons name="checkmark-outline" size={22} color={colors.purp} />
        </View> */}
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
    borderRadius: 17,
    height: 34,
    width: 100,
    // paddingHorizontal: 15,
    // ...defaultStyles.shadowButton,
  },
  buttonActive: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayButton,
    borderRadius: 17,
    height: 34,
    width: 100,
    // paddingHorizontal: 10,
    // ...defaultStyles.shadowButton,
  },

  // small version // row
  buttonSmall: {
    // paddingHorizontal: 8,
    height: 34,
    width: 82,
    borderRadius: 17,
    backgroundColor: colors.grayButton,
    justifyContent: 'center',
    alignItems: 'center',
    // ...defaultStyles.shadowButton,
  },
  buttonActiveSmall: {
    // paddingHorizontal: 8,
    height: 34,
    width: 82,
    borderRadius: 17,
    backgroundColor: colors.purp,
    justifyContent: 'center',
    alignItems: 'center',
    // ...defaultStyles.shadowButton,
  },
});

export default TopicFollowButton;
