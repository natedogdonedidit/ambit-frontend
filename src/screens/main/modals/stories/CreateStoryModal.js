import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Alert, Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { introPicUpload, introVideoUpload } from 'library/utils';

const CreateStoryModal = ({ navigation, route }) => {
  // STATE
  const [newStoryItem, setNewStoryItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  const videoRef = useRef(null);

  // MUTAION
  // const [editIntro, { loading: loadingMutation, error, data }] = useMutation(EDIT_INTRO_MUTATION, {
  //   variables: {
  //     userId: user.id,
  //     title: storyTitle,
  //     items: storyItems,
  //   },
  //   onCompleted: () => {
  //     navigation.goBack();
  //   },
  //   onError: () =>
  //     Alert.alert('Oh no!', 'An error occured when trying to create your story. Try again later!', [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ]),
  // });

  useEffect(() => {
    if (!newStoryItem) {
      addNewVideo();
    }
  }, []);

  // ADD MEDIA
  const addNewVideo = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
      useFrontCamera: true,
      includeExif: true,
    }).then(async recordedVideo => {
      console.log(recordedVideo);

      setUploading(true);
      try {
        // 1. upload video. Divide into 10s incrememnts?
        const uploadedVideo = await introVideoUpload(user.id, recordedVideo.path);
        // console.log('uploaded video', uploadedVideo);
        const newStoryItem = {
          type: 'video',
          url: uploadedVideo.url,
          text: '',
          link: '',
          duration: uploadedVideo.duration,
          owner: { connect: { id: user.id } },
        };
        // 2 add video to story
        setNewStoryItem(newStoryItem);
        setUploading(false);
      } catch (e) {
        setUploading(false);
        console.log(e);
        Alert.alert('Oh no!', 'We could not upload your video. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    });
  };

  const addNewPhoto = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      useFrontCamera: true,
      includeExif: true,
    }).then(async img => {
      // 1. upload image
      setUploading(true);
      try {
        const uploadedImage = await introPicUpload(user.id, img.path);
        // console.log('uploaded image', uploadedImage);
        const newStoryItem = { type: 'photo', url: uploadedImage, text: '', link: '', owner: { connect: { id: user.id } } };
        // add image to story
        setNewStoryItem(newStoryItem);
        setUploading(false);
      } catch (e) {
        setUploading(false);
        Alert.alert('Oh no!', 'We could not upload your picture. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    });
  };

  // ////////////////////////////////////////
  // RENDER FUNCTIONS
  // ////////////////////////////////////////

  // const loading = loadingMutation || uploading;

  return (
    <View>
      <Text>hey</Text>
    </View>
  );
};

export default CreateStoryModal;

const styles = StyleSheet.create({});
