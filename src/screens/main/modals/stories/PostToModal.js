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
  sortStoriesNewestFirst,
} from 'library/utils';

import Loader from 'library/components/UI/Loader';
import HeaderPostToModal from 'library/components/headers/HeaderPostToModal';
import ProfilePic from 'library/components/UI/ProfilePic';
import ProjectSquare from 'library/components/stories/ProjectSquare';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import CREATE_STORY_ITEM_MUTATION from 'library/mutations/CREATE_STORY_ITEM_MUTATION';
import UPDATE_STORY_MUTATION from 'library/mutations/UPDATE_STORY_MUTATION';
import CREATE_STORY_MUTATION from 'library/mutations/CREATE_STORY_MUTATION';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';

const PostToModal = ({ navigation, route }) => {
  const { setCreatingStory } = useContext(UserContext);
  const { capturedImage, capturedVideo, textInput } = route.params; // from camera modal

  // const [uploading, setUploading] = useState(false);
  const [isStory, setIsStory] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  // const [selectedTopics, setSelectedTopics] = useState([]);

  // state for new project
  const [newProject, setNewProject] = useState({});

  // MUTATIONS
  // const [createStoryItem] = useMutation(CREATE_STORY_ITEM_MUTATION, {
  //   refetchQueries: [{ query: CURRENT_USER_QUERY }, { query: STORIES_HOME_QUERY }],
  //   onError: () =>
  //     Alert.alert('Oh no!', 'An error occured when trying to update your story. Try again later!', [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ]),
  // });

  const [updateStory] = useMutation(UPDATE_STORY_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }, { query: STORIES_HOME_QUERY }],
    // onCompleted: () => {},
    onError: (error) => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to update this story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
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

  const stories = userLoggedIn.stories || [];
  const projects = stories.filter((story) => story.type === 'PROJECT');
  const myStoryID = userLoggedIn.myStory.id;
  // get topicIDs from user
  // const topicIDs = getTopicIDsFromUser(userLoggedIn);
  // get the full topic info from each ID (including story.id)
  // const myTopics = getFullTopicListFromIDs(topicIDs);

  // EFFECTS
  // useEffect(() => {
  //   console.log(loadingCreateStoryItem);
  //   setCreatingStory(loadingCreateStoryItem);
  // }, [loadingCreateStoryItem]);

  // project methods
  const handleProjectCreate = async (projectTitle, projectTopics) => {
    const topicsForDB = projectTopics.map((topicID) => {
      return { topicID };
    });

    try {
      const createdProject = await createStory({
        variables: {
          story: {
            type: 'PROJECT',
            title: projectTitle,
            topics: { connect: topicsForDB },
            owner: { connect: { id: userLoggedIn.id } },
          },
        },
      });

      // save new project to state
      setNewProject(createdProject.data.createStory);

      // add id to selected projects
      setSelectedProject(createdProject.data.createStory.id);
      setIsStory(false);
    } catch (e) {
      console.log(e);
      Alert.alert('Oh no!', 'An error occured when trying to update your project. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const handleGoToTopicSelection = () => {
    navigation.navigate('SelectStoryTopicsModal', { handleSend });
  };

  const handleSend = async (selectedTopics) => {
    setCreatingStory(true);
    // if image, upload image, then save item to state
    if (capturedImage) {
      navigation.navigate('Home');
      try {
        const uploadedImage = await storyPicUpload(userLoggedIn.id, capturedImage.uri);

        if (selectedProject) {
          // if here, connect PROJECT

          // add the project story id
          // const storiesConnect = [{ id: selectedProject }];

          // if mystory is selected, add mystory id
          // if (isStory) {
          //   storiesConnect.push({ id: myStoryID });
          // }

          const newStoryItem = {
            type: 'IMAGE',
            url: uploadedImage,
            preview: uploadedImage,
            text: textInput,
            link: '',
          };

          updateStory({
            variables: {
              id: selectedProject,
              story: {
                lastUpdated: new Date(),
                items: {
                  create: [newStoryItem],
                },
              },
            },
          });
        } else if (isStory) {
          // if here, connect MYSTORY

          // const selectedTopicsForDB =
          //   selectedTopics.length > 0
          //     ? selectedTopics.map((topicID) => {
          //         return { topicID };
          //       })
          //     : [];

          const newStoryItem = {
            type: 'IMAGE',
            url: uploadedImage,
            preview: uploadedImage,
            text: textInput,
            link: '',
            // stories: {
            //   connect: isStory ? [{ id: myStoryID }] : null,
            // create: [
            //   {
            //     type: 'SOLO',
            //     owner: { connect: { id: userLoggedIn.id } },
            //     topics: selectedTopicsForDB.length > 0 ? { connect: selectedTopicsForDB } : null,
            //   },
            // ],
            // },
          };

          updateStory({
            variables: {
              id: myStoryID,
              story: {
                lastUpdated: new Date(),
                items: {
                  create: [newStoryItem],
                },
              },
            },
          });
        }
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

        if (selectedProject) {
          // if here, connect MYSTORY? and PROJECT

          // add the project story id
          // const storiesConnect = [{ id: selectedProject }];

          // if mystory is selected, add mystory id
          // if (isStory) {
          //   storiesConnect.push({ id: myStoryID });
          // }

          // create preview URL for video thumbnail by inserting "so_0.0"
          const preview = createThumbnail(uploadedVideo.url);

          const newStoryItem = {
            type: 'VIDEO',
            url: uploadedVideo.url,
            preview,
            text: textInput,
            link: '',
            duration: uploadedVideo.duration,
            // stories: { connect: storiesConnect },
          };

          updateStory({
            variables: {
              id: selectedProject,
              story: {
                lastUpdated: new Date(),
                items: {
                  create: [newStoryItem],
                },
              },
            },
          });
        } else if (isStory) {
          // if here, connect MYSTORY? and also create a SOLO story with Topics

          // const selectedTopicsForDB =
          //   selectedTopics.length > 0
          //     ? selectedTopics.map((topicID) => {
          //         return { topicID };
          //       })
          //     : [];

          // create preview URL for video thumbnail by inserting "so_0.0"
          const preview = createThumbnail(uploadedVideo.url);

          const newStoryItem = {
            type: 'VIDEO',
            url: uploadedVideo.url,
            preview,
            text: textInput,
            link: '',
            duration: uploadedVideo.duration,
            // stories: {
            //   connect: isStory ? [{ id: myStoryID }] : null,
            // create: [
            //   {
            //     type: 'SOLO',
            //     owner: { connect: { id: userLoggedIn.id } },
            //     topics: selectedTopicsForDB.length > 0 ? { connect: selectedTopicsForDB } : null,
            //   },
            // ],
            // },
          };

          updateStory({
            variables: {
              id: myStoryID,
              story: {
                lastUpdated: new Date(),
                items: {
                  create: [newStoryItem],
                },
              },
            },
          });
        }
      } catch (e) {
        setCreatingStory(false);
        Alert.alert('Oh no!', 'We could not upload your video. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }

    // ORIGINAL ////////////////////////////////////////////////////////////////////////////////////////
    // if (capturedVideo) {
    //   navigation.navigate('Home');
    //   try {
    //     const uploadedVideo = await storyVideoUpload(userLoggedIn.id, capturedVideo.uri);

    //     let storyIDsForDB = [];

    //     if (isStory) {
    //       storyIDsForDB = [{ id: myStoryID }];
    //     }

    //     // add in topicStories
    //     if (selectedTopics.length > 0) {
    //       // get full topics
    //       const selectedTopicsFull = getFullTopicListFromIDs(selectedTopics);

    //       selectedTopicsFull.forEach(topic => {
    //         // add topicStory id
    //         if (topic.topicStory) {
    //           storyIDsForDB.push({ id: topic.topicStory.id });
    //         }

    //         // if parent exists, add parent topicStory id
    //         if (topic.parentTopic) {
    //           storyIDsForDB.push({ id: topic.parentTopic.topicStory.id });
    //         }
    //       });
    //     }

    //     // add in projects
    //     if (selectedProject.length > 0) {
    //       selectedProject.forEach(projectID => {
    //         // add project id to list
    //         storyIDsForDB.push({ id: projectID });
    //       });
    //     }

    //     // console.log('storyIDsForDB', storyIDsForDB);

    //     // create preview URL for video thumbnail by inserting "so_0.0"
    //     const preview = createThumbnail(uploadedVideo.url);

    //     const newStoryItem = {
    //       type: 'VIDEO',
    //       url: uploadedVideo.url,
    //       preview,
    //       duration: uploadedVideo.duration,
    //       link: '',
    //       owner: { connect: { id: userLoggedIn.id } },
    //       story: { connect: storyIDsForDB },
    //     };

    //     createStoryItem({
    //       variables: {
    //         storyItem: newStoryItem,
    //       },
    //     });
    //   } catch (e) {
    //     setCreatingStory(false);
    //     Alert.alert('Oh no!', 'We could not upload your video. Try again later!', [
    //       { text: 'OK', onPress: () => console.log('OK Pressed') },
    //     ]);
    //   }
    // }
    setCreatingStory(false);
  };

  const toggleStory = () => {
    // if adding story - clear out project selected
    if (!isStory) {
      setSelectedProject(null);
    }

    setIsStory((prev) => !prev);
  };

  const toggleProject = (selectedProjectID) => {
    if (selectedProject === selectedProjectID) {
      // remove it
      setSelectedProject(null);
    } else {
      // replace it with new ID
      setSelectedProject(selectedProjectID);
      // clear out story selection
      setIsStory(false);
    }
  };

  // render methods
  const renderAddToStory = () => {
    return (
      <TouchableOpacity style={styles.storyRow} activeOpacity={1} onPress={toggleStory}>
        <View style={styles.leftSide}>
          <ProfilePic
            size="medium"
            navigation={navigation}
            user={userLoggedIn}
            enableIntro={false}
            enableStory={false}
            enableClick={false}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>My Week</Text>
          <Text numberOfLines={1} style={{ ...defaultStyles.smallBoldMute, paddingLeft: 10, paddingTop: 4 }}>
            Posts stay up for 7 days
          </Text>
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

  const renderTopics = (proj) => {
    if (proj.topics.length > 0) {
      return (
        <Text numberOfLines={1} style={{ ...defaultStyles.smallBoldMute, paddingLeft: 10, paddingTop: 4 }}>
          {proj.topics.map((top, i) => `${top.name}${i < proj.topics.length - 1 ? `, ` : ''}`)}
        </Text>
      );
    }

    return null;
  };

  const renderProjects = () => {
    if (projects.length < 1) {
      return null;
    }

    const projectsSorted = projects.sort(sortStoriesNewestFirst);

    return projectsSorted.map((project) => {
      const selected = selectedProject === project.id;

      if (project.items.length > 0) {
        return (
          <TouchableOpacity
            key={project.id}
            style={styles.projectRow}
            activeOpacity={1}
            onPress={() => toggleProject(project.id)}
          >
            <View style={styles.leftSide}>
              <ProjectSquare navigation={navigation} project={project} />
            </View>

            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>{project.title}</Text>
              {renderTopics(project)}
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

  const chooseHeaderButton = () => {
    if (selectedProject || isStory) {
      return <ButtonHeader onPress={handleSend}>Send</ButtonHeader>;
    }
    return (
      <ButtonHeader buttonStyle={{ opacity: 0.3 }} onPress={handleSend}>
        Send
      </ButtonHeader>
    );
    // if (!selectedProject && !isStory) {
    //   return (
    //     <TextButton textStyle={styles.rightTextOpacity} onPress={() => null}>
    //       Next
    //     </TextButton>
    //   );
    // }

    // return (
    //   <TextButton textStyle={styles.rightText} onPress={handleGoToTopicSelection}>
    //     Next
    //   </TextButton>
    // );
  };

  return (
    <View style={styles.container}>
      <HeaderPostToModal
        navigation={navigation}
        title="Share to..."
        handleBack={navigation.goBack}
        rightComponent={chooseHeaderButton()}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}>
        {renderAddToStory()}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'flex-end',
            paddingTop: 16,
            paddingBottom: 8,
          }}
        >
          <View>
            <Text style={{ ...defaultStyles.hugeHeavy, color: colors.purp }}>Topic Stories</Text>
          </View>
          {/* <View>
            <TextButton onPress={() => null}>What's this?</TextButton>
          </View> */}
        </View>
        <Text style={{ ...defaultStyles.defaultMute, paddingBottom: 16 }}>
          Build a cool project or story over time! Tag a topic to increase your reach...these never expire!
        </Text>
        {newProject.id ? (
          <TouchableOpacity style={styles.projectRow} activeOpacity={1} onPress={() => toggleProject(newProject.id)}>
            <View style={styles.leftSide}>
              <ProjectSquare navigation={navigation} project={newProject} loading={loadingCreateStory} />
            </View>

            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>{newProject.title}</Text>
              {renderTopics(newProject)}
            </View>
            <View style={{ width: 40 }}>
              {selectedProject === newProject.id ? (
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
              <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>New Topic Story</Text>
            </View>
          </TouchableOpacity>
        )}
        {renderProjects()}
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

export default PostToModal;
