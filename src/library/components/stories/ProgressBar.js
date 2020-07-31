import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated, Easing } from 'react-native';
// import Bar from 'react-native-progress/Bar';

import { STORY_IMAGE_DURATION } from 'styles/constants';

function ProgressBar({ duration, storyLength, paused, incrementIndex, videoStarted }) {
  const { width: screenWidth } = Dimensions.get('window');
  const [progressBar, setProgressBar] = useState(new Animated.Value(0)); // goes from 0 to 1
  const [pausedValue, setPausedValue] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);

  // individual length of this item
  const itemDuration = duration || STORY_IMAGE_DURATION;
  const ratio = itemDuration / storyLength;
  const usableWidth = screenWidth - 15; // because there is padding on the left side of the parent View
  const itemWidth = ratio * usableWidth - 2; // -2 bc marginRight

  // interpolate the animated value
  const barLengthAnim = progressBar.interpolate({
    inputRange: [0, 1],
    outputRange: [-itemWidth, 0], // used with tranform
    // outputRange: [0, itemWidth], // used with width animation (useNativeDriver = false)
  });

  // EFFECTS
  useEffect(() => {
    // console.log(paused, videoStarted, !duration, animationStarted, pausedValue);
    // start animation if 1) not paused 2) video started OR IMAGE 3) animation not started or after a pause
    if (!paused && (videoStarted || !duration) && (!animationStarted || !!pausedValue)) {
      if (!animationStarted) {
        setAnimationStarted(true);
      }

      // console.log('starting animation');
      Animated.timing(progressBar, {
        toValue: 1,
        duration: (1 - pausedValue) * itemDuration * 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        // when complete, reset animated value & paused value
        // setProgressBar(new Animated.Value(0));
        setAnimationStarted(false);
        setPausedValue(0);

        // if it finishe animation & is an image...incrementIndex
        if (finished && !duration) {
          incrementIndex();
        }
      });

      progressBar.addListener(() => null); // remove this listener somewhere
    }
  }, [paused, videoStarted, duration, animationStarted, pausedValue]);

  useEffect(() => {
    if (paused && animationStarted) {
      // console.log('stopping here paused', i)
      progressBar.stopAnimation((value) => {
        // console.log('stopping animation with value', value)

        // save the timestamp (from 0-1) of when it was paused so we can adjust the next Animated.timing above
        setPausedValue(value);
        setProgressBar(new Animated.Value(value));
      });
    }
  }, [paused]);

  return (
    <View
      style={{
        height: 3,
        width: itemWidth, // -2 bc marginRight
        borderRadius: 1.5,
        marginRight: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 3,
          width: itemWidth,
          borderRadius: 1.5,
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

export default React.memo(ProgressBar);
