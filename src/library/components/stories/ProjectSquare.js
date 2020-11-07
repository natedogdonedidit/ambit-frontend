import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Loader from 'library/components/UI/Loader';

const ProjectSquare = ({ navigation, project, newProject = false, loading = false }) => {
  const renderImage = () => {
    // if (project.preview) {
    //   return <Image source={{ uri: project.preview }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />;
    // }

    if (project.items.length > 0) {
      if (project.items[project.items.length - 1].preview) {
        return (
          <Image
            source={{ uri: project.items[project.items.length - 1].preview }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        );
      }
    }

    // for gray box
    return null;
  };

  if (newProject) {
    return (
      <View style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <Loader loading={loading} size="small" full={false} backgroundColor="transparent" />
        ) : (
          <Icon name="camera" size={20} color={colors.gray60} />
        )}
      </View>
    );
  }

  if (!project) {
    return <View style={styles.container} />;
  }

  return <View style={styles.container}>{renderImage()}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.gray12,
    overflow: 'hidden',
  },
});

export default ProjectSquare;
