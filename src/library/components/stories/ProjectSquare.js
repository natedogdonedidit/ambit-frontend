import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const ProjectSquare = ({ navigation, project }) => {
  if (!project) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      {project.preview && (
        <Image source={{ uri: project.preview }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.gray12,
  },
});

export default ProjectSquare;
