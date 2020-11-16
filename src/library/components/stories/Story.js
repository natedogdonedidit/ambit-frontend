import React, { useState, useRef, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, View, Text, Alert, Dimensions, InteractionManager } from 'react-native';
import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from 'library/utils/UserContext';

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
  favoriteTopics = [],
  setDisableOutterScroll,
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

  const [viewedStoryItem] = useMutation(VIEWED_STORY_ITEM_MUTATION, {
    // variables: { storyItemID: activeItem.id },
    // ignoreResults: true,
    // update(cache, { data: dataReturned }) {
    //   // We get a single item from cache.
    //   const storyItemInCache = client.readFragment({
    //     id: `StoryItem:${activeItem.id}`,
    //     fragment: StoryItemFragment,
    //     fragmentName: 'StoryItemFragment',
    //   });
    //   // console.log(`story item in cache ${storyItemInCache.plays}`);
    //   // console.log(`Added a view!!!: ${activeItem.views.length} -> ${viewedStoryItem.views.length}`);
    //   // console.log(`Added a play!!!: ${activeItem.plays} -> ${viewedStoryItem.plays}`);
    //   // Then, we update it.
    //   if (storyItemInCache) {
    //     // console.log('gettinghere');
    //     // the new view is ALWAYS the currentUser
    //     client.writeFragment({
    //       id: `StoryItem:${activeItem.id}`,
    //       fragment: StoryItemFragment,
    //       fragmentName: 'StoryItemFragment',
    //       data: {
    //         __typename: 'StoryItem',
    //         ...dataReturned.viewedStoryItem,
    //       },
    //     });
    //   }
    // },
  });

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
    }
  }, [storyIsActive]);

  // this is so story unpauses when you close Intro or the "More" modal
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setPaused(false);
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  // this is so when you open the "Intro" modal, the story pauses when un-focused
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     setPaused(true);
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  // anytime the story item changes, add the user to viewed list
  useEffect(() => {
    if (storyIsActive) {
      InteractionManager.runAfterInteractions(() => {
        viewedStoryItem({
          variables: { storyItemID: activeItem.id },
        });
      });
    }
  }, [activeItemIndex]);

  // CUSTOM FUNCTIONS
  // function engagePause() {
  // console.log('engage Pause');
  // if (!paused) {
  // console.log('setting pause to true');
  // setPaused(true);
  // }
  // }

  // function disengagePause() {
  // console.log('disengage Pause');
  // if (paused) {
  // console.log('setting pause to false');
  // setPaused(false);
  // }
  // }

  const handleDoubleTap = () => {};

  // functions for "More" modal
  const removeFromProject = () => {
    // setPaused(true); // doesnt work
    Alert.alert(`Are you sure you want to delete this ${activeItem.type.toLowerCase()} from your project?`, '', [
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

  const removeFromIntro = () => {};

  const determineOptions = () => {
    if (story.type === 'PROJECT') {
      return [
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
    if (story.type === 'INTRO') {
      return [
        {
          text: 'Delete Intro',
          color: colors.peach,
          onPress: removeFromIntro,
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
          favoriteTopics={favoriteTopics}
          setDisableOutterScroll={setDisableOutterScroll}
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
        <StoryTapRegions
          decrementIndex={decrementIndex}
          incrementIndex={incrementIndex}
          handleDoubleTap={handleDoubleTap}
          setPaused={setPaused}
        />
        <StoryProgressBars
          items={items}
          activeItemIndex={activeItemIndex}
          paused={paused}
          storyIsActive={storyIsActive}
          incrementIndex={incrementIndex}
          videoStarted={videoStarted}
        />
        <StoryHeader owner={owner} type={type} activeItem={activeItem} navigation={navigation} isMyPost={isMyPost} />
        {renderAllFooters()}
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
