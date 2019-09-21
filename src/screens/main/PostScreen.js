import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Alert } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
// import PostGroup from 'library/components/PostGroup';
import MediumProfilePic from 'library/components/UI/MediumProfilePic';
import ALL_COMMENTS_QUERY from 'library/queries/ALL_COMMENTS_QUERY';
import Loader from 'library/components/UI/Loader';

const PostScreen = ({ navigation }) => {
  // state declaration

  // constants
  const post = navigation.getParam('post', null); // all the data from parent post down to updates
  const isUpdate = navigation.getParam('isUpdate', false);
  const updateId = navigation.getParam('updateId', null);

  const idForComments = isUpdate ? updateId : post.id;

  // QUERIES - this gets the comments for a
  const { loading, error, data } = useQuery(ALL_COMMENTS_QUERY, {
    variables: { postId: idForComments, isUpdate },
  });

  const currentTime = new Date();

  return (
    <SafeAreaView>
      <HeaderWhite handleLeft={() => navigation.goBack()} handleRight={() => null} textLeft="Back" textRight="" title="Post" />

      {loading && <Loader loading={loading} full />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
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
  comments: {
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
  },
});

PostScreen.navigationOptions = {
  title: 'Post',
};

export default PostScreen;
