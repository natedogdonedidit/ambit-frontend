import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProgressBar from './ProgressBar';

const StoryProgressBars = ({ story, activeIndex, incrementIndex, storyIsActive, isBuffering, paused }) => {
  const [storyKey, setStoryKey] = useState(1); // used so StoryCard re-renders each time change storyQIndex

  useEffect(() => {
    // if story goes from active to not active, reset the progress bar by changing the storyKey
    setStoryKey((prevState) => prevState + 10);
  }, [storyIsActive]);

  const renderProgressBars = () => {
    return story.items.map((item, i) => {
      return (
        <ProgressBar
          key={`${item.id}${storyKey}`}
          i={i}
          activeIndex={activeIndex}
          incrementIndex={incrementIndex}
          storyIsActive={storyIsActive}
          story={story}
          isBuffering={isBuffering}
          paused={paused}
        />
      );
    });
  };

  return (
    <View style={{ ...styles.absoluteTop, top: 8 }}>
      <View
        style={{
          width: '100%',
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
};

const styles = StyleSheet.create({
  absoluteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
});

export default StoryProgressBars;
