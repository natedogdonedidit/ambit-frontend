import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Animated, RefreshControl, ActivityIndicator, StatusBar } from 'react-native';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { useScrollToTop } from '@react-navigation/native';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POSTS_MYGOALS_QUERY from 'library/queries/POSTS_MYGOALS_QUERY';
import Loader from 'library/components/UI/Loader';
import PostGroupTL from 'library/components/post/PostGroupTL';
import VIEWED_POST_MUTATION from 'library/mutations/VIEWED_POST_MUTATION';
import { refreshPostsForYou, refreshPostsFollowing, refreshPostsMyGoals, refreshStoriesForYou } from 'library/utils/refreshQuery';
import TimelineRefresh from './TimelineRefresh';

// networkStatus states:
// 1: loading
// 3: fetchMore
// 4: refetch
// 7: no loading, no refetch, everything OK!

const HomeTimeline = ({ navigation, scrollY, paddingTop, activeTimeline, headerValue }) => {
  const homeTimelineRef = useRef();
  useScrollToTop(homeTimelineRef);
  const client = useApolloClient();
  const { setRefreshHomeScreen, setShowNetworkActivity } = useContext(UserContext);

  // GET POSTS "FOR YOU"
  const { error, data, refetch, fetchMore, networkStatus } = useQuery(POSTS_MYGOALS_QUERY, {
    variables: {
      feed: 'mygoals',
      take: 10,
      // no cursor on initial query or refetch
    },
    onError: (e) => console.log('error loading for you posts', e),
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'cache-and-network', // had to do this or refetch would not update the UI (but it ruins opt response of Likes)
  });

  // VIEWED POST MUTATION
  const [viewedPost] = useMutation(VIEWED_POST_MUTATION);

  // THIS WILL KEEP THE SCROLL IN SYNC (BETWEEN 0 & SLIDE_HEIGHT) ACROSS ALL THE TIMELINES
  useEffect(() => {
    if (activeTimeline !== 2) {
      homeTimelineRef.current.scrollToOffset({ offset: headerValue });
    }
  }, [headerValue, activeTimeline]);

  // LOADING STATES
  const loading = networkStatus === 1;
  const fetchingMore = networkStatus === 3;
  const refetching = networkStatus === 4;

  if (error) {
    console.log('ERROR LOADING POSTS:', error);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  const posts = data ? data.postsMyGoals.posts : [];
  const hasNextPage = data ? data.postsMyGoals.hasNextPage : false;

  // CUSTOM FUNCTIONS
  const onRefresh = async () => {
    setShowNetworkActivity(true);
    await refetch();
    await refreshStoriesForYou(client);
    refreshPostsForYou(client);
    await refreshPostsFollowing(client);
    setShowNetworkActivity(false);
  };

  // RENDER
  return (
    <View style={styles.container}>
      {/* This is the absolute positioned loading animation */}
      <TimelineRefresh scrollY={scrollY} refetching={refetching} paddingTop={paddingTop} />
      <Animated.FlatList
        scrollEventThrottle={16}
        ref={homeTimelineRef}
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        contentContainerStyle={{ paddingTop, paddingBottom: 20 }}
        style={styles.timeline}
        data={posts}
        ListHeaderComponent={() => {
          if (posts && posts.length > 0) {
            return (
              <View
                style={{
                  height: 10,
                  backgroundColor: colors.lightGray,
                  borderBottomColor: colors.borderBlack,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            );
          }
          return null;
        }}
        ListEmptyComponent={() => {
          return (
            <View style={{ width: '100%', height: 400 }}>
              {loading ? (
                <View style={{ width: '100%', height: 100 }}>
                  <Loader backgroundColor={colors.lightGray} size="small" full={false} active />
                </View>
              ) : (
                <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>
                  Your goals will show here
                </Text>
              )}
            </View>
          );
        }}
        ListFooterComponent={() => {
          // SHOW LOADER IF FETCHING MORE
          if (activeTimeline === 2 && fetchingMore) {
            return (
              <View style={{ height: 80 }}>
                <Loader backgroundColor="transparent" size="small" full={false} active />
              </View>
            );
          }

          return <View style={{ height: 30 }} />;
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: activeTimeline === 2 ? scrollY : undefined,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return <PostGroupTL post={item} navigation={navigation} />;
        }}
        onEndReachedThreshold={0.5}
        onEndReached={(info) => {
          // console.log('onEndReached triggered', info);
          // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment

          if (
            activeTimeline === 2 &&
            data &&
            hasNextPage &&
            posts &&
            networkStatus === 7 &&
            info.distanceFromEnd > -300 &&
            posts.length >= 8
          ) {
            const lastPost = posts[posts.length - 1].id;
            // console.log('fetching more For You after:', lastPost);

            fetchMore({
              variables: {
                feed: 'mygoals',
                cursor: lastPost,
                take: 10,
              },
            });
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: colors.borderBlack,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.borderBlack,
    // backgroundColor: 'pink',
    position: 'relative',
  },
  timeline: {
    // backgroundColor: colors.lightGray,
    backgroundColor: 'transparent',
    // height: '100%',
    flex: 1,
    width: '100%',
  },
});

export default HomeTimeline;
