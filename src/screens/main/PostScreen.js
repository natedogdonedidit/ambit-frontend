import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBackLoader from 'library/components/headers/HeaderBackLoader';
import HeaderBack from 'library/components/headers/HeaderBack';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import POST_MATCHES_QUERY from 'library/queries/POST_MATCHES_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import PostComments from 'library/components/post/PostComments';
import PostUpdates from 'library/components/post/PostUpdates';
import Post from 'library/components/post/Post';
import { UserContext } from 'library/utils/UserContext';

const PostScreen = ({ navigation, route }) => {
  // ROUTE PARAMS
  const { post: postToQuery } = route.params; // all the data from parent post down to updates

  // HOOKS
  const currentTime = new Date();
  const { currentUserId } = useContext(UserContext);

  // QUERIES
  const { loading: loadingMatches, data: dataMatches } = useQuery(POST_MATCHES_QUERY, {
    variables: { id: postToQuery.id },
  });
  const matches = dataMatches ? dataMatches.singlePostMatches : [];

  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { id: postToQuery.id },
  });

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title={postToQuery.goal ? 'Goal' : 'Post'} />
        <Loader loading={loading} full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }

  const post = data.singlePost || null;

  if (!post) {
    navigation.goBack();
    return null;
  }

  const isMyPost = post.owner.id === currentUserId;
  const showMatchesLoader = isMyPost && !!post.goal && loadingMatches;

  // CUSTOM FUNCTIONS
  const renderPost = () => {
    return (
      <View>
        <View style={{ height: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
        <Post post={post} currentTime={currentTime} navigation={navigation} showDetails />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBackLoader
        navigation={navigation}
        title={post.goal ? 'Goal' : 'Post'}
        loading={showMatchesLoader}
        handleRight={loadingMatches || !isMyPost || !post.goal ? null : () => navigation.navigate('PostMatches', { matches })}
        textRight={loadingMatches || !isMyPost || !post.goal ? '' : `${matches.length || ''} Matches`}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
        {renderPost()}
        <PostUpdates navigation={navigation} post={post} currentTime={currentTime} />
        <PostComments navigation={navigation} post={post} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: colors.lightGray,
  },
});

export default PostScreen;
