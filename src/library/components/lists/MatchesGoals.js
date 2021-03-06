import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Section from 'library/components/UI/Section';

import POSTS_MYGOALS_QUERY from 'library/queries/POSTS_MYGOALS_QUERY';
import { isCustomGoalTest } from 'library/utils';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import { UserContext } from 'library/utils/UserContext';
import Loader from 'library/components/UI/Loader';
import { goalsList } from 'library/utils/lists';
import ActiveGoalMatchesItem from './ActiveGoalMatchesItem';

// MATCHES - BASED ON GOALS
// 1. GET YOUR GOALS (WHILE LOADING - SHOW SKELETON BOXES)
// 2. RENDER A COMPONENT FOR EACH GOAL
// 3. INSIDE THE COMPONENT - QUERY MATCHES (WHILE LOADING - SHOW SKELETON PROFILE PICS)

const MatchesGoals = ({ triggerRefresh, navigation, title }) => {
  // const { currentUserId } = useContext(UserContext);

  // GET "MY GOALS" (THIS SHOULD HAVE ALREADY BEEN CALLED ON HOMESCREEN - SO JUST PIGGY BACKING OFF THE INITIAL QUERY)
  const {
    error: errorPostsMyGoals,
    data: dataPostsMyGoals,
    refetch: refetchPostsMyGoals,
    fetchMore: fetchMorePostsMyGoals,
    networkStatus: networkStatusPostsMyGoals,
  } = useQuery(POSTS_MYGOALS_QUERY, {
    variables: {
      feed: 'mygoals',
      take: 10,
    },
    onError: (e) => console.log('error loading my goals posts', e),
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetchPostsMyGoals();
  }, [triggerRefresh]);

  // my goals
  const refetchingPostsMyGoals = networkStatusPostsMyGoals === 4;
  const fetchingMorePostsMyGoals = networkStatusPostsMyGoals === 3;
  const loadingPostsMyGoals = networkStatusPostsMyGoals === 1;

  // RENDER FUNCTIONS
  const renderRows = () => {
    // if loading my goals - render skeleton
    if (loadingPostsMyGoals || !dataPostsMyGoals) {
      return (
        <View style={{ height: 70, width: '100%' }}>
          <Loader active size="small" full={false} backgroundColor={colors.white} />
        </View>
      );
    }

    const { postsMyGoals } = dataPostsMyGoals;
    const { posts } = postsMyGoals;

    // if we have data
    if (posts.length > 0) {
      // compile a lits of only non-custom goals
      // const nonCustomGoals = posts.filter((post) => !isCustomGoalTest(post.goal));

      const activeGoals = posts.filter((post) => {
        // filter out non-active goals
        if (post.goalStatus !== 'Active') {
          return false;
        }

        // filter out goals that dont exist in goalsList (custom goals), and goals that dont get matches
        const getsMatches = goalsList.find((goal) => goal.name === post.goal && goal.getsMatches);

        if (getsMatches) {
          return true;
        }

        return false;
      });

      if (activeGoals.length > 0) {
        return activeGoals.map((post) => {
          return <ActiveGoalMatchesItem key={post.id} triggerRefresh={triggerRefresh} navigation={navigation} post={post} />;
        });
      }
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

  // if (!dataPostsMyGoals) return null;

  return (
    <View style={styles.container}>
      <Section text={title} marginTop={false} loading={refetchingPostsMyGoals} />
      {renderRows()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  createGoalMessage: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
    // marginBottom: 15,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
});

export default MatchesGoals;
