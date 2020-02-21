import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBack from 'library/components/headers/HeaderBack';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import PostComments from 'library/components/post/PostComments';
import Post from 'library/components/post/Post';
import PostMatches from 'library/components/post/PostMatches';
import Update from 'library/components/post/Update';
import { getGoalInfo } from 'library/utils';
import { UserContext } from 'library/utils/UserContext';

const PostScreen = ({ navigation }) => {
  // ROUTE PARAMS
  const postToQuery = navigation.getParam('post', null); // all the data from parent post down to updates

  // HOOKS
  const currentTime = new Date();
  const { currentUserId } = useContext(UserContext);

  // QUERIES
  // this could be optimized to retrieve the comments seperately
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
  const isMyPost = post.owner.id === currentUserId;

  // CUSTOM FUNCTIONS
  const renderPost = () => {
    return (
      <View style={{}}>
        <View style={{ height: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
        <Post post={post} currentTime={currentTime} navigation={navigation} showDetails />
      </View>
    );
  };

  const renderUpdates = () => {
    if (post.updates.length < 1) return null;

    return (
      <>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingVertical: 12,
            paddingHorizontal: 15,
            marginTop: 15,
            backgroundColor: 'white',
          }}
        >
          <Text style={defaultStyles.headerSmall}>Updates</Text>
        </View>
        {post.updates.map((update, i) => {
          return (
            <TouchableOpacity
              key={update.id}
              activeOpacity={1}
              onPress={() => navigation.navigate('Update', { post, updateInd: i })}
            >
              <Update post={post} update={update} currentTime={currentTime} navigation={navigation} updateInd={i} isStandalone />
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={post.goal ? 'Goal' : 'Post'} />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
        {renderPost()}
        {isMyPost && <PostMatches navigation={navigation} post={post} />}
        {renderUpdates()}
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
  emptyComponent: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    padding: 16,
  },
});

PostScreen.navigationOptions = {
  title: 'Post',
};

export default PostScreen;
