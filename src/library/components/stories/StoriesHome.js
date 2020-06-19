import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import Loader from 'library/components/UI/Loader';
import ProfilePic from 'library/components/UI/ProfilePic';
import NewStoryButton from 'library/components/stories/NewStoryButton';
import StoryBox from 'library/components/stories/StoryBox';

const StoriesHome = ({ navigation, refetching, setLoadingStories, setRefetchingStories }) => {
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

  const renderStories = () => {
    if (loadingStories) {
      return null;
      // <View style={{ width: 100, height: 150 }}>
      //   <Loader size="small" loading={loadingStories} backgroundColor="transparent" full={false} />
      // </View>
    }

    if (errorStories) {
      console.log(errorStories);
      return null;
    }

    const stories = dataStories.storiesHome;
    // console.log('stories', stories);

    if (stories.length > 0) {
      return stories.map((story) => {
        if (story.items.length > 0) {
          return <StoryBox key={story.id} navigation={navigation} story={story} moreType="Home" />;
        }
      });
    }

    return null;
  };

  return (
    <>
      <ScrollView
        horizontal
        style={styles.stories}
        contentContainerStyle={{ paddingVertical: 10, paddingRight: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <NewStoryButton navigation={navigation} />
        {renderStories()}
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
