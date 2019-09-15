import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, FlatList } from 'react-native';
import { useQuery } from 'react-apollo';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import LOCAL_POSTS_QUERY from 'library/queries/LOCAL_POSTS_QUERY';

import Post from 'library/components/Post';

const LocalTimeline = ({ requestRefresh, setRequestRefresh, refreshing, setRefreshing }) => {
  const [activeLat, setActiveLat] = useState(41.50473);
  const [activeLon, setActiveLon] = useState(-81.69075);
  const [activeLocation, setActiveLocation] = useState('Cleveland, OH');

  useEffect(() => {
    if (requestRefresh) {
      refetch();
      setRequestRefresh(false);
    }
  }, [requestRefresh]);

  // QUERIES
  const { loading, error, data, refetch } = useQuery(LOCAL_POSTS_QUERY, {
    variables: {
      lat: activeLat,
      lon: activeLon,
      radius: 50,
    },
    fetchPolicy: 'cache-and-network',
  });

  const currentTime = new Date();

  if (loading) {
    setRefreshing(true);
  }
  if (!loading && !requestRefresh && refreshing) {
    setRefreshing(false);
  }

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  const posts = data ? data.postsLocal : [];
  // console.log(posts);

  return (
    <FlatList
      style={styles.timeline}
      data={posts}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => {
        return <Post post={item} currentTime={currentTime} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  timeline: {
    backgroundColor: colors.lightGray,
    // height: 500,
  },
});

export default LocalTimeline;
