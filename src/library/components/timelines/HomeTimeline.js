import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text, Animated, RefreshControl, ActivityIndicator, SectionList, TouchableOpacity } from 'react-native';
import { useQuery, useMutation } from 'react-apollo';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import NETWORK_POSTS_QUERY from 'library/queries/NETWORK_POSTS_QUERY';
import FORYOU_POSTS_QUERY from 'library/queries/FORYOU_POSTS_QUERY';
import MYGOALS_POSTS_QUERY from 'library/queries/MYGOALS_POSTS_QUERY';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import Loader from 'library/components/UI/Loader';
import Section from 'library/components/UI/Section';
import HomeTimelineHeader from 'library/components/UI/HomeTimelineHeader';
import SeeMoreButton from 'library/components/UI/buttons/SeeMoreButton';
import StoriesHome from 'library/components/stories/StoriesHome';
import PostGroupTL from 'library/components/post/PostGroupTL';
import { UserContext } from 'library/utils/UserContext';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import VIEWED_POST_MUTATION from 'library/mutations/VIEWED_POST_MUTATION';

const HomeTimeline = ({ navigation, scrollY, paddingTop }) => {
  const currentTime = new Date();
  const homeTimelineRef = useRef();

  const [showRefreshing, setShowRefreshing] = useState(false);
  const [loadingStories, setLoadingStories] = useState(false);
  const [refetchingStories, setRefetchingStories] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(1);

  // QUERIES

  // CURRENT USER QUERY (to get network IDs)
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = dataUser;
  const getNetworkIDs = (usr) => {
    if (!usr) {
      return [];
    }
    const followingIDs = usr.following ? usr.following.map((u) => u.id) : [];
    const connectionIDs = usr.connection ? usr.connections.map((u) => u.id) : [];
    return [...followingIDs, ...connectionIDs];
  };
  const network = getNetworkIDs(userLoggedIn);

  // compile a list of the users favorite topics
  let favoritesList = [];
  if (userLoggedIn) {
    if (userLoggedIn.topicsFocus.length > 0) {
      favoritesList = [...userLoggedIn.topicsFocus];
    }
    if (userLoggedIn.topicsInterest.length > 0) {
      if (favoritesList === []) {
        favoritesList = [...userLoggedIn.topicsInterest];
      } else {
        // only add topics that dont already exist
        userLoggedIn.topicsInterest.forEach((topic) => {
          if (favoritesList.findIndex((fav) => fav.topicID === topic.topicID) === -1) {
            favoritesList = [...favoritesList, topic];
          }
        });
      }
    }
  }

  // GET POSTS "FOR YOU"
  const {
    error: errorPostsForYou,
    data: dataPostsForYou,
    refetch: refetchPostsForYou,
    fetchMore: fetchMorePostsForYou,
    networkStatus: networkStatusPostsForYou,
  } = useQuery(FORYOU_POSTS_QUERY, {
    variables: {
      first: 10,
      network,
    },
    onError: (e) => console.log('error loading for you posts', e),
    notifyOnNetworkStatusChange: true,
  });

  // GET POSTS FROM "FOLLOWING"
  const {
    error: errorPostsNetwork,
    data: dataPostsNetwork,
    refetch: refetchPostsNetwork,
    fetchMore: fetchMorePostsNetwork,
    networkStatus: networkStatusPostsNetwork,
  } = useQuery(NETWORK_POSTS_QUERY, {
    variables: {
      first: 10,
      network,
    },
    onError: (e) => console.log('error loading newtork posts', e),
    notifyOnNetworkStatusChange: true,
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
      first: 10,
    },
    onError: (e) => console.log('error loading my goals posts', e),
    notifyOnNetworkStatusChange: true,
  });

  // VIEWED POST MUTATION
  const [viewedPost] = useMutation(VIEWED_POST_MUTATION);

  useQuery(STORIES_HOME_QUERY);

  // networkStatus states:
  // 1: loading
  // 3: fetchMore
  // 4: refetch
  // 7: no loading, no refetch, everything OK!

  // LOADING STATES
  // network
  const refetchingPostsNetwork = networkStatusPostsNetwork === 4;
  const fetchingMorePostsNetwork = networkStatusPostsNetwork === 3;
  const loadingPostsNetwork = networkStatusPostsNetwork === 1;

  // for you
  const refetchingPostsForYou = networkStatusPostsForYou === 4;
  const fetchingMorePostsForYou = networkStatusPostsForYou === 3;
  const loadingPostsForYou = networkStatusPostsForYou === 1;

  // my goals
  const refetchingPostsMyGoals = networkStatusPostsMyGoals === 4;
  const fetchingMorePostsMyGoals = networkStatusPostsMyGoals === 3;
  const loadingPostsMyGoals = networkStatusPostsMyGoals === 1;

  const refetching = refetchingPostsNetwork || refetchingPostsForYou || refetchingPostsMyGoals;
  const loading = loadingPostsNetwork || loadingPostsForYou || loadingPostsMyGoals;

  // UPDATE showRefreshing BASED ON QUERY LOADING STATES
  useEffect(() => {
    if (refetching) {
      setShowRefreshing(true);
    } else if (showRefreshing) {
      setShowRefreshing(false);
    }
  }, [refetching]);

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

  const postsForYou = dataPostsForYou ? dataPostsForYou.postsForYou.edges : [];
  const postsNetwork = dataPostsNetwork ? dataPostsNetwork.postsNetwork.edges : [];
  const postsMyGoals = dataPostsMyGoals ? dataPostsMyGoals.postsMyGoals.edges : [];

  // decide which posts to show based on the timeline selected
  let postsToShow = [];
  if (activeTimeline === 0) postsToShow = [...postsForYou];
  if (activeTimeline === 1) postsToShow = [...postsNetwork];
  if (activeTimeline === 2) postsToShow = [...postsMyGoals];

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    setShowRefreshing(true);
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
            userLoggedIn={userLoggedIn}
            refetching={refetching}
            setLoadingStories={setLoadingStories}
            setRefetchingStories={setRefetchingStories}
            favoritesList={favoritesList}
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
        renderSectionFooter={({ section }) => {
          if (activeTimeline === 0 && dataPostsForYou.postsForYou.pageInfo.hasNextPage) {
            return <SeeMoreButton onPress={fetchMorePostsForYou} loading={fetchingMorePostsForYou} />;
          }
          if (activeTimeline === 1 && dataPostsNetwork.postsNetwork.pageInfo.hasNextPage) {
            return <SeeMoreButton onPress={fetchMorePostsNetwork} loading={fetchingMorePostsNetwork} />;
          }
          if (activeTimeline === 2 && dataPostsMyGoals.postsMyGoals.pageInfo.hasNextPage) {
            return <SeeMoreButton onPress={fetchMorePostsMyGoals} loading={fetchingMorePostsMyGoals} />;
          }

          return <View style={{ height: 15 }} />;
        }}
        renderItem={({ item, section }) => {
          return <PostGroupTL post={item.node} currentTime={currentTime} navigation={navigation} />;
        }}
        viewabilityConfig={{
          minimumViewTime: 100,
          waitForInteraction: false,
          itemVisiblePercentThreshold: 75,
        }}
        onViewableItemsChanged={({ viewableItems, changed }) => {
          if (changed.length > 0) {
            changed.forEach(({ index, isViewable, item }) => {
              if (index >= 0 && isViewable && item.node) {
                if (typeof item.node === 'object' && item.node.id) {
                  console.log('submitting view for ', item.node.id);
                  viewedPost({ variables: { postId: item.node.id } });
                }
              }
            });
          }
        }}
        onEndReachedThreshold={1.2}
        onEndReached={(info) => {
          // console.log('onEndReached triggered', info);
          // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment

          if (activeTimeline === 0 && dataPostsForYou) {
            if (
              dataPostsForYou.postsForYou.pageInfo.hasNextPage &&
              networkStatusPostsForYou === 7 &&
              info.distanceFromEnd > -300
            ) {
              fetchMorePostsForYou({
                query: FORYOU_POSTS_QUERY,
                variables: {
                  cursor: dataPostsForYou.postsForYou.pageInfo.endCursor,
                  first: 10,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  const newEdges = fetchMoreResult.postsForYou.edges;
                  const { pageInfo } = fetchMoreResult.postsForYou;

                  return newEdges.length
                    ? {
                        postsForYou: {
                          __typename: previousResult.postsForYou.__typename,
                          edges: [...previousResult.postsForYou.edges, ...newEdges],
                          pageInfo,
                        },
                      }
                    : previousResult;
                },
              });
            }
          } else if (activeTimeline === 1 && dataPostsNetwork) {
            if (
              dataPostsNetwork.postsNetwork.pageInfo.hasNextPage &&
              networkStatusPostsNetwork === 7 &&
              info.distanceFromEnd > -300
            ) {
              fetchMorePostsNetwork({
                query: NETWORK_POSTS_QUERY,
                variables: {
                  cursor: dataPostsNetwork.postsNetwork.pageInfo.endCursor,
                  first: 10,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  const newEdges = fetchMoreResult.postsNetwork.edges;
                  const { pageInfo } = fetchMoreResult.postsNetwork;

                  return newEdges.length
                    ? {
                        postsNetwork: {
                          __typename: previousResult.postsNetwork.__typename,
                          edges: [...previousResult.postsNetwork.edges, ...newEdges],
                          pageInfo,
                        },
                      }
                    : previousResult;
                },
              });
            }
          } else if (activeTimeline === 2 && dataPostsMyGoals) {
            if (
              dataPostsMyGoals.postsMyGoals.pageInfo.hasNextPage &&
              networkStatusPostsMyGoals === 7 &&
              info.distanceFromEnd > -300
            ) {
              fetchMorePostsMyGoals({
                query: MYGOALS_POSTS_QUERY,
                variables: {
                  cursor: dataPostsMyGoals.postsMyGoals.pageInfo.endCursor,
                  first: 10,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  const newEdges = fetchMoreResult.postsMyGoals.edges;
                  const { pageInfo } = fetchMoreResult.postsMyGoals;

                  return newEdges.length
                    ? {
                        postsMyGoals: {
                          __typename: previousResult.postsMyGoals.__typename,
                          edges: [...previousResult.postsMyGoals.edges, ...newEdges],
                          pageInfo,
                        },
                      }
                    : previousResult;
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
