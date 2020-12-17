import React, { useMemo } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useQuery } from '@apollo/client';
import STORIES_QUERY from 'library/queries/STORIES_QUERY';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import StoryBox from 'library/components/stories/StoryBox';
import { useNavigation } from '@react-navigation/native';

const Showcase = ({ username }) => {
  const navigation = useNavigation();

  const { loading, error, data, refetch, fetchMore, networkStatus } = useQuery(STORIES_QUERY, {
    variables: {
      first: 18, // FIXME, need to add "See more" button. onEndReached does not work bc nested scroll (i think)
      where: {
        owner: { username: { equals: username } },
        type: { equals: 'PROJECT' },
      },
      orderBy: [{ lastUpdated: 'desc' }],
    },
    notifyOnNetworkStatusChange: true,
  });

  const stories = data && data.stories ? data.stories : [];
  const storiesWithItems = stories.filter((story) => story.items.length > 0);

  const renderProjects = () => {
    if (loading) {
      const hey = [1, 2, 3, 4, 5];
      return hey.map((i) => <StoryBox key={i} loading small={false} />);
    }

    return storiesWithItems.map((story) => {
      if (story.items.length > 0 && story.type === 'PROJECT') {
        return <StoryBox key={story.id} navigation={navigation} story={story} showProfilePic={false} />;
      }
      return null;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.projects} horizontal showsHorizontalScrollIndicator={false}>
      {renderProjects()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  projects: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
});

export default Showcase;
