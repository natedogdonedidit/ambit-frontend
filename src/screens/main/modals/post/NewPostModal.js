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
  InputAccessoryView,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Image from 'react-native-scalable-image';
import FitImage from 'react-native-fit-image';

import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';
import LOCAL_POSTS_QUERY from 'library/queries/LOCAL_POSTS_QUERY';
import USER_POSTS_QUERY from 'library/queries/USER_POSTS_QUERY';
import CREATE_POST_MUTATION from 'library/mutations/CREATE_POST_MUTATION';
import { UserContext } from 'library/utils/UserContext';
import { postPicUpload, getTopicFromID, addMainTopics } from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import ProfilePicBasic from 'library/components/UI/ProfilePicBasic';

const NewPostModal = ({ navigation }) => {
  // ROUTE PARAMS
  const userLoggedIn = navigation.getParam('userLoggedIn');
  const topicsPassedIn = navigation.getParam('topicsPassedIn', []);

  // STATE
  const [goal, setGoal] = useState('');
  const [subField, setSubField] = useState('');
  const [topics, setTopics] = useState(topicsPassedIn);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [pitch, setPitch] = useState('');
  const [location, setLocation] = useState(userLoggedIn.location);
  const [locationID, setLocationID] = useState(userLoggedIn.locationID);
  const [locationLat, setLocationLat] = useState(userLoggedIn.locationLat);
  const [locationLon, setLocationLon] = useState(userLoggedIn.locationLon);
  const [isPrivate, setIsPrivate] = useState(false);

  const [uploading, setUploading] = useState(false);

  // HOOKS
  const { currentUserId } = useContext(UserContext);

  // MUTATIONS
  const [createPost, { loading: loadingCreate }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      owner: currentUserId,
      post: {
        isGoal: !!goal,
        goal: goal ? goal.name : null,
        subField: subField ? { connect: { topicID: subField } } : null,
        topics: topics.length > 0 ? { connect: topics } : null,
        location,
        locationID,
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
      // { query: GLOBAL_POSTS_QUERY },
      // { query: LOCAL_POSTS_QUERY },
      // { query: USER_POSTS_QUERY, variables: { id: currentUserId } },
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
      await uploadImages();
    }

    // make sure all main topics are added
    const finalTopicsArray = addMainTopics([...topics]);

    await setTopics(finalTopicsArray);
    console.log('finalTopicsArray', finalTopicsArray);
    console.log('topics', topics);

    createPost();
  };

  const handleGoalRowSelect = () => {
    navigation.navigate('SelectGoalModal', { setGoal, setTopics, setSubField });
  };

  const handleTopicRowSelect = () => {
    if (goal) {
      navigation.navigate('SelectPostTopicsModal', { goal, setTopics, setSubField, topics });
    } else {
      navigation.navigate('SelectPostTopicsModal', { setTopics, setSubField, topics });
    }
  };

  const clearGoal = () => {
    setGoal(null);
    setSubField('');
  };

  const clearTopic = () => {
    setTopics([]);
  };

  const attemptUploads = () => {
    const uploadImagesPromises = images.map(image => {
      const imageObject = postPicUpload(userLoggedIn.id, image);
      return imageObject;
    });

    return Promise.all([...uploadImagesPromises]);
  };

  const uploadImages = async () => {
    setUploading(true);

    try {
      const uploadedImages = await attemptUploads();
      setUploading(false);
      setImages(uploadedImages);
    } catch (e) {
      setUploading(false);
      Alert.alert('Oh no!', 'We could not upload one of your pictures. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const validateInputs = () => {
    if (!content) return 'Post';
    return null;
  };

  // images & video stuff

  const handleCameraIconPress = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      loadingLabelText: 'Uploading files',
    })
      .then(imgs => {
        const newArray = imgs.map(img => {
          // console.log('received image', img);
          // return { uri: img.path, width: img.width, height: img.height };
          return img.path;
        });

        setImages([...newArray]);
      })
      .catch(e => alert(e));
  };

  const cleanupImages = () => {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };

  // must pass this to location modal
  const handleLocationSelect = locObject => {
    if (locObject) {
      setLocation(locObject.location);
      setLocationID(locObject.locationID);
      setLocationLat(locObject.locationLat);
      setLocationLon(locObject.locationLon);
    }
  };

  const renderImages = () => {
    if (images.length < 1) return null;
    if (images.length === 1) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15, paddingLeft: 48 }}>
          <View style={{ ...styles.image }}>
            <Image source={{ uri: images[0] }} height={300} width={280} />
            {/* <Image source={{ uri: images[0] }} width={200} /> */}
            <TouchableOpacity style={styles.removeImageButton} activeOpacity={0.7} onPress={() => setImages([])}>
              <Icon name="times" solid size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (images.length === 2) {
      return (
        <ScrollView
          horizontal
          keyboardShouldPersistTaps="always"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row', paddingTop: 10, alignItems: 'flex-start', paddingLeft: 48 }}
        >
          <View style={{ ...styles.image, marginRight: 15 }}>
            <Image source={{ uri: images[0] }} height={200} />
            <TouchableOpacity
              style={styles.removeImageButton}
              activeOpacity={0.7}
              onPress={() => {
                const newArray = [...images];
                newArray.splice(0, 1);
                setImages([...newArray]);
              }}
            >
              <Icon name="times" solid size={15} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.image }}>
            <Image source={{ uri: images[1] }} height={200} />
            <TouchableOpacity
              style={styles.removeImageButton}
              activeOpacity={0.7}
              onPress={() => {
                const newArray = [...images];
                newArray.splice(1, 1);
                setImages([...newArray]);
              }}
            >
              <Icon name="times" solid size={15} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    // if more than 2 images
    return (
      <ScrollView
        horizontal
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row', paddingTop: 10, alignItems: 'flex-start', paddingLeft: 48 }}
      >
        {images.map((image, i) => {
          return (
            <View key={image} style={{ ...styles.image, marginRight: 15 }}>
              <Image source={{ uri: images[i] }} height={200} />
              <TouchableOpacity
                style={styles.removeImageButton}
                activeOpacity={0.7}
                onPress={() => {
                  const newArray = [...images];
                  newArray.splice(i, 1);
                  setImages([...newArray]);
                }}
              >
                <Icon name="times" solid size={15} color="white" />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const renderGoalText = () => {
    if (!goal) {
      return (
        <>
          <View style={styles.leftSide}>
            <Ionicons name="ios-rocket" size={22} color={colors.iconGray} />
          </View>
          <Text style={{ ...defaultStyles.largeMediumMute, flex: 1 }}>Add a goal</Text>
          <TouchableOpacity
            style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}
            onPress={handleGoalRowSelect}
            hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
          >
            <Ionicons name="ios-arrow-forward" size={20} color={colors.iconGray} />
          </TouchableOpacity>
        </>
      );
    }

    if (!subField) {
      return (
        <>
          <View style={styles.leftSide}>
            <Icon name={goal.icon} solid size={20} color={goal.primaryColor} />
          </View>
          <Text style={{ ...defaultStyles.largeMedium, flex: 1 }}>{goal.name}</Text>
          <TouchableOpacity
            style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}
            onPress={clearGoal}
            hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
          >
            <Ionicons name="md-close" size={20} color={colors.iconGray} />
          </TouchableOpacity>
        </>
      );
    }

    return (
      <>
        <View style={styles.leftSide}>
          <Icon name={goal.icon} solid size={20} color={goal.primaryColor} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text>
            <Text style={{ ...defaultStyles.largeMedium }}>{goal.name} </Text>
            <Text style={{ ...defaultStyles.largeLight }}>{goal.adverb} </Text>
            <Text style={{ ...defaultStyles.largeMedium }}>{getTopicFromID(subField).name}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}
          onPress={clearGoal}
          hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
        >
          <Ionicons name="md-close" size={20} color={colors.iconGray} />
        </TouchableOpacity>
      </>
    );
  };

  const renderTopicText = () => {
    if (topics.length < 1) {
      return (
        <>
          <View style={styles.leftSide}>
            <Ionicons name="ios-chatbubbles" size={22} color={colors.iconGray} />
          </View>

          <Text style={{ ...defaultStyles.largeMediumMute, flex: 1 }}>{goal ? 'Add a topic' : 'Add topics'}</Text>
          <TouchableOpacity
            style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}
            onPress={handleTopicRowSelect}
            hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
          >
            <Ionicons name="ios-arrow-forward" size={20} color={colors.iconGray} />
          </TouchableOpacity>
        </>
      );
    }

    return (
      <>
        <View style={styles.leftSide}>
          <Ionicons name="ios-chatbubbles" size={22} color={colors.blueGray} />
        </View>

        <Text style={{ ...defaultStyles.largeMedium, flex: 1 }}>
          {topics.map((topic, i) => {
            const { name } = getTopicFromID(topic.topicID);

            if (i < topics.length - 1) {
              return `${name}, `;
            }
            return name;
          })}
        </Text>
        <TouchableOpacity
          style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}
          onPress={clearTopic}
          hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
        >
          <Ionicons name="md-close" size={20} color={colors.iconGray} />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" />
      <HeaderWhite
        handleLeft={handleBack}
        handleRight={handleSubmit}
        textLeft="Cancel"
        textRight="Post"
        title={`New ${goal ? 'Goal' : 'Post'}`}
      />
      <KeyboardAvoidingView behavior="padding" enabled>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="always">
            <TouchableOpacity onPress={handleGoalRowSelect} activeOpacity={0.7}>
              <View style={styles.selectGoalView}>{renderGoalText()}</View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTopicRowSelect} activeOpacity={0.7}>
              <View style={styles.selectTopicView}>{renderTopicText()}</View>
            </TouchableOpacity>

            <View style={styles.postInputView}>
              <View style={styles.leftSide}>
                <ProfilePicBasic pic={userLoggedIn.profilePic} size={34} />
              </View>
              <View style={styles.rightSide}>
                <TextInput
                  style={{ flex: 1, paddingTop: 6, paddingRight: 15, ...defaultStyles.largeRegular }}
                  onChangeText={val => setContent(val)}
                  value={content}
                  autoFocus
                  autoCompleteType="off"
                  // autoCorrect={false}
                  multiline
                  maxLength={320}
                  textAlignVertical="top"
                  placeholder={goal ? 'Tell us about your goal' : "What's going on?"}
                  inputAccessoryViewID="1"
                />
              </View>
            </View>
            {renderImages()}
          </ScrollView>
        </View>
        <InputAccessoryView nativeID="1">
          <View style={styles.aboveKeyboard}>
            <View style={styles.aboveKeyboardLeft}>
              <TouchableOpacity
                onPress={handleCameraIconPress}
                // onPress={() => navigation.navigate('RollModal', { handleMediaSelect, selected: [...images, video] })}
                hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
              >
                <Icon name="camera" size={18} color={colors.purp} style={{ paddingRight: 25, opacity: 0.6 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => null} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <Icon name="video" size={18} color={colors.purp} style={{ paddingRight: 27, opacity: 0.6 }} />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => null} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <Icon name="poll" size={20} color={colors.purp} style={{ paddingRight: 32, opacity: 0.6 }} />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => null} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <Icon name="hashtag" size={18} color={colors.purp} style={{ paddingRight: 27, opacity: 0.6 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => null} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <Icon name="at" size={18} color={colors.purp} style={{ paddingRight: 27, opacity: 0.6 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.aboveKeyboardRight}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditLocationModal', { initialLocation: location, handleLocationSelect })}
                hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    name="map-marker-alt"
                    size={15}
                    color={colors.purp}
                    style={{ paddingRight: 8, paddingBottom: 2, opacity: 0.6 }}
                  />
                  <Text style={{ ...defaultStyles.largeRegular, color: colors.blueGray }}>{location}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </InputAccessoryView>
      </KeyboardAvoidingView>
      {loading && <Loader active={loading} />}
    </View>
  );
};

export default NewPostModal;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'space-between',
    height: '100%',
  },
  scrollView: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingBottom: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  selectGoalView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 48,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  selectTopicView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 48,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  postInputView: {
    flexDirection: 'row',
    width: '100%',
    // height: 120,
    marginTop: 10,
  },
  leftSide: {
    width: 50,
    paddingRight: 5,
    alignItems: 'center',
  },
  rightSide: {
    flex: 1,
    alignItems: 'stretch',
  },

  images: {
    width: '100%',
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
  aboveKeyboardLeft: {
    flexDirection: 'row',
  },
  aboveKeyboardRight: {
    flexDirection: 'row',
  },
});
