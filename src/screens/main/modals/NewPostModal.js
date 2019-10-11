import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';

import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';
import LOCAL_POSTS_QUERY from 'library/queries/LOCAL_POSTS_QUERY';
import USER_POSTS_QUERY from 'library/queries/USER_POSTS_QUERY';
import CREATE_POST_MUTATION from 'library/mutations/CREATE_POST_MUTATION';
import { UserContext } from 'library/utils/UserContext';
import { imageUpload } from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import ProfilePicBasic from 'library/components/UI/ProfilePicBasic';
import Goal from 'library/components/UI/Goal';

const NewPostModal = ({ navigation }) => {
  const userLoggedIn = navigation.getParam('userLoggedIn');

  // initialize state
  const [isGoal, setIsGoal] = useState(false);
  const [goal, setGoal] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [pitch, setPitch] = useState('');
  const [location, setLocation] = useState(userLoggedIn.location);
  const [locationLat, setLocationLat] = useState(userLoggedIn.locationLat);
  const [locationLon, setLocationLon] = useState(userLoggedIn.locationLon);
  const [isPrivate, setIsPrivate] = useState(false);

  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const [uploading, setUploading] = useState(false);

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
      },
    },
    refetchQueries: () => [
      { query: GLOBAL_POSTS_QUERY },
      { query: LOCAL_POSTS_QUERY },
      { query: USER_POSTS_QUERY, variables: { id: currentUserId } },
    ],
    // add update here to add post to GLOBAL, NETWORK, AND MYPOST arrays in cache
    onCompleted: () => {
      navigation.goBack();
    },
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to create this post. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  const loading = loadingCreate || uploading;

  // CUSTOM FUNCTIONS
  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    const message = validateInputs();
    // if missing a required field, Alert user
    if (message) {
      Alert.alert('Please fill in required field:', `${message}`, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      return;
    }
    if (images.length > 0) {
      await uploadImage();
    }
    createPost();
  };

  const uploadImage = async () => {
    setUploading(true);
    try {
      const urls = await imageUpload(userLoggedIn, images);
      setUploading(false);
      setImages([...urls]);
    } catch (e) {
      setUploading(false);
      Alert.alert('Oh no!', 'We could not upload your new profile picture at this time. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const validateInputs = () => {
    if (!content) return 'Post';
    return null;
  };

  // must pass this to camera roll modal
  const handleMediaSelect = (uri, type) => {
    if (type === 'image') {
      setImages([uri]);
    }
    if (type === 'video') {
      // need to creat the upload video to cloudinary function
      // setVideo(uri);
    }
  };

  // must pass this to location modal
  const handleLocationSelect = locObject => {
    if (locObject) {
      setLocation(locObject.location);
      setLocationLat(locObject.locationLat);
      setLocationLon(locObject.locationLon);
    }
  };

  const renderMedia = () => {
    return <Image style={{ width: '100%', height: 160 }} source={{ uri: images[0] }} resizeMode="cover" />;
  };

  const containsMedia = images.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" />
      <HeaderWhite handleLeft={handleBack} handleRight={handleSubmit} textLeft="Cancel" textRight="Post" title="New Post" />
      <KeyboardAvoidingView behavior="padding" enabled>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
            <TouchableOpacity onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal, setIsGoal })}>
              {goal ? (
                <Goal goal={goal} onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal, setIsGoal })} />
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
                  <ProfilePicBasic pic={userLoggedIn.profilePic} size={30} />
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
                  />
                </View>
              </View>
              <View style={styles.bottomHalf}>
                <TouchableOpacity onPress={() => navigation.navigate('RollModal', { handleMediaSelect })}>
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
          </ScrollView>
          <View style={styles.aboveKeyboard}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditLocationModal', { initialLocation: location, handleLocationSelect })}
              hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
            >
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
      </KeyboardAvoidingView>
      {loading && <Loader active={loading} />}
    </SafeAreaView>
  );
};

export default NewPostModal;

const styles = StyleSheet.create({
  container: {
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
