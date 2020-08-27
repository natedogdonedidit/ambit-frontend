import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import HeaderBack from 'library/components/headers/HeaderBack';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import SuggestedConnection from 'library/components/lists/SuggestedConnection';
import Post from 'library/components/post/Post';
import POST_MATCHES_QUERY from 'library/queries/POST_MATCHES_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import PostMatches from '../../library/components/post/PostMatches';

const PostMatchesScreen = ({ navigation, route }) => {
  // PARAMS
  const { post } = route.params;
  // we only show the post if you past a post in

  const currentTime = new Date();

  // QUERIES
  const { loading, error, data, refetch, networkStatus } = useQuery(POST_MATCHES_QUERY, {
    variables: { postId: post.id },
    notifyOnNetworkStatusChange: true,
  });

  const matches = data.singlePostMatches || null;

  const onRefresh = () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="Goal Matches" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          {
            paddingBottom: 20,
          },
        ]}
        // onRefresh={onRefresh}
        // refreshing={networkStatus === 4}
      >
        {post && (
          <View style={{ height: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
        )}
        {post && (
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
            <Post post={post} currentTime={currentTime} navigation={navigation} hideButtons />
          </TouchableOpacity>
        )}
        <PostMatches post={post} navigation={navigation} loading={loading} matches={matches} />
        {/* {renderMatches()} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  noMatches: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostMatchesScreen;
