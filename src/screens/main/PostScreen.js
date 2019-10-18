import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Alert, ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import PostGroupTL from 'library/components/post/PostGroupTL';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';

const PostScreen = ({ navigation }) => {
  // PARAMS
  const postToQuery = navigation.getParam('post', null); // all the data from parent post down to updates
  const isUpdate = navigation.getParam('isUpdate', false);
  const updateInd = navigation.getParam('updateInd', null);

  // CONSTANTS
  // const idForComments = isUpdate ? post.updates[updateInd].id : post.id;

  // QUERIES - this gets the comments for a POST
  // this could be optimized to only retrieve comments of clicked on Post/Update
  // right now it queries ALL comments in the Post & down stream updates
  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { id: postToQuery.id },
    fetchPolicy: 'cache-and-network',
  });

  if (error) return <Error error={error} />;

  const currentTime = new Date();

  const post = data.singlePost || null;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWhite handleLeft={() => navigation.goBack()} handleRight={() => null} textLeft="Back" textRight="" title="Post" />
      {loading ? (
        <Loader loading={loading} full={false} />
      ) : (
        <ScrollView style={styles.scrollView}>
          <PostGroupTL post={post} currentTime={currentTime} navigation={navigation} lastOne={updateInd} showAll={!isUpdate} />
          <View style={styles.commentsView}>
            <Text style={defaultStyles.defaultItalic}>No comments</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
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
  update: {
    flexDirection: 'row',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderBlack,
    backgroundColor: 'white',
    marginTop: 3,
    // marginHorizontal: 6,
    borderRadius: 3,
  },
  leftColumn: {
    alignItems: 'center',
    width: 64,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'stretch',
    paddingRight: 15,
  },
  updateInput: {
    width: '100%',
  },
  commentsView: {
    width: '100%',
    marginTop: 10,
    height: 500,
    paddingTop: 40,
    alignItems: 'center',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
  },
});

PostScreen.navigationOptions = {
  title: 'Post',
};

export default PostScreen;
