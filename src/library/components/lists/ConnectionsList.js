import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SectionList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Section from 'library/components/UI/Section';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import MatchesGoals from 'library/components/lists/MatchesGoals';
import MatchesHats from 'library/components/lists/MatchesHats';
import MatchesForYou from 'library/components/lists/MatchesForYou';

const ConnectionsList = ({ navigation, scrollY, showRefreshing, setShowRefreshing }) => {
  const [triggerRefresh, setTriggerRefresh] = useState(1);
  // MATCHES - BASED ON GOALS
  // 1. GET YOUR GOALS (WHILE LOADING - SHOW SKELETON BOXES)
  // 2. RENDER A COMPONENT FOR EACH GOAL
  // 3. INSIDE THE COMPONENT - QUERY MATCHES (WHILE LOADING - SHOW SKELETON PROFILE PICS)

  // MATCHES - BASED ON HATS
  // 1. GET YOUR HATS (WHILE LOADING - SHOW SKELETON)
  // 2. RENDER A COMPONENT FOR EACH HAT (INVESTOR, MENTOR, FREELANCER)
  // 3. INSIDE THE COMPONENT - QUERY MATCHES

  // MATCHES - FOR YOU
  // 1. RENDER A COMPONENT THAT HOLDS THE QUERY
  // 2. INSIDE THE COMPONENT - QUERY MATCHES (WHILE LOADING - SHOW SKELETON BOXES)

  const SECTIONS = [
    {
      id: '1',
      name: 'goals',
      title: 'Based on your goals',
    },
    {
      id: '2',
      name: 'hats',
      title: 'Based on your hats',
    },
    {
      id: '3',
      name: 'more',
      title: 'More matches for you',
    },
  ];

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    // setShowRefreshing(true);
    // refetch();
    setShowRefreshing(true);
    setTriggerRefresh((prev) => prev + 1);
    setTimeout(() => {
      setShowRefreshing(false);
    }, 1500);
  };

  // RENDER
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshControl={<RefreshControl refreshing={showRefreshing} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={onRefresh}
        refreshing={showRefreshing}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: 20 }}
        style={styles.timeline}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        data={SECTIONS}
        renderItem={({ item, index }) => {
          const { name, title } = item;

          if (name === 'goals') return <MatchesGoals triggerRefresh={triggerRefresh} navigation={navigation} title={title} />;
          if (name === 'hats') return <MatchesHats triggerRefresh={triggerRefresh} navigation={navigation} title={title} />;
          if (name === 'more') return <MatchesForYou triggerRefresh={triggerRefresh} navigation={navigation} title={title} />;

          return null;
        }}
        // SectionSeparatorComponent={({ trailingSection, trailingItem }) => {
        //   if (trailingSection && !trailingItem) return <View style={{ height: 15 }} />;
        //   return null;
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    flex: 1,
    width: '100%',
  },
});

export default ConnectionsList;
