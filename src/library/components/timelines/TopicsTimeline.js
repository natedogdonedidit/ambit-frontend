import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, RefreshControl, FlatList, Image, ActivityIndicator, ScrollView } from 'react-native';
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

  // networkStatus states:
  // 1: loading
  // 3: fetchMore
  // 4: refetch
  // 7: no loading, no refetch, everything OK!

  // console.log('loading', loadingQuery);
  // console.log('error', error);
  // console.log('data', data);
  // console.log('networkStatus', networkStatus);

  // ///////////////////
  // LOADING STATES
  // ///////////////////
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
  // const noPosts = posts.length < 1 && ok;
  // console.log('posts', posts);

  // ////////////////////////
  // CUSTOM FUNCTIONS
  // ////////////////////////

  const onRefresh = () => {
    // console.log('running refetch');
    refetch();
  };

  // deleted the slider educational stuff...look back at old git rev to see what it was

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
        contentContainerStyle={{ paddingTop: paddingTop + 2.5, paddingBottom: 20 }}
        style={styles.timeline}
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
          // console.log('onEndReached triggered', info);
          // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment
          if (data.postsTopic.pageInfo.hasNextPage && networkStatus === 7 && info.distanceFromEnd > -300) {
            // console.log('fetching more');
            fetchMore({
              query: activeQuery,
              variables: {
                cursor: data.postsTopic.pageInfo.endCursor,
                topic: activeTopic,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                // console.log('prev', previousResult);
                // console.log('fetched', fetchMoreResult);

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

export default TopicsTimeline;
