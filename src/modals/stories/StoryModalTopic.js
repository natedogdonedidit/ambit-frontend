import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, FlatList, InteractionManager, Text } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { viewedStories, viewedStoryItems } from 'library/utils/cache';

import STORIES_TOPIC_QUERY from 'library/queries/STORIES_TOPIC_QUERY';
import Story from 'library/components/stories/Story';
import Loader from 'library/components/UI/Loader';
import NoMoreStories from 'library/components/stories/NoMoreStories';
import defaultStyles from 'styles/defaultStyles';
import colors from 'styles/colors';

const StoryModalTopic = ({ navigation, route }) => {
  const { topicIDtoSearch } = route.params;
  const { width } = Dimensions.get('window');
  const storyFlatlist = useRef();
  const client = useApolloClient();

  // STATE
  const [storyQ, setStoryQ] = useState([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [moreAvailable, setMoreAvailable] = useState(true); // set this false if the query comes back with less than 6 stories

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

  // QUERIES - to get next stories
  const { error, data, networkStatus } = useQuery(STORIES_TOPIC_QUERY, {
    variables: {
      topic: topicIDtoSearch,
      viewedStories: viewedStories(),
      viewedStoryItems: viewedStoryItems(),
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first', // this will only run if nothing in cache, the variables dont trigger refetch
    // nextFetchPolicy: 'network-only',
  });

  const loadingStoriesHome = networkStatus === 1;

  // EFFECTS

  // load more if we are near the end of the storyQ && moreAvailable = true && not currently loading the query
  useEffect(() => {
    if (moreAvailable && !loadingStoriesHome) {
      // load more if less than 3 remaining in Q
      if (activeStoryIndex >= storyQ.length - 4) {
        console.log(`near end of Q - getting more stories...`);
        console.log(`${activeStoryIndex} / ${storyQ.length}`);

        // so we dont refetch stories curretnly in the Q
        const storyQIDs = storyQ.map((s) => s.id);

        // manually send network request for more stories w/ updated variables
        const getNewStories = async () => {
          await client.query({
            query: STORIES_TOPIC_QUERY,
            variables: {
              topic: topicIDtoSearch,
              viewedStories: [...viewedStories(), ...storyQIDs],
              viewedStoryItems: viewedStoryItems(),
            },
            fetchPolicy: 'network-only',
          });
        };

        getNewStories();
      }
    }

    // DELETE ME - debug only
    // if (activeStoryIndex >= storyQ.length - 4 && !moreAvailable) {
    //   console.log('not getting more stories because moreAvailable = FALSE');
    // }
  }, [activeStoryIndex]);

  // used to add new stories to Q
  useEffect(() => {
    if (!loadingStoriesHome && data) {
      // console.log('new data received', data);
      if (data.storiesTopic) {
        const isFirstLoad = activeStoryIndex === 0;
        const viewedStoriesLocal = viewedStories();

        // remove stories with ZERO items (can eliminate this step later) or stories already in the Q
        // also, if first load, remove stories we've already viewed in this session
        const storyQIDs = storyQ.map((s) => s.id);
        const storiesToAdd = data.storiesTopic.filter(
          (s) => s.items.length > 0 && !storyQIDs.includes(s.id) && !(isFirstLoad && viewedStoriesLocal.includes(s.id))
        );

        setStoryQ([...storyQ, ...storiesToAdd]);

        // if we received less than 6, set moreAvailalbe to false
        if (data.storiesTopic.length < 6) {
          setMoreAvailable(false);
        }

        // If there are less than 2 stories to add - fetch more from network.
        // This is probably going to fire when
        // every story in cache has already been viewed
        if (isFirstLoad && storiesToAdd.length <= 2) {
          // manually send network request for more stories w/ updated variables
          const getNewStories = async () => {
            await client.query({
              query: STORIES_TOPIC_QUERY,
              variables: {
                topic: topicIDtoSearch,
                viewedStories: [...viewedStories(), ...storyQIDs],
                viewedStoryItems: viewedStoryItems(),
              },
              fetchPolicy: 'network-only',
            });
          };

          getNewStories();
        }

        // DELETE THIS STUFF - DEBUG ONLY
        // const storyQTitles = storyQ.map((s) => s.title);
        // const storiesToAddTitles = storiesToAdd.map((s) => s.title);

        // console.log('current Q:', storyQTitles);
        // console.log(`adding ${storiesToAddTitles.length} stories: `, storiesToAddTitles);
      }
    }
  }, [data]);

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

  if (storyQ.length <= 0 && loadingStoriesHome) {
    return (
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: colors.purp }}>
        <Text style={{ paddingTop: 200, ...defaultStyles.hugeBold, textAlign: 'center', color: 'white', paddingBottom: 10 }}>
          Loading stories...
        </Text>
        {/* <Text style={{ ...defaultStyles.hugeBold, textAlign: 'center', color: 'white' }}>One sec!</Text> */}
        <View style={{ height: 50 }}>
          <Loader size="small" backgroundColor="transparent" color="white" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: colors.purp }}>
        <Text style={{ paddingTop: 200, ...defaultStyles.hugeBold, textAlign: 'center', color: 'white' }}>
          There was an error loading stories.
        </Text>
        <Text style={{ ...defaultStyles.hugeBold, textAlign: 'center', color: 'white' }}>Sorry! Check back soon!</Text>
        <Text style={{ ...defaultStyles.hugeBold, textAlign: 'center', color: 'white' }}>✌🏻</Text>
      </View>
    );
  }

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
        data={[...storyQ, 'blank']}
        getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
        renderItem={({ item, index }) => {
          const storyIsActive = index === activeStoryIndex;

          if (item === 'blank') {
            return <NoMoreStories key="12341241" tryGoToPrevStory={tryGoToPrevStory} />;
          }

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

export default StoryModalTopic;
