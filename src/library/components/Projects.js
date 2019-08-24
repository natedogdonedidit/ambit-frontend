import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Projects = ({ projects }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.projects}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.project}>
        <View style={styles.projectImage} />
        <Text style={{ ...styles.projectText, ...defaultStyles.smallBold }}>Project</Text>
      </View>
      <View style={styles.project}>
        <View style={styles.projectImage} />
        <Text style={{ ...styles.projectText, ...defaultStyles.smallBold }}>Project</Text>
      </View>
      <View style={styles.project}>
        <View style={styles.projectImage} />
        <Text style={{ ...styles.projectText, ...defaultStyles.smallBold }}>Project</Text>
      </View>
      <View style={styles.project}>
        <View style={styles.projectImage} />
        <Text style={{ ...styles.projectText, ...defaultStyles.smallBold }}>Project</Text>
      </View>
      <View style={styles.project}>
        <View style={styles.projectImage} />
        <Text style={{ ...styles.projectText, ...defaultStyles.smallBold }}>Project</Text>
      </View>
      <View style={styles.project}>
        <View style={styles.projectImage} />
        <Text style={{ ...styles.projectText, ...defaultStyles.smallBold }}>Project</Text>
      </View>
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
  projectImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.lightGray,
  },
  projectText: {
    width: 70,
    paddingTop: 5,
    textAlign: 'center',
  },
});

export default Projects;
