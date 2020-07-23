import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { STORY_IMAGE_DURATION } from 'styles/constants';
import ProgressBar from './ProgressBar';
import ProgressBarStatic from './ProgressBarStatic';

function StoryProgressBars({ items, activeItemIndex, paused, storyIsActive, incrementIndex, videoStarted }) {
  // get the entire length of the story items added together
  const storyLength = useMemo(() => {
    return items.reduce((total, item) => {
      const itemLength = item.duration || STORY_IMAGE_DURATION;
      return total + itemLength;
    }, 0);
  });

  const renderProgressBars = () => {
    return items.map((item, i) => {
      const itemIsActive = activeItemIndex === i;
      const itemNotPlayed = activeItemIndex < i;
      const itemHasPlayed = activeItemIndex > i;

      // if story is not active, just render empty progress bars
      if (!storyIsActive) {
        return <ProgressBarStatic key={item.id} duration={item.duration} storyLength={storyLength} itemHasPlayed={false} />;
      }

      // if the story is not active...we're just going to render
      if (itemNotPlayed || itemHasPlayed) {
        return (
          <ProgressBarStatic key={item.id} duration={item.duration} storyLength={storyLength} itemHasPlayed={itemHasPlayed} />
        );
      }

      if (itemIsActive) {
        return (
          <ProgressBar
            key={item.id}
            duration={item.duration}
            storyLength={storyLength}
            paused={paused}
            incrementIndex={incrementIndex}
            videoStarted={videoStarted}
          />
        );
      }

      return null;
    });
  };

  return (
    <View style={{ ...styles.absoluteTop, top: 8 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 5,
          paddingTop: 0,
        }}
      >
        {renderProgressBars()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
});

export default React.memo(StoryProgressBars);
