import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import Post from 'library/components/Post';
import MediumProfilePic from 'library/components/UI/MediumProfilePic';
import CREATE_UPDATE_MUTATION from 'library/mutations/CREATE_UPDATE_MUTATION';
import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';
import LOCAL_POSTS_QUERY from 'library/queries/LOCAL_POSTS_QUERY';
import USER_POSTS_QUERY from 'library/queries/USER_POSTS_QUERY';
import Loader from 'library/components/UI/Loader';

const PostScreen = ({ navigation }) => {
  // state declaration
  const [updateText, setUpdateText] = useState('');
  const [updateImage, setUpdateImage] = useState('');

  // constants
  const post = navigation.getParam('post', 'No post');
  const isUpdate = navigation.getParam('isUpdate', false);
  const showComments = navigation.getParam('showComments', false);

  console.log('post', post);
  console.log('isupdate', isUpdate);
  console.log('showComments', showComments);

  // MUTATIONS
  const [createUpdate, { loading: loadingUpdate }] = useMutation(CREATE_UPDATE_MUTATION, {
    variables: {
      postId: post.id,
      update: {
        content: updateText,
        image: updateImage,
      },
    },
    refetchQueries: () => [
      { query: GLOBAL_POSTS_QUERY },
      { query: LOCAL_POSTS_QUERY },
      { query: USER_POSTS_QUERY, variables: { id: post.owner.id } },
    ],
    // add update here to add post to GLOBAL, NETWORK, AND MYPOST arrays in cache
    onCompleted: () => {
      setUpdateText('');
      setUpdateImage('');
      navigation.goBack();
    },
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to update this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  const currentTime = new Date();

  const handleUpdate = () => {
    createUpdate();
  };

  const loading = loadingUpdate;

  return (
    <SafeAreaView>
      {isUpdate ? (
        <HeaderWhite
          handleLeft={() => navigation.goBack()}
          handleRight={() => handleUpdate()}
          textLeft="Back"
          textRight="Update"
          title="Update Post"
        />
      ) : (
        <HeaderWhite handleLeft={() => navigation.goBack()} handleRight={() => null} textLeft="Back" textRight="" title="Post" />
      )}

      <Post post={post} currentTime={currentTime} navigation={navigation} onPostScreen isUpdate={isUpdate} />
      {isUpdate && (
        <View style={styles.update}>
          <View style={styles.leftColumn}>
            <MediumProfilePic pic={post.owner.profilePic} />
          </View>
          <View style={styles.rightColumn}>
            <Text style={defaultStyles.defaultMedium} numberOfLines={1}>
              {post.owner.name}
            </Text>
            <View style={{ height: 100, paddingTop: 5 }}>
              <TextInput
                style={{ flex: 1, marginRight: 35, ...defaultStyles.defaultText }}
                onChangeText={val => setUpdateText(val)}
                value={updateText}
                autoFocus
                autoCompleteType="off"
                autoCorrect={false}
                multiline
                textAlignVertical="top"
                placeholder="What's your update?"
              />
            </View>
          </View>
        </View>
      )}
      {showComments && (
        <View style={styles.comments}>
          <Text>show comments</Text>
        </View>
      )}
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
