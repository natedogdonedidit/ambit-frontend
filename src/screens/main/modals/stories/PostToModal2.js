import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

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
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import TextButton from 'library/components/UI/buttons/TextButton';

const PostToModal = ({ navigation, route }) => {
  const { currentUserId, currentUsername } = useContext(UserContext);

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(SINGLE_USER_BIO, {
    variables: { where: { id: currentUserId } },
  });

  const renderTopics = (proj) => {
    if (proj.topic) {
      const { name } = getTopicFromID(proj.topic);
      return (
        <Text numberOfLines={1} style={{ ...defaultStyles.smallBoldMute, paddingLeft: 10, paddingTop: 4 }}>
          {name}
        </Text>
      );
    }

    return null;
  };

  const renderProjects = () => {
    if (errorUser) {
      return null;
    }

    if (loadingUser) {
      return <Text style={{ ...defaultStyles.defaultMute, paddingTop: 20 }}>Loading your projects...</Text>;
    }

    const { user } = dataUser || {};

    const stories = user ? user.stories : [];
    const projects = user ? [...stories].filter((story) => story.type === 'PROJECT') : [];
    // const myStoryID = user && user.myStory ? user.myStory.id : '123ihavenostory';

    if (projects.length < 1) {
      return null;
    }

    const projectsSorted = projects.sort(sortStoriesNewestFirst);

    return projectsSorted.map((project) => {
      if (project.items.length > 0) {
        return (
          <TouchableOpacity
            key={project.id}
            style={styles.projectRow}
            activeOpacity={1}
            onPress={() => navigation.navigate('StoryCameraModal', { project })}
          >
            <View style={styles.leftSide}>
              <ProjectSquare navigation={navigation} project={project} />
            </View>

            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>{project.title}</Text>
              {renderTopics(project)}
            </View>
            <View style={{ width: 30 }}>
              <Feather name="plus" solid size={24} color={colors.purp} />
            </View>
          </TouchableOpacity>
        );
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      {/* <HeaderPostToModal navigation={navigation} title="" handleBack={navigation.goBack} rightComponent={chooseHeaderButton()} /> */}
      <HeaderBackBlank
        navigation={navigation}
        // rightComponent={<Icon name="question-circle" size={22} color={colors.iconDark} />}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'flex-end',
            paddingTop: 6,
            paddingBottom: 12,
          }}
        >
          <Text style={{ ...defaultStyles.headerMedium, textAlign: 'center', color: colors.purp }}>My Projects</Text>
        </View>
        <Text style={{ ...defaultStyles.defaultMute, paddingBottom: 16 }}>
          Build a cool project or story over time! Tag a topic to increase your reach...these never expire!
        </Text>
        <TouchableOpacity
          style={styles.projectRow}
          activeOpacity={1}
          onPress={() => navigation.navigate('StoryCameraModal', { isNewProject: true })}
        >
          <View style={styles.leftSide}>
            <ProjectSquare navigation={navigation} newProject loading={false} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>Start a new project</Text>
          </View>
        </TouchableOpacity>
        {renderProjects()}
        <View style={{ paddingTop: 30, paddingBottom: 20 }}>
          <TextButton textStyle={{ fontSize: 17 }} onPress={() => null}>
            See an example
          </TextButton>
        </View>
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
