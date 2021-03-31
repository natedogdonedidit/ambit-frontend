import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import StoryBoxGrid from 'library/components/stories/StoryBoxGrid';
import Loader from 'library/components/UI/Loader';
import STORIES_QUERY from 'library/queries/STORIES_QUERY';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProfileGrid = ({ isMyProfile, username }) => {
  const navigation = useNavigation();
  // QUERIES
  const { loading, error, data, refetch, fetchMore, networkStatus } = useQuery(STORIES_QUERY, {
    variables: {
      first: 18, // FIXME, need to add "See more" button. onEndReached does not work bc nested scroll (i think)
      where: {
        owner: { username: { equals: username } },
        type: { equals: 'PROJECT' },
      },
      orderBy: [{ lastUpdated: 'desc' }],
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return (
      <View style={{ height: 100, marginTop: 10 }}>
        <Loader loading={loading} size="small" full={false} backgroundColor="transparent" />
      </View>
    );
  }

  const stories = data.stories || [];
  const storiesWithItems = stories.filter((story) => story.items.length > 0);

  const renderGrid = () => {
    if (stories.length < 1) {
      return (
        <Text style={{ ...defaultStyles.hugeBold, color: colors.gray40, textAlign: 'center', paddingTop: 45 }}>
          No projects yet...sad
        </Text>
      );
    }

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 1, backgroundColor: colors.lightGray, minHeight: 500 }}>
        {storiesWithItems.map((story) => {
          if (story.items.length > 0) {
            return (
              <View key={story.id} style={{ width: width / 3, height: width / 2 }}>
                <StoryBoxGrid navigation={navigation} story={story} showProfilePic={false} />
              </View>
            );
          }
          return null;
        })}
      </View>
    );
  };

  return <View style={styles.content}>{renderGrid()}</View>;
};

const styles = StyleSheet.create({
  content: {
    // height: 650,
    backgroundColor: colors.lightGray,
  },
});

export default ProfileGrid;
