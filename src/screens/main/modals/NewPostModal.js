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
  // Image,
  InputAccessoryView,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Image from 'react-native-scalable-image';

import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';
import LOCAL_POSTS_QUERY from 'library/queries/LOCAL_POSTS_QUERY';
import USER_POSTS_QUERY from 'library/queries/USER_POSTS_QUERY';
import CREATE_POST_MUTATION from 'library/mutations/CREATE_POST_MUTATION';
import { UserContext } from 'library/utils/UserContext';
import { postPicUpload, pickFieldPrefix, pickFieldButtonText, getPrimaryColor, getBackgroundColor, getIcon } from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import ProfilePicBasic from 'library/components/UI/ProfilePicBasic';
import Goal from 'library/components/UI/Goal';
import GoalField from 'library/components/UI/GoalField';

const NewPostModal = ({ navigation }) => {
  const userLoggedIn = navigation.getParam('userLoggedIn');

  // initialize state
  // const [isGoal, setIsGoal] = useState(false);
  const [goal, setGoal] = useState('');
  const [field, setField] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [pitch, setPitch] = useState('');
  const [location, setLocation] = useState(userLoggedIn.location);
  const [locationLat, setLocationLat] = useState(userLoggedIn.locationLat);
  const [locationLon, setLocationLon] = useState(userLoggedIn.locationLon);
  const [isPrivate, setIsPrivate] = useState(false);

  const [uploading, setUploading] = useState(false);

  // CONTEXT
  const { currentUserId } = useContext(UserContext);

  // MUTATIONS
  const [createPost, { loading: loadingCreate }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      owner: currentUserId,
      post: {
        isGoal: !!goal,
        goal,
        field,
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

  const fieldPrefix = pickFieldPrefix(goal);
  const fieldButtonText = pickFieldButtonText(goal);

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
    createPost();
  };

  const clearGoal = () => {
    setGoal('');
    setField('');
  };

  const clearField = () => {
    setField('');
  };

  const attemptUploads = () => {
    const uploadImagesPromises = images.map(image => {
      const imageObject = postPicUpload(userLoggedIn, image);
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

  // must pass this to camera roll modal
  // const handleMediaSelect = (uri, type) => {
  //   if (type === 'image') {
  //     // if image already exists...delete it
  //     if (images.includes(uri)) {
  //       // find index
  //       const newArray = [...images];
  //       const indexToDelete = newArray.findIndex(element => element === uri);
  //       // remove
  //       newArray.splice(indexToDelete, 1);
  //       setImages([...newArray]);
  //     } else {
  //       // if image doesnt already exist...add it
  //       setImages([...images, uri]);
  //     }
  //   }
  //   if (type === 'video') {
  //     // need to creat the upload video to cloudinary function
  //     // setVideo(uri);
  //   }
  // };

  // images & video stuff

  const handleCameraIconPress = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
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
      setLocationLat(locObject.locationLat);
      setLocationLon(locObject.locationLon);
    }
  };

  const renderImages = () => {
    if (images.length < 1) return null;
    if (images.length === 1) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15 }}>
          <View style={{ ...styles.image }}>
            <Image source={{ uri: images[0] }} width={200} />
            <View style={styles.removeImageButton}>
              <Icon name="times" solid size={15} color="white" onPress={() => setImages([])} />
            </View>
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
          style={{ width: '100%' }}
          contentContainerStyle={{ flexDirection: 'row', paddingTop: 15, alignItems: 'flex-start' }}
        >
          <View style={{ ...styles.image, marginRight: 15 }}>
            <Image source={{ uri: images[0] }} height={200} />
            <View style={styles.removeImageButton}>
              <Icon
                name="times"
                solid
                size={15}
                color="white"
                onPress={() => {
                  const newArray = [...images];
                  newArray.splice(0, 1);
                  setImages([...newArray]);
                }}
              />
            </View>
          </View>
          <View style={{ ...styles.image }}>
            <Image source={{ uri: images[1] }} height={200} />
            <View style={styles.removeImageButton}>
              <Icon
                name="times"
                solid
                size={15}
                color="white"
                onPress={() => {
                  const newArray = [...images];
                  newArray.splice(1, 1);
                  setImages([...newArray]);
                }}
              />
            </View>
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
        style={{ width: '100%' }}
        contentContainerStyle={{ flexDirection: 'row', paddingTop: 15, alignItems: 'flex-start' }}
      >
        {images.map((image, i) => {
          return (
            <View key={image} style={{ ...styles.image, marginRight: 15 }}>
              <Image source={{ uri: images[i] }} height={200} />
              <View style={styles.removeImageButton}>
                <Icon
                  name="times"
                  solid
                  size={15}
                  color="white"
                  onPress={() => {
                    const newArray = [...images];
                    newArray.splice(i, 1);
                    setImages([...newArray]);
                  }}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const renderGoalView = () => {
    if (goal) {
      if (field) {
        // if a Goal AND a Field are both selected
        return (
          <View
            style={{
              marginBottom: 30,
              // borderBottomColor: colors.borderBlack,
              // borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <Text style={{ ...defaultStyles.defaultBold, color: colors.blueGray, paddingLeft: 5, paddingBottom: 6 }}>Goal:</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal, setField })}>
                  <View style={styles.whiteBack}>
                    <View style={{ ...styles.goalRow, backgroundColor: getBackgroundColor(goal) }}>
                      <Text style={{ ...defaultStyles.largeMedium, color: getPrimaryColor(goal) }}>{goal}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <Icon
                name="times"
                size={15}
                color={colors.iconGray}
                style={{ paddingLeft: 20, paddingRight: 5 }}
                onPress={() => clearGoal()}
              />
            </View>

            <Text
              style={{ ...defaultStyles.defaultBold, color: colors.blueGray, paddingTop: 12, paddingLeft: 5, paddingBottom: 6 }}
            >
              {fieldPrefix}:
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectGoalFieldModal', { goal, field, setField })}>
                  <View style={styles.whiteBack}>
                    <View style={{ ...styles.goalRow, backgroundColor: getBackgroundColor(goal) }}>
                      <Text style={{ ...defaultStyles.largeMedium, color: getPrimaryColor(goal) }}>{field}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <Icon
                name="times"
                size={15}
                color={colors.iconGray}
                style={{ paddingLeft: 20, paddingRight: 5 }}
                onPress={() => clearField()}
              />
            </View>
          </View>
        );
      }

      // if a Goal is selected but no Field
      return (
        <View
          style={{
            marginBottom: 30,
          }}
        >
          <Text style={{ ...defaultStyles.defaultBold, color: colors.blueGray, paddingLeft: 5, paddingBottom: 6 }}>Goal:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal, setField })}>
                <View style={styles.whiteBack}>
                  <View
                    style={{
                      ...styles.goalRow,
                      backgroundColor: getBackgroundColor(goal),
                    }}
                  >
                    <Text style={{ ...defaultStyles.largeMedium, color: getPrimaryColor(goal) }}>{goal}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <Icon
              name="times"
              size={15}
              color={colors.iconGray}
              style={{ paddingLeft: 20, paddingRight: 5 }}
              onPress={() => clearGoal()}
            />
          </View>

          {pickFieldButtonText(goal) && (
            <>
              <Text
                style={{ ...defaultStyles.defaultBold, color: colors.blueGray, paddingLeft: 5, paddingTop: 12, paddingBottom: 6 }}
              >
                {fieldPrefix}:
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('SelectGoalFieldModal', { goal, field, setField })}>
                    <View style={styles.wideButton}>
                      <Text style={defaultStyles.largeRegular}>{fieldButtonText}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Icon
                  name="times"
                  size={15}
                  color={colors.iconGray}
                  style={{ paddingLeft: 20, paddingRight: 5 }}
                  onPress={() => clearGoal()}
                />
              </View>
            </>
          )}
        </View>
      );
    }

    // if no Goal or Field is selected
    return (
      <View
        style={{
          width: '100%',
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal, setField })}>
          <View style={styles.wideButton}>
            <Text style={defaultStyles.largeRegular}>Add a goal</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <GoalField goalField="Add a goal" onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal })} />
        </View> */}
      </View>
    );
  };

  const containsMedia = images.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
            <View style={styles.goalView}>{renderGoalView()}</View>

            <View style={styles.postInputView}>
              <View style={styles.leftSide}>
                <ProfilePicBasic pic={userLoggedIn.profilePic} size={40} />
              </View>
              <View style={styles.rightSide}>
                <TextInput
                  style={{ flex: 1, paddingTop: 10, paddingRight: 15, ...defaultStyles.largeRegular }}
                  onChangeText={val => setContent(val)}
                  value={content}
                  autoFocus
                  autoCompleteType="off"
                  autoCorrect={false}
                  multiline
                  maxLength={320}
                  textAlignVertical="top"
                  placeholder={goal ? 'Tell us about your goal' : "What's going on?"}
                  inputAccessoryViewID="1"
                />
                {renderImages()}
              </View>
            </View>
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
                <Icon name="image" size={22} color={colors.purp} style={{ paddingRight: 30, opacity: 0.6 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => null} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <IconM name="camera-outline" size={22} color={colors.purp} style={{ paddingRight: 32, opacity: 0.6 }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditLocationModal', { initialLocation: location, handleLocationSelect })}
                hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
              >
                <Icon name="map-marker-alt" size={18} color={colors.purp} style={{ paddingRight: 0, opacity: 0.6 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.aboveKeyboardRight}>
              <TouchableOpacity onPress={() => setIsPrivate(!isPrivate)} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <View style={styles.aboveKeyboardRight}>
                  <Icon
                    name={isPrivate ? 'user-lock' : 'globe-americas'}
                    size={12}
                    color={colors.iconDark}
                    style={{ paddingRight: 7 }}
                  />
                  <Text style={{ ...defaultStyles.smallMedium }}>{isPrivate ? 'Network Only' : 'Public'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </InputAccessoryView>
      </KeyboardAvoidingView>
      {loading && <Loader active={loading} />}
    </SafeAreaView>
  );
};

export default NewPostModal;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'space-between',
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
  wideButton: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    // ...defaultStyles.shadowButton,
  },
  itemRow: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 15,
  },
  goalRow: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 15,
  },
  whiteBack: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    // ...defaultStyles.shadowButton,
  },
  selectGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 32,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  goalView: {
    width: '100%',
  },
  postInputView: {
    flexDirection: 'row',
    width: '100%',
    // height: 120,
    // marginTop: 20,
  },
  leftSide: {
    paddingRight: 10,
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
