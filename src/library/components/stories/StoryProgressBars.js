import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { STORY_IMAGE_DURATION } from 'styles/constants';
import ProgressBar from './ProgressBar';
import ProgressBarStatic from './ProgressBarStatic';

function StoryProgressBars({ 
  items, 
  activeItemIndex, 
  isActiveItem, 
  paused, 
  videoStarted,
  incrementIndex, 
}) {

  // get the entire length of the story items added together
  const storyLength = useMemo(() => {
    return items.reduce((total, item) => {
      const itemLength = item.duration ? parseFloat(item.duration) : STORY_IMAGE_DURATION;
      // console.log(item.type, itemLength);
      return total + itemLength;
    }, 0);
  });

  const renderProgressBars = () => {
    return items.map((item, i) => {

      const itemNotPlayed = activeItemIndex < i;
      const itemHasPlayed = activeItemIndex > i;

      // if the story is not active...we're just going to render
      if (itemNotPlayed || itemHasPlayed) {
        return (
          <ProgressBarStatic key={item.id} duration={item.duration} storyLength={storyLength} itemHasPlayed={itemHasPlayed} />
        );
      }

      if (isActiveItem) {
        
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

      // else
      return <ProgressBarStatic key={item.id} duration={item.duration} storyLength={storyLength} itemHasPlayed={false} />;
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
