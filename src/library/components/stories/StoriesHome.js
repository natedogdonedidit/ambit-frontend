import React, { useMemo, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import StoryBox from 'library/components/stories/StoryBox';
import ExploreTopicButton from 'library/components/stories/ExploreTopicButton';
import { useNavigation } from '@react-navigation/native';
import { STORIES_HEIGHT } from 'styles/constants';
import NewProjectButton from './NewProjectButton';
import ForYouButton from './ForYouButton';
import MoreTopicsStory from './MoreTopicsStory';

function StoriesHome() {
  // const navigation = useNavigation();
  const [topicsAvailable, setTopicsAvailable] = useState([]); // a list of topicID's that have stories to see

  const { data: dataTopics, loading: loadingTopics, error: errorTopics } = useQuery(CURRENT_USER_TOPICS);

  const favoriteTopics = useMemo(() => {
    if (dataTopics && dataTopics.userLoggedIn && dataTopics.userLoggedIn.topicsFocus) {
      // return combineFavoriteTopics(dataTopics.myTopics);
      return dataTopics.userLoggedIn.topicsFocus || [];
    }

    return [];
  }, [dataTopics]);

  const favoriteTopicsSorted = useMemo(() => {
    function sortTopics(a, b) {
      const aAvailable = topicsAvailable.includes(a.id);
      const bAvailable = topicsAvailable.includes(b.id);

      // if a is available and b is not - do nothing

      // if b is available and b is not
      if (!aAvailable && bAvailable) {
        return 1;
      }

      return -1;
    }

    const newArray = [...favoriteTopics];

    return newArray.sort(sortTopics);
  }, [favoriteTopics, topicsAvailable]);

  // this topic should NOT be in the list
  const isFullyViewed = topID => {
    // see if already in list
    const index = topicsAvailable.findIndex(t => t === topID);

    // if in list - remove it
    if (index >= 0) {
      setTopicsAvailable(prevState => {
        const newArray = [...prevState];
        newArray.splice(index, 1);
        return newArray;
      });
    }

    // if not in list - do nothing
  };

  // this topic should be in the list
  const isNotFullyViewed = topID => {
    // see if already in list
    const index = topicsAvailable.findIndex(t => t === topID);

    // if not in list - add it
    if (index === -1) {
      setTopicsAvailable(prevState => [...prevState, topID]);
    }

    // if in list - do nothing
  };

  const renderTopicStories = () => {
    if (loadingTopics) {
      return (
        <>
          <StoryBox loading />
          <StoryBox loading />
          <StoryBox loading />
          <StoryBox loading />
        </>
      );
    }

    if (errorTopics) {
      return null;
    }

    return favoriteTopicsSorted.map(topic => {
      return <ExploreTopicButton key={topic.id} topicID={topic.id} isFullyViewed={isFullyViewed} isNotFullyViewed={isNotFullyViewed} />;
    });
  };

  return (
    <ScrollView
      horizontal
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={[styles.stories, { height: STORIES_HEIGHT }]}
      showsHorizontalScrollIndicator={false}>
      <NewProjectButton />
      <ForYouButton />
      {renderTopicStories()}
      <MoreTopicsStory followsTopics={favoriteTopics.length > 0} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stories: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 6,
  },
});

export default React.memo(StoriesHome);
