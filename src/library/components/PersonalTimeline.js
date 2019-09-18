import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';

import Loader from 'library/components/UI/Loader';
import Post from 'library/components/Post';
import BigButton from 'library/components/UI/BigButton';

const PersonalTimeline = ({ requestRefresh, setRequestRefresh, refreshing, setRefreshing, navigation }) => {
  useEffect(() => {
    if (requestRefresh) {
      refetch();
      setRequestRefresh(false);
    }
  }, [requestRefresh]);

  // QUERIES
  const { loading, error, data, refetch } = useQuery(GLOBAL_POSTS_QUERY, {
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

  // const posts = data ? data.postsGlobal : [];
  const posts = [];
  // console.log(posts);

  if (posts.length < 1) {
    return (
      <View style={{ height: 100, width: '100%', alignItems: 'center', marginVertical: 40 }}>
        <Text style={defaultStyles.defaultText}>You don't follow anybody yet</Text>
        <BigButton onPress={() => navigation.navigate('Suggestions')} buttonStyle={{ ...defaultStyles.shadow3, marginTop: 20 }}>
          Find connections
        </BigButton>
      </View>
    );
  }

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

export default PersonalTimeline;
