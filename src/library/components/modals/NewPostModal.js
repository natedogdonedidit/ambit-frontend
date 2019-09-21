import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  ScrollView,
  Text,
  Alert,
  StatusBar,
  TextInput,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CameraRoll from '@react-native-community/cameraroll';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';
import LOCAL_POSTS_QUERY from 'library/queries/LOCAL_POSTS_QUERY';
import USER_POSTS_QUERY from 'library/queries/USER_POSTS_QUERY';
import CREATE_POST_MUTATION from 'library/mutations/CREATE_POST_MUTATION';
import { UserContext } from 'library/utils/UserContext';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/TextButton';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import HeaderBackground from 'library/components/headers/HeaderBackground';
import SmallProfilePic from 'library/components/UI/SmallProfilePic';
import SelectGoalModal from 'library/components/modals/SelectGoalModal';
import Goal from 'library/components/UI/Goal';
import EditLocationModal from 'library/components/modals/EditLocationModal';
import CameraRollModal from 'library/components/modals/CameraRollModal';
import { cloud_name } from 'library/config';
import { requestCameraRollPermission } from 'library/utils';

const NewPostModal = ({ newPostModalVisible, setNewPostModalVisible, userLoggedIn }) => {
  // initialize state
  const [isGoal, setIsGoal] = useState(false);
  const [goal, setGoal] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [pitch, setPitch] = useState('');
  // const [location, setLocation] = useState('');
  // const [locationLat, setLocationLat] = useState(null);
  // const [locationLon, setLocationLon] = useState(null);
  const [location, setLocation] = useState(userLoggedIn.location);
  const [locationLat, setLocationLat] = useState(userLoggedIn.locationLat);
  const [locationLon, setLocationLon] = useState(userLoggedIn.locationLon);
  const [isPrivate, setIsPrivate] = useState(false);

  const [activeTag, setActiveTag] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [locModalVisible, setLocModalVisible] = useState(false);
  const [cameraRollModalVisible, setCameraRollModalVisible] = useState(false);

  const [cameraRoll, setCameraRoll] = useState([]);
  const [uploading, setUploading] = useState(false);

  const closeModal = () => {
    setIsGoal(false);
    setGoal('');
    setContent('');
    setTags([]);
    setImages([]);
    setVideo('');
    setPitch('');
    setLocation(userLoggedIn.location);
    setLocationLat(userLoggedIn.locationLat);
    setLocationLon(userLoggedIn.locationLon);
    setIsPrivate(false);
    setActiveTag('');
    setSelectedTag(null);
    setNewPostModalVisible(false);
  };

  // CONTEXT
  const { currentUserId } = useContext(UserContext);

  // MUTATIONS
  const [createPost, { loading: loadingCreate }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      owner: currentUserId,
      post: {
        isGoal,
        goal,
        location,
        locationLat,
        locationLon,
        content,
        video,
        pitch,
        isPrivate,
        images: { set: images },
        lastUpdated: new Date(),
        owner: {
          connect: { id: currentUserId },
        },
        tags: {
          set: [...tags],
        },
      },
    },
    refetchQueries: () => [
      { query: GLOBAL_POSTS_QUERY },
      { query: LOCAL_POSTS_QUERY },
      { query: USER_POSTS_QUERY, variables: { id: currentUserId } },
    ],
    // add update here to add post to GLOBAL, NETWORK, AND MYPOST arrays in cache
    onCompleted: () => {
      closeModal();
    },
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to create this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // EFFECTS
  // always put latest location into state when new modal opens
  useEffect(() => {
    if (newPostModalVisible) {
      setLocation(userLoggedIn.location);
      setLocationLat(userLoggedIn.locationLat);
      setLocationLon(userLoggedIn.locationLon);
    }
  }, [newPostModalVisible]);

  const loading = loadingCreate || uploading;

  // if (loading) return <Loader active={loading} />;

  // CUSTOM FUNCTIONS

  const handleBack = () => {
    closeModal();
  };

  const handleSubmit = async () => {
    const message = validateInputs();
    // if missing a required field, Alert user
    if (message) {
      Alert.alert('Please fill in required field:', `${message}`, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      return;
    }
    if (images.length > 0) await imageUpload();
    createPost();
  };

  const validateInputs = () => {
    if (!content) return 'Post';
    return null;
  };

  // TAG FUNCTIONS
  const addTag = () => {
    setTags([...tags, `#${activeTag.replace(/ /g, '')}`]);
    setActiveTag('');
  };

  const removeTag = i => {
    const newArray = [...tags];
    newArray.splice(i, 1);
    setTags(newArray);
    setSelectedTag(null);
  };

  // CAMERA ROLL FUNCTIONS
  const handleEditPicButton = async () => {
    // 1. request camera roll permission if android
    if (Platform.OS === 'android') {
      const isTrue = await PermissionsAndroid.check('READ_EXTERNAL_STORAGE');
      if (!isTrue) await requestCameraRollPermission();
    }

    // 2. get images from camera roll
    try {
      const res = await CameraRoll.getPhotos({
        first: 10,
        assetType: 'Photos',
      });

      const cameraRollImages = res.edges.map(image => image.node.image.uri);

      // 3. put images into state and open modal to dispaly images
      setCameraRoll(cameraRollImages);
      setCameraRollModalVisible(true);
    } catch (e) {
      console.error(e);
      // alert could not get images from camera roll
      Alert.alert('Oh no!', 'We could not access your camera roll. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const handleImageSelect = image => {
    // put image into state
    setImages([image]);
  };

  const imageUpload = async () => {
    setUploading(true);
    // create tags
    const tagss = `${userLoggedIn.id}`;
    // create context
    const context = `user=${userLoggedIn.id}`;
    // create file object
    const photo = {
      uri: images[0],
      type: 'image',
      name: `${userLoggedIn.id}-${images[0]}`,
    };
    // create body
    const uploadData = new FormData();
    uploadData.append('file', photo);
    uploadData.append('upload_preset', 'ambit-profilepic-preset');
    uploadData.append('tags', tagss);
    uploadData.append('context', context);

    console.log(uploadData);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: uploadData,
      });
      const resJson = await res.json();
      console.log(resJson);

      // put image into state
      setUploading(false);
      setImages([resJson.url]);
    } catch (e) {
      console.log('an error occured trying to upload your photo');
      console.error(e);
      Alert.alert('Oh no!', 'We could not upload your new profile picture at this time. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      setUploading(false);
      setImages([]);
    }
  };

  const renderTags = () => {
    return tags.map((tag, i) => (
      <TouchableOpacity key={i} onPress={() => setSelectedTag(i)} activeOpacity={1}>
        <View style={styles.tag}>
          <Text style={defaultStyles.smallMedium}>{tag}</Text>
          {selectedTag === i ? (
            <TouchableOpacity onPress={() => removeTag(i)} hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}>
              <Icon name="times-circle" solid size={14} color={colors.darkGray} style={{ paddingLeft: 8 }} />
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    ));
  };

  const renderMedia = () => {
    return <Image style={{ width: '100%', height: 160 }} source={{ uri: images[0] }} resizeMode="cover" />;
  };

  const containsMedia = images.length > 0;

  return (
    <Modal animationType="slide" visible={newPostModalVisible}>
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <HeaderWhite handleLeft={handleBack} handleRight={handleSubmit} textLeft="Cancel" textRight="Post" title="New Post" />
        <KeyboardAvoidingView behavior="padding" enabled>
          <TouchableWithoutFeedback onPress={() => setSelectedTag(null)}>
            <View style={styles.container}>
              <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
                <TouchableOpacity onPress={() => setGoalModalVisible(true)}>
                  {goal ? (
                    <Goal goal={goal} onPress={() => setGoalModalVisible(true)} />
                  ) : (
                    <>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.selectGoalButton}>
                          <Text style={defaultStyles.defaultText}>Select a goal</Text>
                          <Icon name="chevron-right" size={12} color={colors.darkGray} style={{ paddingLeft: 15 }} />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                          <Text style={{ ...defaultStyles.defaultText, opacity: 0.4 }}>(Optional)</Text>
                        </View>
                      </View>
                    </>
                  )}
                </TouchableOpacity>

                <View style={styles.postInputView}>
                  <View style={styles.topHalf}>
                    <View style={styles.leftSide}>
                      <SmallProfilePic pic={userLoggedIn.profilePic} />
                    </View>
                    <View style={styles.rightSide}>
                      <TextInput
                        style={{ flex: 1, marginRight: 35 }}
                        onChangeText={val => setContent(val)}
                        value={content}
                        autoFocus
                        autoCompleteType="off"
                        autoCorrect={false}
                        multiline
                        textAlignVertical="top"
                        placeholder="What's going on?"
                        onFocus={() => setSelectedTag(null)}
                      />
                    </View>
                  </View>
                  <View style={styles.bottomHalf}>
                    <TouchableOpacity onPress={() => handleEditPicButton()}>
                      <Icon name="image" size={20} color={colors.darkGray} style={{ opacity: 0.7 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => null}>
                      <View style={{ ...styles.pitchView, ...defaultStyles.shadowButton }}>
                        <Text style={{ ...defaultStyles.smallMedium, color: 'white' }}>Record Pitch</Text>
                        <Icon name="play" size={12} color="white" style={{ paddingLeft: 7 }} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                {containsMedia && <View style={styles.media}>{renderMedia()}</View>}

                {/* <View style={styles.tagsInputView}>
                  <TextInput
                    style={{ flex: 1, marginRight: 35 }}
                    onChangeText={val => setActiveTag(val)}
                    value={activeTag}
                    autoCompleteType="off"
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Add a tag"
                    onSubmitEditing={() => addTag()}
                    blurOnSubmit={false}
                    onFocus={() => setSelectedTag(null)}
                  />
                  <TouchableOpacity hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }} onPress={() => addTag()}>
                    <Icon name="check" size={12} color={colors.darkGray} style={{ paddingLeft: 10, opacity: 0.7 }} />
                  </TouchableOpacity>
                </View>
                <View style={styles.tags}>{renderTags()}</View> */}
              </ScrollView>
              <View style={styles.aboveKeyboard}>
                <TouchableOpacity onPress={() => setLocModalVisible(true)} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                  <View style={{ ...styles.publicView }}>
                    <Icon name="map-marker-alt" size={12} color={colors.darkGray} style={{ paddingRight: 7 }} />
                    <Text style={{ ...defaultStyles.smallMedium }}>{location || 'Add location'}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsPrivate(!isPrivate)} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                  <View style={{ ...styles.publicView }}>
                    <Icon name="globe" size={12} color={colors.darkGray} style={{ paddingRight: 7 }} />
                    <Text style={{ ...defaultStyles.smallMedium }}>{isPrivate ? 'Network Only' : 'Public'}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <SelectGoalModal
          goalModalVisible={goalModalVisible}
          setGoalModalVisible={setGoalModalVisible}
          goal={goal}
          setGoal={setGoal}
          isGoal={isGoal}
          setIsGoal={setIsGoal}
        />
        <EditLocationModal
          locModalVisible={locModalVisible}
          setLocModalVisible={setLocModalVisible}
          location={location}
          setLocation={setLocation}
          locationLat={locationLat}
          setLocationLat={setLocationLat}
          locationLon={locationLon}
          setLocationLon={setLocationLon}
        />
        <CameraRollModal
          cameraRollModalVisible={cameraRollModalVisible}
          setCameraRollModalVisible={setCameraRollModalVisible}
          cameraRoll={cameraRoll}
          setCameraRoll={setCameraRoll}
          handleImageSelect={handleImageSelect}
        />
      </SafeAreaView>

      {loading && <Loader active={loading} />}
    </Modal>
  );
};

export default NewPostModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: '100%',
  },
  content: {
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  selectGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  postInputView: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 20,
    padding: 10,

    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  topHalf: {
    flexDirection: 'row',
    height: 120,
    width: '100%',
  },
  bottomHalf: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  leftSide: {
    paddingRight: 10,
  },
  rightSide: {
    flexGrow: 1,
  },
  pitchView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.purp,
  },
  media: {
    width: '100%',
    // height: 240,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  tagsInputView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    padding: 10,
    alignItems: 'center',

    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  addText: {
    // color: colors.brightGreen,
  },
  tags: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    height: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    marginRight: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
  },
  aboveKeyboard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  publicView: {
    flexDirection: 'row',
  },
});
