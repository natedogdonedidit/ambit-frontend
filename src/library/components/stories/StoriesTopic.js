import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { getTopicIDsFromUser, getNetworkIDsFromUser } from 'library/utils';

import STORIES_TOPIC_QUERY from 'library/queries/STORIES_TOPIC_QUERY';
import Loader from 'library/components/UI/Loader';
import ProfilePic from 'library/components/UI/ProfilePic';
import StoryBox from 'library/components/stories/StoryBox';
import NewProjectButton from 'library/components/stories/NewProjectButton';

const StoriesTopic = ({ navigation, refetching, topicID }) => {
  // QUERIES
  const {
    error: errorStories,
    data: dataStories,
    refetch: refetchStories,
    fetchMore: fetchMoreStories,
    networkStatus: networkStatusStories,
  } = useQuery(STORIES_TOPIC_QUERY, {
    variables: {
      topicID,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (networkStatusStories === 7 && refetching) {
      refetchStories();
    }
  }, [refetching]);

  const refetchingStories = networkStatusStories === 4;
  const fetchingMoreStories = networkStatusStories === 3;
  const loadingStories = networkStatusStories === 1;

  const renderStories = () => {
    if (errorStories) {
      console.log(errorStories);
      return null;
    }

    const stories = dataStories.storiesTopic;
    // console.log('stories', stories);

    if (stories.length > 0) {
      return stories.map(story => {
        if (story.items.length > 0) {
          return <StoryBox key={story.id} navigation={navigation} story={story} />;
        }
      });
    }

    return null;
  };

  if (loadingStories) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      style={styles.stories}
      contentContainerStyle={{ paddingVertical: 10 }}
      showsHorizontalScrollIndicator={false}
    >
      <NewProjectButton navigation={navigation} />
      {renderStories()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  stories: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default StoriesTopic;
