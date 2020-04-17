import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import ImageScalable from 'react-native-scalable-image';
import { useMutation } from '@apollo/react-hooks';
import move from 'lodash-move';
import Video from 'react-native-video';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import GrayButton from 'library/components/UI/buttons/GrayButton';
import { introPicUpload, introVideoUpload, createThumbnail } from 'library/utils';
import EDIT_INTRO_MUTATION from 'library/mutations/EDIT_INTRO_MUTATION';
import Loader from 'library/components/UI/Loader';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';

const CreateIntroModal = ({ navigation, route }) => {
  const { userLoggedIn: user } = route.params;
  // remove id and __typename from intro items
  const currentIntroItems = user.intro
    ? user.intro.items.map(item => {
        delete item.id;
        delete item.__typename;
        return item;
      })
    : [];

  // ////////////////////////////////////////
  // STATE
  // ////////////////////////////////////////
  const [storyTitle, setStoryTitle] = useState('My Intro');
  const [storyItems, setStoryItems] = useState(currentIntroItems || []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [uploading, setUploading] = useState(false);

  console.log(storyItems);

  const videoRef = useRef(null);
  const isEmpty = storyItems.length < 1;

  // ////////////////////////////////////////
  // MUTAION
  // ////////////////////////////////////////
  const [editIntro, { loading: loadingMutation, error, data }] = useMutation(EDIT_INTRO_MUTATION, {
    variables: {
      userId: user.id,
      title: storyTitle,
      items: storyItems,
    },
    onCompleted: () => {
      navigation.goBack();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to create your story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const handleBack = () => {
    Alert.alert('Are you sure you want to leave?', 'All changes will be lost', [
      {
        text: 'Yes',
        onPress: () => {
          cleanupStuff();
          navigation.goBack();
        },
      },
      { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
    ]);
  };

  const handleSave = () => {
    Alert.alert('Are you sure you want to save this intro?', 'Your previous intro will be overwritten', [
      { text: 'Yes', onPress: () => editIntro() },
      { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
    ]);
  };

  const cleanupStuff = () => {
    // this is so video doesnt keep playing when you navigate somewhere else
    // videoRef.current.seek(0);
    setIsPaused(true);
  };

  // if the activeIndex changes always reset the current time to zero
  useEffect(() => {
    setIsPaused(false);
  }, [activeIndex]);

  // ////////////////////////////////////////
  // MODIFY ITEMS
  // ////////////////////////////////////////
  const removeStoryItem = () => {
    if (activeIndex === null) return;
    const newArray = [...storyItems];
    newArray.splice(activeIndex, 1);
    setStoryItems([...newArray]);
    setActiveIndex(0);
  };

  const changeOrder = direction => {
    // adjust array order
    if (direction === 'up' && activeIndex !== 0) {
      const fromIndex = activeIndex;
      const toIndex = activeIndex - 1;
      const newArray = move([...storyItems], fromIndex, toIndex);
      setStoryItems(newArray);
      setActiveIndex(activeIndex - 1);
    }
    if (direction === 'down' && activeIndex !== storyItems.length - 1) {
      const fromIndex = activeIndex;
      const toIndex = activeIndex + 1;
      const newArray = move([...storyItems], fromIndex, toIndex);
      setStoryItems(newArray);
      setActiveIndex(activeIndex + 1);
    }
  };

  // ////////////////////////////////////////
  // ADD MEDIA
  // ////////////////////////////////////////
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
        const preview = createThumbnail(uploadedVideo.url);

        const newStoryItem = {
          type: 'VIDEO',
          url: uploadedVideo.url,
          preview,
          text: '',
          link: '',
          duration: uploadedVideo.duration,
          owner: { connect: { id: user.id } },
        };
        // 2 add video to story
        setStoryItems([...storyItems, newStoryItem]);
        setActiveIndex(storyItems.length);
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
        const newStoryItem = {
          type: 'IMAGE',
          url: uploadedImage,
          preview: uploadedImage,
          text: '',
          link: '',
          owner: { connect: { id: user.id } },
        };
        // add image to story
        setStoryItems([...storyItems, newStoryItem]);
        setActiveIndex(storyItems.length);
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
  const renderStoryItems = () => {
    if (isEmpty) return null;
    return storyItems.map((item, i) => {
      if (item.type === 'IMAGE') {
        return (
          <TouchableOpacity key={i} onPress={() => setActiveIndex(i)}>
            <View
              style={[{ ...styles.image, marginRight: 8 }, activeIndex === i && { borderWidth: 3, borderColor: colors.purp }]}
            >
              <ImageScalable source={{ uri: item.url }} height={90} />
            </View>
          </TouchableOpacity>
        );
      }
      if (item.type === 'VIDEO') {
        return (
          <TouchableOpacity key={i} onPress={() => setActiveIndex(i)}>
            <View
              style={[{ ...styles.image, marginRight: 8 }, activeIndex === i && { borderWidth: 3, borderColor: colors.purp }]}
            >
              <Video source={{ uri: item.url }} resizeMode="cover" ref={videoRef} style={{ height: 90, width: 70 }} paused />
              <View style={styles.duration}>
                <Text style={{ ...defaultStyles.smallBold, color: 'white' }}>{Math.ceil(item.duration)} s</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };

  const renderStory = () => {
    if (storyItems.length < 1)
      return (
        <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ ...defaultStyles.defaultMedium, color: 'white', padding: 15, textAlign: 'center' }}>
            Add a picture or video to create your intro
          </Text>
        </View>
      );
    const activeItem = storyItems[activeIndex];
    if (activeItem.type === 'IMAGE') {
      return <Image source={{ uri: activeItem.url }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />;
    }
    if (activeItem.type === 'VIDEO') {
      return (
        <Video
          source={{ uri: activeItem.url }}
          ref={videoRef}
          style={{ height: '100%', width: '100%' }}
          resizeMode="cover"
          paused={isPaused}
        />
      );
    }
  };

  const loading = loadingMutation || uploading;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBackBlank
        navigation={navigation}
        // title={warning}
        rightComponent={<ButtonHeader onPress={handleSave}>Save</ButtonHeader>}
      />

      <View style={{ width: '100%', paddingHorizontal: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              ...defaultStyles.headerLarge,
            }}
          >
            My Intro
          </Text>
          {!isEmpty && (
            <TouchableOpacity
              onPress={() => {
                cleanupStuff();
                navigation.navigate('StoryModal', {
                  isPreview: true,
                  story: { title: storyTitle, items: storyItems },
                });
              }}
            >
              <Text style={{ ...defaultStyles.hugeMedium, color: colors.purp, paddingLeft: 20 }}>Preview</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>
          Your intro is a story that describes who you are and what you're working on
        </Text> */}
      </View>

      <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 15 }}>
        <View style={{ backgroundColor: 'white', ...defaultStyles.shadow6, borderRadius: 10 }}>
          <View
            style={{
              width: 200,
              height: 300,
              borderRadius: 10,
              backgroundColor: colors.blueGray,
              overflow: 'hidden',
            }}
          >
            {renderStory()}
          </View>
        </View>

        {!isEmpty && (
          <View style={{ alignSelf: 'stretch', width: 40, alignItems: 'center' }}>
            <View>
              <TouchableOpacity
                style={{ paddingBottom: 15 }}
                onPress={null}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              >
                <Icon name="font" size={20} color={colors.blueGray} solid />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingBottom: 15 }}
                onPress={null}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              >
                <Icon name="link" size={20} color={colors.blueGray} solid />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{ paddingBottom: 15 }}
                onPress={() => changeOrder('up')}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              >
                <Icon name="arrow-left" size={20} color={colors.blueGray} solid />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingBottom: 15 }}
                onPress={() => changeOrder('down')}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              >
                <Icon name="arrow-right" size={20} color={colors.blueGray} solid />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingBottom: 15 }}
                onPress={removeStoryItem}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              >
                <Icon name="trash-alt" size={20} color={colors.peach} solid />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {!isEmpty && (
        <Text style={{ ...defaultStyles.largeRegular, paddingLeft: 15, paddingTop: 30 }}>Select an item to edit:</Text>
      )}

      <ScrollView
        horizontal
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        style={{ width: '100%' }}
        contentContainerStyle={{ flexDirection: 'row', paddingLeft: 15, height: 100, paddingTop: 5, alignItems: 'center' }}
      >
        {renderStoryItems()}
      </ScrollView>

      <View style={styles.bottomButtons}>
        <View style={{ flex: 1, paddingRight: 15 }}>
          <GrayButton onPress={addNewPhoto} buttonStyle={{ height: 60, borderRadius: 30 }}>
            Add Photo
          </GrayButton>
        </View>

        <View style={{ flex: 1 }}>
          <GrayButton onPress={addNewVideo} buttonStyle={{ height: 60, borderRadius: 30 }}>
            Add Video
          </GrayButton>
        </View>
      </View>

      {loading && <Loader active={loading} />}
    </View>
  );
};

export default CreateIntroModal;

const styles = StyleSheet.create({
  bottomButtons: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
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
    top: 4,
    right: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGray1,
    opacity: 0.9,
    height: 24,
    width: 24,
    borderRadius: 12,
    ...defaultStyles.shadow3,
  },
  duration: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGray1,
    opacity: 0.9,
    height: 24,
    minWidth: 24,
    // width: 24,
    paddingHorizontal: 5,
    borderRadius: 12,
    ...defaultStyles.shadow3,
  },
});
