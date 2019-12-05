import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, RefreshControl, FlatList, Image } from 'react-native';
import { useQuery } from 'react-apollo';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';

// import Loader from 'library/components/UI/Loader';
import PostGroupTL from 'library/components/post/PostGroupTL';

const TopicsTimeline = ({ navigation, scrollY, paddingTop }) => {
  // useEffect(() => {
  //   if (requestRefresh) {
  //     // refetch();
  //     setRequestRefresh(false);
  //   }
  // }, [requestRefresh]);

  const currentTime = new Date();

  // QUERIES
  const { loading, error, data, refetch } = useQuery(GLOBAL_POSTS_QUERY, {
    // fetchPolicy: 'cache-and-network',
  });

  // if (loading) {
  //   // setRefreshing(true);
  // }
  // if (!loading && !requestRefresh && refreshing) {
  //   setRefreshing(false);
  // }

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  const posts = data.postsGlobal || [];
  // const posts = [];

  // ////////////////////////
  // CUSTOME FUNCTIONS
  // ////////////////////////

  const onRefresh = () => {
    refetch();
  };

  // deleted the slider educational stuff...look back at old git rev to see what it was

  return (
    <Animated.FlatList
      // refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor="blue" />}
      // onRefresh={onRefresh}
      // refreshing={loading}
      initialNumToRender={5} // speeds up load time
      contentContainerStyle={{ paddingTop: paddingTop + 2.5, paddingBottom: 20 }}
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
        { useNativeDriver: true }
      )}
      data={posts}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => {
        return <PostGroupTL post={item} currentTime={currentTime} navigation={navigation} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  timeline: {
    backgroundColor: colors.lightGray,
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
