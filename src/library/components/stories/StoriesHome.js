import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import Loader from 'library/components/UI/Loader';
import ProfilePic from 'library/components/UI/ProfilePic';
import NewStoryButton from 'library/components/stories/NewStoryButton';
import StoryBox from 'library/components/stories/StoryBox';

const StoriesHome = ({ navigation }) => {
  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = dataUser;
  const getNetworkIDs = usr => {
    if (!usr) {
      return [];
    }
    const followingIDs = usr.following ? usr.following.map(u => u.id) : [];
    const connectionIDs = usr.connection ? usr.connections.map(u => u.id) : [];
    return [...followingIDs, ...connectionIDs];
  };
  const network = getNetworkIDs(userLoggedIn);
  const getTopicIDs = usr => {
    if (!usr) {
      return [];
    }
    const topicFocusIDs = usr.topicsFocus ? usr.topicsFocus.map(t => t.topicID) : [];
    const topicInterestIDs = usr.topicsInterest ? usr.topicsInterest.map(t => t.topicID) : [];
    return [...topicFocusIDs, ...topicInterestIDs];
  };
  const topicIDs = getTopicIDs(userLoggedIn);

  const {
    error: errorStories,
    data: dataStories,
    refetch: refetchStories,
    fetchMore: fetchMoreStories,
    networkStatus: networkStatusStories,
  } = useQuery(STORIES_HOME_QUERY, {
    variables: {
      network,
      topicIDs,
    },
    notifyOnNetworkStatusChange: true,
  });

  const refetchingStories = networkStatusStories === 4;
  const fetchingMoreStories = networkStatusStories === 3;
  const loadingStories = networkStatusStories === 1;

  const renderStories = () => {
    if (loadingStories) {
      return <Loader backgroundColor={colors.lightGray} />;
    }

    const stories = dataStories.storiesHome;
    // console.log('stories', stories);

    if (stories.length > 0) {
      return stories.map(story => {
        return <StoryBox key={story.id} navigation={navigation} story={story} />;
      });
    }

    return null;
  };

  return (
    <ScrollView horizontal style={styles.stories} contentContainerStyle={{ paddingVertical: 10 }}>
      <NewStoryButton userLoggedIn={userLoggedIn} navigation={navigation} />
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

export default StoriesHome;
