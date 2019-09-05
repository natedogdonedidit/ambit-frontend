import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar } from 'react-native';
import { useQuery } from 'react-apollo';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';

import Loader from 'library/components/UI/Loader';
import Post from 'library/components/Post';

const GlobalTimeline = props => {
  // QUERIES
  const { loading, error, data } = useQuery(GLOBAL_POSTS_QUERY);

  const currentTime = new Date();

  if (loading)
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Loader active={loading} full={false} />
      </View>
    );

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <ScrollView style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </ScrollView>
    );
  }

  const posts = data ? data.postsGlobal : [];

  const renderPosts = () => {
    return posts.map((post, i) => {
      return <Post key={i} post={post} currentTime={currentTime} />;
    });
  };

  return <ScrollView style={styles.timeline}>{renderPosts()}</ScrollView>;
};

const styles = StyleSheet.create({
  timeline: {
    backgroundColor: 'white',
    height: 500,
  },
});

export default GlobalTimeline;
