import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import MY_POSTS_QUERY from 'library/queries/MY_POSTS_QUERY';

import Loader from 'library/components/UI/Loader';
import Post from 'library/components/Post';
import BigButton from 'library/components/UI/BigButton';

const ProfilePosts = ({ setModalVisibleEditPost, setPostToEdit, navigation }) => {
  // QUERIES
  const { loading, error, data, refetch } = useQuery(MY_POSTS_QUERY, {
    fetchPolicy: 'cache-and-network',
    // notifyOnNetworkStatusChange: true,
  });

  const currentTime = new Date();

  if (loading) {
    return (
      <View style={styles.timeline}>
        <Loader loading={loading} full={false} />
      </View>
    );
  }

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%' }}>Error loading posts</Text>
      </View>
    );
  }

  const posts = data.postsMy || [];

  if (posts.length < 1) {
    return (
      <View style={{ height: 100, width: '100%', alignItems: 'center', marginVertical: 40 }}>
        <Text style={defaultStyles.defaultText}>You don't have any posts yet!</Text>
        <BigButton onPress={() => navigation.navigate('Home')} buttonStyle={{ ...defaultStyles.shadow3, marginTop: 20 }}>
          Create a post
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
        return (
          <Post
            post={item}
            currentTime={currentTime}
            setModalVisibleEditPost={setModalVisibleEditPost}
            setPostToEdit={setPostToEdit}
            editable
          />
        );
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

export default ProfilePosts;
