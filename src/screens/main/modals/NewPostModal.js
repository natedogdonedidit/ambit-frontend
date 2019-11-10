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
  InputAccessoryView,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';
import LOCAL_POSTS_QUERY from 'library/queries/LOCAL_POSTS_QUERY';
import USER_POSTS_QUERY from 'library/queries/USER_POSTS_QUERY';
import CREATE_POST_MUTATION from 'library/mutations/CREATE_POST_MUTATION';
import { UserContext } from 'library/utils/UserContext';
import { imageUpload, pickFieldPrefix, pickFieldButtonText, getPrimaryColor, getBackgroundColor, getIcon } from 'library/utils';

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
      await uploadImage();
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

  const renderGoalView = () => {
    if (goal) {
      if (field) {
        // if a Goal AND a Field are both selected
        return (
          <View
            style={{
              // paddingBottom: 20,
              marginBottom: 30,
              // borderBottomColor: colors.borderBlack,
              // borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <Text style={{ ...defaultStyles.defaultText, paddingLeft: 5, paddingBottom: 6 }}>Goal:</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal, setField })}>
                  <View style={styles.whiteBack}>
                    <View style={{ ...styles.goalRow, backgroundColor: getBackgroundColor(goal) }}>
                      <Text style={{ ...defaultStyles.largeRegular, color: getPrimaryColor(goal) }}>{goal}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <Icon
                name="times"
                size={15}
                color={colors.darkGray}
                style={{ paddingLeft: 20, paddingRight: 5, opacity: 0.6 }}
                onPress={() => clearGoal()}
              />
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal, setField })}>
              <View style={styles.whiteBack}>
                <View style={{ ...styles.goalRow, backgroundColor: getBackgroundColor(goal) }}>
                  <Text style={{ ...defaultStyles.largeBold, color: getPrimaryColor('') }}>{goal}</Text>
                  <Icon
                    name="times"
                    size={15}
                    color={colors.darkGray}
                    style={{ position: 'absolute', right: 15 }}
                    onPress={() => clearGoal()}
                  />
                </View>
              </View>
            </TouchableOpacity> */}
            <Text style={{ ...defaultStyles.defaultText, paddingTop: 12, paddingLeft: 5, paddingBottom: 6 }}>{fieldPrefix}:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SelectGoalFieldModal', { goal, field, setField })}>
                  <View style={styles.whiteBack}>
                    <View style={{ ...styles.goalRow, backgroundColor: getBackgroundColor(goal) }}>
                      <Text style={{ ...defaultStyles.largeRegular, color: getPrimaryColor(goal) }}>{field}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <Icon
                name="times"
                size={15}
                color={colors.darkGray}
                style={{ paddingLeft: 20, paddingRight: 5, opacity: 0.6 }}
                onPress={() => clearField()}
              />
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate('SelectGoalFieldModal', { goal, field, setField })}>
              <View style={styles.whiteBack}>
                <View style={{ ...styles.goalRow, backgroundColor: getBackgroundColor(goal) }}>
                  <Text style={{ ...defaultStyles.largeBold, color: getPrimaryColor('') }}>{field}</Text>
                  <Icon
                    name="times"
                    size={15}
                    color={colors.darkGray}
                    style={{ position: 'absolute', right: 15 }}
                    onPress={() => clearGoal()}
                  />
                </View>
              </View>
            </TouchableOpacity> */}
            {/* <Text style={{ ...defaultStyles.defaultText, paddingLeft: 5, paddingBottom: 5 }}>I am looking to:</Text> */}
            {/* <TouchableOpacity onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal })}>
              <View style={{ ...styles.itemRow, borderColor: getPrimaryColor(goal) }}>
                <Text style={{ ...defaultStyles.largeLight, color: getPrimaryColor(goal) }}>{goal}</Text>
              </View>
            </TouchableOpacity> */}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
            {/* <Goal goal={goal} onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal })} /> */}
            {/* <TouchableOpacity onPress={() => clearGoal()}>
                <View>
                  <Text style={{ ...defaultStyles.largeLight, color: colors.peach }}>Clear</Text>
                </View>
              </TouchableOpacity> */}

            {/* <Icon
                name="times"
                size={15}
                color={colors.darkGray}
                style={{ paddingLeft: 15, opacity: 0.6 }}
                onPress={() => clearGoal()}
              /> */}
            {/* </View> */}
            {/* <Text style={{ ...defaultStyles.defaultText, paddingLeft: 5, paddingTop: 15, paddingBottom: 5 }}>{fieldPrefix}:</Text> */}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
            {/* <GoalField
                goalField={field}
                onPress={() => navigation.navigate('SelectGoalFieldModal', { goal, field, setField })}
              /> */}
            {/* </View> */}
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
          <Text style={{ ...defaultStyles.defaultText, paddingLeft: 5, paddingBottom: 6 }}>Goal:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal, setField })}>
                <View style={styles.whiteBack}>
                  <View
                    style={{
                      ...styles.goalRow,
                      backgroundColor: getBackgroundColor(goal),
                      // borderColor: getPrimaryColor(goal),
                      // borderWidth: StyleSheet.hairlineWidth,
                    }}
                  >
                    <Text style={{ ...defaultStyles.largeRegular, color: getPrimaryColor(goal) }}>{goal}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <Icon
              name="times"
              size={15}
              color={colors.darkGray}
              style={{ paddingLeft: 20, paddingRight: 5, opacity: 0.6 }}
              onPress={() => clearGoal()}
            />
          </View>

          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Goal goal={goal} onPress={() => navigation.navigate('SelectGoalModal', { goal, setGoal })} />
            <TouchableOpacity onPress={() => clearGoal()}>
              <View>
                <Text style={{ ...defaultStyles.largeLight, color: colors.peach }}>Clear</Text>
              </View>
            </TouchableOpacity>
            <Icon
              name="times"
              size={15}
              color={colors.darkGray}
              style={{ paddingLeft: 15, opacity: 0.6 }}
              onPress={() => clearGoal()}
            />
          </View> */}
          {pickFieldButtonText(goal) && (
            <>
              <Text style={{ ...defaultStyles.defaultText, paddingLeft: 5, paddingTop: 12, paddingBottom: 6 }}>
                {fieldPrefix}:
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('SelectGoalFieldModal', { goal, field, setField })}>
                    <View style={styles.wideButton}>
                      <Text style={defaultStyles.largeLight}>{fieldButtonText}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Icon
                  name="times"
                  size={15}
                  color="white"
                  style={{ paddingLeft: 20, paddingRight: 5, opacity: 0.6 }}
                  onPress={() => clearGoal()}
                />
              </View>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('SelectGoalFieldModal', { goal, field, setField })}
              >
                <View style={styles.wideButton}>
                  <Text style={defaultStyles.largeLight}>{fieldButtonText}</Text>
                </View>
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => navigation.navigate('SelectGoalFieldModal', { goal, field, setField })}>
                <View style={styles.selectGoalButton}>
                  <Text style={defaultStyles.defaultText}>{fieldButtonText}</Text>
                  <Icon name="chevron-right" size={12} color={colors.darkGray} style={{ paddingLeft: 15 }} />
                </View>
              </TouchableOpacity> */}
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
            <Text style={defaultStyles.largeLight}>Add a goal</Text>
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
                  style={{ flex: 1, paddingTop: 7, paddingRight: 15, ...defaultStyles.largeLight }}
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
                {containsMedia && <View style={styles.media}>{renderMedia()}</View>}
              </View>
            </View>
          </ScrollView>
        </View>
        <InputAccessoryView nativeID="1">
          <View style={styles.aboveKeyboard}>
            <View style={styles.aboveKeyboardLeft}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RollModal', { handleMediaSelect })}
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
                  <Icon name="globe" size={12} color={colors.darkGray} style={{ paddingRight: 7 }} />
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
  aboveKeyboardLeft: {
    flexDirection: 'row',
  },
  aboveKeyboardRight: {
    flexDirection: 'row',
  },
});
