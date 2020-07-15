/* eslint-disable no-await-in-loop */
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import ImageScalable from 'react-native-scalable-image';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { createThumbnail, storyPicUpload, storyVideoUpload } from 'library/utils';
import UPDATE_INTRO_MUTATION from 'library/mutations/UPDATE_INTRO_MUTATION';
import Loader from 'library/components/UI/Loader';

const EditIntro = ({
  navigation,
  userId,
  initialIntro,
  capturedImage,
  capturedVideo,
  setCapturedVideo,
  setCapturedImage,
  setShowEditIntro,
}) => {
  const videoRef = useRef(null);

  const newImage = capturedImage
    ? {
        id: '',
        type: 'IMAGE',
        url: capturedImage.uri,
        preview: capturedImage.uri,
        link: '',
        text: [],
        index: initialIntro.items.length, // add to the end
      }
    : null;

  const newVideo = capturedVideo
    ? {
        id: '',
        type: 'VIDEO',
        url: capturedVideo.uri,
        preview: '',
        link: '',
        text: [],
        index: initialIntro.items.length, // add to the end
      }
    : null;

  const newItem = [];
  if (newImage) {
    newItem.push(newImage);
  } else if (newVideo) {
    newItem.push(newVideo);
  }

  // STATE
  const [newIntro, setNewIntro] = useState([...initialIntro.items, ...newItem]);
  const [activeIndex, setActiveIndex] = useState(newImage || newVideo ? initialIntro.items.length : 0);
  const [itemsToDelete, setItemsToDelete] = useState([]); // put IDs of story items to remove
  const [uploading, setUploading] = useState(false);

  const activeItem = newIntro[activeIndex];
  const isEmpty = newIntro.length < 1;

  console.log(newIntro);
  // console.log(activeItem);

  // UPDATE INTRO MUTATION
  const [updateIntro] = useMutation(UPDATE_INTRO_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to update your intro. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // CUSTOM FUNCTIONS
  const goBack = () => {
    setCapturedImage(null);
    setCapturedVideo(null);
    setShowEditIntro(false);
  };

  // side button actions
  const handleTextButton = () => {};
  const handleLinkButton = () => {};
  const handleDelete = () => {};
  const handleMoveLeft = () => {};
  const handleMoveRight = () => {};

  const createMutationArrays = async () => {
    const createItems = [];
    const updateItems = [];

    // map over newIntro and add items to correct mutation array (create or udpate)
    let i;
    for (i = 0; i < newIntro.length; i++) {
      const item = newIntro[i];
      // if its the new item (create)
      if (!item.id) {
        const { type, link } = item;

        // asyncronously upload the new photo/image to cloudinary and get url
        if (type === 'IMAGE' && capturedImage.uri) {
          try {
            const uploadedImage = await storyPicUpload(userId, capturedImage.uri);

            const itemForMutation = {
              type,
              url: uploadedImage,
              preview: uploadedImage,
              link,
              index: i,
              owner: { connect: { id: userId } },
            };

            createItems.push(itemForMutation);
          } catch (e) {
            console.log(e);
          }
        } else if (type === 'VIDEO' && capturedVideo.uri) {
          try {
            const uploadedVideo = await storyVideoUpload(userId, capturedVideo.uri);

            // create preview URL for video thumbnail by inserting "so_0.0"
            const preview = createThumbnail(uploadedVideo.url);

            const itemForMutation = {
              type,
              url: uploadedVideo,
              preview,
              duration: uploadedVideo.duration,
              link,
              index: i,
              owner: { connect: { id: userId } },
            };

            createItems.push(itemForMutation);
          } catch (e) {
            console.log(e);
          }
        }
      }

      // if its an existing item (update)
      if (item.id) {
        const { id, link } = item;

        const itemForMutation = {
          where: { id },
          data: {
            link,
            index: i,
          },
        };

        updateItems.push(itemForMutation);
      }
    }

    // create deleteItems array
    const deleteItems = itemsToDelete.map((item) => {
      return { id: item };
    });

    return { createItems, updateItems, deleteItems };
  };

  const handleSave = async () => {
    setUploading(true);

    try {
      // create mutation variables
      const mutationArrays = await createMutationArrays();
      const { createItems, updateItems, deleteItems } = mutationArrays;

      // console.log('updateItems', updateItems);
      // console.log('createItems', createItems);
      // console.log('deleteItems', deleteItems);

      await updateIntro({
        variables: {
          id: initialIntro.id,
          updateItems,
          createItems,
          deleteItems,
        },
      });
      setUploading(false);
      navigation.goBack();
    } catch (e) {
      setUploading(false);
    }
  };

  // RENDER FUNCTIONS
  const renderActiveItem = () => {
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
          repeat
        />
      );
    }
    return null;
  };

  const renderStoryItems = () => {
    if (isEmpty) return null;
    return newIntro.map((item, i) => {
      if (item.type === 'IMAGE') {
        return (
          <TouchableOpacity key={i} activeOpacity={0.9} onPress={() => setActiveIndex(i)}>
            <View style={{ ...styles.previewBox, marginRight: 4, position: 'relative' }}>
              <ImageScalable source={{ uri: item.url }} height={90} />
              {activeIndex === i && <View style={styles.absoluteBorder} />}
            </View>
          </TouchableOpacity>
        );
      }
      if (item.type === 'VIDEO') {
        return (
          <TouchableOpacity key={i} activeOpacity={0.9} onPress={() => setActiveIndex(i)}>
            <View style={{ ...styles.previewBox, marginRight: 4, position: 'relative' }}>
              <Video source={{ uri: item.url }} resizeMode="cover" ref={videoRef} style={{ height: 90, width: 70 }} paused />
              <View style={styles.duration}>
                <Text style={{ ...defaultStyles.smallBold, color: 'white' }}>{Math.ceil(item.duration)} s</Text>
              </View>
              {activeIndex === i && <View style={styles.absoluteBorder} />}
            </View>
          </TouchableOpacity>
        );
      }

      return null;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {renderActiveItem()}

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.clearButton}
        onPress={goBack}
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      >
        <Feather name="x" size={24} color={colors.white} style={{ paddingTop: 2, paddingLeft: 1 }} />
      </TouchableOpacity>

      <View style={styles.sendButton}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleSave} style={styles.sendButtonView}>
          <Text style={{ ...defaultStyles.hugeMedium, color: colors.white }}>Save</Text>
          <Feather name="chevron-right" size={30} color={colors.white} style={{ paddingTop: 4 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.sideButtons}>
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
          onPress={handleLinkButton}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        >
          <Feather name="link" size={24} color={colors.white} style={{ paddingTop: 2, paddingLeft: 1 }} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideButton}
          onPress={handleMoveLeft}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        >
          <Feather name="arrow-left" size={24} color={colors.white} style={{ paddingTop: 2, paddingLeft: 1 }} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideButton}
          onPress={handleMoveRight}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        >
          <Feather name="arrow-right" size={24} color={colors.white} style={{ paddingTop: 2, paddingLeft: 1 }} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideButton}
          onPress={handleDelete}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        >
          <Feather name="trash-2" size={24} color={colors.white} style={{ paddingTop: 2, paddingLeft: 1 }} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        style={{ width: '100%', position: 'absolute', bottom: 20, left: 0 }}
        contentContainerStyle={{ flexDirection: 'row', paddingLeft: 15, height: 100, paddingTop: 5, alignItems: 'center' }}
      >
        {renderStoryItems()}
      </ScrollView>
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
  previewBox: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    overflow: 'hidden',
    // marginRight: 10,
  },
  absoluteBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: colors.purp,
    borderRadius: 8,
  },
});

export default EditIntro;
