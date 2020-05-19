import React from 'react';
import { StyleSheet, View, Text, FlatList, SectionList, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ALL_CONNECTIONS_QUERY from 'library/queries/ALL_CONNECTIONS_QUERY'; // comes in as an object
import Loader from 'library/components/UI/Loader';

import Section from 'library/components/UI/Section';
import ActiveGoalMatchesItem from './ActiveGoalMatchesItem';
import SuggestedConnection from './SuggestedConnection';

const ConnectionsList = ({ navigation }) => {
  // QUERIES
  const { loading: loadingQuery, error, data, refetch, fetchMore, networkStatus } = useQuery(ALL_CONNECTIONS_QUERY, {
    // fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  // networkStatus states: 1: loadin, 3: fetchMore, 4: refetch, 7: no loading, no refetch, everything OK!
  // LOADING STATES
  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;
  const ok = networkStatus === 7;

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={{ ...styles.timeline, paddingTop: +10, paddingBottom: 20 }}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading connections</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text>Refetch</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data || loading) {
    return <Loader backgroundColor={colors.lightGray} />;
  }

  const activeGoalsWithMatches = data.allConnections.postsWithMatches || [];
  const activeGoalsWithMatchesFiltered = activeGoalsWithMatches.filter(({ matches }) => matches.length > 0);
  const matches = data.allConnections.matches || [];

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    refetch();
  };

  // RENDER
  return (
    <View style={{ flex: 1 }}>
      <SectionList
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} />}
        onRefresh={onRefresh}
        refreshing={refetching}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: 20 }}
        style={styles.timeline}
        keyExtractor={(item, index) => item + index}
        ListEmptyComponent={
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>
            Sorry, no suggested connections
          </Text>
        }
        sections={[
          {
            name: 'Goals',
            title: 'Based on your goals',
            data: activeGoalsWithMatchesFiltered,
          },
          {
            name: 'Users',
            title: 'More matches for you',
            data: matches,
          },
        ]}
        renderSectionHeader={({ section }) => {
          // only need the headers if we have content in both sections
          if (activeGoalsWithMatchesFiltered.length > 0 && matches.length > 0) {
            return <Section text={section.title} marginTop={false} />;
          }
        }}
        renderSectionFooter={({ section }) => {
          // if (section.name === 'Goals' && activeGoalsWithMatches.length <= 0) {
          //   return (
          //     <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingVertical: 30, paddingHorizontal: 15 }}>
          //       After you post a goal you'll find your matches here
          //     </Text>
          //   );
          // }

          if (section.name === 'Users' && matches.length <= 0) {
            return (
              <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingVertical: 30, paddingHorizontal: 15 }}>
                You'll find suggested people to follow here. Follow some topics so we know what you're interested in.
              </Text>
            );
          }
          return null;
        }}
        renderItem={({ item, section }) => {
          if (section.name === 'Goals') return <ActiveGoalMatchesItem item={item} navigation={navigation} />;
          if (section.name === 'Users') return <SuggestedConnection item={item} navigation={navigation} />;
          return null;
        }}
        SectionSeparatorComponent={({ trailingSection, trailingItem }) => {
          if (trailingSection && !trailingItem) return <View style={{ height: 15 }} />;
          return null;
        }}
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
