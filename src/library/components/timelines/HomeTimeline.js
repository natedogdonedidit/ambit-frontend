import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text, Animated, RefreshControl, ActivityIndicator, SectionList, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import NETWORK_POSTS_QUERY from 'library/queries/NETWORK_POSTS_QUERY';
import FORYOU_POSTS_QUERY from 'library/queries/FORYOU_POSTS_QUERY';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import Loader from 'library/components/UI/Loader';
import Section from 'library/components/UI/Section';
import SeeMoreButton from 'library/components/UI/buttons/SeeMoreButton';
import StoriesHome from 'library/components/stories/StoriesHome';
import PostGroupTL from 'library/components/post/PostGroupTL';
import { UserContext } from 'library/utils/UserContext';

const HomeTimeline = ({ navigation, scrollY, paddingTop }) => {
  const currentTime = new Date();
  const homeTimelineRef = useRef();

  const { creatingStory } = useContext(UserContext);

  const [showLoader, setShowLoader] = useState(false);
  const [loadingStories, setLoadingStories] = useState(false);
  const [refetchingStories, setRefetchingStories] = useState(false);

  useEffect(() => {
    if (creatingStory) {
      console.log('refreshing');
      onRefresh();
    }
  }, [creatingStory]);

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = dataUser;
  const getNetworkIDs = usr => {
    if (!usr) {
      return [];
    }
    const followingIDs = usr.following ? usr.following.map(u => u.id) : [];
    const connectionIDs = usr.connection ? usr.connections.map(u => u.id) : [];
    return [...followingIDs, ...connectionIDs];
  };
  const network = getNetworkIDs(userLoggedIn);

  const {
    error: errorPostsNetwork,
    data: dataPostsNetwork,
    refetch: refetchPostsNetwork,
    fetchMore: fetchMorePostsNetwork,
    networkStatus: networkStatusPostsNetwork,
  } = useQuery(NETWORK_POSTS_QUERY, {
    variables: {
      first: 6,
      network,
    },
    onError: e => console.log('error loading newtork posts', e),
    notifyOnNetworkStatusChange: true,
  });

  const {
    error: errorPostsForYou,
    data: dataPostsForYou,
    refetch: refetchPostsForYou,
    fetchMore: fetchMorePostsForYou,
    networkStatus: networkStatusPostsForYou,
  } = useQuery(FORYOU_POSTS_QUERY, {
    variables: {
      first: 5,
    },
    onError: e => console.log('error loading for you posts', e),
    notifyOnNetworkStatusChange: true,
  });

  // networkStatus states:
  // 1: loading
  // 3: fetchMore
  // 4: refetch
  // 7: no loading, no refetch, everything OK!

  // LOADING STATES

  const refetchingPostsNetwork = networkStatusPostsNetwork === 4;
  const fetchingMorePostsNetwork = networkStatusPostsNetwork === 3;
  const loadingPostsNetwork = networkStatusPostsNetwork === 1;

  const refetchingPostsForYou = networkStatusPostsForYou === 4;
  const fetchingMorePostsForYou = networkStatusPostsForYou === 3;
  const loadingPostsForYou = networkStatusPostsForYou === 1;

  useEffect(() => {
    // console.log('in effect', creatingStory);

    // this doesnt work
    if (
      refetchingPostsNetwork ||
      refetchingPostsForYou ||
      loadingPostsNetwork ||
      loadingPostsForYou ||
      loadingStories ||
      refetchingStories ||
      creatingStory
    ) {
      // console.log('starting loader');
      setShowLoader(true);
    } else if (showLoader) {
      // console.log('stopping loader');
      setShowLoader(false);
    }
  }, [
    refetchingPostsNetwork,
    refetchingPostsForYou,
    loadingPostsNetwork,
    loadingPostsForYou,
    loadingStories,
    refetchingStories,
    creatingStory,
  ]);

  const refetching = refetchingPostsNetwork || refetchingPostsForYou || creatingStory;

  if (errorPostsNetwork) {
    console.log('ERROR LOADING POSTS:', errorPostsNetwork.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  if (!dataPostsNetwork || loadingPostsNetwork || !dataPostsForYou || loadingPostsForYou) {
    return <Loader backgroundColor={colors.lightGray} size="small" />;
  }

  const postsNetwork = dataPostsNetwork.postsNetwork.edges || [];
  const postsForYou = dataPostsForYou.postsForYou.edges || [];

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    // console.log('running refetch');
    setShowLoader(true);
    refetchPostsNetwork();
    refetchPostsForYou();
  };

  const fetchMorePostsNetworkMethod = () => {
    fetchMorePostsNetwork({
      query: NETWORK_POSTS_QUERY,
      variables: {
        cursor: dataPostsNetwork.postsNetwork.pageInfo.endCursor,
        first: 12,
        network,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        // console.log('prev', previousResult);
        // console.log('fetched', fetchMoreResult);

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
  };

  // console.log(showLoader);
  const newShowLoader = showLoader || creatingStory;
  // console.log(newShowLoader);
  // RENDER
  return (
    <View style={styles.container}>
      <SectionList
        ref={homeTimelineRef}
        refreshControl={<RefreshControl refreshing={newShowLoader} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={onRefresh}
        refreshing={newShowLoader}
        progressViewOffset={100}
        contentContainerStyle={{ paddingTop, paddingBottom: 20 }}
        style={styles.timeline}
        // ItemSeparatorComponent={() => (
        //   <View style={{ height: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
        // )}
        ListHeaderComponent={
          <StoriesHome
            navigation={navigation}
            refetching={refetching}
            setLoadingStories={setLoadingStories}
            setRefetchingStories={setRefetchingStories}
          />
        }
        ListEmptyComponent={
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>
            Sorry, no posts to display at this time
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
          ]
          // { useNativeDriver: true }
        )}
        keyExtractor={(item, index) => item + index}
        sections={[
          {
            name: 'Network',
            title: 'People you follow',
            data: postsNetwork,
          },
          {
            name: 'For You',
            title: 'For You',
            data: postsForYou,
          },
        ]}
        renderSectionHeader={({ section }) => {
          if (section.name === 'Network' && postsNetwork.length > 0) return <Section text={section.title} marginTop={false} />;
          if (section.name === 'For You' && postsForYou.length > 0)
            return (
              <Section
                text={section.title}
                marginTop={false}
                rightComponent={
                  <TouchableOpacity onPress={() => navigation.navigate('ForYouSettingsPopup')}>
                    <Feather name="settings" size={18} color={colors.blueGray} style={{ paddingLeft: 2 }} />
                  </TouchableOpacity>
                }
              />
            );
          return null;
        }}
        renderSectionFooter={({ section }) => {
          if (section.name === 'Network' && dataPostsNetwork.postsNetwork.pageInfo.hasNextPage) {
            return <SeeMoreButton onPress={fetchMorePostsNetworkMethod} loading={fetchingMorePostsNetwork} />;
          }

          if (section.name === 'For You' && fetchingMorePostsForYou) {
            return (
              <View style={{ width: '100%', height: 50, marginBottom: 15 }}>
                <Loader loading={fetchingMorePostsForYou} size="small" />
              </View>
            );
          }

          return <View style={{ height: 15 }} />;
        }}
        renderItem={({ item, section }) => {
          if (section.name === 'Network')
            return <PostGroupTL post={item.node} currentTime={currentTime} navigation={navigation} />;
          if (section.name === 'For You')
            return <PostGroupTL post={item.node} currentTime={currentTime} navigation={navigation} />;
          return null;
        }}
        onEndReachedThreshold={1.2}
        onEndReached={info => {
          // console.log('onEndReached triggered', info);
          // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment
          if (dataPostsForYou.postsForYou.pageInfo.hasNextPage && networkStatusPostsForYou === 7 && info.distanceFromEnd > -300) {
            // console.log('fetching more');
            fetchMorePostsForYou({
              query: FORYOU_POSTS_QUERY,
              variables: {
                cursor: dataPostsForYou.postsForYou.pageInfo.endCursor,
                first: 30,
                network,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                // console.log('prev', previousResult);
                // console.log('fetched', fetchMoreResult);

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
          // backgroundColor: colors.purp,
          justifyContent: 'flex-end',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-800, 0],
                outputRange: [800, 0],
                extrapolate: 'clamp',
              }),
              // scale: scrollY.interpolate({
              //   inputRange: [-1000, 0],
              //   outputRange: [23, 1],
              //   extrapolate: 'clamp',
              // }),
            },
          ],
          // opacity: scrollY.interpolate({
          //   inputRange: [-400, 0],
          //   outputRange: [1, 0],
          //   extrapolate: 'clamp',
          // }),
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
            animating={newShowLoader}
          />
        </View>
      </Animated.View>
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
  },
  timeline: {
    backgroundColor: colors.lightGray,
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
