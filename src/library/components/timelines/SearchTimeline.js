import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, RefreshControl, FlatList, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POSTS_WHERE_QUERY from 'library/queries/POSTS_WHERE_QUERY';
import Loader from 'library/components/UI/Loader';
import { rad2Deg, deg2Rad, buildSearchWhere } from 'library/utils';
import PostGroupTL from 'library/components/post/PostGroupTL';

const SearchTimeline = ({ navigation, scrollY, searchText, goal, topicIDs, locationLat, locationLon }) => {
  // STATE

  const where = buildSearchWhere({ text: searchText, goal, topicIDs, lat: locationLat, lon: locationLon });

  // QUERIES
  const { loading: loadingQuery, error, data, refetch, fetchMore, networkStatus } = useQuery(POSTS_WHERE_QUERY, {
    variables: {
      take: 50,
      where,
    },
    notifyOnNetworkStatusChange: true,
  });

  // ///////////////////
  // LOADING STATES
  // ///////////////////
  const refetching = networkStatus === 4;
  const newVariables = networkStatus === 2;
  const loading = networkStatus === 1;
  const ok = networkStatus === 7;

  const currentTime = new Date();

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  if (!data || loading || refetching || newVariables) {
    return <Loader backgroundColor={colors.lightGray} size="small" />;
  }

  const posts = data && data.postsWhere && data.postsWhere.posts ? data.postsWhere.posts : [];
  // const noPosts = posts.length < 1 && ok;
  // console.log('posts', posts);

  // ////////////////////////
  // CUSTOM FUNCTIONS
  // ////////////////////////

  const onRefresh = () => {
    // console.log('running refetch');
    refetch();
  };

  // ////////////////////////
  // RENDER
  // ////////////////////////

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={onRefresh}
        refreshing={refetching}
        // initialNumToRender={10} // speeds up load time
        // contentContainerStyle={{ paddingBottom: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={styles.timeline}
        ListHeaderComponent={
          <View
            style={[
              { height: 15 },
              posts.length > 0 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack },
            ]}
          />
        }
        ListEmptyComponent={
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', padding: 40 }}>
            Nothing matches your search criteria.{`\n`} Try something else!
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
          return <PostGroupTL post={item} currentTime={currentTime} navigation={navigation} />;
        }}
        // onEndReachedThreshold={1.2}
        // onEndReached={(info) => {
        //   // console.log('onEndReached triggered', info);
        //   // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment
        //   if (data.postsSearch.pageInfo.hasNextPage && networkStatus === 7 && info.distanceFromEnd > -300) {
        //     // console.log('fetching more');
        //     fetchMore({
        //       query: activeQuery,
        //       variables: {
        //         cursor: data.postsSearch.pageInfo.endCursor,
        //       },
        //       updateQuery: (previousResult, { fetchMoreResult }) => {
        //         // console.log('prev', previousResult);
        //         // console.log('fetched', fetchMoreResult);

        //         const newEdges = fetchMoreResult.postsSearch.edges;
        //         const { pageInfo } = fetchMoreResult.postsSearch;

        //         return newEdges.length
        //           ? {
        //             postsSearch: {
        //               __typename: previousResult.postsSearch.__typename,
        //               edges: [...previousResult.postsSearch.edges, ...newEdges],
        //               pageInfo,
        //             },
        //           }
        //           : previousResult;
        //       },
        //     });
        //   }
        // }}
      />
      {/* This is the loading animation */}
      {/* <Animated.View
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
      </Animated.View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    // backgroundColor: colors.lightGray,
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

export default SearchTimeline;
