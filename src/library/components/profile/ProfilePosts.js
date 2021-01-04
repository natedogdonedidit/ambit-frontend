import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POSTS_WHERE_QUERY from 'library/queries/POSTS_WHERE_QUERY';

import Loader from 'library/components/UI/Loader';
import PostGroupTL from 'library/components/post/PostGroupTL';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import { useNavigation } from '@react-navigation/native';

const ProfilePosts = ({ isMyProfile, username }) => {
  const navigation = useNavigation();

  // QUERIES
  const { loading, error, data, refetch, fetchMore, networkStatus } = useQuery(POSTS_WHERE_QUERY, {
    variables: {
      take: 50, // FIXME, need to add "See more" button. onEndReached does not work bc nested scroll (i think)
      where: {
        owner: { username: { equals: username } },
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const currentTime = new Date();

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

  const posts = data && data.postsWhere && data.postsWhere.posts ? data.postsWhere.posts : [];

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
        return <PostGroupTL post={item} navigation={navigation} showTopBorder={index === 0} />;
      }}
      // onEndReachedThreshold={0.5}
      // onEndReached={(info) => {
      //   console.log('onEndReached triggered', info);
      //   // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment

      //   if (data && data.postsWhere && data.postsWhere.hasNextPage && networkStatus === 7 && info.distanceFromEnd > -300) {
      //     const lastPost = data.postsWhere.posts[data.postsWhere.posts.length - 1].id;
      //     console.log('fetching more profile posts:', lastPost);

      //     fetchMore({
      //       variables: {
      //         cursor: lastPost,
      //       },
      //     });
      //   }
      // }}
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
