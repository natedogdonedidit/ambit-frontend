import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Alert, Dimensions, Animated } from 'react-native';
import { useMutation, useLazyQuery, useQuery, useApolloClient } from '@apollo/react-hooks';
import { differenceInHours, setWeek } from 'date-fns';

import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';
import { UserContext } from 'library/utils/UserContext';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import UPDATE_STORY_MUTATION from 'library/mutations/UPDATE_STORY_MUTATION';
import DELETE_STORY_MUTATION from 'library/mutations/DELETE_STORY_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import StoryTapRegions from 'library/components/stories/StoryTapRegions';
import StoryImage from 'library/components/stories/StoryImage';
import TopLinearFade from 'library/components/stories/TopLinearFade';
import BottomLinearFade from 'library/components/stories/BottomLinearFade';
import StoryProgressBars from 'library/components/stories/StoryProgressBars';
import StoryHeader from 'library/components/stories/StoryHeader';
import StoryFooter from 'library/components/stories/StoryFooter';
import STORIES_TOPIC_QUERY from 'library/queries/STORIES_TOPIC_QUERY';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import VIEWED_STORY_ITEM_MUTATION from 'library/mutations/VIEWED_STORY_ITEM_MUTATION';
import { StoryItemFragment } from 'library/queries/_fragments';
import { STORY_IMAGE_DURATION } from 'styles/constants';

