import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

function StoryTapRegions({ decrementIndex, incrementIndex, handleLike, setPaused }) {
  const LONG_TAP_DURATION = 300;

  // store time of last tap
  let lastTap = null;

  const handleMiddleTap = () => {
    // coordinates of like
    // console.log(e.nativeEvent.locationX, e.nativeEvent.locationY);

    // duration taps must take place to trigger handleDoubleTap
    const DOUBLE_TAP_DELAY = 300;

    // current time
    const now = Date.now();

    if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
      handleLike();
    } else {
      lastTap = now;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={decrementIndex}
        onLongPress={() => setPaused(true)}
        delayLongPress={LONG_TAP_DURATION}
        onPressOut={() => setPaused(false)}
      >
        <View style={{ width: 70 }} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={handleMiddleTap}
        onLongPress={() => setPaused(true)}
        delayLongPress={LONG_TAP_DURATION}
        onPressOut={() => setPaused(false)}
      >
        <View
          style={{
            flex: 1,
            // backgroundColor: 'pink',
            // opacity: 0.2,
          }}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={incrementIndex}
        onLongPress={() => setPaused(true)}
        delayLongPress={LONG_TAP_DURATION}
        onPressOut={() => setPaused(false)}
      >
        <View style={{ width: 70 }} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});

export default React.memo(StoryTapRegions);
