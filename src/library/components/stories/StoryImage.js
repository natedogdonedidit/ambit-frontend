import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Video from 'react-native-video';

import Loader from 'library/components/UI/Loader';

function StoryImage({ activeItem, videoRef, isBuffering, paused, incrementIndex, setCurrentTime, setIsBuffering }) {
  function onProgress(data) {
    setCurrentTime(data.currentTime);
  }

  function onBuffer(data) {
    console.log('on buffering', data.isBuffering);
    setIsBuffering(data.isBuffering);
  }

  function onEnd() {
    console.log('on video end');
    incrementIndex();
  }

  function renderMedia() {
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
          progressUpdateInterval={50}
          onProgress={onProgress}
          onBuffer={onBuffer}
          onEnd={onEnd}
          paused={paused}
        />
      );
    }
    return <Text>Oopsss</Text>;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {renderMedia()}
      {isBuffering && <Loader loading={isBuffering} backgroundColor="transparent" color="white" size="small" />}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});

export default React.memo(StoryImage);
