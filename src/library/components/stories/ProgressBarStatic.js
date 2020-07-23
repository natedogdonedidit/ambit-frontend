import React from 'react';
import { View, Dimensions } from 'react-native';

import { STORY_IMAGE_DURATION } from 'styles/constants';

function ProgressBarStatic({ duration, storyLength, itemHasPlayed }) {
  const { width: screenWidth } = Dimensions.get('window');

  // individual length of this item
  const itemDuration = duration || STORY_IMAGE_DURATION;

  const ratio = itemDuration / storyLength;
  const usableWidth = screenWidth - 15; // because there is padding on the left side of the parent View
  const itemWidth = ratio * usableWidth - 2; // -2 bc marginRight

  return (
    <View
      style={{
        height: 3,
        width: itemWidth,
        borderRadius: 1.5,
        marginRight: 2,
        backgroundColor: itemHasPlayed ? 'white' : 'rgba(255,255,255,0.3)',
      }}
    />
  );
}

export default React.memo(ProgressBarStatic);
