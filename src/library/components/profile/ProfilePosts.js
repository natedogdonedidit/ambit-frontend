import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POSTS_QUERY from 'library/queries/POSTS_QUERY';

import Loader from 'library/components/UI/Loader';
import PostGroupTL from 'library/components/post/PostGroupTL';
// import BigButton from 'library/components/UI/buttons/BigButton';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

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

  if (loading) {
    return (
      <>
        <View style={{ height: 100, width: '100%', marginTop: 10 }}>
          <Loader loading={loading} size="small" full={false} backgroundColor="transparent" />
        </View>
        <View style={{ width: '100%', height: 700 }} />
      </>
    );
  }

  const posts = data ? data.posts || [] : [];
  // const posts = [];

  if (posts.length < 1) {
    if (isMyProfile) {
      return (
        <View style={{ height: 100, width: '100%', alignItems: 'center', marginVertical: 40 }}>
          <Text style={{ ...defaultStyles.defaultText, paddingBottom: 15 }}>You don't have any posts yet!</Text>
          <ButtonDefault onPress={() => navigation.navigate('NewPostModal', { topicsPassedIn: [] })}>Create a post</ButtonDefault>
        </View>
      );
    }
    return (
      <Text style={{ ...defaultStyles.hugeBold, color: colors.gray40, textAlign: 'center', paddingTop: 45 }}>
        No posts yet...sad
      </Text>
    );
  }

  return (
    <FlatList
      style={styles.timeline}
      data={posts}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item, index }) => {
        return (
          <PostGroupTL
            post={item}
            currentTime={currentTime}
            navigation={navigation}
            setModalVisibleEditPost={setModalVisibleEditPost}
            setPostToEdit={setPostToEdit}
            editable
            showTopBorder={index === 0}
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
