import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import PostGroupTL from 'library/components/post/PostGroupTL';
import ProfilePic from 'library/components/UI/ProfilePic';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import CREATE_COMMENT_MUTATION from 'library/mutations/CREATE_COMMENT_MUTATION';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import ThreadLine from 'library/components/UI/ThreadLine';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { imageUpload } from 'library/utils';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Post from 'library/components/post/Post';
import Comment from 'library/components/post/Comment';

const CommentScreen = ({ navigation }) => {
  // state declaration\
  const [content, setContent] = useState('');
  const [commentImage, setCommentImage] = useState('');
  const [uploading, setUploading] = useState(false);

  // params
  const clicked = navigation.getParam('clicked', null); // the content that was clicked (post, update, or comment)
  const updateInd = navigation.getParam('updateInd', null);
  const isUpdate = navigation.getParam('isUpdate', false); // if commenting on an Update
  const isComment = navigation.getParam('isComment', false); // if commenting on a Comment

  // / constants
  const currentTime = new Date();
  const parentPost = isUpdate || isComment ? clicked.parentPost : clicked;
  const parentUpdate = isUpdate ? { connect: { id: clicked.id } } : null;
  const hasParentComment = isComment ? !!clicked.parentComment : null;

  let parentComment = null;
  if (isComment && hasParentComment) parentComment = { connect: { id: clicked.parentComment.id } };
  if (isComment && !hasParentComment) parentComment = { connect: { id: clicked.id } };

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = dataUser;

  const { loading: loadingPost, error: errorPost, data: dataPost } = useQuery(SINGLE_POST_QUERY, {
    variables: { id: parentPost.id },
  });
  const { singlePost: post } = dataPost;

  const parentPostObject = isUpdate ? null : { connect: { id: parentPost.id } }; // dont want to attach comment to a parentPost if it has a parentUpdate

  // MUTATIONS
  const [createComment, { loading: loadingCreate }] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      comment: {
        content,
        image: commentImage,
        owner: {
          connect: { id: userLoggedIn.id },
        },
        parentPost: parentPostObject,
        parentUpdate,
        parentComment,
      },
    },
    refetchQueries: () => [{ query: SINGLE_POST_QUERY, variables: { id: parentPost.id } }],
    onCompleted: () => {
      navigation.goBack();
    },
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to create this comment. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // EFFECTS
  useEffect(() => {
    if (content === '' && isComment) {
      setContent(`@${clicked.owner.name}@@ `);
    }
  }, [content]);

  const onChangeText = val => {
    setContent(val);

    // setContent(`<Text style={{ color: 'pink' }}>${val}</Text>`);
  };

  // CUSTOM FUNCTIONS
  const handleSubmit = async () => {
    const message = validateInputs();
    // if missing a required field, Alert user
    if (message) {
      Alert.alert('Please add a comment or image', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      return;
    }
    if (commentImage) {
      await uploadImage();
    }
    createComment();
  };

  // must pass this to camera roll modal
  const handleMediaSelect = (uri, type) => {
    if (type === 'image') {
      setCommentImage(uri);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    try {
      const urls = await imageUpload(userLoggedIn.id, [commentImage]);
      setUploading(false);
      setCommentImage(urls[0]);
    } catch (e) {
      setUploading(false);
      setCommentImage('');
      Alert.alert('Oh no!', 'We could not upload your picture at this time. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const validateInputs = () => {
    if (!content && !commentImage) return 'Oops';
    return null;
  };

  const renderPost = () => {
    // if its just a stand-alone Post
    if (!isUpdate) {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post })}>
          <Post post={post} currentTime={currentTime} navigation={navigation} hideButtons showLine />
        </TouchableOpacity>
      );
    }

    // if showing an update
    return (
      <PostGroupTL post={post} currentTime={currentTime} navigation={navigation} lastOne={updateInd} hideButtons showLastLine />
    );
  };

  const renderComments = () => {
    // if the clicked comment is a stand-alone comment
    if (!hasParentComment) {
      return <Comment comment={clicked} navigation={navigation} currentTime={currentTime} isSubComment showLine hideButtons />;
    }

    // // if the clicked comment is a a sub-comment, show all comments
    const parComment = post.comments.find(comment => comment.id === clicked.parentComment.id);

    return (
      <>
        <Comment
          key={parComment.id}
          comment={parComment}
          navigation={navigation}
          currentTime={currentTime}
          isSubComment
          showLine
          hideButtons
        />
        {parComment.comments.map((subComment, k) => (
          <Comment
            key={subComment.id}
            comment={subComment}
            navigation={navigation}
            currentTime={currentTime}
            isSubComment
            showLine
            hideButtons
          />
        ))}
      </>
    );
  };

  const loading = loadingUser || loadingPost;
  const loadingSubmit = uploading || loadingCreate;

  if (errorUser) return <Error error={errorUser} />;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWhite handleLeft={navigation.goBack} handleRight={handleSubmit} textLeft="Back" textRight="Reply" title="Comment" />
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-between' }} behavior="padding" enabled>
          <ScrollView style={styles.scrollView}>
            {renderPost()}
            {isComment && renderComments()}
            <View style={styles.commentInput}>
              <View style={styles.leftColumn}>
                <ProfilePic size={30} navigation={navigation} user={userLoggedIn} />
              </View>
              <View style={styles.rightColumn}>
                <Text style={defaultStyles.defaultMedium} numberOfLines={1}>
                  {userLoggedIn.name}
                </Text>
                <View style={{ paddingTop: 2, paddingBottom: 10 }}>
                  <TextInput
                    style={{ flex: 1, marginRight: 35, ...defaultStyles.defaultText }}
                    onChangeText={onChangeText}
                    value={content}
                    autoFocus
                    autoCompleteType="off"
                    autoCorrect={false}
                    multiline
                    scrollEnabled={false}
                    textAlignVertical="top"
                    placeholder="Start your comment"
                  />
                </View>
                {!!commentImage && (
                  <View style={styles.media}>
                    <Image style={{ width: '100%', height: 160 }} source={{ uri: commentImage }} resizeMode="cover" />
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          <View style={styles.aboveKeyboard}>
            <TouchableOpacity
              onPress={() => navigation.navigate('RollModal', { handleMediaSelect, assetType: 'Photos' })}
              hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
            >
              <Icon name="image" size={24} color={colors.purp} style={{ paddingRight: 7 }} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      {loadingSubmit && <Loader loading={loadingSubmit} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    // backgroundColor: colors.lightGray,
  },

  // copied in
  commentInput: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 5,
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
  media: {
    width: '100%',
    // height: 240,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 10,
    overflow: 'hidden',
  },
  aboveKeyboard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
});

CommentScreen.navigationOptions = {
  title: 'Comment',
};

export default CommentScreen;
