import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Animated, Dimensions, Easing, ProgressBarAndroidBase } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { STORY_IMAGE_DURATION } from 'styles/constants'

const ProgressBar = ({ i, activeIndex, story, incrementIndex, isActive, isBuffering, paused }) => {
  const [pausedValue, setPausedValue] = useState(0);
  const [buffering, setBuffering] = useState(true)
  const { width: screenWidth } = Dimensions.get('window');
  const [progressBar, setProgressBar] = useState(new Animated.Value(0));
  const { items } = story;
  const activeItem = { ...items[activeIndex] };

  // useEffect(() => {
  //   console.log(`now: ${buffering}; setting buffering to ${isBuffering}`)
  //   setBuffering(isBuffering)
  // }, [isBuffering])

  // individual length of this item
  const itemDuration = items[i].duration || STORY_IMAGE_DURATION;

  // get the entire length of the story items added together
  const storyLength = items.reduce((total, item) => {
    const itemLength = item.duration || STORY_IMAGE_DURATION;
    return total + itemLength;
  }, 0);

  const ratio = itemDuration / storyLength;
  const usableWidth = screenWidth - 15; // because there is padding on the left side of the parent View
  const itemWidth = ratio * usableWidth;

  useEffect(() => {
    if (activeIndex === i && isActive && !isBuffering) {
      // console.log(buffering, isBuffering)
      // start the animation, when complete, increment index
      console.log(`starting animation for ${itemDuration} - ${pausedValue * itemDuration} sec`)

      Animated.timing(progressBar, {
        toValue: 1,
        duration: (1 - pausedValue) * itemDuration * 1000,
        easing: Easing.linear,
        useNativeDriver: false
      }).start(({ finished }) => {
        if (finished) {
          // IF VIDEO, let onVideoEnd incrementIndex so the video never gets cuttoff early
          if (activeItem.type === 'IMAGE') {
            incrementIndex()
          }
        } else {
          setProgressBar(new Animated.Value(0))
        }
      })

      // progressBar.addListener(({value}) => console.log('val', value));
    }

  }, [activeIndex, isActive, paused, isBuffering])

  useEffect(() => {
    if (activeIndex === i && isActive) {
      if (paused) {
        progressBar.stopAnimation((value) => {
          // save the timestamp (from 0-1) of when it was paused so we can adjust the next Animated.timing above
          setPausedValue(value)
          setProgressBar(new Animated.Value(value))
        })
      }
    }
  }, [paused])

  // if its already been viewed
  if (i < activeIndex) {
    return (
      <View
        key={i}
        style={{
          height: 3,
          width: itemWidth - 2, // -2 bc marginRight
          borderRadius: 1.5,
          marginRight: 2,
          backgroundColor: 'white',
        }}
      />
    );
  }

  // if its being viewed right now
  if (i === activeIndex) {

    const barLengthAnim = progressBar.interpolate({
      inputRange: [0, 1],
      outputRange: [0, itemWidth - 2]
    })

    return (
      <View
        key={i}
        style={{
          height: 3,
          width: itemWidth - 2, // -2 bc marginRight
          borderRadius: 1.5,
          marginRight: 2,
          backgroundColor: 'rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 3,
            width: barLengthAnim, // -2 bc marginRight
            borderRadius: 1.5,
            // marginRight: 5,
            backgroundColor: 'white',
          }}
        />
      </View>
    );
  }

  // if it has yet to be viewed
  if (i > activeIndex) {
    return (
      <View
        key={i}
        style={{
          height: 3,
          width: itemWidth - 2, // -2 bc marginRight
          borderRadius: 1.5,
          marginRight: 2,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {},
});

export default ProgressBar;