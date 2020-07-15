import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Alert, Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CameraRoll from '@react-native-community/cameraroll';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeArea } from 'react-native-safe-area-context';

import ImagePicker from 'react-native-image-crop-picker';
import { RNCamera } from 'react-native-camera';
import { useLazyQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { introPicUpload, introVideoUpload } from 'library/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CameraControls from 'library/components/camera/CameraControls';
import CapturedStoryItem from 'library/components/camera/CapturedStoryItem';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import Loader from 'library/components/UI/Loader';
import EditIntro from 'library/components/camera/EditIntro';

const flashModeOrder = {
  auto: 'off',
  off: 'on',
  on: 'auto',
};

const CameraModal = ({ navigation, route }) => {
  const insets = useSafeArea();

  // params
  const { isIntro } = route.params;

  // STATE
  // const [newStoryItem, setNewStoryItem] = useState(null);
  // const [uploading, setUploading] = useState(false);
  const [flashMode, setFlashMode] = useState('auto');
  const [direction, setDirection] = useState('back');
  const [mode, setMode] = useState('photo');
  const [recording, setRecording] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);
  const [showEditIntro, setShowEditIntro] = useState(false);
  const [firstImage, setFirstImage] = useState(null);

  const cameraRef = useRef(null);

  // get intro from cache
  const [getUser, { loading, error, data }] = useLazyQuery(CURRENT_USER_QUERY, { fetchPolicy: 'cache-first' });

  // only run the getUser query if we need the intro
  useEffect(() => {
    if (isIntro) {
      getUser();
    }
  }, []);

  // get first photo from camera roll
  useEffect(() => {
    const getFirstPhoto = async () => {
      try {
        const res = await CameraRoll.getPhotos({ first: 1, assetType: 'photos' });
        const firstImg = res.edges[0].node.image.uri;
        setFirstImage(firstImg);
      } catch (e) {
        console.log(e);
      }
    };
    getFirstPhoto();
  }, []);

  const handleCameraRollButton = () => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      // loadingLabelText: 'Uploading files',
    })
      .then((mediaSelected) => {
        console.log(mediaSelected);
        const isImage = mediaSelected.mime.startsWith('image');
        const isVideo = mediaSelected.mime.startsWith('video');

        if (isImage) {
          setCapturedImage({ uri: mediaSelected.path });
        } else if (isVideo) {
          if (mediaSelected.duration < 31000) {
            setCapturedVideo({ uri: mediaSelected.path });
          } else {
            Alert.alert('Oh no!', 'Please select a video 30 seconds or less!', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          }
        }
      })
      .catch((e) => alert(e));
  };

  if (isIntro && loading) {
    return <Loader loading={loading} size="small" backgroundColor="transparent" />;
  }
  if (isIntro && error) {
    navigation.goBack();
    return null;
  }

  const renderCurrentIntro = () => {
    if (isIntro && !loading && data) {
      const { userLoggedIn } = data;
      const { intro } = userLoggedIn;

      if (intro.items) {
        return (
          <View style={{ position: 'absolute', top: 30, right: 12, width: 45, height: 70, borderRadius: 10 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('IntroModal', {
                  intro,
                })
              }
            >
              <Image
                style={{ width: 45, height: 70, borderRadius: 10 }}
                source={{ uri: intro.items[0].preview || '' }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        );
      }
    }
    return null;
  };

  // if a image/video has been taken -> show preview component
  if ((capturedImage && capturedImage.uri) || (capturedVideo && capturedVideo.uri)) {
    // if this is a story -> show story Preview screen
    if (isIntro) {
      const { userLoggedIn } = data;
      const { id, intro } = userLoggedIn;
      return (
        <CapturedStoryItem
          navigation={navigation}
          userId={id}
          isIntro
          intro={intro}
          capturedImage={capturedImage}
          capturedVideo={capturedVideo}
          setCapturedVideo={setCapturedVideo}
          setCapturedImage={setCapturedImage}
        />
      );
    }
    return (
      <CapturedStoryItem
        navigation={navigation}
        userId={null}
        isIntro={false}
        intro={null}
        capturedImage={capturedImage}
        capturedVideo={capturedVideo}
        setCapturedVideo={setCapturedVideo}
        setCapturedImage={setCapturedImage}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <RNCamera ref={cameraRef} style={{ flex: 1, width: '100%' }} type={direction} flashMode={flashMode} keepAudioSession />
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['transparent', 'rgba(0,0,0,0.5)']}
        style={{ ...styles.linearGradientBottom, height: insets.bottom + 170 }}
      />
      <CameraControls
        cameraRef={cameraRef}
        setCapturedImage={setCapturedImage}
        setCapturedVideo={setCapturedVideo}
        recording={recording}
        setRecording={setRecording}
        mode={mode}
        setMode={setMode}
        flashMode={flashMode}
        setFlashMode={setFlashMode}
        flashModeOrder={flashModeOrder}
        direction={direction}
        setDirection={setDirection}
        handleCameraRollButton={handleCameraRollButton}
        firstImage={firstImage}
      />
      {isIntro && (
        <View style={{ position: 'absolute', top: 30, left: 15 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.sideButton}
            onPress={() => navigation.navigate('IntroInfoPopup')}
            hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          >
            <Icon name="question" solid size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
      {renderCurrentIntro()}
    </View>
  );
};

export default CameraModal;

const styles = StyleSheet.create({
  linearGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 170,
    width: '100%',
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
