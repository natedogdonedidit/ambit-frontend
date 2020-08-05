import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Section from 'library/components/UI/Section';

import MYGOALS_POSTS_QUERY from 'library/queries/MYGOALS_POSTS_QUERY';
import { isCustomGoalTest } from 'library/utils';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import ActiveGoalMatchesItem from './ActiveGoalMatchesItem';

// MATCHES - BASED ON GOALS
// 1. GET YOUR GOALS (WHILE LOADING - SHOW SKELETON BOXES)
// 2. RENDER A COMPONENT FOR EACH GOAL
// 3. INSIDE THE COMPONENT - QUERY MATCHES (WHILE LOADING - SHOW SKELETON PROFILE PICS)

const MatchesGoals = ({ navigation, title }) => {
  // GET "MY GOALS" (THIS SHOULD HAVE ALREADY BEEN CALLED ON HOMESCREEN - SO JUST PIGGY BACKING OFF THE INITIAL QUERY)
  const {
    error: errorPostsMyGoals,
    data: dataPostsMyGoals,
    refetch: refetchPostsMyGoals,
    fetchMore: fetchMorePostsMyGoals,
    networkStatus: networkStatusPostsMyGoals,
  } = useQuery(MYGOALS_POSTS_QUERY, {
    variables: {
      first: 10,
    },
    onError: (e) => console.log('error loading my goals posts', e),
    notifyOnNetworkStatusChange: true,
  });

  // my goals
  const refetchingPostsMyGoals = networkStatusPostsMyGoals === 4;
  const fetchingMorePostsMyGoals = networkStatusPostsMyGoals === 3;
  const loadingPostsMyGoals = networkStatusPostsMyGoals === 1;

  // RENDER FUNCTIONS

  const renderRows = () => {
    // if loading my goals - render skeleton
    if (loadingPostsMyGoals) {
      const skel = [0, 1];
      return (
        <>
          {skel.map((item, i) => (
            <ActiveGoalMatchesItem key={i} post={null} loadingPost />
          ))}
        </>
      );
    }

    const { postsMyGoals } = dataPostsMyGoals;
    // const postsMyGoals = { edges: [] };

    // if we have data
    if (postsMyGoals.edges.length > 0) {
      return (
        <>
          {postsMyGoals.edges.map((post, i) => {
            const isCustomGoal = isCustomGoalTest(post.node.goal);
            if (!isCustomGoal) {
              return <ActiveGoalMatchesItem key={i} navigation={navigation} post={post.node} />;
            }
            return null;
          })}
        </>
      );
    }

    // if we have no goals
    return (
      <View style={styles.createGoalMessage}>
        <Text style={{ ...defaultStyles.largeMute, textAlign: 'center', paddingBottom: 10, paddingHorizontal: 15 }}>
          Create a goal and find your matches here
        </Text>
        <ButtonDefault onPress={() => navigation.navigate('NewPostModal', { topicsPassedIn: [] })}>Create a goal</ButtonDefault>
      </View>
    );
  };

  if (!dataPostsMyGoals) return null;

  return (
    <View style={styles.container}>
      <Section text={title} marginTop={false} />
      {renderRows()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  createGoalMessage: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 15,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
});

export default MatchesGoals;
