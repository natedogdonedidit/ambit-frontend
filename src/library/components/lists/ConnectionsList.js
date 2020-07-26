import React, { useEffect } from 'react';
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
import ALL_CONNECTIONS_QUERY from 'library/queries/ALL_CONNECTIONS_QUERY'; // comes in as an object
import Loader from 'library/components/UI/Loader';

import Section from 'library/components/UI/Section';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import ActiveGoalMatchesItem from './ActiveGoalMatchesItem';
import SuggestedConnection from './SuggestedConnection';

const ConnectionsList = ({ navigation, userLoggedIn, scrollY, showRefreshing, setShowRefreshing }) => {
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

  useEffect(() => {
    if (refetching) {
      setShowRefreshing(true);
    } else if (showRefreshing) {
      setShowRefreshing(false);
    }
  }, [refetching]);

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={{ ...styles.timeline, paddingTop: 10, paddingBottom: 20 }}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading connections</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text>Refetch</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data || loading) {
    return <Loader backgroundColor={colors.lightGray} size="small" />;
  }

  const activeGoalsWithMatches = data.allConnections.postsWithMatches || [];
  const activeGoalsWithMatchesFiltered = activeGoalsWithMatches.filter(({ matches }) => matches.length > 0);
  const matches = data.allConnections.matches || [];

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    setShowRefreshing(true);
    refetch();
  };

  // RENDER
  return (
    <View style={{ flex: 1 }}>
      <SectionList
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={onRefresh}
        refreshing={refetching}
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
            title: activeGoalsWithMatchesFiltered.length > 0 ? 'More matches for you' : 'Based on your topics',
            data: matches,
          },
        ]}
        renderSectionHeader={({ section }) => {
          // only need the headers if we have content in both sections
          if (section.name === 'Goals' && activeGoalsWithMatchesFiltered.length > 0) {
            return <Section text={section.title} marginTop={false} />;
          }

          if (section.name === 'Users' && matches.length > 0) {
            return <Section text={section.title} marginTop={false} />;
          }
        }}
        renderSectionFooter={({ section }) => {
          if (section.name === 'Goals' && activeGoalsWithMatchesFiltered.length <= 0) {
            return (
              <View style={styles.createGoalMessage}>
                <Text style={{ ...defaultStyles.largeMute, textAlign: 'center', paddingBottom: 10, paddingHorizontal: 15 }}>
                  Create a goal and find your matches here
                </Text>
                <ButtonDefault onPress={() => navigation.navigate('NewPostModal', { userLoggedIn })}>Create a goal</ButtonDefault>
              </View>
            );
          }

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
  createGoalMessage: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
});

export default ConnectionsList;
