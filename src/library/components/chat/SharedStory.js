import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useQuery } from '@apollo/client';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import SINGLE_STORY_QUERY from 'library/queries/SINGLE_STORY_QUERY';
import ProfilePic from 'library/components/UI/ProfilePic';

const SharedStory = ({ navigation, storyId, storyItemId = undefined }) => {
  const { loading, error, data } = useQuery(SINGLE_STORY_QUERY, {
    variables: { where: { id: storyId } },
  });

  if (error) return null;

  if (loading) {
    return <View style={styles.storyBoxBlank} />;
  }

  const { story } = data;
  if (!story) return null;

  if (loading) {
    return <View style={styles.storyBoxBlank} />;
  }

  // decide which story item was shared so we can show preview
  const startingIndex = storyItemId ? story.items.findIndex(({ id }) => id === storyItemId) : -1;
  const previewIndex = startingIndex > 0 ? startingIndex : story.items.length - 1;

  if (story.type === 'PROJECT' || story.type === 'INTRO') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('StoryModalUser', {
            story,
            startingStoryItemId: storyItemId,
          })
        }
        style={styles.storyBox}
        activeOpacity={0.8}
      >
        <Image
          style={{ position: 'absolute', top: 0, left: 0, width: 128, height: 204 }}
          source={{ uri: story.items[previewIndex].preview || null }}
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
            top: 8,
            left: 8,
            width: 32,
            height: 32,
            backgroundColor: colors.gray90,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ProfilePic user={story.owner} size="small" navigation={navigation} enableIntro={false} enableClick={false} />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            paddingHorizontal: 6,
          }}
        >
          <Text numberOfLines={3} style={{ ...defaultStyles.defaultMedium, fontSize: 13, color: colors.white }}>
            {story.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  storyBox: {
    justifyContent: 'space-between',
    height: 204,
    width: 128,
    borderRadius: 16,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
    overflow: 'hidden',
    marginLeft: 6,
  },
  storyBoxBlank: {
    justifyContent: 'space-between',
    height: 204,
    width: 128,
    borderRadius: 16,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
    overflow: 'hidden',
    backgroundColor: colors.gray12,
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

export default SharedStory;
