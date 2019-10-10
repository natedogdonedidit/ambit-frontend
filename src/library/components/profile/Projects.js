import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Projects = ({ projects }) => {
  const defaultImages = [
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1535598745644-bc7913bb1a2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80',
    'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1008&q=80',
    'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
    'https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  ];

  return (
    <ScrollView contentContainerStyle={styles.projects} horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.project}>
        <View style={{ ...styles.projectImageView }}>
          <Image style={{ ...styles.projectImage }} resizeMode="cover" source={{ uri: defaultImages[1] }} />
        </View>
        <Text style={{ ...styles.projectText, ...defaultStyles.smallRegular }} numberOfLines={1} ellipsizeMode="tail">
          Wireframes
        </Text>
      </View>
      <View style={styles.project}>
        <View style={{ ...styles.projectImageView }}>
          <Image style={{ ...styles.projectImage }} resizeMode="cover" source={{ uri: defaultImages[0] }} />
        </View>
        <Text style={{ ...styles.projectText, ...defaultStyles.smallRegular }} numberOfLines={1} ellipsizeMode="tail">
          Apps
        </Text>
      </View>

      <View style={styles.project}>
        <View style={{ ...styles.projectImageView }}>
          <Image style={{ ...styles.projectImage }} resizeMode="cover" source={{ uri: defaultImages[2] }} />
        </View>
        <Text style={{ ...styles.projectText, ...defaultStyles.smallRegular }} numberOfLines={1} ellipsizeMode="tail">
          Photography
        </Text>
      </View>
      <View style={styles.project}>
        <View style={{ ...styles.projectImageView }}>
          <Image style={{ ...styles.projectImage }} resizeMode="cover" source={{ uri: defaultImages[3] }} />
        </View>
        <Text style={{ ...styles.projectText, ...defaultStyles.smallRegular }} numberOfLines={1} ellipsizeMode="tail">
          Westworld
        </Text>
      </View>
      <View style={styles.project}>
        <View style={{ ...styles.projectImageView }}>
          <Image style={{ ...styles.projectImage }} resizeMode="cover" source={{ uri: defaultImages[4] }} />
        </View>
        <Text style={{ ...styles.projectText, ...defaultStyles.smallRegular }} numberOfLines={1} ellipsizeMode="tail">
          ForrestFinder
        </Text>
      </View>
      <View style={styles.project}>
        <View style={{ ...styles.projectImageView }}>
          <Image style={{ ...styles.projectImage }} resizeMode="cover" source={{ uri: defaultImages[5] }} />
        </View>
        <Text style={{ ...styles.projectText, ...defaultStyles.smallRegular }} numberOfLines={1} ellipsizeMode="tail">
          Cars
        </Text>
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

export default Projects;
