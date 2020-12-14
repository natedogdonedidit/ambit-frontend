import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Animated, RefreshControl, ActivityIndicator, SectionList } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POSTS_FOLLOWING_QUERY from 'library/queries/POSTS_FOLLOWING_QUERY';
import POSTS_FORYOU_QUERY from 'library/queries/POSTS_FORYOU_QUERY';
import POSTS_MYGOALS_QUERY from 'library/queries/POSTS_MYGOALS_QUERY';
import Loader from 'library/components/UI/Loader';
import HomeTimelineTabs from 'library/components/UI/HomeTimelineTabs';
import StoriesHome from 'library/components/stories/StoriesHome';
import PostGroupTL from 'library/components/post/PostGroupTL';
import VIEWED_POST_MUTATION from 'library/mutations/VIEWED_POST_MUTATION';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

// networkStatus states:
// 1: loading
// 3: fetchMore
// 4: refetch
// 7: no loading, no refetch, everything OK!

const HomeTimeline = ({ navigation, scrollY, paddingTop }) => {
  // const currentTime = new Date();
  const homeTimelineRef = useRef();
  const { currentUserId, setRefreshHomeScreen } = useContext(UserContext);

  const [showRefreshing, setShowRefreshing] = useState(false);
  const [loadingStories, setLoadingStories] = useState(false);
  const [refetchingStories, setRefetchingStories] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(1);

  // GET POSTS "FOR YOU"
  const {
    error: errorPostsForYou,
    data: dataPostsForYou,
    refetch: refetchPostsForYou,
    fetchMore: fetchMorePostsForYou,
    networkStatus: networkStatusPostsForYou,
  } = useQuery(POSTS_FORYOU_QUERY, {
    variables: {
      feed: 'foryou',
      take: 10,
      // no cursor on initial query or refetch
    },
    onError: (e) => console.log('error loading for you posts', e),
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'cache-and-network', // had to do this or refetch would not update the UI (but it ruins opt response of Likes)
  });

  // GET POSTS FROM "FOLLOWING"
  const {
    error: errorPostsFollowing,
    data: dataPostsFollowing,
    refetch: refetchPostsFollowing,
    fetchMore: fetchMorePostsFollowing,
    networkStatus: networkStatusPostsFollowing,
  } = useQuery(POSTS_FOLLOWING_QUERY, {
    variables: {
      feed: 'following',
      take: 10,
      // no cursor on initial query or refetch,
    },
    onError: (e) => console.log('error loading network posts', e),
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'cache-and-network', // had to do this or refetch would not update the UI (but it ruins opt response of Likes)
  });

  // GET "MY GOALS"
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
      // no cursor on initial query or refetch,
    },
    onError: (e) => console.log('error loading my goals posts', e),
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'cache-and-network', // had to do this or refetch would not update the UI (but it ruins opt response of Likes)
  });

  // VIEWED POST MUTATION
  const [viewedPost] = useMutation(VIEWED_POST_MUTATION);

  // useQuery(STORIES_FORYOU_QUERY);

  // LOADING STATES
  const fetchingMorePostsFollowing = networkStatusPostsFollowing === 3;
  const loadingPostsNetwork = networkStatusPostsFollowing === 1;
  const refetchingPostsNetwork = loadingPostsNetwork && dataPostsFollowing; // if loading, but already have data

  // for you
  const fetchingMorePostsForYou = networkStatusPostsForYou === 3;
  const loadingPostsForYou = networkStatusPostsForYou === 1;
  const refetchingPostsForYou = loadingPostsForYou && dataPostsForYou; // if loading, but already have data

  // my goals
  const fetchingMorePostsMyGoals = networkStatusPostsMyGoals === 3;
  const loadingPostsMyGoals = networkStatusPostsMyGoals === 1;
  const refetchingPostsMyGoals = loadingPostsMyGoals && dataPostsMyGoals; // if loading, but already have data

  const refetching = refetchingPostsNetwork || refetchingPostsForYou || refetchingPostsMyGoals;
  const loading = loadingPostsNetwork || loadingPostsForYou || loadingPostsMyGoals;

  if (errorPostsForYou || errorPostsFollowing || errorPostsMyGoals) {
    console.log('ERROR LOADING POSTS:', errorPostsForYou, errorPostsFollowing, errorPostsMyGoals);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  const postsForYou = dataPostsForYou ? dataPostsForYou.postsForYou.posts : [];
  const postsFollowing = dataPostsFollowing ? dataPostsFollowing.postsFollowing.posts : [];
  const postsMyGoals = dataPostsMyGoals ? dataPostsMyGoals.postsMyGoals.posts : [];

  // decide which posts to show based on the timeline selected
  let postsToShow = [];
  if (activeTimeline === 0) postsToShow = [...postsForYou];
  if (activeTimeline === 1) postsToShow = [...postsFollowing];
  if (activeTimeline === 2) postsToShow = [...postsMyGoals];

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    console.log('refreshing home screen queries');
    // refetch for you posts
    // refetch my topic stories
    setShowRefreshing(true);
    setRefreshHomeScreen(true);
    setTimeout(() => {
      setShowRefreshing(false);
      setRefreshHomeScreen(false);
    }, 1500);
    refetchPostsFollowing();
    refetchPostsForYou();
    refetchPostsMyGoals();
  };

  // RENDER
  return (
    <View style={styles.container}>
      {/* This is the loading animation */}
      <Animated.View
        style={{
          position: 'absolute',
          top: paddingTop - 60,
          left: 0,
          width: '100%',
          height: 60,
          justifyContent: 'flex-end',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-60, 0],
                outputRange: [60, 0],
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
            // size="small"
            // color={colors.purp}
            animating={showRefreshing}
            hidesWhenStopped={false}
          />
        </View>
      </Animated.View>
      <SectionList
        ref={homeTimelineRef}
        refreshControl={<RefreshControl refreshing={showRefreshing} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={onRefresh}
        refreshing={showRefreshing}
        progressViewOffset={100}
        contentContainerStyle={{ paddingTop, paddingBottom: 20 }}
        style={styles.timeline}
        ListHeaderComponent={
          <StoriesHome
            navigation={navigation}
            refetching={showRefreshing}
            setLoadingStories={setLoadingStories}
            setRefetchingStories={setRefetchingStories}
          />
        }
        ListEmptyComponent={() => {
          if (activeTimeline === 2) {
            return (
              <>
                <HomeTimelineTabs activeTimeline={activeTimeline} setActiveTimeline={setActiveTimeline} />
                <View style={{ width: '100%', height: 400 }}>
                  {loading ? (
                    <Loader backgroundColor={colors.lightGray} size="small" full={false} active />
                  ) : (
                    <View style={{ height: 100, width: '100%', alignItems: 'center', marginVertical: 40 }}>
                      <Text style={{ ...defaultStyles.defaultText, paddingBottom: 15 }}>You don't have any goals yet!</Text>
                      <ButtonDefault onPress={() => navigation.navigate('NewPostModal', { topicsPassedIn: [] })}>
                        Create a goal
                      </ButtonDefault>
                    </View>
                  )}
                </View>
              </>
            );
          }
          return (
            <>
              <HomeTimelineTabs activeTimeline={activeTimeline} setActiveTimeline={setActiveTimeline} />
              <View style={{ width: '100%', height: 400 }}>
                {loading ? (
                  <Loader backgroundColor={colors.lightGray} size="small" full={false} active />
                ) : (
                  <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>
                    No posts were found
                  </Text>
                )}
              </View>
            </>
          );
        }}
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
        sections={
          postsToShow.length > 0
            ? [
                {
                  data: postsToShow || [],
                },
              ]
            : []
        }
        renderSectionHeader={({ section }) => (
          <HomeTimelineTabs activeTimeline={activeTimeline} setActiveTimeline={setActiveTimeline} />
        )}
        renderSectionFooter={({ section }) => {
          // SHOW LOADER IF FETCHING MORE
          if (activeTimeline === 0 && fetchingMorePostsForYou) {
            return (
              <View style={{ height: 80 }}>
                <Loader backgroundColor="transparent" size="small" full={false} active />
              </View>
            );
          }
          if (activeTimeline === 1 && fetchingMorePostsFollowing) {
            return (
              <View style={{ height: 80 }}>
                <Loader backgroundColor="transparent" size="small" full={false} active />
              </View>
            );
          }
          if (activeTimeline === 2 && fetchingMorePostsMyGoals) {
            return (
              <View style={{ height: 80 }}>
                <Loader backgroundColor="transparent" size="small" full={false} active />
              </View>
            );
          }

          return <View style={{ height: 30 }} />;
        }}
        renderItem={({ item }) => {
          // if it is the "Following" timeline - check to see if post is a re-post
          // if (activeTimeline === 1) {
          // check if the post owner is from your network
          // let showRepost = false;
          // if (item && item.owner && network && network.length > 0) {
          //   if (!network.includes(item.owner.id) && item.owner.id !== currentUserId) {
          //     showRepost = true;
          //   }
          // }
          // return <PostGroupTL post={item} navigation={navigation} showRepost={false} />;
          // }

          return <PostGroupTL post={item} navigation={navigation} />;
        }}
        // viewabilityConfig={{
        //   minimumViewTime: 100,
        //   waitForInteraction: false,
        //   itemVisiblePercentThreshold: 75,
        // }}
        // onViewableItemsChanged={({ viewableItems, changed }) => {
        //   if (changed.length > 0) {
        //     changed.forEach(({ index, isViewable, item }) => {
        //       if (index >= 0 && isViewable && item.node) {
        //         if (typeof item.node === 'object' && item.node.id) {
        //           // console.log('submitting view for ', item.node.id);
        //           viewedPost({ variables: { postId: item.node.id } });
        //         }
        //       }
        //     });
        //   }
        // }}
        onEndReachedThreshold={1.2}
        onEndReached={(info) => {
          // console.log('onEndReached triggered', info);
          // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment

          if (activeTimeline === 0 && dataPostsForYou && dataPostsForYou.postsForYou && dataPostsForYou.postsForYou.hasNextPage) {
            if (postsForYou && networkStatusPostsForYou === 7 && info.distanceFromEnd > -300) {
              const lastPost = postsForYou[postsForYou.length - 1].id;
              // console.log('fetching more For You after:', lastPost);

              fetchMorePostsForYou({
                variables: {
                  feed: 'foryou',
                  cursor: lastPost,
                  take: 10,
                },
              });
            }
          } else if (
            activeTimeline === 1 &&
            dataPostsFollowing &&
            dataPostsFollowing.postsFollowing &&
            dataPostsFollowing.postsFollowing.hasNextPage
          ) {
            if (postsFollowing && networkStatusPostsFollowing === 7 && info.distanceFromEnd > -300) {
              const lastPost = postsFollowing[postsFollowing.length - 1].id;
              // console.log('fetching more Following posts after:', lastPost);

              fetchMorePostsFollowing({
                variables: {
                  feed: 'following',
                  cursor: lastPost,
                  take: 10,
                },
              });
            }
          } else if (
            activeTimeline === 2 &&
            dataPostsMyGoals &&
            dataPostsMyGoals.postsMyGoals &&
            dataPostsMyGoals.postsMyGoals.hasNextPage
          ) {
            if (postsMyGoals && networkStatusPostsMyGoals === 7 && info.distanceFromEnd > -300) {
              const lastPost = postsMyGoals[postsMyGoals.length - 1].id;
              // console.log('fetching more My Goals posts after:', lastPost);

              fetchMorePostsMyGoals({
                variables: {
                  feed: 'mygoals',
                  cursor: lastPost,
                  take: 10,
                },
              });
            }
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
