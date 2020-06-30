import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, StatusBar, Alert, ScrollView, Dimensions, FlatList, Text } from 'react-native';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';

// import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';
import { UserContext } from 'library/utils/UserContext';

import STORIES_TOPIC_QUERY from 'library/queries/STORIES_TOPIC_QUERY';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import StoryCard from 'library/components/stories/StoryCard';
import Loader from 'library/components/UI/Loader';

const StoryModal = ({ navigation, route }) => {
  const storyFlatlist = useRef();
  const [disableOutterScroll, setDisableOutterScroll] = useState(false);
  // option 1: pass in a singleStory. Story will play, followed by intro, then modal will close
  // option 2: pass in an intro. Intro will play, then modal will close.
  // option 3: pass in firstStory, with a topicIDtoSearch. First story will play followed by more stories from that topic
  // option 4: pass in firstStory, with type = 'Home'. First story will play followed by more from your followers
  // option 5: pass in firstStory, with type = 'Profile'. First story will play followed by more from this user

  // moreType: 'Home', 'Topic', 'User', null means only show a single story

  const { story = null, intro = null, moreType = null, topicIDtoSearch } = route.params;
  const { width } = Dimensions.get('window');

  // STATE
  const [storyQIndex, setStoryQIndex] = useState(0);
  const [storyKey, setStoryKey] = useState(0); // used so StoryCard re-renders each time change storyQIndex

  // VARIABLES

  // QUERY TO GET USERS TOPICS
  const { data } = useQuery(CURRENT_USER_QUERY);
  let favoriteTopics = [topicIDtoSearch || null];
  const { userLoggedIn } = data;

  // effect compiles the list of favoriteTopics
  useEffect(() => {
    if (userLoggedIn) {
      if (userLoggedIn.topicsFocus.length > 0) {
        favoriteTopics = [...favoriteTopics, ...userLoggedIn.topicsFocus.map((top) => top.topicID)];
      }
      if (userLoggedIn.topicsInterest.length > 0) {
        if (favoriteTopics === []) {
          favoriteTopics = [...userLoggedIn.topicsInterest.map((top) => top.topicID)];
        } else {
          // only add topics that dont already exist
          userLoggedIn.topicsInterest.forEach((topic) => {
            if (favoriteTopics.findIndex((fav) => fav.topicID === topic.topicID) === -1) {
              favoriteTopics = [...favoriteTopics, topic.topicID];
            }
          });
        }
      }
    }
  }, [userLoggedIn]);

  // scrolls to index when story index changes
  useEffect(() => {
    if (storyQ.length > 0) {
      storyFlatlist.current.scrollToIndex({ index: storyQIndex, viewPosition: 0.5 });
    }
  }, [storyQIndex]);

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

  // an array of the stories up next, start with the first story (passed in)
  let storyQ = story ? [story] : [];

  // used to add topic stories to Q
  if (moreType === 'Topic' && dataStoriesTopic) {
    if (dataStoriesTopic.storiesTopic) {
      // remove the story passed in from the query results
      const storiesToAdd = dataStoriesTopic.storiesTopic.filter((s) => {
        if (story) {
          return s.items.length > 0 && s.id !== story.id;
        }
        return s.items.length > 0;
      });

      storyQ = [...storyQ, ...storiesToAdd];
    }
  }

  // used to add home stories to Q
  if (moreType === 'Home' && dataStoriesHome) {
    if (dataStoriesHome.storiesHome) {
      // remove the story passed in from the query results
      const storiesToAdd = dataStoriesHome.storiesHome.filter((s) => s.id !== story.id && s.items.length > 0);

      storyQ = [...storyQ, ...storiesToAdd];
    }
  }

  // EFFECTS
  useEffect(() => {
    if (moreType === 'Home') {
      getStoriesHome();
    }

    if (moreType === 'Topic') {
      getStoriesTopic();
    }

    // if (moreType === 'User') {
    // }

    // if no moreType
  }, [moreType]);

  // CUSTOM FUNCTIONS
  const goToPrevStory = () => {
    setStoryQIndex((prevState) => prevState - 1);
    setStoryKey((prevState) => prevState + 10);
  };

  const goToNextStory = () => {
    setStoryQIndex((prevState) => prevState + 1);
    setStoryKey((prevState) => prevState + 10);
  };

  const tryGoToNextStory = () => {
    if (storyQIndex < storyQ.length - 1) {
      goToNextStory();
    } else {
      // if there are no more stories in the Q, and there is no intro to play...then close the modal
      navigation.goBack();
    }
  };

  const tryGoToPrevStory = () => {
    if (storyQIndex > 0) {
      goToPrevStory();
    }
  };

  const handleSwipe = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent;

    // calculate new index after scroll
    const newStoryQIndex = Math.round(contentOffset.x / layoutMeasurement.width);

    // compare newIndex to previous index and make sure within bounds
    if (newStoryQIndex !== storyQIndex) {
      if (newStoryQIndex > storyQIndex) {
        tryGoToNextStory();
      } else {
        tryGoToPrevStory();
      }
    }
  };

  if (storyQ.length <= 0) {
    return (
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black' }}>
        <Loader size="small" />
      </View>
    );
  }

  console.log(disableOutterScroll);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" hidden />
      <FlatList
        ref={storyFlatlist}
        horizontal
        snapToAlignment="start"
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={100}
        initialNumToRender={2}
        bounces={false}
        disableIntervalMomentum
        disableScrollViewPanResponder
        onMomentumScrollEnd={handleSwipe}
        data={storyQ}
        scrollEnabled={!disableOutterScroll}
        renderItem={({ item, index }) => {
          // console.log(storyQIndex, index, item);

          return (
            <StoryCard
              key={index}
              navigation={navigation}
              story={item}
              isActive={index === storyQIndex}
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
