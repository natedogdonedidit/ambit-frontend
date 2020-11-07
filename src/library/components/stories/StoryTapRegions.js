import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

function StoryTapRegions({ decrementIndex, incrementIndex, handleDoubleTap, setPaused }) {
  const LONG_TAP_DURATION = 200;

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
        onPress={handleDoubleTap}
        onLongPress={() => setPaused(true)}
        delayLongPress={LONG_TAP_DURATION}
        onPressOut={() => setPaused(false)}
      >
        <View style={{ flex: 1 }} />
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
