import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const StoryTapRegions = ({ decrementIndex, incrementIndex, handleDoubleTap, engagePause, disengagePause }) => {
  const LONG_TAP_DURATION = 200;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={decrementIndex}
        onLongPress={() => engagePause()}
        delayLongPress={LONG_TAP_DURATION}
        onPressOut={() => disengagePause()}
      >
        <View style={{ width: 70 }} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={handleDoubleTap}
        onLongPress={() => engagePause()}
        delayLongPress={LONG_TAP_DURATION}
        onPressOut={() => disengagePause()}
      >
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={incrementIndex}
        onLongPress={() => engagePause()}
        delayLongPress={LONG_TAP_DURATION}
        onPressOut={() => disengagePause()}
      >
        <View style={{ width: 70 }} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});

export default StoryTapRegions;
