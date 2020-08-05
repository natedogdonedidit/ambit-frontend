import React, { useEffect, useContext, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import StoryBox from 'library/components/stories/StoryBox';
import ExploreTopicButton from 'library/components/stories/ExploreTopicButton';
import { UserContext } from 'library/utils/UserContext';
import { combineFavoriteTopics } from 'library/utils';
import NewProjectButton from './NewProjectButton';

function StoriesHome({ navigation, refetching, setLoadingStories, setRefetchingStories }) {
  // const { currentUserId } = useContext(UserContext);

  const { data: dataTopics } = useQuery(CURRENT_USER_TOPICS);

  const favoriteTopics = useMemo(() => {
    if (dataTopics && dataTopics.myTopics) {
      return combineFavoriteTopics(dataTopics.myTopics);
    }

    return [];
  }, [dataTopics]);

  // GETS STORIES FROM YOUR NETWORK
  const {
    error: errorStories,
    data: dataStories,
    refetch: refetchStories,
    fetchMore: fetchMoreStories,
    networkStatus: networkStatusStories,
  } = useQuery(STORIES_HOME_QUERY, {
    onError: (e) => console.log('error loading home stories', e),
    notifyOnNetworkStatusChange: true,
  });

  const refetchingStories = networkStatusStories === 4;
  const fetchingMoreStories = networkStatusStories === 3;
  const loadingStories = networkStatusStories === 1;

  useEffect(() => {
    if (networkStatusStories === 7 && refetching) {
      // console.log('refetching stories Home')
      refetchStories();
    }
  }, [refetching]);

  // pass loading state to HomeTimeline
  useEffect(() => {
    setLoadingStories(loadingStories);
  }, [loadingStories]);

  // pass refetching state to HomeTimeline
  useEffect(() => {
    setRefetchingStories(refetchingStories);
  }, [refetchingStories]);

  const renderStories = () => {
    if (loadingStories) {
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

    if (errorStories) {
      console.log(errorStories);
      return null;
    }

    const userStories = dataStories.storiesHome;

    // combine user and topic stories
    const userAndTopicStories = [...userStories, ...favoriteTopics];

    // sort them
    const sortStoriesHome = (a, b) => {
      const isTopicStoryA = !!a.topicID && !a.type;
      const isTopicStoryB = !!b.topicID && !b.type;

      // if user story - check if viewed entire story (used in logic below)
      const newestUnseenA = isTopicStoryA
        ? 0
        : a.items.findIndex(({ viewedByMe }) => {
            // return true if you have NOT viewed the story - this will set newestUnseen to that index
            return !viewedByMe;
          });
      const viewedEntireStoryA = newestUnseenA === -1;

      // if user story - check if viewed entire story (used in logic below)
      const newestUnseenB = isTopicStoryB
        ? 0
        : b.items.findIndex(({ viewedByMe }) => {
            // return true if you have NOT viewed the story - this will set newestUnseen to that index
            return !viewedByMe;
          });
      const viewedEntireStoryB = newestUnseenB === -1;

      // if both are user stories
      if (!isTopicStoryA && !isTopicStoryB) {
        // if both stories have been viewed entirely
        if (viewedEntireStoryA && viewedEntireStoryB) {
          return -1;
        }

        // if only A has been viewed entirely
        if (viewedEntireStoryA) {
          return 1;
        }

        // if only B has been viewed entirely
        if (viewedEntireStoryB) {
          return -1;
        }
      }

      // if both are topic stories
      if (isTopicStoryA && isTopicStoryB) {
        return -1;
      }

      // if only A is user story
      if (!isTopicStoryA) {
        // check if A has been viewed
        if (viewedEntireStoryA) {
          // if viewed already move A back
          return 1;
        }

        return -1;
      }

      // if only B is user story
      if (!isTopicStoryB) {
        // check if B has been viewed
        if (viewedEntireStoryB) {
          // if viewed already move B back
          return -1;
        }

        return 1;
      }

      // grab the last item of each story, compare
      if (a.items[a.items.length - 1].createdAt > b.items[b.items.length - 1].createdAt) {
        return -1;
      }

      return 1;
    };

    const userAndTopicStoriesSorted = userAndTopicStories.sort(sortStoriesHome) || [];

    return userAndTopicStoriesSorted.map((story) => {
      // check if topic story
      const isTopicStory = !!story.topicID && !story.type;

      // if topic story
      if (isTopicStory) {
        return (
          <ExploreTopicButton
            key={story.topicID}
            navigation={navigation}
            story={null}
            topicID={story.topicID}
            refetching={refetching}
          />
        );
      }

      // if user story
      if (story.items.length > 0) {
        const newestUnseen = story.items.findIndex(({ viewedByMe }) => {
          // return true if you have NOT viewed the story - this will set newestUnseen to that index
          return !viewedByMe;
        });

        return (
          <StoryBox
            key={`${story.id}-${newestUnseen}`}
            navigation={navigation}
            story={story}
            moreType="Home"
            newestUnseen={newestUnseen}
          />
        );
      }

      return null;
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
