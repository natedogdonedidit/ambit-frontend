import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import USER_POSTS_QUERY from 'library/queries/USER_POSTS_QUERY';

import Loader from 'library/components/UI/Loader';
import PostGroupTL from 'library/components/post/PostGroupTL';
import BigButton from 'library/components/UI/BigButton';

const ProfilePosts = ({ setModalVisibleEditPost, setPostToEdit, navigation, isMyProfile, profileId }) => {
  // QUERIES
  const { loading, error, data, refetch } = useQuery(USER_POSTS_QUERY, {
    variables: { id: profileId },
    fetchPolicy: 'cache-and-network', // doing it this way because cannot pull to refresh at the moment
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

  const posts = data ? data.postsUser || [] : [];

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
    return <Loader loading={loading} full={false} />;
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
