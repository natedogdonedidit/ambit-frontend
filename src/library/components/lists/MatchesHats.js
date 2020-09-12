import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Section from 'library/components/UI/Section';

import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import HatMatchesRow from 'library/components/lists/HatMatchesRow';
import TextButton from 'library/components/UI/buttons/TextButton';
import ActiveGoalMatchesItem from './ActiveGoalMatchesItem';

// MATCHES - BASED ON GOALS
// 1. GET YOUR GOALS (WHILE LOADING - SHOW SKELETON BOXES)
// 2. RENDER A COMPONENT FOR EACH GOAL
// 3. INSIDE THE COMPONENT - QUERY MATCHES (WHILE LOADING - SHOW SKELETON PROFILE PICS)

const MatchesHats = ({ navigation, title }) => {
  // GET "MY TOPICS" (THIS SHOULD HAVE ALREADY BEEN CALLED ON HOMESCREEN - SO JUST PIGGY BACKING OFF THE INITIAL QUERY)
  const { loading: loadingTopics, error, data } = useQuery(CURRENT_USER_TOPICS);

  // RENDER FUNCTIONS

  const renderRows = () => {
    // if loading my topics - render skeleton
    if (loadingTopics) {
      const skel = [0, 1];
      return (
        <>
          {skel.map((item, i) => (
            <ActiveGoalMatchesItem key={i} post={null} loadingPost />
          ))}
        </>
      );
    }

    const { myTopics } = data;

    const isFreelancer = myTopics.topicsFreelance.length > 0;
    const isMentor = myTopics.topicsMentor.length > 0;
    const isInvestor = myTopics.topicsInvest.length > 0;
    const hasHats = isFreelancer || isMentor || isInvestor;
    // const hasHats = false;

    // if we have hats
    if (hasHats) {
      return (
        <>
          {isInvestor && <HatMatchesRow navigation={navigation} hats={myTopics.topicsInvest} type="invest" />}
          {isFreelancer && <HatMatchesRow navigation={navigation} hats={myTopics.topicsFreelance} type="freelance" />}
          {isMentor && <HatMatchesRow navigation={navigation} hats={myTopics.topicsMentor} type="mentor" />}
        </>
      );
    }

    // if we have no hats
    return (
      <View style={styles.createGoalMessage}>
        <Text style={{ ...defaultStyles.largeMute, textAlign: 'center', paddingBottom: 10, paddingHorizontal: 15 }}>
          Are you open to invest, freelance, or mentor?
        </Text>
        <Text style={{ ...defaultStyles.largeMute, textAlign: 'center', paddingBottom: 20, paddingHorizontal: 15 }}>
          Select your niche markets, then we'll find opportunities just for you!
        </Text>
        <ButtonDefault onPress={() => navigation.navigate('NewPostModal', { topicsPassedIn: [] })}>My Hats</ButtonDefault>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Section
        text={title}
        marginTop
        rightComponent={<TextButton onPress={() => navigation.navigate('MyHats')}>Edit</TextButton>}
      />
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

export default MatchesHats;