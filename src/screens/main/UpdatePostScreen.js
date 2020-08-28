import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBack from 'library/components/headers/HeaderBack';
import PostGroupTL from 'library/components/post/PostGroupTL';
import ProfilePic from 'library/components/UI/ProfilePic';
import UPDATE_POST_MUTATION from 'library/mutations/UPDATE_POST_MUTATION';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';

const UpdatePostScreen = ({ navigation, route }) => {
  // params
  const { post } = route.params;

  // state declaration
  const [updateText, setUpdateText] = useState('');
  const [updateImage, setUpdateImage] = useState('');

  const currentTime = new Date();

  // MUTATIONS
  const [updateOnePost] = useMutation(UPDATE_POST_MUTATION, {
    onError: (error) => {
      console.log('something went wrong either creating post or notifications', error);
      // Alert.alert('Oh no!', 'An error occured when trying to create this post. Try again later!', [
      //   { text: 'OK', onPress: () => console.log('OK Pressed') },
      // ]);
    },
  });

  const handleUpdate = () => {
    const newUpdate = {
      __typename: 'Update',
      id: 'xyz123nelly',
      createdAt: currentTime,
      parentPost: post,
      content: updateText,
      image: updateImage,
      likes: [],
      likesCount: 0,
      likedByMe: false,
      comments: [],
      commentsCount: 0,
      sharesCount: 0,
    };

    updateOnePost({
      variables: {
        where: { id: post.id },
        data: {
          updates: {
            create: [
              {
                content: updateText,
                image: updateImage,
              },
            ],
          },
        },
      },
      // update: (proxy, { data: dataReturned }) => {
      //   if (dataReturned.createUpdate.id === post.id) {
      //     proxy.writeQuery({
      //       query: SINGLE_POST_QUERY,
      //       data: {
      //         singlePost: {
      //           ...dataReturned.createUpdate,
      //         },
      //       },
      //     });
      //   }
      // },
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   updateOnePost: {
      //     __typename: 'Post',
      //     ...post,
      //     updates: [...post.updates, newUpdate],
      //   },
      // },
    });
    navigation.navigate('Post', { post });
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} handleRight={handleUpdate} textRight="Update" title="Update Post" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <PostGroupTL
            post={post}
            currentTime={currentTime}
            navigation={navigation}
            hideButtons
            showAll
            showLastLine
            hideTopLine
            disableVideo
          />

          <View style={styles.update}>
            <View style={styles.leftColumn}>
              <ProfilePic
                navigation={navigation}
                user={post.owner}
                size="small"
                enableIntro={false}
                enableStory={false}
                enableClick={false}
              />
            </View>
            <View style={styles.rightColumn}>
              <View style={{ height: 100, paddingTop: 0 }}>
                <TextInput
                  style={styles.input}
                  onChangeText={(val) => setUpdateText(val)}
                  value={updateText}
                  autoFocus
                  autoCompleteType="off"
                  multiline
                  scrollEnabled={false}
                  textAlignVertical="top"
                  placeholder="What's your update?"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  update: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 3,
    paddingRight: 10,
  },
  leftColumn: {
    alignItems: 'center',
    paddingLeft: 4,
    width: 76,
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 35,
    ...defaultStyles.largeRegular,
  },
});

export default UpdatePostScreen;
