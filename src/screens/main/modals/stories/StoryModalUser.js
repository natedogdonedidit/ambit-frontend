import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, FlatList, InteractionManager, Text } from 'react-native';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { viewedStories, viewedStoryItems } from 'library/utils/cache';

import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import Story from 'library/components/stories/Story';
import Loader from 'library/components/UI/Loader';
import NoMoreStories from 'library/components/stories/NoMoreStories';
import defaultStyles from 'styles/defaultStyles';
import colors from 'styles/colors';

// WHEN IT COMES TIME. EXPAND THIS MODAL TO BE ABLE TO QUERY FOR MORE
// STORIES FROM THE USER
// COPY HOW STORYMODALTOPIC AND STORYMODALFORYOU WORK

const StoryModalUser = ({ navigation, route }) => {
  const { story } = route.params;
  const { width } = Dimensions.get('window');
  const storyFlatlist = useRef();

  // STATE
  const [storyQ, setStoryQ] = useState([story]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      // creating handle when modal focuses
      // this allows us to stack up mutations so they fun after the modal blurs
      const handle = InteractionManager.createInteractionHandle();
      return () => {
        InteractionManager.clearInteractionHandle(handle);
      };
    }, [])
  );

  // scrolls to index when story index changes
  useEffect(() => {
    if (storyQ.length > 0) {
      storyFlatlist.current.scrollToIndex({ index: activeStoryIndex, viewPosition: 0.5 });
    }
  }, [activeStoryIndex]);

  // CUSTOM FUNCTIONS
  function goToPrevStory() {
    setActiveStoryIndex((prevState) => prevState - 1);
  }

  function goToNextStory() {
    setActiveStoryIndex((prevState) => prevState + 1);
  }

  function tryGoToNextStory() {
    if (activeStoryIndex < storyQ.length - 1) {
      goToNextStory();
    } else {
      navigation.goBack();
    }
  }

  function tryGoToPrevStory() {
    if (activeStoryIndex > 0) {
      goToPrevStory();
    }
  }

  const handleSwipe = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent;

    // calculate new index after scroll
    const newStoryQIndex = Math.round(contentOffset.x / layoutMeasurement.width);

    // compare newIndex to previous index and make sure within bounds
    if (newStoryQIndex !== activeStoryIndex) {
      if (newStoryQIndex > activeStoryIndex) {
        tryGoToNextStory();
      } else {
        tryGoToPrevStory();
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" hidden animated={false} />
      <FlatList
        ref={storyFlatlist}
        horizontal
        initialNumToRender={1}
        windowSize={3}
        maxToRenderPerBatch={1}
        // removeClippedSubviews
        snapToAlignment="start"
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={100}
        bounces={false}
        disableIntervalMomentum
        disableScrollViewPanResponder
        onMomentumScrollEnd={handleSwipe}
        data={[...storyQ]}
        getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
        renderItem={({ item, index }) => {
          console.log(item);
          const storyIsActive = index === activeStoryIndex;

          return (
            <Story
              key={item.id}
              navigation={navigation}
              story={item}
              storyIsActive={storyIsActive}
              tryGoToPrevStory={tryGoToPrevStory}
              tryGoToNextStory={tryGoToNextStory}
            />
          );
        }}
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

export default StoryModalUser;
