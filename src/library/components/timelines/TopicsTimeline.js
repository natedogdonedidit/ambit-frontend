import React from 'react';
import { StyleSheet, View, Text, Animated, RefreshControl, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-apollo';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import topicQueries from 'library/queries/TOPIC_POSTS_QUERY'; // comes in as an object
import Loader from 'library/components/UI/Loader';

import PostGroupTL from 'library/components/post/PostGroupTL';

const TopicsTimeline = ({ activeTopic, activeSubTopic, navigation, scrollY, paddingTop }) => {
  const currentTime = new Date();

  // turn the topicID into a query (ALL_CAPS)
  const activeQuery = activeSubTopic.toUpperCase();

  // QUERIES
  const { loading: loadingQuery, error, data, refetch, fetchMore, networkStatus } = useQuery(topicQueries[activeQuery], {
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
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  if (!data || loading) {
    return <Loader backgroundColor={colors.lightGray} />;
  }

  const posts = data.postsTopic.edges || [];

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    refetch();
  };

  // RENDER
  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={onRefresh}
        refreshing={refetching}
        contentContainerStyle={{ paddingTop, paddingBottom: 20 }}
        style={styles.timeline}
        ListHeaderComponent={
          <View style={{ height: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
        }
        ListEmptyComponent={
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>
            Sorry, no posts yet for this topic
          </Text>
        }
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
          { useNativeDriver: true }
        )}
        data={posts}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return <PostGroupTL post={item.node} currentTime={currentTime} navigation={navigation} />;
        }}
        onEndReachedThreshold={1.2}
        onEndReached={info => {
          // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment
          if (data.postsTopic.pageInfo.hasNextPage && networkStatus === 7 && info.distanceFromEnd > -300) {
            fetchMore({
              query: activeQuery,
              variables: {
                cursor: data.postsTopic.pageInfo.endCursor,
                topic: activeTopic,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.postsTopic.edges;
                const { pageInfo } = fetchMoreResult.postsTopic;

                return newEdges.length
                  ? {
                      postsTopic: {
                        __typename: previousResult.postsTopic.__typename,
                        edges: [...previousResult.postsTopic.edges, ...newEdges],
                        pageInfo,
                      },
                    }
                  : previousResult;
              },
            });
          }
        }}
      />
      {/* This is the loading animation */}
      <Animated.View
        style={{
          position: 'absolute',
          top: -400,
          left: 0,
          width: '100%',
          height: paddingTop + 7 + 400,
          justifyContent: 'flex-end',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-800, 0],
                outputRange: [800, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <View style={{ width: '100%', height: 60 }}>
          <ActivityIndicator
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
            size="small"
            color={colors.purp}
            animating={refetching}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    backgroundColor: colors.lightGray,
    flex: 1,
    width: '100%',
  },
});

export default TopicsTimeline;
