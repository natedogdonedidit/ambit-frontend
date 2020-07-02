import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';

const StoryImage = ({ activeItem, videoRef, onProgress, onBuffer, onVideoEnd, isBuffering, paused }) => {
  const renderMedia = () => {
    const { type, url } = activeItem;

    if (type === 'IMAGE') {
      return <Image source={{ uri: url }} style={styles.fill} resizeMode="cover" />;
    }
    if (type === 'VIDEO') {
      return (
        <Video
          source={{ uri: url }}
          ref={videoRef}
          style={styles.fill}
          resizeMode="cover"
          // progressUpdateInterval={30}
          // onProgress={onProgress}
          onBuffer={onBuffer}
          onEnd={onVideoEnd}
          paused={paused}
        />
      );
    }
    return <Text>Oopsss</Text>;
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      {renderMedia()}
      {isBuffering && <Loader loading={isBuffering} backgroundColor="transparent" color="white" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});

export default StoryImage;
