import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Alert, ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import PostGroupTL from 'library/components/PostGroupTL';
import ALL_COMMENTS_QUERY from 'library/queries/ALL_COMMENTS_QUERY';
import Loader from 'library/components/UI/Loader';

const PostScreen = ({ navigation }) => {
  // state declaration

  // constants
  const post = navigation.getParam('post', null); // all the data from parent post down to updates
  const isUpdate = navigation.getParam('isUpdate', false);
  const updateInd = navigation.getParam('updateInd', null);

  const idForComments = isUpdate ? post.updates[updateInd].id : post.id;

  // QUERIES - this gets the comments for a
  const { loading, error, data } = useQuery(ALL_COMMENTS_QUERY, {
    variables: { postId: idForComments, isUpdate },
  });

  const currentTime = new Date();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWhite handleLeft={() => navigation.goBack()} handleRight={() => null} textLeft="Back" textRight="" title="Post" />
      <ScrollView style={styles.scrollView}>
        <PostGroupTL post={post} currentTime={currentTime} navigation={navigation} lastOne={updateInd} showAll={!isUpdate} />
        <View style={styles.commentsView}>
          <Text style={defaultStyles.defaultItalic}>No comments</Text>
        </View>
      </ScrollView>
      {loading && <Loader loading={loading} full />}
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
