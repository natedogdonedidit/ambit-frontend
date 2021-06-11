import React, { useState, useRef, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, View, Text, Alert, Dimensions, InteractionManager } from 'react-native';
import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from 'library/utils/UserContext';
import { viewedStories, viewedStoryItems } from 'library/utils/cache';

import VIEWED_STORY_ITEM_MUTATION from 'library/mutations/VIEWED_STORY_ITEM_MUTATION';
import StoryItem from './StoryItem';

// function areEqual(prevProps, nextProps) {
//   /*
//   return true if passing nextProps to render would return
//   the same result as passing prevProps to render,
//   otherwise return false
//   */

//   if (
//     // prevProps.navigation === nextProps.navigation &&
//     // prevProps.story === nextProps.story &&
//     // prevProps.storyIsActive === nextProps.storyIsActive &&
//     // prevProps.setDisableOutterScroll === nextProps.setDisableOutterScroll
//     prevProps === nextProps
//   ) {
//     console.log('not gonna re-render', prevProps.story.id);
//     return true;
//   }

//   console.log('gonna re-render', prevProps.story.id);
//   return false;
// }

function Story({
  story,
  storyIsActive,
  startingStoryItemId,
  tryGoToPrevStory,
  tryGoToNextStory,
}) {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();

  // will return the index of the newest unseen story item - only runs on first render
  const newestUnseen = useMemo(() => {
    return story.items.findIndex(({ viewedByMe }) => {
      // return true if you have NOT viewed the story - this will set newestUnseen to that index
      // if (views.length <= 0) return true;

      // const viewedByMe = views.some(({ id }) => id === currentUserId);
      return !viewedByMe;
    });
  }, []);

  // will decide which story item to start the story
  const startingStoryItemIndex = useMemo(() => {
    // if a starting index was passed in
    if (startingStoryItemId) {
      const startingIndex = story.items.findIndex(({ id }) => id === startingStoryItemId);

      // if we found a matching story item
      if (startingIndex > 0) {
        return startingIndex;
      }
    }

    // if a startind index was NOT passed in, start where we left off
    if (newestUnseen > 0) {
      return newestUnseen;
    }

    // otherwise, start at the beginning
    return 0;
  }, []);

  // STATE
  const [hasError, setHasError] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(startingStoryItemIndex);

  // VARIABLES
  const { items, owner, type, preview, topics } = story;

  // MEMO VALUES
  const activeItem = useMemo(() => {
    return { ...items[activeItemIndex] };
  }, [activeItemIndex]);

  const [viewedStoryItem] = useMutation(VIEWED_STORY_ITEM_MUTATION);

  function incrementIndex() {
    if (type === 'INTRO') {
      navigation.goBack();
    } else if (activeItemIndex < items.length - 1) {
      // setCurrentTime(0);
      setActiveItemIndex((prevState) => prevState + 1);
    } else {
      // setCurrentTime(0);
      tryGoToNextStory();
    }
  }

  function decrementIndex() {
    if (type === 'INTRO') {
      navigation.goBack();
    } else if (activeItemIndex > 0) {
      // setCurrentTime(0);
      setActiveItemIndex((prevState) => prevState - 1);
    } else {
      // setCurrentTime(0);
      tryGoToPrevStory();
    }
  }

  // EFFECTS
  useEffect(() => {
    if (storyIsActive) {
      // add view to local storage (if its not already in there)
      const previouslyViewed = viewedStories();
      if (!previouslyViewed.includes(story.id)) {
        viewedStories([...previouslyViewed, story.id]);
        // console.log('viewed stories in local storage:', [...previouslyViewed, story.id]);
      }
    }
  }, [story, storyIsActive]);

  // anytime the story item changes, add the user to viewed list
  useEffect(() => {
    if (storyIsActive) {
      // add view to local storage (if its not already in there)
      const previouslyViewed = viewedStoryItems();
      if (!previouslyViewed.includes(activeItem.id)) {
        viewedStoryItems([...previouslyViewed, activeItem.id]);
        // console.log('viewed story items in local storage:', [...previouslyViewed, activeItem.id]);
      }

      // add view to the database
      InteractionManager.runAfterInteractions(() => {
        viewedStoryItem({
          variables: { storyItemID: activeItem.id },
        });
      });
    }
  }, [activeItem, storyIsActive]);

  // RENDER FUNCTIONS

  // RETURN
  if (hasError) {
    return (
      <View style={styles.errorView}>
        <Text>There was an error</Text>
      </View>
    );
  }

  const renderItems = () => {
    return items.map((item, index) => {
      const isActiveItem = storyIsActive && (activeItemIndex === index);
      return (
        <StoryItem 
          key={item.id} 
          story={story} 
          item={item} 
          isActiveItem={isActiveItem} 
          activeItemIndex={activeItemIndex} 
          incrementIndex={incrementIndex} 
          decrementIndex={decrementIndex} 
        />
      ) 
    })
  }

  return (
    <SafeAreaView style={{ ...styles.container, width }}>
      {/* absolute positioned stuff */}
      {renderItems()}
    </SafeAreaView>
  );
}

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

export default React.memo(Story);
