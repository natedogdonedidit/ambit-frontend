import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const StoryProgressBars = ({ activeStory, activeIndex, IMAGE_DURATION, currentTime }) => {
  const { width } = Dimensions.get('window');
  const { items } = activeStory;
  const activeItem = { ...items[activeIndex] };
  const storyLength = items.reduce((total, item) => {
    const length = Math.max(item.duration || IMAGE_DURATION, 10); // minimum of 10
    return total + length;
  }, 0);

  const renderProgressBars = () => {
    return items.map((item, i) => {
      const length = Math.max(item.duration || IMAGE_DURATION, 10); // minimum of 10. ex: if dur of video is 2s, dur = 10
      const ratio = length / storyLength;
      const usableWidth = width - 15; // because there is padding on the left side of the parent View
      const itemWidth = ratio * usableWidth;

      // if its already been viewed
      if (i < activeIndex) {
        return (
          <View
            key={i}
            style={{
              height: 3,
              width: itemWidth - 2, // -10 bc marginRight
              borderRadius: 1.5,
              marginRight: 2,
              backgroundColor: 'white',
            }}
          />
        );
      }

      // if its being viewed right now
      if (i === activeIndex) {
        let r = 0;
        if (activeItem.type === 'IMAGE') {
          r = currentTime / IMAGE_DURATION;
        }
        if (activeItem.type === 'VIDEO') {
          r = currentTime / activeItem.duration;
        }
        // console.log(currentTime);
        const w = (itemWidth - 2) * r;

        return (
          <View
            key={i}
            style={{
              height: 3,
              width: itemWidth - 2, // -10 bc marginRight
              borderRadius: 1.5,
              marginRight: 2,
              backgroundColor: 'rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: 3,
                width: w, // -10 bc marginRight
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
              width: itemWidth - 2, // -10 bc marginRight
              borderRadius: 1.5,
              marginRight: 2,
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
          />
        );
      }
    });
  };

  return (
    <View style={styles.absoluteTop}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 5,
          paddingTop: 5,
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
