import React, { useMemo } from 'react';
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
  const navigation = useNavigation();

  const { data: dataTopics, loading: loadingTopics, error: errorTopics } = useQuery(CURRENT_USER_TOPICS);

  const favoriteTopics = useMemo(() => {
    if (dataTopics && dataTopics.userLoggedIn && dataTopics.userLoggedIn.topicsFocus) {
      // return combineFavoriteTopics(dataTopics.myTopics);
      return dataTopics.userLoggedIn.topicsFocus || [];
    }

    return [];
  }, [dataTopics]);

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

    return favoriteTopics.map((topic) => {
      return <ExploreTopicButton key={topic.id} topicID={topic.id} />;
    });
  };

  return (
    <ScrollView
      horizontal
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={[styles.stories, { height: STORIES_HEIGHT }]}
      showsHorizontalScrollIndicator={false}
    >
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
