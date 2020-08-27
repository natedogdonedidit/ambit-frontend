import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POSTS_QUERY from 'library/queries/POSTS_QUERY';

import Loader from 'library/components/UI/Loader';
import PostGroupTL from 'library/components/post/PostGroupTL';
import BigButton from 'library/components/UI/buttons/BigButton';

const ProfilePosts = ({ setModalVisibleEditPost, setPostToEdit, navigation, isMyProfile, profileId, username }) => {
  // QUERIES
  const { loading, error, data, refetch, fetchMore, networkStatus } = useQuery(POSTS_QUERY, {
    variables: {
      // first: 10,
      orderBy: [
        {
          lastUpdated: 'desc',
        },
      ],
      where: {
        owner: { username: { equals: username } },
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  const currentTime = new Date();

  // if (loading) {
  //   return (
  //     <View style={styles.timeline}>
  //       <Loader loading={loading} full={false} />
  //     </View>
  //   );
  // }

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%' }}>Error loading posts</Text>
      </View>
    );
  }

  const posts = data ? data.posts || [] : [];

  if (posts.length < 1 && !loading && isMyProfile) {
    if (isMyProfile) {
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
      <View style={{ height: 100, width: '100%', alignItems: 'center', marginVertical: 40 }}>
        <Text style={defaultStyles.defaultText}>No posts yet</Text>
      </View>
    );
  }

  if (posts.length < 1) {
    return (
      <>
        <View style={{ height: 100, width: '100%', marginTop: 10 }}>
          <Loader loading={loading} size="small" full={false} backgroundColor="transparent" />
        </View>
        <View style={{ width: '100%', height: 700 }} />
      </>
    );
  }

  return (
    <FlatList
      style={styles.timeline}
      data={posts}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => {
        return (
          <PostGroupTL
            post={item}
            currentTime={currentTime}
            navigation={navigation}
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
    marginTop: 10,
  },
});

export default ProfilePosts;
