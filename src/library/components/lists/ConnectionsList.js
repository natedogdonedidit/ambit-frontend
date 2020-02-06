import React from 'react';
import { StyleSheet, View, Text, FlatList, SectionList, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ALL_CONNECTIONS_QUERY from 'library/queries/ALL_CONNECTIONS_QUERY'; // comes in as an object
import Loader from 'library/components/UI/Loader';

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
  const matches = data.allConnections.matches || [];
  // console.log(users);

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
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 20 }}
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
            data: activeGoalsWithMatches,
          },
          {
            name: 'Users',
            title: 'Based on your topics',
            data: matches,
          },
        ]}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={defaultStyles.hugeHeavy}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item, section }) => {
          if (section.name === 'Goals') return <ActiveGoalMatchesItem item={item} navigation={navigation} />;
          if (section.name === 'Users') return <SuggestedConnection item={item} navigation={navigation} />;
          return null;
        }}
        SectionSeparatorComponent={({ trailingSection, trailingItem }) => {
          if (trailingSection && !trailingItem) return <View style={{ height: 8 }} />;
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
  sectionHeader: {
    // marginTop: 8,
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
});

export default ConnectionsList;
