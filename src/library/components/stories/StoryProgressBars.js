import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProgressBar from './ProgressBar';

const StoryProgressBars = ({ story, activeIndex, incrementIndex, isActive, isBuffering, paused }) => {
  const insets = useSafeArea();

  const renderProgressBars = () => {

    return story.items.map((item, i) => {
      return <ProgressBar key={item.id} i={i} activeIndex={activeIndex} incrementIndex={incrementIndex} isActive={isActive} story={story} isBuffering={isBuffering} paused={paused}/>
    });
  };

  return (
    <View style={{ ...styles.absoluteTop, top: insets.top + 8 }}>
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
