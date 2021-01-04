import React, { useState, useRef, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, View, Text, Alert, Dimensions, InteractionManager } from 'react-native';
import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from 'library/utils/UserContext';
import { viewedStories, viewedStoryItems } from 'library/utils/cache';

import colors from 'styles/colors';
import DELETE_STORYITEM_MUTATION from 'library/mutations/DELETE_STORYITEM_MUTATION';
import DELETE_STORY_MUTATION from 'library/mutations/DELETE_STORY_MUTATION';

import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import StoryTapRegions from 'library/components/stories/StoryTapRegions';
import StoryImage from 'library/components/stories/StoryImage';
import TopLinearFade from 'library/components/stories/TopLinearFade';
import BottomLinearFade from 'library/components/stories/BottomLinearFade';
import StoryProgressBars from 'library/components/stories/StoryProgressBars';
import StoryHeader from 'library/components/stories/StoryHeader';
import StoryFooter from 'library/components/stories/StoryFooter';
import VIEWED_STORY_ITEM_MUTATION from 'library/mutations/VIEWED_STORY_ITEM_MUTATION';
import { StoryItemFragment } from 'library/queries/_fragments';
import { STORY_IMAGE_DURATION } from 'styles/constants';

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
  // navigation,
  story,
  storyIsActive,
  tryGoToPrevStory,
  tryGoToNextStory,
}) {
  const { width } = Dimensions.get('window');
  // const client = useApolloClient();
  const { currentUserId } = useContext(UserContext);
  const navigation = useNavigation();
  const videoRef = useRef(null);

  // will return the index of the newest unseen story item - only runs on first render
  const newestUnseen = useMemo(() => {
    return story.items.findIndex(({ viewedByMe }) => {
      // return true if you have NOT viewed the story - this will set newestUnseen to that index
      // if (views.length <= 0) return true;

      // const viewedByMe = views.some(({ id }) => id === currentUserId);
      return !viewedByMe;
    });
  }, []);

  // STATE
  // const [currentTime, setCurrentTime] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(newestUnseen > 0 ? newestUnseen : 0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  // so I can read paused in my setInterval
  // const pausedRef = useRef(paused);
  // pausedRef.current = paused;

  // VARIABLES
  const { items, owner, type, preview, topics } = story;

  // MEMO VALUES
  const activeItem = useMemo(() => {
    return { ...items[activeItemIndex] };
  }, [activeItemIndex]);

  const isMyPost = owner.id === currentUserId;

  // MUTATIONS
  // DELETE POST MUTATION
  const [deleteOneStoryItem] = useMutation(DELETE_STORYITEM_MUTATION, {
    variables: { where: { id: activeItem.id } },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteOneStoryItem: { __typename: 'StoryItem', id: activeItem.id },
    },
    update(cache, { data: deleteOneStoryItem }) {
      // remove from cache
      cache.evict({ id: cache.identify({ __typename: 'StoryItem', id: activeItem.id }) });
      cache.gc();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this item. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const [deleteOneStory] = useMutation(DELETE_STORY_MUTATION, {
    variables: { where: { id: story.id } },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteOneStory: { __typename: 'Story', id: story.id },
    },
    update(cache, { data: deleteOneStory }) {
      // remove from cache
      cache.evict({ id: cache.identify({ __typename: 'Story', id: story.id }) });
      cache.gc();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const [viewedStoryItem] = useMutation(VIEWED_STORY_ITEM_MUTATION);

  function resetState() {
    setPaused(false);
    setVideoStarted(false);
    setIsBuffering(false);
  }

  function incrementIndex() {
    // reset state everytime story item changes
    resetState();

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
    // reset state everytime story item changes
    resetState();

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
    // reset state everytime story becomes active
    if (storyIsActive) {
      resetState();

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

  // CUSTOM FUNCTIONS

  // functions for "More" modal
  const removeFromProject = () => {
    // setPaused(true); // doesnt work
    Alert.alert(`Are you sure you want to delete this ${activeItem.type.toLowerCase()}?`, '', [
      {
        text: `Delete`,
        onPress: () => {
          navigation.goBack(); // close options modal
          deleteOneStoryItem();
        },
      },
      { text: 'Cancel', onPress: () => setPaused(false), style: 'cancel' },
      { cancelable: true },
    ]);
  };

  const deleteProject = () => {
    // setPaused(true); // doesnt work
    Alert.alert(`Are you sure you want to delete this entire project?`, 'There is no going back', [
      {
        text: 'Delete',
        onPress: () => {
          navigation.goBack(); // close options modal
          deleteOneStory();
        },
      },
      { text: 'Cancel', onPress: () => setPaused(false), style: 'cancel' },
      { cancelable: true },
    ]);
  };

  const determineOptions = () => {
    if (story.type === 'PROJECT' && story.items.length > 1) {
      return [
        {
          text: `Add another bit`,
          onPress: () => navigation.navigate('StoryCameraModal', { projectPassedIn: story }),
        },
        {
          text: `Delete this ${activeItem.type.toLowerCase()}`,
          color: colors.peach,
          onPress: removeFromProject,
        },
        {
          text: 'Delete entire Project',
          color: colors.peach,
          onPress: deleteProject,
        },
      ];
    }
    if (story.type === 'PROJECT') {
      return [
        {
          text: `Add another bit`,
          onPress: () => navigation.navigate('StoryCameraModal', { projectPassedIn: story }),
        },
        {
          text: `Delete this ${activeItem.type.toLowerCase()}`,
          color: colors.peach,
          onPress: removeFromProject,
        },
      ];
    }
    if (story.type === 'INTRO') {
      return [
        {
          text: 'Delete Intro',
          color: colors.peach,
          onPress: removeFromProject,
        },
      ];
    }
    return [];
  };
  const handleMoreButton = () => {
    const onCancel = () => {
      navigation.goBack();
      setPaused(false);
    };

    setPaused(true);
    const options = determineOptions();
    navigation.navigate('SelectorModal', { options, onCancel });
  };

  // RENDER FUNCTIONS

  // THE REASON WE RENDER ALL FOOTERS IS SO WE CAN MAINTAIN STATE OF LIKED / LIKESCOUNT W/O RE-RENDERING
  const renderAllFooters = () => {
    return items.map((item, index) => {
      const itemIsActive = index === activeItemIndex;
      return (
        <StoryFooter
          key={item.id}
          story={story}
          item={item}
          itemIsActive={itemIsActive}
          isMyPost={isMyPost}
          navigation={navigation}
          handleMoreButton={handleMoreButton}
          setPaused={setPaused}
          incrementIndex={incrementIndex}
          decrementIndex={decrementIndex}
        />
      );
    });
  };

  // RETURN
  if (hasError) {
    return (
      <View style={styles.errorView}>
        <Text>There was an error</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...styles.container, width }}>
      <View style={{ flex: 1 }}>
        {/* absolute positioned stuff */}
        <StoryImage
          key={activeItem.id}
          activeItem={activeItem}
          videoRef={videoRef}
          isBuffering={isBuffering}
          setIsBuffering={setIsBuffering}
          paused={paused}
          setPaused={setPaused}
          incrementIndex={incrementIndex}
          storyIsActive={storyIsActive}
          setVideoStarted={setVideoStarted}
          videoStarted={videoStarted}
        />
        <TopLinearFade />
        <BottomLinearFade />
        {/* <StoryTapRegions
          decrementIndex={decrementIndex}
          incrementIndex={incrementIndex}
          handleDoubleTap={handleDoubleTap}
          setPaused={setPaused}
        /> */}
        <StoryProgressBars
          items={items}
          activeItemIndex={activeItemIndex}
          paused={paused}
          storyIsActive={storyIsActive}
          incrementIndex={incrementIndex}
          videoStarted={videoStarted}
        />
        {renderAllFooters()}
        <StoryHeader owner={owner} type={type} activeItem={activeItem} navigation={navigation} isMyPost={isMyPost} />
      </View>
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
