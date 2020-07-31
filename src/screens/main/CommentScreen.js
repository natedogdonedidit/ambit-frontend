/* eslint-disable prefer-destructuring */
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  // Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  InputAccessoryView,
} from 'react-native';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
// import Editor, { displayTextWithMentions } from 'react-native-mentions-editor';
import ImagePicker from 'react-native-image-crop-picker';
// import Image from 'react-native-scalable-image';
import FitImage from 'react-native-fit-image';
import { postPicUpload } from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBack from 'library/components/headers/HeaderBack';
import PostGroupTL from 'library/components/post/PostGroupTL';
import ProfilePic from 'library/components/UI/ProfilePic';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import CREATE_COMMENT_MUTATION from 'library/mutations/CREATE_COMMENT_MUTATION';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
// import ThreadLine from 'library/components/UI/ThreadLine';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import POST_COMMENTS_QUERY from 'library/queries/POST_COMMENTS_QUERY';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Post from 'library/components/post/Post';
import Comment from 'library/components/post/Comment';
import SubComment from 'library/components/post/SubComment';

const CommentScreen = ({ navigation, route }) => {
  const scrollViewRef = useRef(null);
  // const inputRef = useRef(null);

  // params
  const {
    post: parentPost,
    update,
    comment,
    parentComment,
    isUpdate = false,
    isComment = false,
    isSubComment = false,
  } = route.params;
  // if you click a subcomment its all fucked up

  // state declaration\
  // const [comment, setComment] = useState(isComment ? `@[${clicked.owner.name}](${clicked.owner.id}) ` : '');
  const [content, setContent] = useState('');
  const [commentImage, setCommentImage] = useState('');
  const [uploading, setUploading] = useState(false);
  // const [mentions, setMentions] = useState([]);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  // const [showMentionList, setShowMentionList] = useState(false);

  // constants
  const currentTime = new Date();
  // const parentPost = isUpdate || isComment ? clicked.parentPost : clicked;

  const parentUpdate = isUpdate ? update : null;
  let parentCommentForDB = null;

  if (isComment) {
    if (isSubComment) {
      parentCommentForDB = parentComment;
    } else {
      parentCommentForDB = comment;
    }
  }

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = dataUser;

  const { loading: loadingPost, error: errorPost, data: dataPost } = useQuery(SINGLE_POST_QUERY, {
    variables: { id: parentPost.id },
  });

  const { loading: loadingPostComments, error: errorPostComments, data: dataPostComments } = useQuery(POST_COMMENTS_QUERY, {
    variables: { id: parentPost.id },
  });

  const loading = loadingUser || loadingPost;

  const parentPostObject = { connect: { id: parentPost.id } };
  const parentUpdateObject = parentUpdate ? { connect: { id: parentUpdate.id } } : null;
  const parentCommentObject = parentCommentForDB ? { connect: { id: parentCommentForDB.id } } : null;

  // MUTATIONS
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    // onError: error => {
    //   console.log(error);
    //   Alert.alert('Oh no!', 'An error occured when trying to create this comment. Try again later!', [
    //     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //   ]);
    // },
  });

  if (errorUser) return <Error error={errorUser} />;
  if (errorPost) return <Error error={errorPost} />;

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} handleRight={() => null} textRight="Reply" title="Comment" />
        <Loader loading={loading} full={false} />
      </View>
    );
  }

  const post = dataPost.singlePost;

  // optimistic response will throw an error if the comments query hasn't been called yet
  const useOptimisticResponse = dataPostComments ? !!dataPostComments.singlePost.comments : false;

  // CUSTOM FUNCTIONS
  const handleSubmit = async () => {
    const message = validateInputs();
    // if missing a required field, Alert user
    if (message) {
      Alert.alert('Please add a comment or image', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      return;
    }

    try {
      const uploadedImage = await uploadImage();
      navigation.goBack();

      createComment({
        variables: {
          comment: {
            content,
            image: uploadedImage,
            owner: {
              connect: { id: userLoggedIn.id },
            },
            parentPost: parentPostObject,
            parentUpdate: parentUpdateObject,
            parentComment: parentCommentObject,
          },
        },
        update: (proxy, { data: dataReturned }) => {
          if (useOptimisticResponse) {
            const previousData = proxy.readQuery({ query: POST_COMMENTS_QUERY, variables: { id: parentPost.id } });

            if (isComment || isSubComment) {
              if (isUpdate) {
                // if subComment on comment on update
                const indexOfUpdate = previousData.singlePost.updates.findIndex((item) => item.id === parentUpdate.id);
                const indexOfParentComment = previousData.singlePost.updates[indexOfUpdate].comments.findIndex(
                  (item) => item.id === parentComment.id
                );
                const newUpdatesArray = [...previousData.singlePost.updates];
                // add the new comment to the correct comment of the correct update
                newUpdatesArray[indexOfUpdate].comments[indexOfParentComment].comments.push(dataReturned.createComment);
                proxy.writeQuery({
                  query: POST_COMMENTS_QUERY,
                  data: {
                    singlePost: {
                      ...previousData.singlePost,
                      updates: newUpdatesArray,
                    },
                  },
                });
              } else {
                // if subComment on comment on post
                const indexOfParentComment = previousData.singlePost.comments.findIndex((item) => item.id === parentComment.id);
                const newCommentsArray = [...previousData.singlePost.comments];

                // add the new subcomment to the comment array of the parentComment
                newCommentsArray[indexOfParentComment].comments.push(dataReturned.createComment);

                proxy.writeQuery({
                  query: POST_COMMENTS_QUERY,
                  data: {
                    singlePost: {
                      ...previousData.singlePost,
                      comments: newCommentsArray,
                    },
                  },
                });
              }
            } else if (isUpdate) {
              // if comment on update
              const indexOfUpdate = previousData.singlePost.updates.findIndex((item) => item.id === parentUpdate.id);
              const newUpdatesArray = [...previousData.singlePost.updates];
              // add the new comment to the correct update comments array

              newUpdatesArray[indexOfUpdate].comments.push(dataReturned.createComment);

              proxy.writeQuery({
                query: POST_COMMENTS_QUERY,
                data: {
                  singlePost: {
                    ...previousData.singlePost,
                    updates: newUpdatesArray,
                  },
                },
              });
            } else {
              // if comment on post
              proxy.writeQuery({
                query: POST_COMMENTS_QUERY,
                data: {
                  singlePost: {
                    ...previousData.singlePost,
                    comments: [...previousData.singlePost.comments, dataReturned.createComment],
                  },
                },
              });
            }
          }
        },
        optimisticResponse: useOptimisticResponse
          ? {
              __typename: 'Mutation',
              createComment: {
                __typename: 'Comment',
                createdAt: new Date(),
                owner: userLoggedIn,
                parentPost: post,
                parentUpdate,
                parentComment: parentCommentForDB,
                content,
                image: uploadedImage,
                likes: [],
                comments: [],
                id: Math.random(),
                likesCount: null,
                likedByMe: false,
                commentsCount: null,
                _deleted: false,
              },
            }
          : null,
        refetchQueries: () => [{ query: POST_COMMENTS_QUERY, variables: { id: parentPost.id } }],
      });
    } catch (e) {
      setUploading(false);
      console.log(e);
      if (e.message === 'Image upload fail') {
        Alert.alert('Oh no!', 'An error occured when trying to upload your photo. Remove the photo or try again.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      } else {
        Alert.alert('Oh no!', 'An error occured when trying to create this comment. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
  };

  const onChangeText = (val) => {
    setContent(val);
  };

  const uploadImage = async () => {
    if (commentImage) {
      setUploading(true);

      const uploadedImage = await postPicUpload(userLoggedIn, commentImage);
      setUploading(false);
      // setCommentImage(uploadedImage);
      return uploadedImage;
    }
    return '';
  };

  const handleCameraIconPress = () => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
    })
      .then((img) => {
        setCommentImage(img.path);
      })
      .catch((e) => alert(e));
  };

  const validateInputs = () => {
    if (!content && !commentImage) return 'Oops';
    return null;
  };

  // RENDER FUNCTIONS

  const renderPost = () => {
    // if its just a stand-alone Post
    if (!isUpdate) {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post })}>
          <Post post={post} currentTime={currentTime} navigation={navigation} hideButtons showLine />
        </TouchableOpacity>
      );
    }

    const updateInd = isUpdate ? post.updates.findIndex((u) => u.id === parentUpdate.id) : null;

    // if showing an update
    return (
      <PostGroupTL
        post={post}
        currentTime={currentTime}
        navigation={navigation}
        updateInd={updateInd}
        hideButtons
        hideTopLine
        disableVideo
      />
    );
  };

  const renderComments = () => {
    // if this is a subcomment
    if (isSubComment) {
      const subCommentIndex = parentComment.comments.findIndex((com) => com.id === comment.id);

      return (
        <>
          <Comment
            key={parentComment.id}
            comment={parentComment}
            navigation={navigation}
            currentTime={currentTime}
            lessPadding
            hideButtons
            disableVideo
          />
          {parentComment.comments.map((subComment, k) => {
            if (k <= subCommentIndex) {
              return (
                <SubComment
                  key={subComment.id}
                  comment={subComment}
                  navigation={navigation}
                  currentTime={currentTime}
                  lessPadding
                  hideButtons
                  disableVideo
                  showLine
                />
              );
            }
            return null;
          })}
        </>
      );
    }

    return (
      <Comment
        comment={comment}
        navigation={navigation}
        currentTime={currentTime}
        hideButtons
        showLine={!isComment}
        lessPadding
        disableVideo
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} handleRight={handleSubmit} textRight="Reply" title="Comment" solidRight />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={{ flex: 1 }}>
          <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
            {renderPost()}
            {isComment && renderComments()}

            <View style={[styles.commentInput, isComment && { paddingLeft: 56 }]}>
              <View style={isComment ? styles.leftColumnSub : styles.leftColumn}>
                <ProfilePic size="small" navigation={navigation} user={userLoggedIn} enableIntro={false} enableStory={false} />
              </View>
              <View style={{ ...styles.rightColumn }}>
                <View style={{ paddingTop: 2, paddingBottom: 10 }}>
                  <TextInput
                    style={{ flex: 1, marginRight: 35, ...defaultStyles.largeRegular }}
                    onChangeText={onChangeText}
                    autoFocus
                    autoCompleteType="off"
                    // autoCorrect={false}
                    multiline
                    scrollEnabled={false}
                    textAlignVertical="top"
                    placeholder="Start your comment"
                    onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
                    inputAccessoryViewID="1"
                    // onBlur={() => setShowMentionList(false)}
                  />
                </View>
                {!!commentImage && (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingRight: 10 }}>
                    <View style={{ ...styles.image, width: '100%' }}>
                      <FitImage source={{ uri: commentImage }} />
                      <View style={styles.removeImageButton}>
                        <Icon name="times" solid size={15} color="white" onPress={() => setCommentImage('')} />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>

        <InputAccessoryView nativeID="1">
          <View style={styles.aboveKeyboard}>
            <View style={styles.aboveKeyboardLeft}>
              <TouchableOpacity onPress={handleCameraIconPress} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <Icon name="image" size={22} color={colors.purp} style={{ paddingRight: 30, opacity: 0.6 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => null} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <IconM name="camera-outline" size={22} color={colors.purp} style={{ paddingRight: 32, opacity: 0.6 }} />
              </TouchableOpacity>
            </View>
          </View>
        </InputAccessoryView>
      </KeyboardAvoidingView>
      {uploading && <Loader loading={uploading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // copied in
  commentInput: {
    flexDirection: 'row',
    backgroundColor: 'white',
    // paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderRadius: 3,
  },
  leftColumn: {
    alignItems: 'center',
    paddingLeft: 4,
    width: 76,
  },
  leftColumnSub: {
    alignItems: 'center',
    paddingRight: 4,
    width: 56,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'stretch',
    // paddingLeft: 8,
    paddingBottom: 20,
    // paddingRight: 15,
  },
  // media: {
  //   width: '100%',
  //   // height: 240,
  //   borderRadius: 10,
  //   borderWidth: StyleSheet.hairlineWidth,
  //   borderColor: colors.borderBlack,
  //   marginBottom: 10,
  //   overflow: 'hidden',
  // },
  image: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    overflow: 'hidden',
    // marginRight: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGray1,
    opacity: 0.9,
    height: 24,
    width: 24,
    borderRadius: 12,
    ...defaultStyles.shadow3,
  },
  aboveKeyboard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  aboveKeyboardLeft: {
    flexDirection: 'row',
  },
  aboveKeyboardRight: {
    flexDirection: 'row',
  },
  // mentionsList: {
  //   width: '100%',
  //   minHeight: 200,
  // },
  // mentionListItem: {
  //   flexDirection: 'row',
  //   borderTopWidth: StyleSheet.hairlineWidth,
  //   borderColor: colors.borderBlack,
  // },
  // mentionListItemPic: {
  //   width: 60,
  //   height: 60,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // mentionListItemDetails: {
  //   flexGrow: 1,
  //   height: 60,
  //   justifyContent: 'center',
  // },
});

export default CommentScreen;
