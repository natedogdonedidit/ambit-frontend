import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  InputAccessoryView,
  TextInput,
  Button,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import UPDATE_STORY_MUTATION from 'library/mutations/UPDATE_STORY_MUTATION';
import { createThumbnail, storyPicUpload, storyVideoUpload } from 'library/utils';
import { useMutation } from '@apollo/client';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import Loader from 'library/components/UI/Loader';

const BAR_HEIGHT = 44;

const CapturedStoryItem = ({
  navigation,
  userId,
  isIntro,
  intro,
  capturedImage,
  capturedVideo,
  setCapturedVideo,
  setCapturedImage,
}) => {
  const insets = useSafeAreaInsets();
  const videoRef = useRef(null);
  const textInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textFocused, setTextFocused] = useState(false);

  useEffect(() => {
    if (textInputRef.current) {
      if (textFocused) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [textFocused]);

  // MUTATIONS FOR INTRO
  const [updateStory] = useMutation(UPDATE_STORY_MUTATION);

  // CUSTOM FUNCTIONS
  const clearCapturedItem = () => {
    setCapturedImage(null);
    setCapturedVideo(null);
  };

  const handleSendTo = () => {
    navigation.navigate('PostToModal', { capturedImage, capturedVideo, textInput });
  };

  const handleSaveIntro = async () => {
    if (isIntro && intro) {
      setUploading(true);
      let newItem = null;

      // upload media
      if (capturedImage && capturedImage.uri) {
        try {
          const uploadedImage = await storyPicUpload(userId, capturedImage.uri);
          // console.log(uploadedImage);

          const itemForMutation = {
            type: 'IMAGE',
            url: uploadedImage,
            preview: uploadedImage,
            text: textInput,
          };

          newItem = { ...itemForMutation };
        } catch (e) {
          setUploading(false);
          console.log(e);
          Alert.alert('Oh no!', 'An error occured when trying to upload your photo. Try again later!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      } else if (capturedVideo && capturedVideo.uri) {
        try {
          const uploadedVideo = await storyVideoUpload(userId, capturedVideo.uri);

          // create preview URL for video thumbnail by inserting "so_0.0"
          const preview = createThumbnail(uploadedVideo.url);

          const itemForMutation = {
            type: 'VIDEO',
            url: uploadedVideo.url,
            preview,
            duration: uploadedVideo.duration,
            text: textInput,
          };

          newItem = { ...itemForMutation };
        } catch (e) {
          setUploading(false);
          console.log(e);
          Alert.alert('Oh no!', 'An error occured when trying to upload your video. Try again later!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      // run the mutation
      if (newItem) {
        const deleteArray = intro.items.length > 0 ? [{ id: intro.items[0].id }] : null;
        try {
          await updateStory({
            variables: {
              where: { id: intro.id },
              data: {
                lastUpdated: new Date(),
                items: {
                  delete: deleteArray, // delete the previous intro
                  create: [newItem],
                },
              },
            },
            refetchQueries: () => [{ query: CURRENT_USER_QUERY }],
          });

          navigation.goBack();
        } catch (e) {
          setUploading(false);
          console.log(e);
          Alert.alert('Oh no!', 'An error occured when trying to create this intro. Try again later!', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }
      setUploading(false);
    }
  };

  const handleTextButton = () => {
    setTextFocused((prev) => !prev);
  };

  // RENDER FUNCTIONS
  const renderMedia = () => {
    if (capturedImage && capturedImage.uri) {
      return <Image source={{ uri: capturedImage.uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />;
    }

    if (capturedVideo && capturedVideo.uri) {
      return (
        <Video
          source={{ uri: capturedVideo.uri }}
          ref={videoRef}
          style={{ height: '100%', width: '100%' }}
          resizeMode="cover"
          repeat
        />
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      {renderMedia()}

      <TouchableOpacity
        activeOpacity={0.8}
        style={{ ...styles.clearButton, top: insets.top + 15 }}
        onPress={clearCapturedItem}
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      >
        <Feather name="x" size={24} color={colors.white} style={{ paddingTop: 2, paddingLeft: 1 }} />
      </TouchableOpacity>

      {isIntro ? (
        <View style={{ ...styles.sendButton, bottom: insets.bottom + 30 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleSaveIntro} style={styles.saveButtonView}>
            <Text style={{ ...defaultStyles.hugeMedium, color: colors.white }}>Save Intro</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ ...styles.sendButton, bottom: insets.bottom + 30 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleSendTo} style={styles.sendButtonView}>
            <Text style={{ ...defaultStyles.hugeMedium, color: colors.white }}>Share to</Text>
            <Feather name="chevron-right" size={30} color={colors.white} style={{ paddingTop: 4 }} />
          </TouchableOpacity>
        </View>
      )}

      <View style={{ ...styles.sideButtons, top: insets.top + 15 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideButton}
          onPress={handleTextButton}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        >
          <Feather name="type" size={24} color={colors.white} style={{ paddingTop: 2, paddingLeft: 1 }} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideButton}
          onPress={() => null}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        >
          <Feather name="link" size={24} color={colors.white} style={{ paddingTop: 2, paddingLeft: 1 }} />
        </TouchableOpacity>
      </View>
      {!!textInput && (
        <TouchableOpacity onPress={handleTextButton} style={{ ...styles.textDisplay, bottom: insets.bottom + 30 }}>
          <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>{textInput}</Text>
        </TouchableOpacity>
      )}

      {uploading && <Loader loading={uploading} size="small" />}
      {textFocused && (
        <InputAccessoryView backgroundColor="#fffffff7">
          <View style={styles.textInputContainer}>
            <TextInput
              ref={textInputRef}
              style={styles.textInput}
              onChangeText={(text) => {
                setTextInput(text);
              }}
              value={textInput}
              placeholder="Add text to your story..."
            />
            <Button
              onPress={() => {
                handleTextButton();
              }}
              title="Done"
            />
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.storyButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    ...defaultStyles.shadowButton,
  },
  sendButton: {
    position: 'absolute',
    bottom: 30,
    right: 10,

    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 14,
  },
  sendButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.purp,
    paddingRight: 6,
    paddingLeft: 16,
    ...defaultStyles.shadowButton,
    // paddingVertical: 8,
  },
  saveButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.purp,
    paddingRight: 16,
    paddingLeft: 16,
    ...defaultStyles.shadowButton,
    // paddingVertical: 8,
  },
  sideButtons: {
    position: 'absolute',
    top: 30,
    right: 10,
    alignItems: 'center',
  },
  sideButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.storyButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    ...defaultStyles.shadowButton,
  },
  textDisplay: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 150,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 10,
    borderRadius: 25,
  },

  // text input
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: BAR_HEIGHT,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
  },
  text: {
    padding: 10,
    color: 'white',
  },
  textBubbleBackground: {
    backgroundColor: '#2f7bf6',
    borderRadius: 20,
    width: 110,
    margin: 20,
  },
});

export default CapturedStoryItem;
