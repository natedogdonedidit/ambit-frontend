import React, { useState, useEffect, useContext } from 'react';
import { View, Dimensions, Animated, Easing } from 'react-native';
// import Bar from 'react-native-progress/Bar';

import { STORY_IMAGE_DURATION } from 'styles/constants';
import colors from 'styles/colors';
import { UserContext } from 'library/utils/UserContext';

function ProgressBarLoader() {
  const { width: screenWidth } = Dimensions.get('window');

  const { uploadingStory, uploadingPost } = useContext(UserContext);

  const [progressBar, setProgressBar] = useState(new Animated.Value(0)); // goes from 0 to 1

  const [startAnimation, setStartAnimation] = useState(false);
  const [endAnimation, setEndAnimation] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  // individual length of this item

  // interpolate the animated value
  const barLengthAnim = progressBar.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, 0], // used with tranform, the -1 is bc at the very beginning of animation a sliver of white shows on bar
    // outputRange: [0, itemWidth], // used with width animation (useNativeDriver = false)
  });

  // EFFECTS

  // start the animation if a video is uploading
  useEffect(() => {
    if ((uploadingStory || uploadingPost) && !animationStarted) {
      setStartAnimation(true);
    }
  }, [uploadingStory, uploadingPost, animationStarted, setStartAnimation]);

  // end the animation if a video is done uploading
  useEffect(() => {
    if (!(uploadingStory || uploadingPost) && animationStarted) {
      setEndAnimation(true);
    }
  }, [uploadingStory, uploadingPost, animationStarted, setEndAnimation]);

  // reset
  useEffect(() => {
    if (endAnimation && !animationStarted) {
      setEndAnimation(false);
      setProgressBar(new Animated.Value(0));
    }
  }, [endAnimation, animationStarted, setProgressBar]);

  // // force it to end after x seconds
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('end it');
  //     setEndAnimation(true);
  //   }, 1000);
  // }, []);

  // start animation
  useEffect(() => {
    if (startAnimation && !animationStarted) {
      setAnimationStarted(true);

      // console.log('starting animation');
      Animated.timing(progressBar, {
        toValue: 0.9,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        // console.log('first one finished', finished);
      });

      // progressBar.addListener(() => null); // remove this listener somewhere
    }

    setStartAnimation(false);
  }, [startAnimation, setStartAnimation, animationStarted, progressBar]);

  // end animation
  useEffect(() => {
    if (endAnimation && animationStarted) {
      // console.log('starting animation');
      Animated.timing(progressBar, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        // console.log('second one finished', finished);
        if (finished) {
          setAnimationStarted(false);
        }
      });
    }

    // setEndAnimation(false);

    // progressBar.addListener(() => null); // remove this listener somewhere
  }, [endAnimation, setEndAnimation, animationStarted, progressBar]);

  return (
    <View
      style={{
        height: 3,
        width: screenWidth,
        backgroundColor: 'white',
        overflow: 'hidden',
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 3,
          width: screenWidth,
          borderRadius: 1.5,
          backgroundColor: colors.red,
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

export default React.memo(ProgressBarLoader);
