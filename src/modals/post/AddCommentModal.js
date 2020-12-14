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
import { CommonActions } from '@react-navigation/native';
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
import CoolText from 'library/components/UI/CoolText';
import MentionsSelect from 'library/components/MentionsSelect';

const AddCommentModal = ({ navigation, route }) => {
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
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [mentionText, setMentionText] = useState('');
  const [cursorLocation, setCursorLocation] = useState(0);

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

  // FOR MENTION SEARCH
  useEffect(() => {
    // see if the string ends in a mention
    const re = /\B@\w+$/g;
    const mentions = content.match(re);

    // if it does, save to state
    if (mentions && mentions.length > 0) {
      const mentionToSearch = mentions[0].substr(1).toLowerCase();
      setMentionText(mentionToSearch);
    } else {
      setMentionText('');
    }
  }, [content]);

  // initialize content with the mention if it's a subcomment
  useEffect(() => {
    // console.log(parentCommentForDB);
    if (comment && comment.owner && comment.owner.username && content === '') {
      setContent(`@${comment.owner.username} `);
    }
  }, [comment]);

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = dataUser;

  const { loading: loadingPost, error: errorPost, data: dataPost } = useQuery(SINGLE_POST_QUERY, {
    variables: { where: { id: parentPost.id } },
  });

  const { loading: loadingPostComments, error: errorPostComments, data: dataPostComments } = useQuery(POST_COMMENTS_QUERY, {
    variables: { where: { id: parentPost.id } },
  });

  const loading = loadingUser || loadingPost;

  const parentPostObject = { connect: { id: parentPost.id } };
  const parentUpdateObject = parentUpdate ? { connect: { id: parentUpdate.id } } : null;
  const parentCommentObject = parentCommentForDB ? { connect: { id: parentCommentForDB.id } } : null;

  // MUTATIONS
  const [createOneComment, { loading: loadingMutation }] = useMutation(CREATE_COMMENT_MUTATION, {
    onError: (error) => {
      console.log('something went wrong either creating post or notifications', error);
      // Alert.alert('Oh no!', 'An error occured when trying to create this post. Try again later!', [
      //   { text: 'OK', onPress: () => console.log('OK Pressed') },
      // ]);
    },
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

  const post = dataPost.post;

  // optimistic response will throw an error if the comments query hasn't been called yet
  // const useOptimisticResponse = dataPostComments ? !!dataPostComments.post.comments : false;

  // CUSTOM FUNCTIONS
  const handleSubmit = async () => {
    const message = validateInputs();
    // if missing a required field, Alert user
    if (message) {
      Alert.alert('Please add a comment or image', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      return;
    }

    try {
      navigation.goBack();
      const uploadedImage = await uploadImage();
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [
      //       { name: 'Home' },
      //       {
      //         name: 'Post',
      //         params: { post: parentPost },
      //       },
      //     ],
      //   })
      // );

      if (!loadingMutation) {
        createOneComment({
          variables: {
            data: {
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
          refetchQueries: () => [{ query: POST_COMMENTS_QUERY, variables: { where: { id: parentPost.id } } }],
        });
      }
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
    if (image) {
      setUploading(true);

      const uploadedImage = await postPicUpload(userLoggedIn, image);
      setUploading(false);
      // setImage(uploadedImage);
      return uploadedImage;
    }
    return '';
  };

  const handleMentionSelect = (usernameClicked) => {
    setContent((prevState) => {
      // see if the string ends in a mention
      const re = /\B@\w+$/g;
      const mentions = prevState.match(re);

      // if it does, remove the partial mention, add in the full mention
      if (mentions && mentions.length > 0) {
        const mentionToSearch = mentions[0].substr(1).toLowerCase();
        const startOfString = prevState.substr(0, prevState.length - mentionToSearch.length);

        return `${startOfString}${usernameClicked} `;
      }
      return prevState;
    });
  };

  const onPressHashtag = () => {
    setContent((prevState) => {
      const beg = prevState.substring(0, cursorLocation);
      const end = prevState.substring(cursorLocation);

      return `${beg}#${end}`;
    });
  };

  const onPressMention = () => {
    setContent((prevState) => {
      const beg = prevState.substring(0, cursorLocation);
      const end = prevState.substring(cursorLocation);

      return `${beg}@${end}`;
    });
  };

  const handleCameraIconPress = () => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
    })
      .then((img) => {
        setImage(img.path);
      })
      .catch((e) => console.log(e));
  };

  const validateInputs = () => {
    if (!content && !image) return 'Oops';
    return null;
  };

  // RENDER FUNCTIONS

  const renderPost = () => {
    // if its just a stand-alone Post
    if (!isUpdate) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
        >
          <Post post={post} currentTime={currentTime} navigation={navigation} hideButtons showThread />
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
            lessTopPadding
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
                  lessTopPadding
                  hideButtons
                  disableVideo
                  showThread
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
        showThread={!isComment}
        lessTopPadding
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
                    multiline
                    scrollEnabled={false}
                    textAlignVertical="top"
                    placeholder="Start your comment"
                    inputAccessoryViewID="1"
                    keyboardType="twitter"
                    onSelectionChange={({ nativeEvent }) => setCursorLocation(nativeEvent.selection.end)}
                  >
                    <CoolText>{content}</CoolText>
                  </TextInput>
                </View>
                {!!image && (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingRight: 10 }}>
                    <View style={{ ...styles.image, width: '100%' }}>
                      <FitImage source={{ uri: image }} />
                      <View style={styles.removeImageButton}>
                        <Icon name="times" solid size={15} color="white" onPress={() => setImage('')} />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>

        <InputAccessoryView nativeID="1">
          {mentionText ? (
            <MentionsSelect mentionText={mentionText} handleMentionSelect={handleMentionSelect} />
          ) : (
            <View style={styles.aboveKeyboard}>
              <TouchableOpacity onPress={() => null} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <Text style={{ ...defaultStyles.hugeBold, color: colors.purp, opacity: 0.7, paddingRight: 27 }}>GIF</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCameraIconPress} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <Icon name="image" size={22} color={colors.purp} style={{ paddingRight: 30, opacity: 0.7 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressMention} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <Icon name="at" size={18} color={colors.purp} style={{ paddingRight: 26, opacity: 0.7 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressHashtag} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <Icon name="hashtag" size={18} color={colors.purp} style={{ paddingRight: 10, opacity: 0.7 }} />
              </TouchableOpacity>
            </View>
          )}
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
    justifyContent: 'flex-end',
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

export default AddCommentModal;
