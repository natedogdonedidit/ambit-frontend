import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';
import { storyPicUpload, storyVideoUpload, createThumbnail, sortStoriesNewestFirst, getTopicFromID } from 'library/utils';

import Loader from 'library/components/UI/Loader';
import HeaderPostToModal from 'library/components/headers/HeaderPostToModal';
import ProfilePic from 'library/components/UI/ProfilePic';
import ProjectSquare from 'library/components/stories/ProjectSquare';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import UPDATE_STORY_MUTATION from 'library/mutations/UPDATE_STORY_MUTATION';
import CREATE_STORY_MUTATION from 'library/mutations/CREATE_STORY_MUTATION';
import UPDATE_USER_MUTATION from 'library/mutations/UPDATE_USER_MUTATION';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';
import CoolText from 'library/components/UI/CoolText';
import TopicRow from 'library/components/topics/TopicRow';

const PostClipModal = ({ navigation, route }) => {
  const { currentUserId, currentUsername, setCreatingStory } = useContext(UserContext);
  const { capturedImage, capturedVideo, textInput, isNewProject, project } = route.params; // from camera modal

  // const [uploading, setUploading] = useState(false);
  // const [isStory, setIsStory] = useState(false);
  // const [selectedProject, setSelectedProject] = useState(null);

  const [projectTitle, setProjectTitle] = useState(project ? project.title : '');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState(project.topic);

  // // state for new project
  // const [newProject, setNewProject] = useState({});

  const videoRef = useRef(null);

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
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(SINGLE_USER_BIO, {
    variables: { where: { id: currentUserId } },
  });

  if (loadingUser || errorUser) {
    return null;
  }
  const { user } = dataUser;

  const stories = user ? user.stories : [];
  const projects = user ? [...stories].filter((story) => story.type === 'PROJECT') : [];
  const myStoryID = user && user.myStory ? user.myStory.id : '123ihavenostory';

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
        // if new project - create project w/ new item
        if (isNewProject) {
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
        } else if (project.id) {
          // if existing project - update project w/ new item
          const updatedProject = await updateOneStory({
            variables: {
              where: { id: project.id },
              data: {
                lastUpdated: new Date(),
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

  return (
    <View style={styles.container}>
      <HeaderPostToModal
        navigation={navigation}
        title={isNewProject ? 'New Project' : 'New Clip'}
        handleBack={navigation.goBack}
        rightComponent={<ButtonHeader onPress={handleSend}>Post</ButtonHeader>}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingRight: 12, paddingLeft: 15, paddingTop: 15, paddingBottom: 20 }}
      >
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: colors.borderBlack,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingBottom: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              style={{
                paddingTop: 4,
                paddingRight: 15,
                ...defaultStyles.largeRegular,
                paddingBottom: 10,
              }}
              onChangeText={(val) => setDescription(val)}
              autoCompleteType="off"
              keyboardType="twitter"
              textContentType="none"
              multiline
              autoFocus
              maxLength={160}
              textAlignVertical="top"
              placeholder="Describe your clip"
            >
              <CoolText>{description}</CoolText>
            </TextInput>
          </View>
          <View style={{ width: 90, height: 132, borderRadius: 15, backgroundColor: colors.gray12, overflow: 'hidden' }}>
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
        <View
          style={{
            paddingTop: 16,
            paddingBottom: 16,
            borderBottomColor: colors.borderBlack,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          {!!projectTitle && <Text style={{ ...defaultStyles.smallBoldMute, paddingBottom: 4 }}>Project Title</Text>}
          <TextInput
            style={{
              // paddingTop: 12,
              paddingRight: 15,
              ...defaultStyles.hugeHeavy,
              fontSize: 18,
              // paddingBottom: 10,
              // color: colors.purp,
            }}
            editable={isNewProject}
            onChangeText={(val) => setProjectTitle(val)}
            value={projectTitle}
            // autoFocus
            autoCompleteType="off"
            keyboardType="twitter"
            textContentType="none"
            // autoCorrect={false}
            maxLength={40}
            textAlignVertical="top"
            placeholder="Add a project title"
          />
        </View>
        <TouchableOpacity
          disabled={!isNewProject}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('NewProjectTopicsModal', { setTopic })}
          style={{
            paddingTop: 12,
            paddingBottom: 12,
            borderBottomColor: colors.borderBlack,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          {topic ? (
            <TopicRow topicID={topic} />
          ) : (
            <Text style={{ ...defaultStyles.hugeHeavy, fontSize: 18, color: colors.gray30 }}>Select a topic</Text>
          )}
        </TouchableOpacity>
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
