import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Video from 'react-native-video';

import Loader from 'library/components/UI/Loader';

function StoryImage({
  videoRef,
  item,
  isActiveItem,
  isBuffering,
  setIsBuffering,
  paused,
  setPaused,
  videoStarted,
  setVideoStarted,
  incrementIndex,
}) {

  const [readyForDisplay, setReadyForDisplay] = useState(false)

  function onProgress(data) {
    // console.log('onProgress', item.id);
    // sometimes this will not fire when video starts...so i must set progressUpdateInterval low so the function will call again quickly
    // if (data.currentTime >= 0 && !videoStarted) {
    // console.log('onProgress', data.currentTime);
    // setVideoStarted(true);
    // }

    if (!videoStarted) {
      // console.log('onProgress', item.id, data.currentTime);
      setVideoStarted(true);
    }
  }

  function onBuffer(data) {
    // console.log(data);
    if (data.isBuffering && !isBuffering) {
      setIsBuffering(data.isBuffering);
      setPaused(true);
    } else if (!data.isBuffering && isBuffering) {
      setIsBuffering(data.isBuffering);
      setPaused(false);
    }
  }

  function onEnd() {
    incrementIndex();
  }

  // I think i was using this to pause the video upon mid-video buffer
  // function onPlaybackRateChange({ playbackRate }) {
  //   // had to add videoStarted to logic. Otherwise, this will pause the video before it even starts
  //   if (playbackRate === 0 && !paused && videoStarted) {
  //     console.log('playback pause');
  //     setPaused(true);
  //   } else if (playbackRate > 0 && paused) {
  //     console.log('playback unpause');
  //     setPaused(false);
  //   }
  // }


  function renderMedia() {
    const { type, url } = item;

    if (type === 'IMAGE') {
      return <Image source={{ uri: url }} style={styles.fill} resizeMode="cover" />;
    }
    if (type === 'VIDEO') {
      // this prevents video from starting unless the storyIsActive

      return (
        <Video
          source={{ uri: url }}
          ref={videoRef}
          style={styles.fill}
          resizeMode="cover"
          progressUpdateInterval={300}
          // onPlaybackRateChange={onPlaybackRateChange}
          // onLoadStart={() => console.log('loading video', item.id)}
          onReadyForDisplay={() => setReadyForDisplay(true)}
          onProgress={onProgress}
          onBuffer={onBuffer}
          onEnd={onEnd}
          // onSeek={({ currentTime, seekTime }) => console.log('on seek', currentTime, seekTime)}
          paused={paused}
          rate={isActiveItem ? 1 : 0}

          // automaticallyWaitsToMinimizeStalling={false}
          bufferConfig={{
            minBufferMs: 10000, // 15000 default
            maxBufferMs: 30000, // 50000 default
            bufferForPlaybackMs: 2500, // 2500 default
            bufferForPlaybackAfterRebufferMs: 5000, // 5000 default
          }}
        />
      );
    }

    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {renderMedia()}
      {(isBuffering || (item.type === 'VIDEO' && !readyForDisplay)) && <Loader loading={paused} backgroundColor="transparent" color="white" size="small" />}
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
