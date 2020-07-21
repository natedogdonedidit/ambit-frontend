import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, StatusBar, Alert, ScrollView, Dimensions, FlatList, Text } from 'react-native';

import StoryCard from 'library/components/stories/StoryCard';

// option 1: pass in a singleStory. Story will play, followed by intro, then modal will close
// option 2: pass in an intro. Intro will play, then modal will close.
// option 3: pass in firstStory, with a topicIDtoSearch. First story will play followed by more stories from that topic
// option 4: pass in firstStory, with type = 'Home'. First story will play followed by more from your followers
// option 5: pass in firstStory, with type = 'Profile'. First story will play followed by more from this user

// moreType: 'Home', 'Topic', 'User', null means only show a single story

const IntroModal = ({ navigation, route }) => {
  const { intro = null } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" hidden />
      <StoryCard
        navigation={navigation}
        story={intro}
        storyKey={1}
        storyIsActive
        tryGoToPrevStory={() => null}
        tryGoToNextStory={() => null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IntroModal;
