import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Alert, Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { introPicUpload, introVideoUpload } from 'library/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

const flashModeOrder = {
  auto: 'off',
  off: 'on',
  on: 'auto',
};

const CameraModalIntro = ({ navigation, route }) => {
  // STATE
  const [newStoryItem, setNewStoryItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [flashMode, setFlashMode] = useState('auto');
  const [direction, setDirection] = useState('back');
  const [mode, setMode] = useState('photo');
  const [recording, setRecording] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);

  const cameraRef = useRef(null);
  const videoRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      if (data.uri) {
        setCapturedImage(data);
      }
    }
  };

  const takeVideo = async () => {
    if (cameraRef && !recording) {
      const options = {
        mute: false,
        maxDuration: 10,
        quality: RNCamera.Constants.VideoQuality['720p'], // 288p, 480p, 720p, 1080p, 2160p
      };

      try {
        const promise = cameraRef.current.recordAsync(options);

        if (promise) {
          setRecording(true);
          const data = await promise;
          console.log(data);
          setCapturedVideo(data);
        }
      } catch (e) {
        console.error(e);
        setRecording(false);
      }
    }
  };

  const stopVideo = async () => {
    await cameraRef.current.stopRecording();
    setRecording(false);
  };

  const toggleMode = () => {
    setMode(mode === 'photo' ? 'video' : 'photo');
  };

  const toggleFlash = () => {
    setFlashMode(flashModeOrder[flashMode]);
  };

  const toggleDirection = () => {
    setDirection(direction === 'back' ? 'front' : 'back');
  };

  const clearCapturedItem = () => {
    setCapturedImage(null);
    setCapturedVideo(null);
  };

  const handleSendTo = () => {
    navigation.navigate('PostToModal', { capturedImage, capturedVideo });
  };

  const renderSnapButton = () => {
    if (mode === 'photo') {
      return <TouchableOpacity onPress={takePicture} style={styles.snapButton} />;
    }

    if (mode === 'video') {
      if (recording) {
        return (
          <TouchableOpacity onPress={stopVideo} style={styles.snapButton}>
            <View style={{ width: 16, height: 16, borderRadius: 1, backgroundColor: 'red' }} />
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity onPress={takeVideo} style={styles.snapButton}>
          <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: 'red' }} />
        </TouchableOpacity>
      );
    }
  };

  if (capturedImage) {
    if (capturedImage.uri) {
      return (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: capturedImage.uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />

          <View style={styles.clearButton}>
            <TouchableOpacity onPress={clearCapturedItem}>
              <Feather name="x" size={30} color={colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.sendButton}>
            <TouchableOpacity onPress={handleSendTo} style={styles.sendButtonView}>
              <Text style={{ ...defaultStyles.largeMedium }}>Post to</Text>
              <Feather name="chevron-right" size={26} color={colors.purp} style={{ paddingTop: 4 }} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  if (capturedVideo) {
    if (capturedVideo.uri) {
      return (
        <View style={{ flex: 1 }}>
          <Video
            source={{ uri: capturedVideo.uri }}
            ref={videoRef}
            style={{ height: '100%', width: '100%' }}
            resizeMode="cover"
            repeat
          />

          <View style={styles.clearButton}>
            <TouchableOpacity onPress={clearCapturedItem}>
              <Feather name="x" size={30} color={colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.sendButton}>
            <TouchableOpacity onPress={handleSendTo} style={styles.sendButtonView}>
              <Text style={{ ...defaultStyles.hugeRegular }}>Post to</Text>
              <Feather name="chevron-right" size={30} color={colors.purp} style={{ paddingTop: 4 }} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <RNCamera ref={cameraRef} style={{ flex: 1, width: '100%' }} type={direction} flashMode={flashMode} keepAudioSession />
      <View style={styles.controls}>
        <View style={styles.controlsLeft}>
          <TouchableOpacity onPress={() => null} style={{ paddingRight: 40 }} activeOpacity={0.7}>
            <Feather name="square" size={26} color={colors.white} style={{ textAlign: 'center', paddingTop: 1 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFlash} activeOpacity={0.7}>
            <View>
              <Feather
                name={flashMode === 'off' ? 'zap-off' : 'zap'}
                size={26}
                color={colors.white}
                solid
                style={{ textAlign: 'center', paddingTop: 1 }}
              />
              {flashMode === 'auto' && (
                <View style={styles.autoText}>
                  <Text style={{ ...defaultStyles.smallBold, color: colors.white }}>A</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {renderSnapButton()}
        <View style={styles.controlsRight}>
          <TouchableOpacity onPress={toggleDirection} style={{ paddingRight: 40 }} activeOpacity={0.7}>
            <Feather name="refresh-cw" size={26} color={colors.white} style={{ textAlign: 'center', paddingTop: 1 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMode} activeOpacity={0.7}>
            <Feather
              name={mode === 'photo' ? 'video' : 'camera'}
              size={26}
              color={colors.white}
              solid
              style={{ textAlign: 'center', paddingTop: 1 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CameraModalIntro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    // backgroundColor: 'rgba(0,0,0,0.1)',
    paddingBottom: 60,
  },
  snapButton: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: colors.white,
    borderWidth: 6,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  controlsLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  autoText: {
    position: 'absolute',
    bottom: -2,
    right: -1,
  },
  clearButton: {
    position: 'absolute',
    top: 24,
    left: 10,
  },
  sendButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  sendButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    paddingRight: 6,
    paddingLeft: 16,
    // ...defaultStyles.shadow6,
    // paddingVertical: 8,
  },
});

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

// useEffect(() => {
//   if (!newStoryItem) {
//     addNewVideo();
//   }
// }, []);

// ADD MEDIA
// const addNewVideo = () => {
//   ImagePicker.openCamera({
//     mediaType: 'video',
//     useFrontCamera: true,
//     includeExif: true,
//   }).then(async recordedVideo => {
//     console.log(recordedVideo);

//     setUploading(true);
//     try {
//       // 1. upload video. Divide into 10s incrememnts?
//       const uploadedVideo = await introVideoUpload(user.id, recordedVideo.path);
//       // console.log('uploaded video', uploadedVideo);
//       const newStoryItem = {
//         type: 'video',
//         url: uploadedVideo.url,
//         text: '',
//         link: '',
//         duration: uploadedVideo.duration,
//         owner: { connect: { id: user.id } },
//       };
//       // 2 add video to story
//       setNewStoryItem(newStoryItem);
//       setUploading(false);
//     } catch (e) {
//       setUploading(false);
//       console.log(e);
//       Alert.alert('Oh no!', 'We could not upload your video. Try again later!', [
//         { text: 'OK', onPress: () => console.log('OK Pressed') },
//       ]);
//     }
//   });
// };

// const addNewPhoto = () => {
//   ImagePicker.openCamera({
//     mediaType: 'photo',
//     useFrontCamera: true,
//     includeExif: true,
//   }).then(async img => {
//     // 1. upload image
//     setUploading(true);
//     try {
//       const uploadedImage = await introPicUpload(user.id, img.path);
//       // console.log('uploaded image', uploadedImage);
//       const newStoryItem = { type: 'photo', url: uploadedImage, text: '', link: '', owner: { connect: { id: user.id } } };
//       // add image to story
//       setNewStoryItem(newStoryItem);
//       setUploading(false);
//     } catch (e) {
//       setUploading(false);
//       Alert.alert('Oh no!', 'We could not upload your picture. Try again later!', [
//         { text: 'OK', onPress: () => console.log('OK Pressed') },
//       ]);
//     }
//   });
// };

// const loading = loadingMutation || uploading;
