import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { viewedStories, viewedStoryItems } from 'library/utils/cache';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import { getTopicFromID } from 'library/utils';
import STORIES_TOPIC_QUERY from 'library/queries/STORIES_TOPIC_QUERY';
import { useQuery, useApolloClient, useReactiveVar } from '@apollo/client';
import { UserContext } from 'library/utils/UserContext';

const placeholderImage =
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

const ExploreTopicButton = ({ navigation, topicID }) => {
  const { color, icon, name, image } = getTopicFromID(topicID);

  const { refreshHomeScreen } = useContext(UserContext);

  const [hasNew, setHasNew] = useState(false);
  const client = useApolloClient();
  const viewedStoriesLocal = useReactiveVar(viewedStories);

  // GETS STORIES FOR YOUR FAV TOPICS
  const { error, data, loading } = useQuery(STORIES_TOPIC_QUERY, {
    variables: {
      topic: topicID,
      viewedStories: viewedStories(),
      viewedStoryItems: viewedStoryItems(),
    },
    fetchPolicy: 'cache-first', // this will only run if nothing in cache, the variables dont trigger refetch
  });

  // determine if there are any new stories to view
  useEffect(() => {
    if (data && data.storiesTopic && !loading) {
      const noStories = data.storiesTopic.length === 0;

      // will be TRUE if all stories are viewed
      const allStoriesViewed = data.storiesTopic.findIndex((s) => !viewedStoriesLocal.includes(s.id)) === -1;

      if (noStories || allStoriesViewed) {
        setHasNew(false);
      } else {
        setHasNew(true);
      }
    }
  }, [loading, data, viewedStoriesLocal]);

  // upon pull to refresh - fetch new stories
  // useEffect(() => {
  //   if (refreshHomeScreen) {
  //     console.log('refetching topic story:', topicID);

  //     // cant use refetch because we need to send new variables
  //     const getNewStories = async () => {
  //       await client.query({
  //         query: STORIES_TOPIC_QUERY,
  //         variables: {
  //           topic: topicID,
  //           viewedStories: [...viewedStories()],
  //           viewedStoryItems: viewedStoryItems(),
  //         },
  //         fetchPolicy: 'network-only',
  //       });
  //     };

  //     getNewStories();
  //   }
  // }, [refreshHomeScreen]);

  if (error) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('StoryModalTopic', {
          topicIDtoSearch: topicID,
        })
      }
      style={styles.storyBox}
      activeOpacity={0.8}
    >
      <Image
        style={{ position: 'absolute', top: 0, left: 0, width: 100, height: 160 }}
        source={{ uri: image || placeholderImage }}
        resizeMode="cover"
      />
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.linearGradient}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          paddingHorizontal: 6,
        }}
      >
        <Text numberOfLines={1} style={{ ...defaultStyles.defaultMedium, fontSize: 13, color: colors.white }}>
          Explore
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail" // clip
          style={{ ...defaultStyles.defaultMedium, fontSize: 13, color: colors.white }}
        >
          {name}
        </Text>
      </View>
      {!hasNew && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)' }} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyBox: {
    justifyContent: 'space-between',
    height: 136,
    width: 85,
    borderRadius: 12,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
    overflow: 'hidden',
    marginLeft: 6,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});

export default ExploreTopicButton;
