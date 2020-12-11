import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, FlatList, InteractionManager, Alert } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { viewedStories, viewedStoryItems } from 'library/utils/cache';

import STORIES_TOPIC_QUERY from 'library/queries/STORIES_TOPIC_QUERY';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import Story from 'library/components/stories/Story';
import Loader from 'library/components/UI/Loader';
import NoMoreStories from 'library/components/stories/NoMoreStories';

// option 1: pass in a singleStory. Story will play, followed by intro, then modal will close
// option 2: pass in an intro. Intro will play, then modal will close.
// option 3: pass in firstStory, with a topicIDtoSearch. First story will play followed by more stories from that topic
// option 4: pass in firstStory, with type = 'ForYou'. First story will play followed by more from your followers
// option 5: pass in firstStory, with type = 'Profile'. First story will play followed by more from this user

// step 1: pass in moreType = 'ForYou'
// step 2: query for stories based on moreType
// step 3: load viewedStories and viewedStoryItems

// moreType: 'ForYou', 'Topic', 'User', null means only show a single story

const StoryModal = ({ navigation, route }) => {
  const { story = null, moreType = null, topicIDtoSearch } = route.params;
  const { width } = Dimensions.get('window');
  const storyFlatlist = useRef();

  // determine where to start the Q, based on local list of viewedStories

  // STATE
  const [storyQ, setStoryQ] = useState(story ? [story] : []);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [moreAvailable, setMoreAvailable] = useState(true); // set this false if the query comes back with less than 6 stories

  const [disableOutterScroll, setDisableOutterScroll] = useState(false);

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

  // QUERIES - to get next stories
  const [
    getStoriesTopic,
    { error: errorStoriesTopic, data: dataStoriesTopic, networkStatus: networkStatusStoriesTopic },
  ] = useLazyQuery(STORIES_TOPIC_QUERY, {
    // variables: {
    //   topic: topicIDtoSearch,
    // },
    // fetchPolicy: 'cache-and-network',
    // fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const loadingStoriesTopic = networkStatusStoriesTopic === 1;

  const [
    getStoriesHome,
    { error: errorStoriesHome, data: dataStoriesHome, networkStatus: networkStatusStoriesHome },
  ] = useLazyQuery(STORIES_HOME_QUERY, {
    // fetchPolicy: 'cache-and-network',
    // fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const loadingStoriesHome = networkStatusStoriesHome === 1;

  // EFFECTS
  // load initial query upon opening modal
  useEffect(() => {
    if (moreType === 'ForYou') {
      getStoriesHome({
        variables: {
          viewedStories: viewedStories(),
          viewedStoryItems: viewedStoryItems(),
        },
        fetchPolicy: 'cache-first',
      });
    }

    if (moreType === 'Topic') {
      getStoriesTopic({
        variables: {
          topic: topicIDtoSearch,
          viewedStories: viewedStories(),
          viewedStoryItems: viewedStoryItems(),
        },
        fetchPolicy: 'cache-first',
      });
    }
  }, [moreType]);

  // load more if we are near the end of the storyQ && moreAvailable = true && not currently loading the query
  useEffect(() => {
    if (moreType === 'ForYou' && moreAvailable && !loadingStoriesHome) {
      // load more if less than 3 remaining in Q
      if (activeStoryIndex >= storyQ.length - 4) {
        console.log(`near end of Q - getting more stories...`);
        console.log(`${activeStoryIndex} / ${storyQ.length}`);

        // so we dont refetch stories curretnly in the Q
        const storyQIDs = storyQ.map((s) => s.id);

        getStoriesHome({
          variables: {
            viewedStories: [...viewedStories(), ...storyQIDs],
            viewedStoryItems: viewedStoryItems(),
          },
          fetchPolicy: 'network-only', // always go to the server if getting more
        });
      }
    }

    if (moreType === 'Topic' && moreAvailable && !loadingStoriesTopic) {
      // load more if less than 3 remaining in Q
      if (activeStoryIndex >= storyQ.length - 4) {
        console.log(`near end of Q - getting more stories...`);
        console.log(`${activeStoryIndex} / ${storyQ.length}`);

        // so we dont refetch stories curretnly in the Q
        const storyQIDs = storyQ.map((s) => s.id);

        getStoriesTopic({
          variables: {
            topic: topicIDtoSearch,
            viewedStories: [...viewedStories(), ...storyQIDs],
            viewedStoryItems: viewedStoryItems(),
          },
          fetchPolicy: 'network-only', // always go to the server if getting more
        });
      }
    }

    // DELETE ME - debug only
    if (activeStoryIndex >= storyQ.length - 4 && !moreAvailable) {
      console.log('not getting more stories because moreAvailable = FALSE');
    }
  }, [activeStoryIndex]);

  // used to add new stories to Q after query finishes
  useEffect(() => {
    console.log(dataStoriesHome);
    if (moreType === 'ForYou' && !loadingStoriesHome && dataStoriesHome) {
      if (dataStoriesHome.storiesHome) {
        // remove stories with ZERO items or stories already in the Q. should not need to do this in the future
        const storyQIDs = storyQ.map((s) => s.id);
        const storiesToAdd = dataStoriesHome.storiesHome.filter((s) => s.items.length > 0 && !storyQIDs.includes(s.id));

        // if we received less than 6, set moreAvailalbe to false, and add blank story to end
        if (dataStoriesHome.storiesHome.length === 0) {
          // setStoryQ([...storyQ, ...storiesToAdd, 'blank']);
          setMoreAvailable(false);
          console.log('setting more available = FALSE');
        } else {
          setStoryQ([...storyQ, ...storiesToAdd]);
        }

        // DELETE THIS STUFF - DEBUG ONLY
        const storyTitles = storiesToAdd.map((s) => s.title);
        const storyQTitles = storyQ.map((s) => s.title);

        console.log('current Q:', storyQTitles);
        console.log(`adding ${storyTitles.length} stories: `, storyTitles);
      }
    }
  }, [dataStoriesHome]);

  // used to add topic stories to Q
  useEffect(() => {
    // used to add home stories to Q
    if (moreType === 'Topic' && !loadingStoriesTopic && dataStoriesTopic) {
      if (dataStoriesTopic.storiesTopic) {
        // remove stories with ZERO items or stories already in the Q. should not need to do this in the future
        const storyQIDs = storyQ.map((s) => s.id);
        const storiesToAdd = dataStoriesTopic.storiesTopic.filter((s) => s.items.length > 0 && !storyQIDs.includes(s.id));

        // if we received less than 6, set moreAvailalbe to false, and add blank story to end
        if (dataStoriesTopic.storiesTopic.length === 0) {
          // setStoryQ([...storyQ, ...storiesToAdd, 'blank']);
          setMoreAvailable(false);
          console.log('setting more available = FALSE');
        } else {
          setStoryQ([...storyQ, ...storiesToAdd]);
        }

        // DELETE THIS STUFF - DEBUG ONLY
        const storyTitles = storiesToAdd.map((s) => s.title);
        const storyQTitles = storyQ.map((s) => s.title);

        console.log('current Q:', storyQTitles);
        console.log(`adding ${storyTitles.length} stories: `, storyTitles);
      }
    }
  }, [dataStoriesTopic]);

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
    // console.log('going to next story', activeStoryIndex, storyQ.length);
    // if (activeStoryIndex < storyQ.length - 1) {
    if (activeStoryIndex < storyQ.length) {
      goToNextStory();
    } else {
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

  if (storyQ.length <= 0 && (loadingStoriesHome || loadingStoriesTopic)) {
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
        data={[...storyQ, 'blank']} // always a blank at the end
        scrollEnabled={!disableOutterScroll}
        getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
        renderItem={({ item, index }) => {
          // console.log(index, item.id);
          const storyIsActive = index === activeStoryIndex;

          if (item === 'blank') {
            return <NoMoreStories id="194105492" key="12341241" tryGoToPrevStory={tryGoToPrevStory} />;
          }

          return (
            <Story
              key={item.id}
              navigation={navigation}
              story={item}
              storyIsActive={storyIsActive}
              tryGoToPrevStory={tryGoToPrevStory}
              tryGoToNextStory={tryGoToNextStory}
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
//     if (moreType === 'ForYou' && dataStoriesHome && dataStoriesHome.storiesHome) {
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
