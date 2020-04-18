import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import StoryBoxGrid from 'library/components/stories/StoryBoxGrid';
import Loader from 'library/components/UI/Loader';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

const { width } = Dimensions.get('window');

const ProfileGrid = ({ navigation, isMyProfile, profileId }) => {
  // QUERIES
  const { loading, error, data, refetch } = useQuery(SINGLE_USER_BIO, {
    variables: { id: profileId },
  });

  if (loading) {
    return (
      <View style={{ height: 100, marginTop: 10 }}>
        <Loader loading={loading} size="small" full={false} backgroundColor="transparent" />
      </View>
    );
  }

  const { user } = data;

  const storiesFromDB = user.stories || [];

  // only display projects and saved solo stories
  const stories = storiesFromDB.filter(story => story.type === 'PROJECT' || (story.type === 'SOLO' && story.save));
  // console.log(storiesFromDB);
  // console.log(stories);

  const renderGrid = () => {
    if (stories.length < 1) {
      return (
        <Text style={{ ...defaultStyles.defaultMute, fontSize: 16, textAlign: 'center', paddingTop: 30 }}>
          Your stories & projects will appear here
        </Text>
      );
    }

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {stories.map(story => {
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
    height: 650,
    backgroundColor: colors.lightGray,
  },
});

export default ProfileGrid;
