import React, { useState, useRef, useEffect, useMemo } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, FlatList, InteractionManager } from 'react-native';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';

import STORIES_TOPIC_QUERY from 'library/queries/STORIES_TOPIC_QUERY';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import Story from 'library/components/stories/Story';
import Loader from 'library/components/UI/Loader';
import { combineFavoriteTopics } from 'library/utils';

// option 1: pass in a singleStory. Story will play, followed by intro, then modal will close
// option 2: pass in an intro. Intro will play, then modal will close.
// option 3: pass in firstStory, with a topicIDtoSearch. First story will play followed by more stories from that topic
// option 4: pass in firstStory, with type = 'Home'. First story will play followed by more from your followers
// option 5: pass in firstStory, with type = 'Profile'. First story will play followed by more from this user

// moreType: 'Home', 'Topic', 'User', null means only show a single story

const StoryModal = ({ navigation, route }) => {
  const { story = null, moreType = null, topicIDtoSearch } = route.params;
  const { width } = Dimensions.get('window');
  const storyFlatlist = useRef();

  const [disableOutterScroll, setDisableOutterScroll] = useState(false);

  // STATE
  const [storyQ, setStoryQ] = useState([story]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      // creating handle when modal focuses
      // this allows us to stack up mutations so they fun after the modal blurs
      // console.log('creating interaction handle');
      const handle = InteractionManager.createInteractionHandle();
      return () => {
        // console.log('clearing interaction handle');
        InteractionManager.clearInteractionHandle(handle);
      };
    }, [])
  );

  // QUERY TO GET USERS TOPICS
  const { data: dataTopics } = useQuery(CURRENT_USER_TOPICS);

  // const favoriteTopics = useMemo(() => {
  //   const initialFavs = topicIDtoSearch ? [topicIDtoSearch] : [];

  //   if (dataTopics && dataTopics.myTopics) {
  //     const myFavs = combineFavoriteTopics(dataTopics.myTopics);
  //     const myFavIDs = myFavs.map((fav) => fav.id);

  //     return [...initialFavs, ...myFavIDs];
  //   }

  //   return initialFavs;
  // }, [dataTopics, topicIDtoSearch]);
  const favoriteTopics = [];

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
      where: {
        AND: [
          {
            topic: { startsWith: topicIDtoSearch },
          },
          {
            items: { some: { id: { gt: 'a' } } },
          },
        ],
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const refetchingStoriesTopic = networkStatusStoriesTopic === 4;
  const fetchingMoreStoriesTopic = networkStatusStoriesTopic === 3;
  const loadingStoriesTopic = networkStatusStoriesTopic === 1;

  const [
    getStoriesHome,
    {
      error: errorStoriesHome,
      data: dataStoriesHome,
      refetch: refetchStoriesHome,
      fetchMore: fetchMoreStoriesHome,
      networkStatus: networkStatusStoriesHome,
    },
  ] = useLazyQuery(STORIES_HOME_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const refetchingStoriesHome = networkStatusStoriesHome === 4;
  const fetchingMoreStoriesHome = networkStatusStoriesHome === 3;
  const loadingStoriesHome = networkStatusStoriesHome === 1;

  // EFFECTS
  useEffect(() => {
    if (moreType === 'Home') {
      getStoriesHome();
    }

    if (moreType === 'Topic') {
      getStoriesTopic();
    }
  }, [moreType]);

  // scrolls to index when story index changes
  useEffect(() => {
    if (storyQ.length > 0) {
      storyFlatlist.current.scrollToIndex({ index: activeStoryIndex, viewPosition: 0.5 });
    }
  }, [activeStoryIndex]);

  // used to add home stories to Q
  useEffect(() => {
    if (moreType === 'Home' && !loadingStoriesHome && dataStoriesHome) {
      if (dataStoriesHome.storiesHome) {
        // remove the story passed in from the query results
        const storiesToAdd = dataStoriesHome.storiesHome.filter((s) => s.id !== story.id && s.items.length > 0);
        setStoryQ([story, ...storiesToAdd]);
      }
    }
  }, [loadingStoriesHome, dataStoriesHome]);

  // used to add topic stories to Q
  useEffect(() => {
    // used to add home stories to Q
    if (moreType === 'Topic' && !loadingStoriesTopic && dataStoriesTopic) {
      if (dataStoriesTopic.stories) {
        // remove the story passed in from the query results
        const storiesToAdd = dataStoriesTopic.stories.filter((s) => s.id !== story.id && s.items.length > 0);
        setStoryQ([story, ...storiesToAdd]);
      }
    }
  }, [loadingStoriesTopic, dataStoriesTopic]);

  // CUSTOM FUNCTIONS
  function goToPrevStory() {
    setActiveStoryIndex((prevState) => prevState - 1);
  }

  function goToNextStory() {
    setActiveStoryIndex((prevState) => prevState + 1);
  }

  function tryGoToNextStory() {
    // console.log('going to next story', activeStoryIndex, storyQ.length);
    if (activeStoryIndex < storyQ.length - 1) {
      goToNextStory();
    } else {
      // if there are no more stories in the Q, and there is no intro to play...then close the modal
      navigation.goBack();
    }
  }

  function tryGoToPrevStory() {
    // console.log('going to prev story', activeStoryIndex)
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

  if (storyQ.length <= 0) {
    return (
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black' }}>
        <Loader size="small" backgroundColor="transparent" color="white" />
      </View>
    );
  }

  // console.log(storyQ);
  // console.log(storyQ.length);

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
        data={storyQ}
        scrollEnabled={!disableOutterScroll}
        getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
        renderItem={({ item, index }) => {
          // console.log(index, item.id);
          const storyIsActive = index === activeStoryIndex;

          return (
            <Story
              key={item.id}
              navigation={navigation}
              story={item}
              storyIsActive={storyIsActive}
              tryGoToPrevStory={tryGoToPrevStory}
              tryGoToNextStory={tryGoToNextStory}
              favoriteTopics={favoriteTopics}
              setDisableOutterScroll={setDisableOutterScroll}
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

export default StoryModal;

// fill the storyQ
// useEffect(() => {
//   fillStoryQ();
// }, [activeStoryIndex, moreType, loadingStoriesHome, dataStoriesHome, loadingStoriesTopic, dataStoriesTopic]);

// const fillStoryQ = () => {
//   const numStoriesDesireToAdd = activeStoryIndex + 1 + STORYQ_BUFFER - storyQ.length;

//   // first, check if we need to add some stories
//   if (numStoriesDesireToAdd > 0) {
//     // for HOME stories
//     if (moreType === 'Home' && dataStoriesHome && dataStoriesHome.storiesHome) {
//       // filter the Query results to only stories not alraedy in the Q
//       const storiesAvailableToAdd = dataStoriesHome.storiesHome.filter((s) => {
//         const alreadyInQ = storyQ.findIndex((st) => st.id === s.id) >= 0; // if this returns >= 0 it's already in Q
//         return !alreadyInQ && s.items.length > 0;
//       });

//       if (storiesAvailableToAdd.length > 0) {
//         // calculate the number of stories we need to add to storyQ (can't be more than length of storiesAvailableToAdd)
//         const numStoriesToAdd = Math.min(storiesAvailableToAdd.length, numStoriesDesireToAdd);

//         // grab the stories we want to add from storiesAvailableToAdd
//         const storiesToAdd = storiesAvailableToAdd.splice(0, numStoriesToAdd);

//         // add the new stories to the Q
//         setStoryQ((prev) => [...prev, ...storiesToAdd]);
//       }
//     }

//     // for TOPIC stories
//     if (moreType === 'Topics' && dataStoriesTopic && dataStoriesTopic.storiesTopic) {
//       // filter the Query results to only stories not alraedy in the Q
//       const storiesAvailableToAdd = dataStoriesTopic.storiesTopic.filter((s) => {
//         const alreadyInQ = storyQ.findIndex((st) => st.id === s.id) >= 0; // if this returns >= 0 it's already in Q
//         return !alreadyInQ && s.items.length > 0;
//       });

//       if (storiesAvailableToAdd.length > 0) {
//         // calculate the number of stories we need to add to storyQ (can't be more than length of storiesAvailableToAdd)
//         const numStoriesToAdd = Math.min(storiesAvailableToAdd.length, numStoriesDesireToAdd);

//         // grab the stories we want to add from storiesAvailableToAdd
//         const storiesToAdd = storiesAvailableToAdd.splice(0, numStoriesToAdd);

//         // add the new stories to the Q
//         setStoryQ((prev) => [...prev, ...storiesToAdd]);
//       }
//     }
//   }
// };
