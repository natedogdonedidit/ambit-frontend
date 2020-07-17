import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import StoryBox from 'library/components/stories/StoryBox';
import { sortStoriesNewestFirst } from 'library/utils';

const Showcase = ({ navigation, projects }) => {
  // console.log('projects', projects);

  const renderProjects = () => {
    // console.log(projects);
    const projectsSorted = projects.sort(sortStoriesNewestFirst);

    return projectsSorted.map((project) => {
      if (project.items.length > 0 && (project.type === 'SOLO' || project.type === 'PROJECT')) {
        return <StoryBox key={project.id} navigation={navigation} story={project} showProfilePic={false} />;
      }
      return null;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.projects} horizontal showsHorizontalScrollIndicator={false}>
      {renderProjects()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  projects: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  project: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 10,
  },
  projectImageView: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.lightGray,
    overflow: 'hidden',
  },
  projectText: {
    width: 70,
    paddingTop: 5,
    textAlign: 'center',
  },
  projectImage: {
    width: 60,
    height: 60,
  },
});

export default Showcase;
