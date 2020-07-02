import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery, useLazyQuery } from 'react-apollo';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import STORIES_TOPIC_QUERY from 'library/queries/STORIES_TOPIC_QUERY';
import Loader from 'library/components/UI/Loader';
import ProfilePic from 'library/components/UI/ProfilePic';
import NewStoryButton from 'library/components/stories/NewStoryButton';
import StoryBox from 'library/components/stories/StoryBox';
import ExploreTopicButton from 'library/components/stories/ExploreTopicButton';
import NewProjectButton from './NewProjectButton';
import NewProjectButton3 from './NewProjectButton3';
import { UserContext } from 'library/utils/UserContext';

const StoriesHome = ({ navigation, userLoggedIn, refetching, setLoadingStories, setRefetchingStories, favoritesList }) => {
  const { currentUserId } = useContext(UserContext);
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

  const renderUserStories = () => {
    if (loadingStories) {
      // return null;
      return (
        <>
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
    // console.log('stories', stories);

    if (userStories.length > 0) {
      return userStories.map((story) => {
        if (story.items.length > 0) {

          const newestUnseen = story.items.findIndex(({ views }) => {
            // return true if you have NOT viewed the story - this will set newestUnseen to that index
            if (views.length <= 0) return true
            return views.some(({ id }) => id !== currentUserId)
          })

          return <StoryBox key={`${story.id}-${newestUnseen}`} navigation={navigation} story={story} moreType="Home" newestUnseen={newestUnseen}/>;
        }
      });
    }

    return null;
  };

  const renderTopicStories = () => {
    if (favoritesList.length <= 0) {
      return null;
    }

    return favoritesList.map(({ topicID }) => {
      return <ExploreTopicButton key={topicID} navigation={navigation} story={null} topicID={topicID} />;
    });
  };

  return (
    <>
      <ScrollView
        horizontal
        style={styles.stories}
        contentContainerStyle={{ paddingVertical: 10, paddingRight: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {/* <NewStoryButton navigation={navigation} /> */}
        <NewProjectButton3 navigation={navigation} userLoggedIn={userLoggedIn} />
        {renderUserStories()}
        {renderTopicStories()}
      </ScrollView>
      <View style={{ height: 10, backgroundColor: colors.lightGray }} />
    </>
  );
};

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

export default StoriesHome;
