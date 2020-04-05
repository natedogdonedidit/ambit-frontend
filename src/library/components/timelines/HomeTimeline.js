import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  RefreshControl,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
  SectionList,
  TouchableOpacity,
} from 'react-native';
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

import PostGroupTL from 'library/components/post/PostGroupTL';

const HomeTimeline = ({ navigation, scrollY, paddingTop }) => {
  const currentTime = new Date();

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

  const refetching = refetchingPostsNetwork || refetchingPostsForYou;

  if (errorPostsNetwork) {
    console.log('ERROR LOADING POSTS:', errorPostsNetwork.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  if (!dataPostsNetwork || loadingPostsNetwork || !dataPostsForYou || loadingPostsForYou) {
    return <Loader backgroundColor={colors.lightGray} />;
  }

  const postsNetwork = dataPostsNetwork.postsNetwork.edges || [];
  const postsForYou = dataPostsForYou.postsForYou.edges || [];

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    // console.log('running refetch');
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

  // RENDER
  return (
    <View style={styles.container}>
      <SectionList
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={onRefresh}
        refreshing={refetching}
        contentContainerStyle={{ paddingTop, paddingBottom: 20 }}
        style={styles.timeline}
        // ItemSeparatorComponent={() => (
        //   <View style={{ height: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
        // )}
        ListHeaderComponent={<View style={{ height: 15 }} />}
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
            title: 'Based on your topics & hats',
            data: postsForYou,
          },
        ]}
        renderSectionHeader={({ section }) => {
          if (section.name === 'Network' && postsNetwork.length > 0) return <Section text={section.title} marginTop={false} />;
          if (section.name === 'For You')
            return (
              <Section
                text={section.title}
                marginTop={false}
                rightComponent={
                  <TouchableOpacity onPress={() => navigation.navigate('ForYouSettingsPopup')}>
                    <Feather name="settings" size={18} color={colors.black} style={{ paddingLeft: 2 }} />
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
        // SectionSeparatorComponent={({ trailingSection, trailingItem }) => {
        //   if (trailingSection && !trailingItem) return <View style={{ height: 15 }} />;
        //   return null;
        // }}
      />

      {/* <FlatList
        // refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        // onRefresh={onRefresh}
        // refreshing={refetching}
        // contentContainerStyle={{ paddingTop, paddingBottom: 20 }}
        // style={styles.timeline}
        // ListHeaderComponent={
        //   <View style={{ height: 15, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
        // }
        // ListEmptyComponent={
        //   <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>
        //     Sorry, no posts to display at this time
        //   </Text>
        // }
        // onScroll={Animated.event(
        //   [
        //     {
        //       nativeEvent: {
        //         contentOffset: {
        //           y: scrollY,
        //         },
        //       },
        //     },
        //   ]
        //   // { useNativeDriver: true }
        // )}
        // data={posts}
        // keyExtractor={(item, index) => item + index}
        // renderItem={({ item }) => {
        //   return <PostGroupTL post={item.node} currentTime={currentTime} navigation={navigation} />;
        // }}
        onEndReachedThreshold={1.2}
        onEndReached={info => {
          // console.log('onEndReached triggered', info);
          // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment
          if (data.postsNetwork.pageInfo.hasNextPage && networkStatusPostsNetwork === 7 && info.distanceFromEnd > -300) {
            // console.log('fetching more');
            fetchMorePostsNetwork({
              query: NETWORK_POSTS_QUERY,
              variables: {
                cursor: data.postsNetwork.pageInfo.endCursor,
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
        //   }
        // }}
      /> */}

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
            animating={refetching}
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
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
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
