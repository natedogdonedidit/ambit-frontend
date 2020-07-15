import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import UPDATE_STORY_MUTATION from 'library/mutations/UPDATE_STORY_MUTATION';
import { createThumbnail, storyPicUpload, storyVideoUpload } from 'library/utils';
import { useMutation } from '@apollo/react-hooks';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import Loader from 'library/components/UI/Loader';

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
  const videoRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // MUTATIONS FOR INTRO
  const [updateStory] = useMutation(UPDATE_STORY_MUTATION);

  // CUSTOM FUNCTIONS
  const clearCapturedItem = () => {
    setCapturedImage(null);
    setCapturedVideo(null);
  };

  const handleSendTo = () => {
    navigation.navigate('PostToModal', { capturedImage, capturedVideo });
  };

  const handleSaveIntro = async () => {
    if (isIntro && intro) {
      setUploading(true);
      let newItem = null;

      // upload media
      if (capturedImage && capturedImage.uri) {
        try {
          const uploadedImage = await storyPicUpload(userId, capturedImage.uri);
          console.log(uploadedImage);

          const itemForMutation = {
            type: 'IMAGE',
            url: uploadedImage,
            preview: uploadedImage,
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
              id: intro.id,
              story: {
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
        style={styles.clearButton}
        onPress={clearCapturedItem}
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      >
        <Feather name="x" size={24} color={colors.white} style={{ paddingTop: 2, paddingLeft: 1 }} />
      </TouchableOpacity>

      {isIntro ? (
        <View style={styles.sendButton}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleSaveIntro} style={styles.saveButtonView}>
            <Text style={{ ...defaultStyles.hugeMedium, color: colors.white }}>Save Intro</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.sendButton}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleSendTo} style={styles.sendButtonView}>
            <Text style={{ ...defaultStyles.hugeMedium, color: colors.white }}>Share to</Text>
            <Feather name="chevron-right" size={30} color={colors.white} style={{ paddingTop: 4 }} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.sideButtons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideButton}
          onPress={() => null}
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
      {uploading && <Loader loading={uploading} size="small" />}
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
    top: 30,
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
    top: 120,
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
});

export default CapturedStoryItem;
