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
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { useQuery, useMutation } from 'react-apollo';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';
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

const NewPostModal = ({ newPostModalVisible, setNewPostModalVisible }) => {
  // initialize state
  const [isGoal, setIsGoal] = useState(false);
  const [goal, setGoal] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [pitch, setPitch] = useState('');
  const [location, setLocation] = useState('');
  const [locationLat, setLocationLat] = useState(null);
  const [locationLon, setLocationLon] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);

  const [activeTag, setActiveTag] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [locModalVisible, setLocModalVisible] = useState(false);

  const closeModal = () => {
    setIsGoal(false);
    setGoal('');
    setContent('');
    setTags([]);
    setImages([]);
    setVideo('');
    setPitch('');
    setLocation('');
    setLocationLat(null);
    setLocationLon(null);
    setIsPrivate(false);
    setActiveTag('');
    setSelectedTag(null);
    setNewPostModalVisible(false);
  };

  // CONTEXT
  const { currentUserId } = useContext(UserContext);

  // QUERIES
  const payloadUser = useQuery(CURRENT_USER_QUERY);
  const loadingUser = payloadUser.loading;
  const errorUser = payloadUser.error;
  const dataUser = payloadUser.data;
  const { user } = dataUser;

  // MUTATIONS
  const [createPost, payloadCreate] = useMutation(CREATE_POST_MUTATION, {
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
        images,
        lastUpdated: new Date(),
        owner: {
          connect: { id: currentUserId },
        },
        tags: {
          set: [...tags],
        },
      },
    },
    refetchQueries: () => [{ query: SINGLE_USER_BIO, variables: { id: currentUserId } }, { query: GLOBAL_POSTS_QUERY }],
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
  const loadingCreate = payloadCreate.loading;
  const errorCreate = payloadCreate.error;
  // const dataCreate = payloadCreate.data;

  const loading = loadingUser || loadingCreate;

  // EFFECTS
  // always put latest location into state when new modal opens
  useEffect(() => {
    if (newPostModalVisible) {
      setLocation(user.location);
      setLocationLat(user.locationLat);
      setLocationLon(user.locationLon);
    }
  }, [newPostModalVisible]);

  // if (loading) return <Loader active={loading} />;
  if (loading) return null;

  if (errorUser) {
    console.log('ERROR LOADING USER:', errorUser.message);
    // probably change this to now display error on screen
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>{errorUser.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // CUSTOM FUNCTION

  const handleBack = () => {
    closeModal();
  };

  const handleSubmit = () => {
    const message = validateInputs();
    // if missing a required field, Alert user
    if (message) {
      Alert.alert('Please fill in required field:', `${message}`, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      return;
    }
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
                      <SmallProfilePic />
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
                    <TouchableOpacity onPress={() => null}>
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

                <View style={styles.tagsInputView}>
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
                <View style={styles.tags}>{renderTags()}</View>
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
