import React from 'react';
import { View, Dimensions } from 'react-native';
import Bar from 'react-native-progress/Bar';

import { STORY_IMAGE_DURATION } from 'styles/constants';

function ProgressBar({ duration, storyLength, currentTime }) {
  const { width: screenWidth } = Dimensions.get('window');

  // individual length of this item
  const itemDuration = duration || STORY_IMAGE_DURATION;

  const ratio = itemDuration / storyLength;
  const usableWidth = screenWidth - 15; // because there is padding on the left side of the parent View
  const itemWidth = ratio * usableWidth - 2; // -2 bc marginRight

  const progressWidth = currentTime / itemDuration;
  console.log('progressWidth', currentTime, itemDuration, progressWidth);

  return (
    <View style={{ marginRight: 2 }}>
      <Bar
        // animationType="timing"
        progress={progressWidth}
        useNativeDriver
        color="white"
        unfilledColor="rgba(255,255,255,0.3)"
        width={itemWidth}
        height={3}
        borderRadius={2}
        borderWidth={0}
      />
    </View>
  );
}

export default React.memo(ProgressBar);
