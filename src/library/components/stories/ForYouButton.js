import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { viewedStories, viewedStoryItems } from 'library/utils/cache';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import STORIES_HOME_QUERY from 'library/queries/STORIES_HOME_QUERY';
import { useQuery, useApolloClient, useReactiveVar } from '@apollo/client';
import { UserContext } from 'library/utils/UserContext';

const placeholderImage =
  'https://images.unsplash.com/photo-1516967124798-10656f7dca28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80';

/// ////////////////////////////////////////////////////////////////////////////////////////////////////////
// the purpose of this is to pre-fetch upon initial render
// and dim if we have no more stories to watch
/// ////////////////////////////////////////////////////////////////////////////////////////////////////////

const ForYouButton = ({ navigation }) => {
  const { refreshHomeScreen } = useContext(UserContext);
  const [hasNew, setHasNew] = useState(false);
  const client = useApolloClient();
  const viewedStoriesLocal = useReactiveVar(viewedStories);

  // GETS STORIES FOR YOUR FAV TOPICS
  const { error, data, loading } = useQuery(STORIES_HOME_QUERY, {
    variables: {
      feed: 'foryou',
      viewedStories: viewedStories(),
      viewedStoryItems: viewedStoryItems(),
    },
    fetchPolicy: 'cache-first', // this will only run if nothing in cache, the variables dont trigger refetch
  });

  // determine if there are any new stories to view
  useEffect(() => {
    if (data && data.storiesHome && !loading) {
      const noStories = data.storiesHome.length === 0;

      // will be TRUE if all stories are viewed
      const allStoriesViewed = data.storiesHome.findIndex((s) => !viewedStoriesLocal.includes(s.id)) === -1;

      if (noStories || allStoriesViewed) {
        setHasNew(false);
      } else {
        setHasNew(true);
      }
    }
  }, [loading, data, viewedStoriesLocal]);

  // upon pull to refresh - fetch new stories
  useEffect(() => {
    if (refreshHomeScreen) {
      console.log('refetching home stories');

      // cant use refetch because we need to send new variables
      const getNewStories = async () => {
        await client.query({
          query: STORIES_HOME_QUERY,
          variables: {
            feed: 'foryou',
            viewedStories: [...viewedStories()],
            viewedStoryItems: viewedStoryItems(),
          },
          fetchPolicy: 'network-only',
        });
      };

      getNewStories();
    }
  }, [refreshHomeScreen]);

  if (error) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('StoryModalForYou')} style={styles.storyBox} activeOpacity={0.8}>
      <Image
        style={{ position: 'absolute', top: 0, left: 0, width: 100, height: 160 }}
        source={{ uri: placeholderImage }}
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
        <Text numberOfLines={3} style={{ ...defaultStyles.defaultMedium, fontSize: 13, color: colors.white }}>
          For You
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

export default ForYouButton;
