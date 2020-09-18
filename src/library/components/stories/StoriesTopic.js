import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
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
import ExploreTopicButton from 'library/components/stories/ExploreTopicButton';
import { UserContext } from 'library/utils/UserContext';

const StoriesTopic = ({ navigation, refetching, topicID }) => {
  const { currentUserId } = useContext(UserContext);

  // QUERIES
  const {
    error: errorStories,
    data: dataStories,
    refetch: refetchStories,
    fetchMore: fetchMoreStories,
    networkStatus: networkStatusStories,
  } = useQuery(STORIES_TOPIC_QUERY, {
    variables: {
      where: {
        AND: [
          {
            topic: { startsWith: topicID },
          },
          {
            items: { some: { id: { gt: 'a' } } },
          },
        ],
      },
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

  if (loadingStories) {
    return <View style={{ height: 10 }} />;
  }

  const { stories } = dataStories;

  const sortStoriesTopic = (a, b) => {
    // if user story - check if viewed entire story (used in logic below)
    const newestUnseenA = a.items.findIndex(({ viewedByMe }) => {
      // return true if you have NOT viewed the story - this will set newestUnseen to that index
      // if (views.length <= 0) return true;

      // const viewedByMe = views.some(({ id }) => id === currentUserId);
      return !viewedByMe;
    });
    const viewedEntireStoryA = newestUnseenA === -1;

    // if user story - check if viewed entire story (used in logic below)
    const newestUnseenB = b.items.findIndex(({ viewedByMe }) => {
      // return true if you have NOT viewed the story - this will set newestUnseen to that index
      // if (views.length <= 0) return true;

      // const viewedByMe = views.some(({ id }) => id === currentUserId);
      return !viewedByMe;
    });
    const viewedEntireStoryB = newestUnseenB === -1;

    // if only A has been viewed entirely
    if (viewedEntireStoryA && !viewedEntireStoryB) {
      return 1;
    }

    // if only B has been viewed entirely
    if (viewedEntireStoryB && !viewedEntireStoryA) {
      return -1;
    }

    // if both or neither story have been viewed entirely
    // grab the last item of each story, compare
    if (a.items[a.items.length - 1].createdAt > b.items[b.items.length - 1].createdAt) {
      // a is newer
      return -1;
    }

    // b is newer
    return 1;
  };

  const storiesSorted = [...stories].sort(sortStoriesTopic) || [];

  if (storiesSorted.length <= 0) {
    return null;
    // return <View style={{ height: 10 }} />;
  }

  const renderStories = () => {
    if (errorStories) {
      console.log(errorStories);
      return null;
    }

    return storiesSorted.map((story) => {
      if (story.items.length > 0) {
        const newestUnseen = story.items.findIndex(({ viewedByMe }) => {
          // return true if you have NOT viewed the story - this will set newestUnseen to that index
          // if (views.length <= 0) return true;

          // const viewedByMe = views.some(({ id }) => id === currentUserId);
          return !viewedByMe;
        });

        return (
          <StoryBox
            key={`${story.id}-${newestUnseen}`}
            navigation={navigation}
            story={story}
            moreType="Topic"
            topicIDtoSearch={topicID}
            newestUnseen={newestUnseen}
          />
        );
      }
      return null;
    });
  };

  return (
    <ScrollView
      horizontal
      style={styles.stories}
      contentContainerStyle={{ paddingVertical: 10, paddingRight: 15, paddingLeft: 5 }}
      showsHorizontalScrollIndicator={false}
    >
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
