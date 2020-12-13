import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  InputAccessoryView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useMutation } from '@apollo/client';
import { CommonActions } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FitImage from 'react-native-fit-image';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBack from 'library/components/headers/HeaderBack';
import PostGroupTL from 'library/components/post/PostGroupTL';
import ProfilePic from 'library/components/UI/ProfilePic';
import UPDATE_POST_MUTATION from 'library/mutations/UPDATE_POST_MUTATION';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import CoolText from 'library/components/UI/CoolText';
import { postPicUpload } from 'library/utils';
import Loader from 'library/components/UI/Loader';
import MentionsSelect from 'library/components/MentionsSelect';

const AddUpdateModal = ({ navigation, route }) => {
  // params
  const { post } = route.params;

  // state declaration
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [mentionText, setMentionText] = useState('');
  const [cursorLocation, setCursorLocation] = useState(0);

  const currentTime = new Date();

  // MUTATIONS
  const [updateOnePost, { loading: loadingMutation }] = useMutation(UPDATE_POST_MUTATION, {
    onError: (error) => {
      console.log('something went wrong either creating post or notifications', error);
      // Alert.alert('Oh no!', 'An error occured when trying to create this post. Try again later!', [
      //   { text: 'OK', onPress: () => console.log('OK Pressed') },
      // ]);
    },
  });

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

  const uploadImage = async () => {
    if (image) {
      setUploading(true);

      const uploadedImage = await postPicUpload('', image);
      setUploading(false);
      // setupdateImage(uploadedImage);
      return uploadedImage;
    }
    return '';
  };

  const handleSubmit = async () => {
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
      //         params: { post },
      //       },
      //     ],
      //   })
      // );

      if (!loadingMutation) {
        updateOnePost({
          variables: {
            where: { id: post.id },
            data: {
              updates: {
                create: [
                  {
                    content,
                    image: uploadedImage,
                  },
                ],
              },
            },
          },
          refetchQueries: () => [{ query: SINGLE_POST_QUERY, variables: { where: { id: post.id } } }],
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
        Alert.alert('Oh no!', 'An error occured when trying to create this update. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
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

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} handleRight={handleSubmit} textRight="Add" title="Update Goal" solidRight />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
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
                <View style={{ paddingTop: 2, paddingBottom: 10 }}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(val) => setContent(val)}
                    autoFocus
                    autoCompleteType="off"
                    multiline
                    scrollEnabled={false}
                    textAlignVertical="top"
                    placeholder="What's your update?"
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
});

export default AddUpdateModal;
