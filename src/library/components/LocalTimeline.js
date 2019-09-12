import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar } from 'react-native';
import { useQuery } from 'react-apollo';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import LOCAL_POSTS_QUERY from 'library/queries/LOCAL_POSTS_QUERY';

import Loader from 'library/components/UI/Loader';
import Post from 'library/components/Post';

const LocalTimeline = props => {
  const [activeLat, setActiveLat] = useState(41.50473);
  const [activeLon, setActiveLon] = useState(-81.69075);
  const [activeLocation, setActiveLocation] = useState('Cleveland, OH');

  // QUERIES
  const { loading, error, data } = useQuery(LOCAL_POSTS_QUERY, {
    variables: {
      lat: activeLat,
      lon: activeLon,
      radius: 50,
    },
  });

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

  const posts = data ? data.postsLocal : [];

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

export default LocalTimeline;
