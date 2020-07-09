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
      console.log('refetching stories Home')
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
     const userAndTopicStories = [...userStories, ...favoritesList];

     // sort them
     const sortStoriesHome = (a, b) => {
       const isTopicStoryA = !!a.topicID;
       const isTopicStoryB = !!b.topicID;
 
       // if user story - check if viewed entire story (used in logic below)
       const newestUnseenA = isTopicStoryA ? 0 : a.items.findIndex(({ views }) => {
         // return true if you have NOT viewed the story - this will set newestUnseen to that index
         if (views.length <= 0) return true
 
         const viewedByMe = views.some(({ id }) => id === currentUserId);
         return !viewedByMe
       })
       const viewedEntireStoryA = newestUnseenA === -1;
 
       // if user story - check if viewed entire story (used in logic below)
       const newestUnseenB = isTopicStoryB ? 0 : b.items.findIndex(({ views }) => {
         // return true if you have NOT viewed the story - this will set newestUnseen to that index
         if (views.length <= 0) return true
 
         const viewedByMe = views.some(({ id }) => id === currentUserId);
         return !viewedByMe
       })
       const viewedEntireStoryB = newestUnseenB === -1;
 
       // if both are user stories
       if (!isTopicStoryA && !isTopicStoryB) {
 
         // if both stories have been viewed entirely
         if (viewedEntireStoryA && viewedEntireStoryB) {
           return -1
         }
 
         // if only A has been viewed entirely
         if (viewedEntireStoryA) {
           return 1
         }
 
         // if only B has been viewed entirely
         if (viewedEntireStoryB) {
           return -1
         }
       }
 
       // if both are topic stories
       if (isTopicStoryA && isTopicStoryB) {
         return -1
       }
 
       // if only A is user story
       if (!isTopicStoryA) {
         // check if A has been viewed
         if (viewedEntireStoryA) {
           // if viewed already move A back
           return 1
         }
 
         return -1
       }
 
       // if only B is user story
       if (!isTopicStoryB) {
         // check if B has been viewed
         if (viewedEntireStoryB) {
           // if viewed already move B back
           return -1
         }
 
         return 1
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
      const isTopicStory = !!story.topicID;

      // if topic story
      if (isTopicStory) {
        return <ExploreTopicButton key={story.topicID} navigation={navigation} story={null} topicID={story.topicID} refetching={refetching} />;
      }

      // if user story
      if (story.items.length > 0) {
        const newestUnseen = story.items.findIndex(({ views }) => {
          // return true if you have NOT viewed the story - this will set newestUnseen to that index
          if (views.length <= 0) return true

          const viewedByMe = views.some(({ id }) => id === currentUserId);
          return !viewedByMe
        })

        return <StoryBox key={`${story.id}-${newestUnseen}`} navigation={navigation} story={story} moreType="Home" newestUnseen={newestUnseen} />;
      }

      return null
    })
  }

  return (
    <>
      <ScrollView
        horizontal
        style={styles.stories}
        contentContainerStyle={{ paddingVertical: 10, paddingRight: 15, paddingLeft: 5 }}
        showsHorizontalScrollIndicator={false}
      >
        {/* <NewStoryButton navigation={navigation} /> */}
        <NewProjectButton3 navigation={navigation} userLoggedIn={userLoggedIn} />
        {renderStories()}
        {/* {renderUserStories()}
        {renderTopicStories()} */}
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
