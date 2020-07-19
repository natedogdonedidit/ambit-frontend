import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Animated, Dimensions, Easing, ProgressBarAndroidBase } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { STORY_IMAGE_DURATION } from 'styles/constants';

const ProgressBar = ({ i, activeIndex, story, incrementIndex, storyIsActive, isBuffering, paused }) => {
  const [pausedValue, setPausedValue] = useState(0);
  const { width: screenWidth } = Dimensions.get('window');
  const [progressBar, setProgressBar] = useState(new Animated.Value(0));
  const { items } = story;
  const thisItem = { ...items[i] };

  // individual length of this item
  const itemDuration = thisItem.duration || STORY_IMAGE_DURATION;

  // get the entire length of the story items added together
  const storyLength = items.reduce((total, item) => {
    const itemLength = item.duration || STORY_IMAGE_DURATION;
    return total + itemLength;
  }, 0);

  const ratio = itemDuration / storyLength;
  const usableWidth = screenWidth - 15; // because there is padding on the left side of the parent View
  const itemWidth = ratio * usableWidth;

  useEffect(() => {
    // console.log(activeIndex, i, storyIsActive, isBuffering, paused)
    if (activeIndex === i && storyIsActive && !isBuffering) {
      // start the animation, when complete, increment index
      // console.log(`starting animation for ${itemDuration} - ${pausedValue * itemDuration} sec`, thisItem.id)

      Animated.timing(progressBar, {
        toValue: 1,
        duration: (1 - pausedValue) * itemDuration * 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          // console.log(finished)
          // IF VIDEO, let onVideoEnd incrementIndex so the video never gets cuttoff early
          if (thisItem.type === 'IMAGE') {
            // console.log('getting here should not!!')
            // console.log(i)
            incrementIndex();
            setProgressBar(new Animated.Value(0));
          }
        } else {
          setProgressBar(new Animated.Value(0));
        }
      });

      progressBar.addListener(() => null); // remove this listener somewhere
    }
  }, [activeIndex, storyIsActive, paused, isBuffering]);

  useEffect(() => {
    if (activeIndex === i && storyIsActive) {
      if (paused) {
        // console.log('stopping here paused', i)
        progressBar.stopAnimation((value) => {
          // console.log('stopping animation with value', value)
          // save the timestamp (from 0-1) of when it was paused so we can adjust the next Animated.timing above
          setPausedValue(value);
          setProgressBar(new Animated.Value(value));
        });
      }
    }

    // if the index or story changes somehow - stop the animation
    if (activeIndex > i || !storyIsActive) {
      // console.log('stopping here', i, thisItem.id)
      progressBar.stopAnimation();
      setProgressBar(new Animated.Value(0));
    }
  }, [paused, activeIndex]);

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
      outputRange: [-(itemWidth - 2), 0], // used with tranform
      // outputRange: [0, itemWidth -2], // used with width animation (useNativeDriver = false)
    });

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
            // width: barLengthAnim, // -2 bc marginRight
            width: itemWidth - 2,
            borderRadius: 1.5,
            // marginRight: 5,
            backgroundColor: 'white',
            transform: [
              {
                translateX: barLengthAnim,
              },
            ],
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
