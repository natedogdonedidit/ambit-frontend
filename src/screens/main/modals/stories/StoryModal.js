import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { differenceInHours } from 'date-fns';

import { SafeAreaView } from 'react-native-safe-area-context';
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

const IMAGE_DURATION = 2;

const StoryModal = ({ navigation, route }) => {
  const { isPreview = false, story = null, intro = null } = route.params;
  const { currentUserId } = useContext(UserContext);

  const videoRef = useRef(null);

  // STATE
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

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

  // so I can read paused in my setInterval
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  // VARIABLES
  const { items } = activeStory;
  const isEmpty = items.length < 1;
  const activeItem = { ...items[activeIndex] };
  const isMyPost = activeItem.owner.id === currentUserId;

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
      // incrementIndex();
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
  const onBuffer = data => {
    setIsBuffering(data.isBuffering);
  };
  // const onError = () => {};
  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onVideoEnd = () => {
    incrementIndex();
  };

  // CUSTOM FUNCTIONS
  const incrementIndex = () => {
    setCurrentTime(0);
    if (activeIndex < items.length - 1) {
      setActiveIndex(prevState => prevState + 1);
    }

    // if it was the last item
    if (activeIndex === items.length - 1) {
      // if this is a story, check to see if there is an intro
      if (activeStory.type === 'STORY' && intro) {
        if (intro.items.length > 0) {
          setActiveStory(intro);
          setActiveIndex(0);
          setShowIntroPreview(true);
        }
      } else {
        // if there is no intro to play...then close the modal
        navigation.goBack();
      }
    }
  };

  const decrementIndex = () => {
    if (activeIndex > 0) {
      setActiveIndex(prevState => prevState - 1);
    } else if (activeStory.type === 'INTRO' && story) {
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

  // const determineOptionsOLD = () => {
  //   if (activeStory.type === 'PROJECT') {
  //     // if active PROJECT and also in MYSTORY
  //     if (includedInMyStory) {
  //       return [
  //         {
  //           text: 'Remove from Project',
  //           color: colors.peach,
  //           onPress: removeFromProject,
  //         },
  //       ];
  //     }
  //     // if only in PROJECT
  //     return [
  //       {
  //         text: 'Remove from Project',
  //         color: colors.peach,
  //         onPress: removeFromProject,
  //       },
  //     ];
  //   }
  //   if (activeStory.type === 'MYSTORY') {
  //     if (includedInSolo) {
  //       // if also saved to Profile
  //       if (soloStory.save) {
  //         return [
  //           {
  //             text: 'Remove from My Story',
  //             color: colors.peach,
  //             onPress: removeFromMyStory,
  //           },
  //         ];
  //       }
  //       // include in My Story only (not saved to profile)
  //       return [
  //         {
  //           text: 'Remove from My Story',
  //           color: colors.peach,
  //           onPress: removeFromMyStory,
  //         },
  //       ];
  //     }

  //     // if active MYSTORY and also in PROJECT
  //     if (includedInProject) {
  //       return [
  //         {
  //           text: 'Remove from My Story',
  //           color: colors.peach,
  //           onPress: removeFromMyStory,
  //         },
  //       ];
  //     }
  //   } else if (activeStory.type === 'SOLO') {
  //     // if active SOLO but still exists on MYSTORY
  //     if (includedInMyStory) {
  //       return [
  //         {
  //           text: 'Remove from My Profile',
  //           color: colors.peach,
  //           onPress: removeFromMyProfile,
  //         },
  //       ];
  //     }

  //     // if SOLO and only exists on Profile
  //     if (activeItem.type === 'IMAGE') {
  //       return [
  //         {
  //           text: 'Delete Image',
  //           color: colors.peach,
  //           onPress: deleteImageFromProfile,
  //         },
  //       ];
  //     }

  //     if (activeItem.type === 'VIDEO') {
  //       return [
  //         {
  //           text: 'Delete Video',
  //           color: colors.peach,
  //           onPress: deleteVideoFromProfile,
  //         },
  //       ];
  //     }

  //     return [
  //       {
  //         text: 'Delete',
  //         color: colors.peach,
  //         onPress: deleteImageFromProfile,
  //       },
  //     ];
  //   } else if (activeStory.type === 'INTRO') {
  //     return [
  //       {
  //         text: 'Delete',
  //         color: colors.peach,
  //         onPress: deleteItemFromIntro,
  //       },
  //     ];
  //   }
  //   return [];
  // };

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
