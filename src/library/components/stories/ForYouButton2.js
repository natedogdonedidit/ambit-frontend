import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { viewedStories, viewedStoryItems } from 'library/utils/cache';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import STORIES_FORYOU_QUERY from 'library/queries/STORIES_FORYOU_QUERY';
import { useQuery, useApolloClient, useReactiveVar } from '@apollo/client';
import { UserContext } from 'library/utils/UserContext';
import { useNavigation } from '@react-navigation/native';

const placeholderImage =
  'https://images.unsplash.com/photo-1516967124798-10656f7dca28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80';

/// ////////////////////////////////////////////////////////////////////////////////////////////////////////
// the purpose of this is to pre-fetch upon initial render
// and dim if we have no more stories to watch
/// ////////////////////////////////////////////////////////////////////////////////////////////////////////

const ForYouButton = () => {
  const navigation = useNavigation();
  const { refreshHomeScreen } = useContext(UserContext);
  const [hasNew, setHasNew] = useState(false);
  const client = useApolloClient();
  const viewedStoriesLocal = useReactiveVar(viewedStories);

  // GETS STORIES FOR YOUR FAV TOPICS
  const { error, data, loading } = useQuery(STORIES_FORYOU_QUERY, {
    variables: {
      feed: 'foryou',
      viewedStories: viewedStories(),
      viewedStoryItems: viewedStoryItems(),
    },
    fetchPolicy: 'cache-first', // this will only run if nothing in cache, the variables dont trigger refetch
  });

  // determine if there are any new stories to view
  useEffect(() => {
    if (data && data.storiesForYou && !loading) {
      const noStories = data.storiesForYou.length === 0;

      // will be TRUE if all stories are viewed
      const allStoriesViewed = data.storiesForYou.findIndex((s) => !viewedStoriesLocal.includes(s.id)) === -1;

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
          query: STORIES_FORYOU_QUERY,
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
      <View style={{ width: 60, height: 60, borderRadius: 30 }}>
        <Image style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover" source={{ uri: placeholderImage }} />
      </View>
      <View>
        <Text style={{ ...defaultStyles.defaultStory }}>For You</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyBox: {
    height: 80,
    width: 70,
    overflow: 'hidden',
    marginLeft: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
});

export default ForYouButton;
