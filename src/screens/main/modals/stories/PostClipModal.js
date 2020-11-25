import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  Switch,
  InputAccessoryView,
} from 'react-native';
import { useMutation } from '@apollo/client';
import Icon from 'react-native-vector-icons/Feather';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';
import { storyPicUpload, storyVideoUpload, createThumbnail, sortStoriesNewestFirst, getTopicFromID } from 'library/utils';

import HeaderPostToModal from 'library/components/headers/HeaderPostToModal';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import UPDATE_STORY_MUTATION from 'library/mutations/UPDATE_STORY_MUTATION';
import CREATE_STORY_MUTATION from 'library/mutations/CREATE_STORY_MUTATION';
import UPDATE_USER_MUTATION from 'library/mutations/UPDATE_USER_MUTATION';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';
import CoolText from 'library/components/UI/CoolText';
import Topic from 'library/components/post/Topic';

const PostClipModal = ({ navigation, route }) => {
  const { currentUserId, currentUsername, setCreatingStory } = useContext(UserContext);
  const { capturedImage, capturedVideo, projectPassedIn, textInput } = route.params; // from camera modal / CapturedStoryItem

  // source of truth for inputs - initialize with projectPassedIn, if it exists
  const [projectTitle, setProjectTitle] = useState(projectPassedIn ? projectPassedIn.title : '');
  const [topic, setTopic] = useState(projectPassedIn.topic);
  const [description, setDescription] = useState('');

  // true if we're making a new project - show title box (editable)
  const [isNewProject, setIsNewProject] = useState(false); // false

  // if we are adding to a project { id, title, topic } - show title box (non-editable)
  const [selectedProject, setSelectedProject] = useState(null);

  const [isDescFocused, setIsDescFocused] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const [saveToDevice, setSaveToDevice] = useState(true);

  // true if an existing project is selected
  const isExistingProject = !!selectedProject && !!selectedProject.id;
  const isProject = isExistingProject || isNewProject;
  const titleEditable = isNewProject || (isExistingProject && !selectedProject.title);

  // const [uploading, setUploading] = useState(false);

  const videoRef = useRef(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      if (isTitleFocused) {
        titleInputRef.current.focus();
      } else {
        titleInputRef.current.blur();
      }
    }
  }, [isTitleFocused]);

  // MUTATIONS
  const [updateOneStory] = useMutation(UPDATE_STORY_MUTATION, {
    refetchQueries: [
      { query: SINGLE_USER_BIO, variables: { where: { username: currentUsername } } },
      { query: STORIES_HOME_QUERY },
    ],
    // onCompleted: () => {},
    onError: (error) => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to update this story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  const [createOneStory, { loading: loadingCreateStory }] = useMutation(CREATE_STORY_MUTATION, {
    onError: () => {
      Alert.alert('Oh no!', 'An error occured when trying to create your project. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // QUERIES
  // const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(SINGLE_USER_BIO, {
  //   variables: { where: { id: currentUserId } },
  // });

  // if (loadingUser || errorUser) {
  //   return null;
  // }
  // const { user } = dataUser;

  // const stories = user ? user.stories : [];
  // const projects = user ? [...stories].filter((story) => story.type === 'PROJECT') : [];
  // const myStoryID = user && user.myStory ? user.myStory.id : '123ihavenostory';

  // get topicIDs from user
  // const topicIDs = getTopicIDsFromUser(user);
  // get the full topic info from each ID (including story.id)
  // const myTopics = getFullTopicListFromIDs(topicIDs);

  // EFFECTS
  // useEffect(() => {
  //   console.log(loadingCreateStoryItem);
  //   setCreatingStory(loadingCreateStoryItem);
  // }, [loadingCreateStoryItem]);

  // project methods
  // const handleProjectCreate = async () => {
  //   try {
  //     const createdProject = await createOneStory({
  //       variables: {
  //         data: {
  //           type: 'PROJECT',
  //           lastUpdated: new Date(),
  //           title: projectTitle,
  //           topic: topic || null,
  //           owner: { connect: { id: currentUserId } },
  //         },
  //       },
  //     });

  //     // save new project to state
  //     // setNewProject(createdProject.data.createOneStory);

  //     // add id to selected projects
  //     // setSelectedProject(createdProject.data.createOneStory.id);
  //     // setIsStory(false);
  //   } catch (e) {
  //     console.log(e);
  //     Alert.alert('Oh no!', 'An error occured when trying to update your project. Try again later!', [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ]);
  //   }
  // };

  // const handleGoToTopicSelection = () => {
  //   navigation.navigate('SelectStoryTopicsModal', { handleSend });
  // };

  const handleProjectSelect = (projSelected) => {
    navigation.goBack();

    // if selected 'new project'
    if (projSelected === 'new') {
      setIsNewProject(true);
      setSelectedProject(null);
      setProjectTitle('');
    } else if (projSelected && projSelected.id) {
      // if selected an existing project
      setSelectedProject(projSelected);

      if (projSelected.title) {
        setProjectTitle(projSelected.title);
      }

      if (projSelected.topic) {
        setTopic(projSelected.topic);
      }
    }
  };

  const handleSend = async () => {
    setCreatingStory(true);
    navigation.navigate('Home');
    // if image, upload image, then save item to state

    try {
      let newStoryItem = {};

      // 1 - upload the image or video to cloudinary
      if (capturedImage) {
        const uploadedImage = await storyPicUpload(currentUserId, capturedImage.uri);

        newStoryItem = {
          type: 'IMAGE',
          url: uploadedImage,
          preview: uploadedImage,
          text: description,
          link: '',
        };
      } else if (capturedVideo) {
        const uploadedVideo = await storyVideoUpload(currentUserId, capturedVideo.uri);

        // create preview URL for video thumbnail by inserting "so_0.0"
        const preview = createThumbnail(uploadedVideo.url);

        newStoryItem = {
          type: 'VIDEO',
          url: uploadedVideo.url,
          preview,
          text: description,
          link: '',
          duration: uploadedVideo.duration,
        };
      }

      // 2 - if story item was uploaded successfully, run the mutation
      if (newStoryItem.type && newStoryItem.url) {
        // if existing project - update project w/ new item
        if (isExistingProject) {
          const updatedProject = await updateOneStory({
            variables: {
              where: { id: selectedProject.id },
              data: {
                lastUpdated: new Date(),
                items: {
                  create: [newStoryItem],
                },
              },
            },
          });
        } else {
          console.log('making new story');
          // if new project - create project w/ new item
          const createdProject = await createOneStory({
            variables: {
              data: {
                type: 'PROJECT',
                lastUpdated: new Date(),
                title: projectTitle,
                topic: topic || null,
                owner: { connect: { id: currentUserId } },
                items: {
                  create: [newStoryItem],
                },
              },
            },
          });
        }
      }
    } catch (e) {
      setCreatingStory(false);
      Alert.alert('Oh no!', 'An error occured when creating your story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
    setCreatingStory(false);
  };

  const getHeaderText = () => {
    if (isNewProject) {
      return 'New Project';
    }

    if (isExistingProject) {
      return 'New Bit';
    }

    return 'New Bit';
  };

  const clearProject = () => {
    setSelectedProject(null);
    setProjectTitle('');
    setIsNewProject(false);
  };

  return (
    <View style={styles.container}>
      <HeaderPostToModal
        navigation={navigation}
        title={getHeaderText()}
        handleBack={navigation.goBack}
        rightComponent={<ButtonHeader onPress={handleSend}>Post</ButtonHeader>}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: colors.borderBlack,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              style={{
                paddingTop: 4,
                paddingRight: 15,
                ...defaultStyles.largeRegular,
                paddingBottom: 10,
                flex: 1,
              }}
              onChangeText={(val) => setDescription(val)}
              autoCompleteType="off"
              keyboardType="twitter"
              textContentType="none"
              multiline
              // autoFocus
              maxLength={160}
              textAlignVertical="top"
              placeholder="Describe your bit"
              onFocus={() => setIsDescFocused(true)}
              onBlur={() => setIsDescFocused(false)}
            >
              <CoolText>{description}</CoolText>
            </TextInput>
            <TouchableOpacity
              style={{ alignSelf: 'flex-start' }}
              activeOpacity={0.7}
              disabled={isExistingProject}
              onPress={() => navigation.navigate('NewProjectTopicsModal', { setTopic })}
            >
              {topic ? (
                // <TopicRow topicID={topic} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Topic navigation={navigation} topicToShow={topic} isPostToModal />
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 32,
                    borderRadius: 15,
                    paddingHorizontal: 14,
                    backgroundColor: colors.systemGray6,
                  }}
                >
                  <Text style={defaultStyles.defaultText}>Tag a topic</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ width: 100, height: 160, borderRadius: 15, backgroundColor: colors.gray12, overflow: 'hidden' }}>
            {capturedImage ? (
              <Image source={{ uri: capturedImage.uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            ) : (
              <Video
                source={{ uri: capturedVideo.uri }}
                ref={videoRef}
                style={{ height: '100%', width: '100%' }}
                resizeMode="cover"
                repeat
                muted
              />
            )}
          </View>
        </View>

        {/* this is the view below the inputs */}
        <View style={{ flex: 1, position: 'relative' }}>
          <View style={{ flex: 1, paddingTop: 36, paddingHorizontal: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="unlock" size={18} color={colors.blueGray} />
              <View style={{ flex: 1 }}>
                <Text style={{ ...defaultStyles.largeMute, paddingLeft: 15 }}>Who can view this video</Text>
              </View>
              <Text style={{ ...defaultStyles.largeLightMute }}>Public</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 26 }}>
              <Icon name="download" size={18} color={colors.blueGray} />
              <View style={{ flex: 1 }}>
                <Text style={{ ...defaultStyles.largeMute, paddingLeft: 15 }}>Save to device</Text>
              </View>
              <Switch
                trackColor={{ false: colors.systemBackgroundSecondary, true: colors.green }}
                thumbColor="white"
                ios_backgroundColor={colors.systemBackgroundSecondary}
                onValueChange={() => setSaveToDevice((prev) => !prev)}
                value={saveToDevice}
                style={{ transform: [{ scaleX: 0.84 }, { scaleY: 0.84 }], left: 4 }}
              />
            </View>
          </View>
          {isDescFocused && (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
          )}
        </View>

        {/* this is the view at the very bottom */}
        {!isProject ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectProjectPopup', { handleProjectSelect })}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
              borderTopColor: colors.borderBlack,
              borderTopWidth: StyleSheet.hairlineWidth,
              backgroundColor: colors.lightLightGray,
            }}
          >
            {/* <Icon name="file-plus" size={22} color={colors.purp} /> */}
            {/* <Icon name="copy" size={22} color={colors.purp} /> */}
            <Icon name="plus-circle" size={22} color={colors.purp} />
            <Text style={{ ...defaultStyles.hugeMedium, color: colors.purp, paddingLeft: 13 }}>Add this bit to a project</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              paddingHorizontal: 12,
              borderTopColor: colors.borderBlack,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.borderBlack,
              borderBottomWidth: StyleSheet.hairlineWidth,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.lightLightGray,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsTitleFocused((prev) => !prev)}
              disabled={!titleEditable}
              style={{
                flex: 1,
                paddingTop: 16,
                paddingBottom: 16,
              }}
            >
              <Text style={{ ...defaultStyles.smallMute, paddingBottom: 2 }}>
                {isExistingProject ? 'Adding to project:' : 'Project Title:'}
              </Text>
              <Text
                style={[{ paddingRight: 15, ...defaultStyles.largeSemibold, fontSize: 18 }, !projectTitle && { opacity: 0.4 }]}
              >
                {projectTitle || 'Title'}
              </Text>
            </TouchableOpacity>
            {isExistingProject && selectedProject.items[selectedProject.items.length - 1].preview && (
              <View style={{ height: 50, width: 34, borderRadius: 8, overflow: 'hidden' }}>
                <Image
                  source={{ uri: selectedProject.items[selectedProject.items.length - 1].preview }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>
            )}
            <TouchableOpacity onPress={clearProject} style={{ paddingLeft: 7 }}>
              <Ionicons name="md-close" size={20} color={colors.iconGray} />
            </TouchableOpacity>
          </View>
        )}

        {/* this is the title input */}
        {isTitleFocused && (
          <InputAccessoryView>
            <View
              style={{
                paddingHorizontal: 12,
                borderTopColor: colors.borderBlack,
                borderTopWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.borderBlack,
                borderBottomWidth: StyleSheet.hairlineWidth,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.white,
              }}
            >
              <View
                style={{
                  flex: 1,
                  paddingTop: 16,
                  paddingBottom: 16,
                }}
              >
                <Text style={{ ...defaultStyles.smallMute, paddingBottom: 2 }}>
                  {isExistingProject ? 'Adding to project:' : 'Project title:'}
                </Text>
                <TextInput
                  ref={titleInputRef}
                  style={{
                    paddingRight: 15,
                    ...defaultStyles.largeSemibold,
                    fontSize: 18,
                  }}
                  editable={titleEditable}
                  onChangeText={(val) => setProjectTitle(val)}
                  value={projectTitle}
                  autoCompleteType="off"
                  keyboardType="default"
                  returnKeyType="done"
                  textContentType="none"
                  maxLength={40}
                  textAlignVertical="top"
                  placeholder="Title"
                  blurOnSubmit
                  onSubmitEditing={() => setIsTitleFocused(false)}
                  onBlur={() => setIsTitleFocused(false)}
                />
              </View>
              {isExistingProject && selectedProject.items[selectedProject.items.length - 1].preview && (
                <View style={{ height: 50, width: 34, borderRadius: 8, overflow: 'hidden' }}>
                  <Image
                    source={{ uri: selectedProject.items[selectedProject.items.length - 1].preview }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>
              )}
            </View>
          </InputAccessoryView>
        )}

        {/* dimmer for title */}
        {isTitleFocused && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  storyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    // paddingHorizontal: 10,
  },
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  leftSide: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightText: {
    width: 80,
    textAlign: 'right',
    ...defaultStyles.largeMedium,
    color: colors.iosBlue,
  },
  rightTextOpacity: {
    width: 80,
    textAlign: 'right',
    ...defaultStyles.largeMedium,
    color: colors.iosBlue,
    opacity: 0.5,
  },
});

export default PostClipModal;
