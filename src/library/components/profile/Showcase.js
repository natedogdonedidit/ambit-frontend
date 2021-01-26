import React, { useMemo } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useQuery } from '@apollo/client';
import STORIES_QUERY from 'library/queries/STORIES_QUERY';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import StoryBox from 'library/components/stories/StoryBox';
import { useNavigation } from '@react-navigation/native';
import TextButton from 'library/components/UI/buttons/TextButton';
import { sortShowcase } from 'library/utils';

const Showcase = ({ isMyProfile, username }) => {
  const navigation = useNavigation();

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

  const stories = data && data.stories ? data.stories : [];
  const storiesWithItems = stories.filter((story) => story.items.length > 0);
  // sort to put showCase items first
  storiesWithItems.sort(sortShowcase);
  const hasStories = storiesWithItems.length > 0;

  // if it is not my profile && no stories to show - return null
  if (!isMyProfile && !hasStories) return null;

  const renderProjects = () => {
    if (loading) {
      const hey = [1, 2, 3, 4, 5];
      return hey.map((i) => <StoryBox key={i} loading small={false} />);
    }

    if (!hasStories) return null;

    return storiesWithItems.map((story) => {
      if (story.items.length > 0 && story.type === 'PROJECT') {
        return (
          <View key={story.id}>
            <StoryBox navigation={navigation} story={story} showProfilePic={false} />
            {story.showcase && (
              <View
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  // width: 10,
                  // height: 32,
                  // backgroundColor: colors.gray90,
                  // borderRadius: 16,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  // zIndex: 900,
                }}
              >
                {/* <Text style={{ fontSize: 20 }}>📌</Text> */}
                <Icon name="star" solid size={20} color={colors.yellow} />
              </View>
            )}
          </View>
        );
      }
      return null;
    });
  };

  return (
    <View style={{ ...styles.projectsSection }}>
      <View style={{ ...styles.contentHeader, paddingHorizontal: 20 }}>
        <Text style={{ ...defaultStyles.hugeMedium, paddingBottom: 6 }}>Showcase</Text>
        {/* {isMyProfile && (
          <TextButton textStyle={styles.editButton} onPress={() => null}>
            Edit
          </TextButton>
        )} */}
      </View>
      <ScrollView contentContainerStyle={styles.projects} horizontal showsHorizontalScrollIndicator={false}>
        {renderProjects()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  projects: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 8,
    zIndex: 100,
  },
  editButton: {
    fontSize: 14,
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    // borderRadius: 5,
    marginBottom: 10,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingBottom: 5,
  },
  projectsSection: {
    paddingTop: 15,
    paddingBottom: 15,
    // height: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Showcase;
