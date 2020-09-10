import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Animated, RefreshControl, ActivityIndicator, SectionList, TouchableOpacity } from 'react-native';
import { useQuery, useMutation, NetworkStatus } from '@apollo/client';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import NETWORK_POSTS_QUERY from 'library/queries/NETWORK_POSTS_QUERY';
import FORYOU_POSTS_QUERY from 'library/queries/FORYOU_POSTS_QUERY';
import MYGOALS_POSTS_QUERY from 'library/queries/MYGOALS_POSTS_QUERY';
import CURRENT_USER_FOLLOWING from 'library/queries/CURRENT_USER_FOLLOWING';
import Loader from 'library/components/UI/Loader';
import Section from 'library/components/UI/Section';
import HomeTimelineHeader from 'library/components/UI/HomeTimelineHeader';
import SeeMoreButton from 'library/components/UI/buttons/SeeMoreButton';
import StoriesHome from 'library/components/stories/StoriesHome';
import PostGroupTL from 'library/components/post/PostGroupTL';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import VIEWED_POST_MUTATION from 'library/mutations/VIEWED_POST_MUTATION';
import { UserContext } from 'library/utils/UserContext';

const HomeTimeline = ({ navigation, scrollY, paddingTop }) => {
  // const currentTime = new Date();
  const homeTimelineRef = useRef();
  const { currentUserId } = useContext(UserContext);

  const [showRefreshing, setShowRefreshing] = useState(false);
  const [loadingStories, setLoadingStories] = useState(false);
  const [refetchingStories, setRefetchingStories] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(0);

  // QUERIES
  const { data: dataFollowing } = useQuery(CURRENT_USER_FOLLOWING);
  const network = useMemo(() => {
    if (dataFollowing && dataFollowing.iFollow) {
      return [...dataFollowing.iFollow];
    }

    return [];
  }, [dataFollowing]);

  // console.log(network);

  // GET POSTS "FOR YOU"
  const {
    error: errorPostsForYou,
    data: dataPostsForYou,
    refetch: refetchPostsForYou,
    fetchMore: fetchMorePostsForYou,
    networkStatus: networkStatusPostsForYou,
  } = useQuery(FORYOU_POSTS_QUERY, {
    variables: {
      // first: 10,
      orderBy: [
        {
          lastUpdated: 'desc',
        },
      ],
      where: {
        owner: {
          id: { notIn: [...network, currentUserId] },
        },
      },
    },
    onError: (e) => console.log('error loading for you posts', e),
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'cache-and-network', // had to do this or refetch would not update the UI (but it ruins opt response of Likes)
  });

  // console.log(dataPostsForYou);

  // GET POSTS FROM "FOLLOWING"
  const {
    error: errorPostsNetwork,
    data: dataPostsNetwork,
    refetch: refetchPostsNetwork,
    fetchMore: fetchMorePostsNetwork,
    networkStatus: networkStatusPostsNetwork,
  } = useQuery(NETWORK_POSTS_QUERY, {
    variables: {
      // first: 10,
      orderBy: [
        {
          lastUpdated: 'desc',
        },
      ],
      where: {
        owner: {
          id: { in: [...network, currentUserId] },
        },
      },
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
  } = useQuery(MYGOALS_POSTS_QUERY, {
    variables: {
      // first: 10,
      orderBy: [
        {
          lastUpdated: 'desc',
        },
      ],
      where: {
        AND: [
          {
            owner: {
              id: { equals: currentUserId },
            },
          },
          {
            isGoal: { equals: true },
          },
        ],
      },
    },
    onError: (e) => console.log('error loading my goals posts', e),
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'cache-and-network', // had to do this or refetch would not update the UI (but it ruins opt response of Likes)
  });

  // VIEWED POST MUTATION
  const [viewedPost] = useMutation(VIEWED_POST_MUTATION);

  // useQuery(STORIES_HOME_QUERY);

  // networkStatus states:
  // 1: loading
  // 3: fetchMore
  // 4: refetch
  // 7: no loading, no refetch, everything OK!

  // LOADING STATES
  // network
  // console.log(networkStatusPostsForYou, networkStatusPostsNetwork, networkStatusPostsMyGoals);
  // console.log('idk', NetworkStatus, NetworkStatus.refetch);
  const fetchingMorePostsNetwork = networkStatusPostsNetwork === 3;
  const loadingPostsNetwork = networkStatusPostsNetwork === 1;
  // const refetchingPostsNetwork = loadingPostsNetwork && dataPostsNetwork; // if loading, but already have data

  // for you
  const fetchingMorePostsForYou = networkStatusPostsForYou === 3;
  const loadingPostsForYou = networkStatusPostsForYou === 1;
  // const refetchingPostsForYou = loadingPostsForYou && dataPostsForYou; // if loading, but already have data

  // my goals
  const fetchingMorePostsMyGoals = networkStatusPostsMyGoals === 3;
  const loadingPostsMyGoals = networkStatusPostsMyGoals === 1;
  // const refetchingPostsMyGoals = loadingPostsMyGoals && dataPostsMyGoals; // if loading, but already have data

  // const refetching = refetchingPostsNetwork || refetchingPostsForYou || refetchingPostsMyGoals;
  const loading = loadingPostsNetwork || loadingPostsForYou || loadingPostsMyGoals;

  // UPDATE showRefreshing BASED ON QUERY LOADING STATES
  // useEffect(() => {
  //   if (refetching) {
  //     console.log('setting true');
  //     setShowRefreshing(true);
  //   } else if (!refetching) {
  //     console.log('setting false');
  //     setShowRefreshing(false);
  //   }
  // }, [refetching]);

  if (errorPostsNetwork) {
    console.log('ERROR LOADING POSTS:', errorPostsNetwork.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  // IF DOING INITIAL LOAD, SHOW LOADER UNTIL DATA COMES IN
  // if (activeTimeline === 0 && (!dataPostsForYou || loadingPostsForYou)) {
  //   return <Loader backgroundColor={colors.lightGray} size="small" />;
  // }
  // if (activeTimeline === 1 && (!dataPostsNetwork || loadingPostsNetwork)) {
  //   return <Loader backgroundColor={colors.lightGray} size="small" />;
  // }
  // if (activeTimeline === 2 && (!dataPostsMyGoals || loadingPostsMyGoals)) {
  //   return <Loader backgroundColor={colors.lightGray} size="small" />;
  // }

  const postsForYou = dataPostsForYou ? dataPostsForYou.posts : [];
  const postsNetwork = dataPostsNetwork ? dataPostsNetwork.posts : [];
  const postsMyGoals = dataPostsMyGoals ? dataPostsMyGoals.posts : [];

  // decide which posts to show based on the timeline selected
  let postsToShow = [];
  if (activeTimeline === 0) postsToShow = [...postsForYou];
  if (activeTimeline === 1) postsToShow = [...postsNetwork];
  if (activeTimeline === 2) postsToShow = [...postsMyGoals];
  // console.log('mygoals', postsMyGoals);
  // console.log('poststoshow', postsToShow);

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    console.log('refetching');
    setShowRefreshing(true);
    setTimeout(() => {
      setShowRefreshing(false);
    }, 2000);
    refetchPostsNetwork();
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
            size="small"
            color={colors.purp}
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
            network={network}
          />
        }
        ListEmptyComponent={() => {
          return (
            <>
              <HomeTimelineHeader navigation={navigation} activeTimeline={activeTimeline} setActiveTimeline={setActiveTimeline} />
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
          <HomeTimelineHeader navigation={navigation} activeTimeline={activeTimeline} setActiveTimeline={setActiveTimeline} />
        )}
        // renderSectionFooter={({ section }) => {
        //   if (activeTimeline === 0 && dataPostsForYou.postsForYou.pageInfo.hasNextPage) {
        //     return <SeeMoreButton onPress={fetchMorePostsForYou} loading={fetchingMorePostsForYou} />;
        //   }
        //   if (activeTimeline === 1 && dataPostsNetwork.postsNetwork.pageInfo.hasNextPage) {
        //     return <SeeMoreButton onPress={fetchMorePostsNetwork} loading={fetchingMorePostsNetwork} />;
        //   }
        //   if (activeTimeline === 2 && dataPostsMyGoals.postsMyGoals.pageInfo.hasNextPage) {
        //     return <SeeMoreButton onPress={fetchMorePostsMyGoals} loading={fetchingMorePostsMyGoals} />;
        //   }

        //   return <View style={{ height: 15 }} />;
        // }}
        renderItem={({ item }) => {
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
        // onEndReachedThreshold={1.2}
        // onEndReached={(info) => {
        //   // console.log('onEndReached triggered', info);
        //   // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment

        //   if (activeTimeline === 0 && dataPostsForYou) {
        //     if (dataPostsForYou.posts && networkStatusPostsForYou === 7 && info.distanceFromEnd > -300) {
        //       console.log('fetching more For You after:', dataPostsForYou.posts[dataPostsForYou.posts.length - 1].id);
        //       fetchMorePostsForYou({
        //         // query: FORYOU_POSTS_QUERY,
        //         variables: {
        //           first: 5,
        //           orderBy: [
        //             {
        //               lastUpdated: 'desc',
        //             },
        //           ],
        //           after: {
        //             id: dataPostsForYou.posts[dataPostsForYou.posts.length - 1].id,
        //           },
        //         },
        //         updateQuery: (prev, { fetchMoreResult }) => {
        //           console.log('prev', prev);
        //           console.log('fetch more result', fetchMoreResult);
        //           if (!fetchMoreResult) return prev;
        //           return { posts: [...prev.posts, ...fetchMoreResult.posts] };
        //         },
        //       });
        //     }
        //   } else if (activeTimeline === 1 && dataPostsNetwork) {
        //     if (
        //       dataPostsNetwork.postsNetwork.pageInfo.hasNextPage &&
        //       networkStatusPostsNetwork === 7 &&
        //       info.distanceFromEnd > -300
        //     ) {
        //       console.log('fetching more Network posts');
        //       fetchMorePostsNetwork({
        //         // query: NETWORK_POSTS_QUERY,
        //         variables: {
        //           cursor: dataPostsNetwork.postsNetwork.pageInfo.endCursor,
        //           first: 10,
        //         },
        //         // updateQuery: (previousResult, { fetchMoreResult }) => {
        //         //   const newEdges = fetchMoreResult.postsNetwork.edges;
        //         //   const { pageInfo } = fetchMoreResult.postsNetwork;

        //         //   return newEdges.length
        //         //     ? {
        //         //         postsNetwork: {
        //         //           __typename: previousResult.postsNetwork.__typename,
        //         //           edges: [...previousResult.postsNetwork.edges, ...newEdges],
        //         //           pageInfo,
        //         //         },
        //         //       }
        //         //     : previousResult;
        //         // },
        //       });
        //     }
        //   } else if (activeTimeline === 2 && dataPostsMyGoals) {
        //     if (
        //       dataPostsMyGoals.postsMyGoals.pageInfo.hasNextPage &&
        //       networkStatusPostsMyGoals === 7 &&
        //       info.distanceFromEnd > -300
        //     ) {
        //       console.log('fetching more My Goals');
        //       fetchMorePostsMyGoals({
        //         // query: MYGOALS_POSTS_QUERY,
        //         variables: {
        //           cursor: dataPostsMyGoals.postsMyGoals.pageInfo.endCursor,
        //           first: 10,
        //         },
        //         // updateQuery: (previousResult, { fetchMoreResult }) => {
        //         //   const newEdges = fetchMoreResult.postsMyGoals.edges;
        //         //   const { pageInfo } = fetchMoreResult.postsMyGoals;

        //         //   return newEdges.length
        //         //     ? {
        //         //         postsMyGoals: {
        //         //           __typename: previousResult.postsMyGoals.__typename,
        //         //           edges: [...previousResult.postsMyGoals.edges, ...newEdges],
        //         //           pageInfo,
        //         //         },
        //         //       }
        //         //     : previousResult;
        //         // },
        //       });
        //     }
        //   }
        // }}
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
  tasks: {
    marginTop: 15,
    width: '100%',
    // height: 120,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: 'white',
    borderTopColor: colors.borderBlack,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  task: {
    height: 60,
    borderRadius: 10,
    // backgroundColor: colors.purp,
    // backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: 'SFProDisplay-Light',
    color: 'black',
    // marginTop: 2,
    width: '100%',
    textAlign: 'center',
  },
  slideIndicator: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    marginHorizontal: 6,
  },
  xOut: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default HomeTimeline;
