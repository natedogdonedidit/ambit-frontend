import React, { useEffect, useContext, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import STORIES_FORYOU_QUERY from 'library/queries/STORIES_FORYOU_QUERY';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import StoryBox from 'library/components/stories/StoryBox';
import ExploreTopicButton from 'library/components/stories/ExploreTopicButton';
import { UserContext } from 'library/utils/UserContext';
import { combineFavoriteTopics } from 'library/utils';
import NewProjectButton from './NewProjectButton';
import ForYouButton from './ForYouButton';

function StoriesHome({ navigation, refetching, setLoadingStories, setRefetchingStories, network }) {
  const { data: dataTopics, loading: loadingTopics, error: errorTopics } = useQuery(CURRENT_USER_TOPICS);

  const favoriteTopics = useMemo(() => {
    if (dataTopics && dataTopics.userLoggedIn && dataTopics.userLoggedIn.topicsFocus) {
      // return combineFavoriteTopics(dataTopics.myTopics);
      return dataTopics.userLoggedIn.topicsFocus || [];
    }

    return [];
  }, [dataTopics]);

  const renderStories = () => {
    if (loadingTopics) {
      // return null;
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
      // console.log(errorStories);
      return null;
    }

    // console.log(favoriteTopics);

    return favoriteTopics.map((topic) => {
      return <ExploreTopicButton key={topic.id} navigation={navigation} topicID={topic.id} refetching={refetching} />;
    });
  };

  return (
    <>
      <ScrollView
        horizontal
        style={styles.stories}
        contentContainerStyle={{ paddingVertical: 10, paddingRight: 15, paddingLeft: 5 }}
        showsHorizontalScrollIndicator={false}
      >
        <NewProjectButton navigation={navigation} />
        <ForYouButton navigation={navigation} />
        {renderStories()}
      </ScrollView>
      <View style={{ height: 10, backgroundColor: colors.lightGray }} />
    </>
  );
}

const styles = StyleSheet.create({
  stories: {
    // marginBottom: 10,
    backgroundColor: 'white',
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default React.memo(StoriesHome);
