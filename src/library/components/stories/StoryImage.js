import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Video from 'react-native-video';

import Loader from 'library/components/UI/Loader';

function StoryImage({
  activeItem,
  videoRef,
  paused,
  setPaused,
  isBuffering,
  setIsBuffering,
  incrementIndex,
  videoStarted,
  setVideoStarted,
  storyIsActive,
}) {
  function onProgress(data) {
    // sometimes this will not fire when video starts...so i must set progressUpdateInterval low so the function will call again quickly
    if (data.currentTime >= 0 && !videoStarted) {
      setVideoStarted(true);
    }
  }

  function onBuffer(data) {
    if (data.isBuffering && !isBuffering) {
      setIsBuffering(data.isBuffering);
    } else if (!data.isBuffering && isBuffering) {
      setIsBuffering(data.isBuffering);
    }
  }

  function onEnd() {
    incrementIndex();
  }

  function onPlaybackRateChange({ playbackRate }) {
    // had to add videoStarted to logic. Otherwise, this will pause the video before it even starts
    if (playbackRate === 0 && !paused && videoStarted) {
      setPaused(true);
    } else if (playbackRate > 0 && paused) {
      setPaused(false);
    }
  }

  function renderMedia() {
    const { type, url } = activeItem;

    if (type === 'IMAGE') {
      return <Image source={{ uri: url }} style={styles.fill} resizeMode="cover" />;
    }
    if (type === 'VIDEO') {
      // this prevents video from starting unless the storyIsActive
      if (!storyIsActive) {
        return null;
      }

      return (
        <Video
          source={{ uri: url }}
          ref={videoRef}
          style={styles.fill}
          resizeMode="cover"
          progressUpdateInterval={300}
          onPlaybackRateChange={onPlaybackRateChange}
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
      {isBuffering && <Loader loading={paused} backgroundColor="transparent" color="white" size="small" />}
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