const StoryCard = ({
  navigation,
  story,
  storyIsActive,
  tryGoToPrevStory,
  tryGoToNextStory,
  favoriteTopics = [],
  setDisableOutterScroll = () => null,
  // storyKey,
}) => {
  // option 1: pass in a singleStory. Story will play, followed by intro, then modal will close
  // option 2: pass in an intro. Intro will play, then modal will close.
  // option 3: pass in firstStory, with a topicIDtoSearch. First story will play followed by more stories from that topic
  // option 4: pass in firstStory, with type = 'Home'. First story will play followed by more from your followers
  // option 5: pass in firstStory, with type = 'Profile'. First story will play followed by more from this user

  // moreType: 'Home', 'Topic', 'User', null means only show a single story
  const client = useApolloClient();
  const { currentUserId } = useContext(UserContext);
  const { width } = Dimensions.get('window');

  const videoRef = useRef(null);

  // will return the index of the newest unseen story item
  const newestUnseen = story.items.findIndex(({ views }) => {
    // return true if you have NOT viewed the story - this will set newestUnseen to that index
    if (views.length <= 0) return true;

    const viewedByMe = views.some(({ id }) => id === currentUserId);
    return !viewedByMe;
  });

  // STATE
  const [hasError, setHasError] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);

  // const [storyQIndex, setStoryQIndex] = useState(0);
  // const [activeStory, setActiveStory] = useState(story || intro);
  const [activeIndex, setActiveIndex] = useState(newestUnseen > 0 ? newestUnseen : 0);
  const [itemDuration, setItemDuration] = useState(10); // in seconds
  const [videoStarted, setVideoStarted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [paused, setPaused] = useState(!storyIsActive);
  // const [storiesViewed, setStoriesViewed] = useState([story.id]); // THIS IS A TEMPORARY SOLUTION TO ELIMINATE REPEAT STORIES

  // so I can read paused in my setInterval
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  // VARIABLES
  const { items } = story;
  const isEmpty = items.length < 1;
  const activeItem = { ...items[activeIndex] };
  const isMyPost = story.owner.id === currentUserId;
  const isIntro = story.type === 'INTRO';

  // MUTATIONS
  const [updateStory] = useMutation(UPDATE_STORY_MUTATION, {
    // onCompleted: () => {},
    onError: (error) => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to update this story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  const [deleteStory] = useMutation(DELETE_STORY_MUTATION, {
    // onCompleted: () => {},
    onError: (error) => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to delete your story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  const [viewedStoryItem, { loading: loadingViewMutation }] = useMutation(VIEWED_STORY_ITEM_MUTATION, {
    variables: { storyItemID: activeItem.id },
    update(cache, { data: { viewedStoryItem } }) {
      // We get a single item from cache.
      const storyItemInCache = client.readFragment({
        id: `StoryItem:${activeItem.id}`,
        fragment: StoryItemFragment,
        fragmentName: 'StoryItemFragment',
      });

      // console.log(`story item in cache ${storyItemInCache.plays}`);

      // console.log(`Added a view!!!: ${activeItem.views.length} -> ${viewedStoryItem.views.length}`);
      // console.log(`Added a play!!!: ${activeItem.plays} -> ${viewedStoryItem.plays}`);

      // Then, we update it.
      if (storyItemInCache) {
        // console.log('gettinghere');

        // the new view is ALWAYS the currentUser
        client.writeFragment({
          id: `StoryItem:${activeItem.id}`,
          fragment: StoryItemFragment,
          fragmentName: 'StoryItemFragment',
          data: {
            __typename: 'StoryItem',
            ...viewedStoryItem,
          },
        });
      }
    },
  });

  // anytime the story item changes, add the user to viewed list
  useEffect(() => {
    if (activeItem.type === 'IMAGE') {
      // console.log('setting is buffering false in IMAGE')
      setIsBuffering(false);
    }
    if (storyIsActive && !loadingViewMutation) {
      viewedStoryItem();
    }
  }, [activeIndex]);

  // anytime the story item changes, save the duration to state (if this story is active)

  // anytime the story item or duration changes

  // this is so when you open the "More" modal, the story unpauses when re-focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('focussed - setting pause false');
      setPaused(false);
    });

    return unsubscribe;
  }, [navigation]);

  // this is so when you open the "Intro" modal, the story pauses when un-focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // console.log('blurred - setting pause true');
      setPaused(true);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // if changed from not active to active - unpause
    // if (paused && storyIsActive) {
    //   if (activeItem.type === 'VIDEO') {
    //     videoRef.current.seek(0);
    //   }
    //   // setCurrentTime(0);
    //   setPaused(false);
    // }

    // if changed from active to not active - pause
    if (!paused && !storyIsActive) {
      setPaused(true);
      // setCurrentTime(0);
      if (activeIndex < items.length - 1) {
        setActiveIndex((prevState) => prevState + 1);
      }
    }

    if (storyIsActive) {
      if (paused) {
        if (activeItem.type === 'VIDEO') {
          videoRef.current.seek(0);
        }
        // setCurrentTime(0);
        setPaused(false);

        // if ()
      }
    }
  }, [storyIsActive]);

  // if the activeIndex changes always reset the current time to zero
  useEffect(() => {
    // setCurrentTime(0);

    if (storyIsActive) {
      // increment the timer ever X seconds
      const intervalID = setInterval(() => {
        if (activeItem.type === 'IMAGE' && storyIsActive) {
          if (!pausedRef.current) {
            // setCurrentTime((prevState) => prevState + 0.01);
          }
        }
      }, 10);

      // if the new item is a video...clear the inverval
      if (activeItem.type === 'VIDEO') {
        clearInterval(intervalID);
      }

      return () => clearInterval(intervalID);
    }
  }, [activeIndex, storyIsActive]);

  // VIDEO PLAYER CALLBACKS
  const onBuffer = (dataa) => {
    if (videoStarted && dataa.isBuffering) {
      // mid-video buffering will trigger this

      console.log(`mid video buffer, setting isBuffering to ${dataa.isBuffering}`);
      setIsBuffering(dataa.isBuffering);
    }
  };
  // const onError = () => {};
  const onProgress = ({ currentTime }) => {
    // when video first starts only
    if (currentTime > 0 && currentTime < 1) {
      // console.log('video started - setting buffering false', currentTime)
      setVideoStarted(true);
      setIsBuffering(false);
    }
    // if (storyIsActive) {
    //   setCurrentTime(dataa.currentTime);
    // }
  };

  const onReadyForDisplay = () => {
    // console.log('onReadyForDisplay')
    // setIsBuffering(false)
  };

  const onLoadStart = () => {
    // console.log('onLoadStart')
    // setIsBuffering(true)
  };

  const onLoad = () => {
    // console.log('onLoad')
    // setIsBuffering(false)
  };

  const onVideoEnd = () => {
    console.log('on video end');
    incrementIndex();
  };

  // CUSTOM FUNCTIONS

  const incrementIndex = () => {
    if (isIntro) {
      navigation.goBack();
    } else {
      if (activeIndex < items.length - 1) {
        setActiveIndex((prevState) => prevState + 1);
        setIsBuffering(true);
        setVideoStarted(false);
      }

      // if it was the last item in the activeStory
      if (activeIndex === items.length - 1) {
        tryGoToNextStory();
      }
    }
  };

  const decrementIndex = () => {
    if (isIntro) {
      navigation.goBack();
    } else if (activeIndex > 0) {
      setActiveIndex((prevState) => prevState - 1);
      setIsBuffering(true);
      setVideoStarted(false);
    } else {
      tryGoToPrevStory();
    }
  };

  const engagePause = () => {
    if (!paused) {
      // console.log('setting paused to TRUE');
      setPaused(true);
    }
  };

  const disengagePause = () => {
    if (paused) {
      // console.log('setting paused to FALSE');
      setPaused(false);
    }
  };

  const handleDoubleTap = () => {};

  // functions for "More" modal
  const removeFromProject = () => {
    Alert.alert(`Are you sure you want to remove this ${activeItem.type.toLowerCase()} from your project?`, '', [
      {
        text: 'Remove',
        onPress: () => {
          navigation.goBack(); // close options modal

          // make new array for optimistic response
          const newItemsArray = [...story.items];

          // remove it
          newItemsArray.splice(activeIndex, 1);

          updateStory({
            variables: {
              id: story.id,
              story: {
                items: { disconnect: [{ id: activeItem.id }] },
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              updateStory: {
                __typename: 'Story',
                ...story,
                items: newItemsArray,
              },
            },
            refetchQueries: () => [{ query: SINGLE_USER_BIO, variables: { id: currentUserId } }],
          });

          navigation.goBack(); // close story modal
        },
      },
      { text: 'Cancel', onPress: () => navigation.goBack(), style: 'cancel' },
      { cancelable: true },
    ]);
  };
  const removeFromMyStory = () => {
    Alert.alert(`Are you sure you want to remove this ${activeItem.type.toLowerCase()} from your story?`, '', [
      {
        text: 'Remove',
        onPress: () => {
          navigation.goBack(); // close options modal

          // make new array for optimistic response
          const newItemsArray = [...story.items];

          // remove it
          newItemsArray.splice(activeIndex, 1);

          updateStory({
            variables: {
              id: story.id,
              story: {
                items: { disconnect: [{ id: activeItem.id }] },
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              updateStory: {
                __typename: 'Story',
                ...story,
                items: newItemsArray,
              },
            },
            refetchQueries: () => [{ query: SINGLE_USER_BIO, variables: { id: currentUserId } }],
          });

          navigation.goBack(); // close story modal
        },
      },
      { text: 'Cancel', onPress: () => navigation.goBack(), style: 'cancel' },
      { cancelable: true },
    ]);
  };

  const removeFromIntro = () => {};
  const determineOptions = () => {
    if (story.type === 'PROJECT') {
      return [
        {
          text: 'Remove from Project',
          color: colors.peach,
          onPress: removeFromProject,
        },
      ];
    }
    if (story.type === 'MYSTORY') {
      return [
        {
          text: 'Remove from My Story',
          color: colors.peach,
          onPress: removeFromMyStory,
        },
      ];
    }
    if (story.type === 'INTRO') {
      return [
        {
          text: 'Delete',
          color: colors.peach,
          onPress: removeFromIntro,
        },
      ];
    }
    return [];
  };
  const handleMoreButton = () => {
    engagePause();
    const options = determineOptions();
    navigation.navigate('SelectorModal', { options });
  };

  // RENDER FUNCTIONS

  // RETURN
  if (hasError) {
    return (
      <View style={styles.errorView}>
        <Text>There was an error</Text>
      </View>
    );
  }

  if (isEmpty) {
    console.log(story);
    return null;
    // navigation.goBack();
  }

  return (
    <SafeAreaView style={{ ...styles.container, width }}>
      <View style={{ flex: 1 }}>
        {/* absolute positioned stuff */}
        <StoryImage
          activeItem={activeItem}
          videoRef={videoRef}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onReadyForDisplay={onReadyForDisplay}
          onProgress={onProgress}
          onBuffer={onBuffer}
          onVideoEnd={onVideoEnd}
          isBuffering={isBuffering}
          paused={paused}
        />
        <TopLinearFade />
        <BottomLinearFade />
        <StoryTapRegions
          decrementIndex={decrementIndex}
          incrementIndex={incrementIndex}
          handleDoubleTap={handleDoubleTap}
          engagePause={engagePause}
          disengagePause={disengagePause}
        />
        <StoryProgressBars
          story={story}
          activeIndex={activeIndex}
          incrementIndex={incrementIndex}
          storyIsActive={storyIsActive}
          isBuffering={isBuffering}
          paused={paused}
          // storyKey={storyKey}
        />
        <StoryHeader story={story} activeIndex={activeIndex} navigation={navigation} engagePause={engagePause} />
        <StoryFooter
          story={story}
          activeIndex={activeIndex}
          isMyPost={isMyPost}
          navigation={navigation}
          handleMoreButton={handleMoreButton}
          favoriteTopics={favoriteTopics}
          setDisableOutterScroll={setDisableOutterScroll}
        />
      </View>
    </SafeAreaView>
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

export default StoryCard;
