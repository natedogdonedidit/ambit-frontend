import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useMutation, useLazyQuery, useQuery } from '@apollo/react-hooks';
import { differenceInHours } from 'date-fns';

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

const IMAGE_DURATION = 2;

const StoryModal = ({ navigation, route }) => {
  // option 1: pass in a singleStory. Story will play, followed by intro, then modal will close
  // option 2: pass in an intro. Intro will play, then modal will close.
  // option 3: pass in firstStory, with a topicIDtoSearch. First story will play followed by more stories from that topic
  // option 4: pass in firstStory, with type = 'Home'. First story will play followed by more from your followers
  // option 5: pass in firstStory, with type = 'Profile'. First story will play followed by more from this user

  // moreType: 'Home', 'Topic', 'User', null means only show a single story

  const { isPreview = false, story = null, intro = null, moreType = null, topicIDtoSearch } = route.params;
  const { currentUserId } = useContext(UserContext);

  const videoRef = useRef(null);

  // STATE
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [storyQIndex, setStoryQIndex] = useState(0);
  const [activeStory, setActiveStory] = useState(story || intro);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showIntroPreview, setShowIntroPreview] = useState(false);
  const [indexAddedToProfile, setIndexAddedToProfile] = useState([]);
  const [includedInProject, setIncludedInProject] = useState(false);
  const [includedInMyStory, setIncludedInMyStory] = useState(false);
  const [includedInSolo, setIncludedInSolo] = useState(false);
  const [soloStory, setSoloStory] = useState(null);
  const [paused, setPaused] = useState(false);
  // const [storiesViewed, setStoriesViewed] = useState([story.id]); // THIS IS A TEMPORARY SOLUTION TO ELIMINATE REPEAT STORIES

  // so I can read paused in my setInterval
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  // VARIABLES
  const { items } = activeStory;
  const isEmpty = items.length < 1;
  const activeItem = { ...items[activeIndex] };
  const isMyPost = activeItem.owner.id === currentUserId;

  // QUERY TO GET USERS TOPICS
  const { data } = useQuery(CURRENT_USER_QUERY);
  let favoriteTopics = [topicIDtoSearch || null];
  const { userLoggedIn } = data;

  // console.log(favoriteTopics);
  useEffect(() => {
    if (userLoggedIn) {
      if (userLoggedIn.topicsFocus.length > 0) {
        favoriteTopics = [...favoriteTopics, ...userLoggedIn.topicsFocus.map(top => top.topicID)];
      }
      if (userLoggedIn.topicsInterest.length > 0) {
        if (favoriteTopics === []) {
          favoriteTopics = [...userLoggedIn.topicsInterest.map(top => top.topicID)];
        } else {
          // only add topics that dont already exist
          userLoggedIn.topicsInterest.forEach(topic => {
            if (favoriteTopics.findIndex(fav => fav.topicID === topic.topicID) === -1) {
              favoriteTopics = [...favoriteTopics, topic.topicID];
            }
          });
        }
      }
    }
  }, [userLoggedIn]);

  // QUERIES - to get next stories
  const [
    getStoriesTopic,
    {
      error: errorStoriesTopic,
      data: dataStoriesTopic,
      refetch: refetchStoriesTopic,
      fetchMore: fetchMoreStoriesTopic,
      networkStatus: networkStatusStoriesTopic,
    },
  ] = useLazyQuery(STORIES_TOPIC_QUERY, {
    variables: {
      topicID: topicIDtoSearch,
    },
    notifyOnNetworkStatusChange: true,
  });

  const refetchingStories = networkStatusStoriesTopic === 4;
  const fetchingMoreStories = networkStatusStoriesTopic === 3;
  const loadingStories = networkStatusStoriesTopic === 1;

  // an array of the stories up next, start with the first story (passed in)
  let storyQ = [story];

  if (moreType === 'Topic' && dataStoriesTopic) {
    if (dataStoriesTopic.storiesTopic) {
      // remove the story passed in from the query results
      const storiesToAdd = dataStoriesTopic.storiesTopic.filter(s => s.id !== story.id);

      storyQ = [...storyQ, ...storiesToAdd];
    }
  }

  // MUTATIONS
  const [updateStory] = useMutation(UPDATE_STORY_MUTATION, {
    // onCompleted: () => {},
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to update this story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  const [deleteStory] = useMutation(DELETE_STORY_MUTATION, {
    // onCompleted: () => {},
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to delete your story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // EFFECTS
  useEffect(() => {
    if (moreType === 'Home') {
    }

    if (moreType === 'Topic') {
      getStoriesTopic();
    }

    if (moreType === 'User') {
    }

    // if no moreType
  }, [moreType]);

  // this is so when you open the "More" modal, the story unpauses when re-focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (pausedRef.current) {
        setPaused(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  // update heavy computation stuff only once when activeIndex changes
  // this stuff is mainly for deciding what to render in "More" modal
  useEffect(() => {
    const now = new Date();
    const solo = activeItem.stories.find(s => s.type === 'SOLO');
    setSoloStory(solo);
    setIncludedInSolo(!!solo);
    setIncludedInProject(!!activeItem.stories.find(s => s.type === 'PROJECT'));
    setIncludedInMyStory(
      !!activeItem.stories.find(s => s.type === 'MYSTORY' && differenceInHours(now, new Date(activeItem.createdAt)) < 24)
    );
  }, [activeItem]);

  // if reached the end of photo timelimit - go to next item
  useEffect(() => {
    if (activeItem.type === 'IMAGE' && currentTime >= IMAGE_DURATION) {
      incrementIndex();
    }
  }, [currentTime]);

  // if the activeIndex changes always reset the current time to zero
  useEffect(() => {
    setCurrentTime(0);

    // only start the timer if showIntroPreview is false
    if (!showIntroPreview) {
      // increment the timer ever X seconds
      const intervalID = setInterval(() => {
        if (activeItem.type === 'IMAGE') {
          if (!pausedRef.current) {
            setCurrentTime(prevState => prevState + 0.01);
          }
        }
      }, 10);

      // if the new item is a video...clear the inverval
      if (activeItem.type === 'VIDEO') {
        clearInterval(intervalID);
      }

      return () => clearInterval(intervalID);
    }
  }, [activeIndex, showIntroPreview]);

  if (isEmpty) {
    navigation.goBack();
  }

  // VIDEO PLAYER CALLBACKS
  const onBuffer = dataa => {
    setIsBuffering(dataa.isBuffering);
  };
  // const onError = () => {};
  const onProgress = dataa => {
    setCurrentTime(dataa.currentTime);
  };

  const onVideoEnd = () => {
    incrementIndex();
  };

  // CUSTOM FUNCTIONS
  const goToPrevStory = () => {
    setActiveStory(storyQ[storyQIndex - 1]);
    setActiveIndex(storyQ[storyQIndex - 1].items.length - 1);
    setStoryQIndex(prevState => prevState - 1);
  };

  const goToNextStory = () => {
    setActiveStory(storyQ[storyQIndex + 1]);
    setActiveIndex(0);
    setStoryQIndex(prevState => prevState + 1);
  };

  const goToIntro = () => {
    setActiveStory(intro);
    setActiveIndex(0);
    setShowIntroPreview(true);
  };

  const incrementIndex = () => {
    setCurrentTime(0);
    if (activeIndex < items.length - 1) {
      setActiveIndex(prevState => prevState + 1);
    }

    // if it was the last item in the activeStory
    if (activeIndex === items.length - 1) {
      // if there are more stories in the Q to show
      if (storyQ.length > storyQIndex + 1) {
        goToNextStory();
        // if this is a story, check to see if there is an intro
      } else if (activeStory.type === 'STORY' && intro) {
        if (intro.items.length > 0) {
          goToIntro();
        }
      } else {
        // if there are no more stories in the Q, and there is no intro to play...then close the modal
        navigation.goBack();
      }
    }
  };

  const decrementIndex = () => {
    if (activeIndex > 0) {
      setActiveIndex(prevState => prevState - 1);
    }

    if (activeIndex <= 0 && storyQIndex > 0) {
      goToPrevStory();
    }

    if (activeStory.type === 'INTRO' && story) {
      setShowIntroPreview(true);
    }

    setCurrentTime(0);
  };

  const closeIntroPreview = () => {
    setShowIntroPreview(false);
  };

  const goBackToStory = () => {
    setShowIntroPreview(false);
    if (story) {
      setActiveStory(story);
      setActiveIndex(story.items.length - 1);
    } else {
      // navigation.navigate('Home');
      navigation.goBack();
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

  const handleAddToProfile = () => {
    if (includedInSolo) {
      setIndexAddedToProfile([...indexAddedToProfile, activeIndex]);
      updateStory({
        variables: {
          id: soloStory.id,
          story: {
            save: true,
          },
        },
        refetchQueries: () => [{ query: SINGLE_USER_BIO, variables: { id: currentUserId } }],
      });
    }
  };

  // functions for "More" modal
  const removeFromProject = () => {
    Alert.alert(`Are you sure you want to remove this ${activeItem.type.toLowerCase()} from your project?`, '', [
      {
        text: 'Remove',
        onPress: () => {
          navigation.goBack(); // close options modal

          // make new array for optimistic response
          const newItemsArray = [...activeStory.items];

          // remove it
          newItemsArray.splice(activeIndex, 1);

          updateStory({
            variables: {
              id: activeStory.id,
              story: {
                items: { disconnect: [{ id: activeItem.id }] },
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              updateStory: {
                __typename: 'Story',
                ...activeStory,
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
          const newItemsArray = [...activeStory.items];

          // remove it
          newItemsArray.splice(activeIndex, 1);

          updateStory({
            variables: {
              id: activeStory.id,
              story: {
                items: { disconnect: [{ id: activeItem.id }] },
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              updateStory: {
                __typename: 'Story',
                ...activeStory,
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
  const removeFromMyProfile = () => {
    Alert.alert(`Are you sure you want to remove this ${activeItem.type.toLowerCase()} from your profile?`, '', [
      {
        text: 'Remove',
        onPress: () => {
          navigation.goBack(); // close options modal

          // make new array for optimistic response
          const newItemsArray = [...activeStory.items];

          // remove it
          newItemsArray.splice(activeIndex, 1);

          updateStory({
            variables: {
              id: activeStory.id,
              story: {
                save: false,
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              updateStory: {
                __typename: 'Story',
                ...activeStory,
                save: false,
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
  const deleteStoryForGood = () => {
    Alert.alert(`Are you sure you want to delete this ${activeItem.type.toLowerCase()} for good?`, '', [
      {
        text: 'Delete',
        onPress: () => {
          navigation.goBack(); // close options modal

          deleteStory({
            variables: {
              id: activeStory.id,
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
    if (activeStory.type === 'PROJECT') {
      return [
        {
          text: 'Remove from Project',
          color: colors.peach,
          onPress: removeFromProject,
        },
      ];
    }
    if (activeStory.type === 'MYSTORY') {
      return [
        {
          text: 'Remove from My Story',
          color: colors.peach,
          onPress: removeFromMyStory,
        },
      ];
    }
    if (activeStory.type === 'SOLO') {
      // if active SOLO but still exists on MYSTORY
      if (includedInMyStory) {
        return [
          {
            text: 'Remove from My Profile',
            color: colors.peach,
            onPress: removeFromMyProfile,
          },
        ];
      }

      if (activeItem.type === 'VIDEO') {
        return [
          {
            text: 'Delete Video',
            color: colors.peach,
            onPress: deleteStoryForGood,
          },
        ];
      }

      // if SOLO and only exists on Profile - delete for good
      return [
        {
          text: 'Delete Image',
          color: colors.peach,
          onPress: deleteStoryForGood,
        },
      ];
    }
    if (activeStory.type === 'INTRO') {
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

  if (showIntroPreview) {
    const { owner } = activeItem;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" hidden />
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: colors.gray60 }}>
          <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
              <ProfilePic size="xlarge" user={owner} navigation={navigation} disableVideo />
              <Text
                style={{ paddingTop: 20, ...defaultStyles.headerMedium, color: 'white' }}
              >{`${owner.firstName}'s Intro`}</Text>
              <Text style={{ paddingTop: 5, ...defaultStyles.defaultSemibold, color: 'white', opacity: 0.8 }}>
                Tap right side to view
              </Text>
            </View>
            <View style={{ ...StyleSheet.absoluteFillObject, flexDirection: 'row', alignItems: 'stretch' }}>
              <TouchableOpacity onPress={goBackToStory} style={{ flex: 1 }} />
              <TouchableOpacity onPress={closeIntroPreview} style={{ flex: 1 }} />
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }

  // console.log('rendering');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" hidden />

      {/* absolute positioned stuff */}
      <StoryImage
        activeItem={activeItem}
        videoRef={videoRef}
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
        activeStory={activeStory}
        activeIndex={activeIndex}
        IMAGE_DURATION={IMAGE_DURATION}
        currentTime={currentTime}
      />
      <StoryHeader activeStory={activeStory} activeIndex={activeIndex} isPreview={isPreview} navigation={navigation} />
      <StoryFooter
        activeStory={activeStory}
        activeIndex={activeIndex}
        isMyPost={isMyPost}
        navigation={navigation}
        indexAddedToProfile={indexAddedToProfile}
        handleAddToProfile={handleAddToProfile}
        handleMoreButton={handleMoreButton}
        favoriteTopics={favoriteTopics}
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

export default StoryModal;
