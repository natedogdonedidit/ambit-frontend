import React, { useState } from 'react';
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
import SINGLE_POST_QUERY from '../../library/queries/SINGLE_POST_QUERY';

const CommentScreen = ({ navigation }) => {
  // state declaration\
  const [content, setContent] = useState('');
  const [commentImage, setCommentImage] = useState('');
  const [uploading, setUploading] = useState(false);

  // constants
  const post = navigation.getParam('post', null); // all the data from parent post down to updates
  const isUpdate = navigation.getParam('isUpdate', false);
  const updateInd = navigation.getParam('updateInd', null);

  // QUERIES - this gets the comments for a
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = dataUser;

  // MUTATIONS
  const [createComment, { loading: loadingCreate }] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      comment: {
        content,
        image: commentImage,
        owner: {
          connect: { id: userLoggedIn.id },
        },
        parentPost: {
          connect: { id: post.id },
        },
      },
    },
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_POST_QUERY,
        data: {
          singlePost: dataReturned.createComment,
        },
      });
    },
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

  const currentTime = new Date();

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

  const loading = uploading || loadingCreate;

  if (errorUser) return <Error error={errorUser} />;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWhite handleLeft={navigation.goBack} handleRight={handleSubmit} textLeft="Back" textRight="Reply" title="Comment" />
      {loadingUser ? (
        <Loader loading={loadingUser} />
      ) : (
        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-between' }} behavior="padding" enabled>
          <ScrollView style={styles.scrollView}>
            <PostGroupTL
              post={post}
              currentTime={currentTime}
              navigation={navigation}
              lastOne={updateInd}
              showAll={!isUpdate}
              showLastLine
            />
            <ThreadLine />
            <View style={styles.comment}>
              <View style={styles.leftColumn}>
                <ProfilePic navigation={navigation} user={userLoggedIn} intro={userLoggedIn.intro} />
              </View>
              <View style={styles.rightColumn}>
                <Text style={defaultStyles.defaultMedium} numberOfLines={1}>
                  {userLoggedIn.name}
                </Text>
                <View style={{ paddingTop: 2, paddingBottom: 10 }}>
                  <TextInput
                    style={{ flex: 1, marginRight: 35, ...defaultStyles.defaultText }}
                    onChangeText={val => setContent(val)}
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

      {loading && <Loader loading={loading} />}
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
  comment: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 3,
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
