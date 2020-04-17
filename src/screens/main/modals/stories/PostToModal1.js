import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';
import {
  getTopicIDsFromUser,
  getParentTopicFromID,
  getFullTopicListFromIDs,
  storyPicUpload,
  storyVideoUpload,
  getIconFromID,
  createThumbnail,
} from 'library/utils';

import Loader from 'library/components/UI/Loader';
import HeaderBack from 'library/components/headers/HeaderBack';
import ProfilePic from 'library/components/UI/ProfilePic';
import ProjectSquare from 'library/components/stories/ProjectSquare';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import ADD_TO_STORY_MUTATION from 'library/mutations/ADD_TO_STORY_MUTATION';
import CREATE_STORY_ITEM_MUTATION from 'library/mutations/CREATE_STORY_ITEM_MUTATION';
import CREATE_STORY_MUTATION from 'library/mutations/CREATE_STORY_MUTATION';

const PostToModal = ({ navigation, route }) => {
  const { setCreatingStory } = useContext(UserContext);
  const { capturedImage, capturedVideo } = route.params; // from camera modal

  // const [uploading, setUploading] = useState(false);
  const [isStory, setIsStory] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  // state for new project
  const [newProject, setNewProject] = useState({});

  // MUTATIONS
  const [createStoryItem] = useMutation(CREATE_STORY_ITEM_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }, { query: STORIES_HOME_QUERY }],
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to update your story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const [createStory, { loading: loadingCreateStory }] = useMutation(CREATE_STORY_MUTATION, {
    onError: () => {
      Alert.alert('Oh no!', 'An error occured when trying to create your project. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = dataUser;

  const projects = userLoggedIn.projects || [];
  const myStoryID = userLoggedIn.story.id;
  // get topicIDs from user
  const topicIDs = getTopicIDsFromUser(userLoggedIn);
  // get the full topic info from each ID (including story.id)
  const myTopics = getFullTopicListFromIDs(topicIDs);

  // EFFECTS
  // useEffect(() => {
  //   console.log(loadingCreateStoryItem);
  //   setCreatingStory(loadingCreateStoryItem);
  // }, [loadingCreateStoryItem]);

  // project methods
  const handleProjectCreate = async (projectTitle, projectTopics) => {
    const topicsForDB = projectTopics.map(topicID => {
      return { topicID };
    });

    try {
      const createdProject = await createStory({
        variables: {
          story: {
            type: 'PROJECT',
            title: projectTitle,
            projectTopics: { connect: topicsForDB },
            owner: { connect: { id: userLoggedIn.id } },
          },
        },
      });

      // save new project to state
      setNewProject(createdProject.data.createStory);

      // add id to selected projects
      setSelectedProjects([...selectedProjects, createdProject.data.createStory.id]);
    } catch (e) {
      console.log(e);
      Alert.alert('Oh no!', 'An error occured when trying to update your project. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const handleSend = async () => {
    setCreatingStory(true);
    // if image, upload image, then save item to state
    if (capturedImage) {
      navigation.navigate('Home');
      try {
        const uploadedImage = await storyPicUpload(userLoggedIn.id, capturedImage.uri);

        let storyIDsForDB = [];

        if (isStory) {
          storyIDsForDB = [{ id: myStoryID }];
        }

        // add in topicStories
        if (selectedTopics.length > 0) {
          // get full topics
          const selectedTopicsFull = getFullTopicListFromIDs(selectedTopics);

          selectedTopicsFull.forEach(topic => {
            // add topicStory id
            if (topic.topicStory) {
              storyIDsForDB.push({ id: topic.topicStory.id });
            }

            // if parent exists, add parent topicStory id
            if (topic.parentTopic) {
              storyIDsForDB.push({ id: topic.parentTopic.topicStory.id });
            }
          });
        }

        // add in projects
        if (selectedProjects.length > 0) {
          selectedProjects.forEach(projectID => {
            // add project id to list
            storyIDsForDB.push({ id: projectID });
          });
        }

        const newStoryItem = {
          type: 'IMAGE',
          url: uploadedImage,
          preview: uploadedImage,
          text: '',
          link: '',
          owner: { connect: { id: userLoggedIn.id } },
          story: { connect: storyIDsForDB },
        };

        createStoryItem({
          variables: {
            storyItem: newStoryItem,
          },
        });
      } catch (e) {
        setCreatingStory(false);
        Alert.alert('Oh no!', 'We could not upload your picture. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }

    // if video, uplaod video, then save item to state
    if (capturedVideo) {
      navigation.navigate('Home');
      try {
        const uploadedVideo = await storyVideoUpload(userLoggedIn.id, capturedVideo.uri);

        let storyIDsForDB = [];

        if (isStory) {
          storyIDsForDB = [{ id: myStoryID }];
        }

        // add in topicStories
        if (selectedTopics.length > 0) {
          // get full topics
          const selectedTopicsFull = getFullTopicListFromIDs(selectedTopics);

          selectedTopicsFull.forEach(topic => {
            // add topicStory id
            if (topic.topicStory) {
              storyIDsForDB.push({ id: topic.topicStory.id });
            }

            // if parent exists, add parent topicStory id
            if (topic.parentTopic) {
              storyIDsForDB.push({ id: topic.parentTopic.topicStory.id });
            }
          });
        }

        // add in projects
        if (selectedProjects.length > 0) {
          selectedProjects.forEach(projectID => {
            // add project id to list
            storyIDsForDB.push({ id: projectID });
          });
        }

        // console.log('storyIDsForDB', storyIDsForDB);

        // create preview URL for video thumbnail by inserting "so_0.0"
        const preview = createThumbnail(uploadedVideo.url);

        const newStoryItem = {
          type: 'VIDEO',
          url: uploadedVideo.url,
          preview,
          duration: uploadedVideo.duration,
          text: '',
          link: '',
          owner: { connect: { id: userLoggedIn.id } },
          story: { connect: storyIDsForDB },
        };

        createStoryItem({
          variables: {
            storyItem: newStoryItem,
          },
        });
      } catch (e) {
        setCreatingStory(false);
        Alert.alert('Oh no!', 'We could not upload your video. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    setCreatingStory(false);
  };

  const toggleStory = () => {
    setIsStory(!isStory);
  };

  const toggleTopic = selectedTopicID => {
    let newArray = [...selectedTopics];
    if (newArray.includes(selectedTopicID)) {
      // remove it
      newArray = newArray.filter(topicID => topicID !== selectedTopicID);
    } else {
      // add it
      newArray = [...newArray, selectedTopicID];
    }
    setSelectedTopics(newArray);
  };

  const toggleProject = selectedProjectID => {
    let newArray = [...selectedProjects];
    if (newArray.includes(selectedProjectID)) {
      // remove it
      newArray = newArray.filter(projectID => projectID !== selectedProjectID);
    } else {
      // add it
      newArray = [...newArray, selectedProjectID];
    }
    setSelectedProjects(newArray);
  };

  // render methods
  const renderAddToStory = () => {
    return (
      <TouchableOpacity style={styles.storyRow} activeOpacity={1} onPress={toggleStory}>
        <View style={styles.leftSide}>
          <ProfilePic size="medium" navigation={navigation} user={userLoggedIn} disableVideo disableClick />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>My Story</Text>
        </View>
        <View style={{ width: 40 }}>
          {isStory ? (
            <Icon name="check-circle" solid size={26} color={colors.purp} />
          ) : (
            <Feather name="circle" size={26} color={colors.gray24} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderProjects = () => {
    if (projects.length < 1) {
      return null;
    }

    return projects.map(project => {
      const selected = selectedProjects.includes(project.id);

      if (project.items.length > 0) {
        return (
          <TouchableOpacity
            key={project.id}
            style={styles.projectRow}
            activeOpacity={0.8}
            onPress={() => toggleProject(project.id)}
          >
            <View style={styles.leftSide}>
              <ProjectSquare navigation={navigation} project={project} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>{project.title}</Text>
            </View>
            <View style={{ width: 40 }}>
              {selected ? (
                <Icon name="check-circle" solid size={26} color={colors.purp} />
              ) : (
                <Feather name="circle" size={26} color={colors.gray24} />
              )}
            </View>
          </TouchableOpacity>
        );
      }
    });
  };

  const renderTopics = () => {
    if (myTopics.length < 1) {
      return null;
    }

    return myTopics.map(topic => {
      const { name, topicID, topicStory, parentTopic } = topic;
      const { icon, color } = getIconFromID(parentTopic.topicID);

      const selected = selectedTopics.includes(topicID);

      return (
        <TouchableOpacity key={topicID} style={styles.topicRow} activeOpacity={0.8} onPress={() => toggleTopic(topicID)}>
          <View style={styles.leftSide}>
            <Icon name={icon || 'circle'} size={20} color={color || colors.iconGray} solid />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>{name}</Text>
          </View>
          <View style={{ width: 40 }}>
            {selected ? (
              <Icon name="check-circle" solid size={26} color={colors.purp} />
            ) : (
              <Feather name="circle" size={26} color={colors.gray24} />
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title="Post to.."
        handleBack={navigation.goBack}
        textRight="Send"
        solidRight
        handleRight={handleSend}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}>
        {renderAddToStory()}
        <View style={{ paddingTop: 8, paddingBottom: 5 }}>
          <Text style={{ ...defaultStyles.largeBold, color: colors.gray30 }}>My Projects</Text>
        </View>
        {newProject.id ? (
          <TouchableOpacity style={styles.projectRow} activeOpacity={1} onPress={() => toggleProject(newProject.id)}>
            <View style={styles.leftSide}>
              <ProjectSquare navigation={navigation} project={newProject} loading={loadingCreateStory} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>{newProject.title}</Text>
            </View>
            <View style={{ width: 40 }}>
              {selectedProjects.includes(newProject.id) ? (
                <Icon name="check-circle" solid size={26} color={colors.purp} />
              ) : (
                <Feather name="circle" size={26} color={colors.gray24} />
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.projectRow}
            activeOpacity={1}
            onPress={() =>
              navigation.navigate('NewProjectTitleModal', {
                handleProjectCreate,
              })
            }
          >
            <View style={styles.leftSide}>
              <ProjectSquare navigation={navigation} newProject loading={loadingCreateStory} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>New Project</Text>
            </View>
          </TouchableOpacity>
        )}
        {renderProjects()}
        <View style={{ paddingTop: 24, paddingBottom: 10 }}>
          <Text style={{ ...defaultStyles.largeBold, color: colors.gray30 }}>Topic Stories</Text>
        </View>
        {renderTopics()}
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
  },
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
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
});

export default PostToModal;
