import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import ProfilePic from 'library/components/UI/ProfilePic';

const StoryHeader = ({ story, activeIndex, navigation, engagePause }) => {
  const [timeOfDay] = useState(new Date());
  const { items } = story;
  const activeItem = { ...items[activeIndex] };

  const { owner } = story;
  const insets = useSafeArea();

  if (!owner) return null;

  const createdAt = new Date(activeItem.createdAt);
  const { timeDiff, period } = timeDifference(timeOfDay, createdAt);

  return (
    <View style={{ ...styles.absoluteTop, top: insets.top + 18 }}>
      <View style={styles.header}>
        <ProfilePic size="small" user={owner} navigation={navigation} enableClick={story.type !== 'INTRO'} enableStory={false} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile', { profileId: owner.id });
          }}
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
              <Text style={{ ...defaultStyles.defaultBold, color: 'white', paddingRight: 10 }}>{owner.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
              {owner.headline && (
                <Text style={{ ...defaultStyles.smallRegular, fontSize: 13, color: 'white' }}>{owner.headline}</Text>
              )}
              {owner.headline && (
                <Icon name="circle" solid size={2} color={colors.white} style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
              )}
              <Text style={{ ...defaultStyles.smallRegular, fontSize: 13, color: 'white' }}>
                {timeDiff} {period}
              </Text>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
              {owner.location && (
                <Text style={{ ...defaultStyles.smallRegular, fontSize: 13, color: 'white' }}>{owner.location}</Text>
              )}
            </View> */}
          </View>
        </TouchableOpacity>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...defaultStyles.hugeBold, color: 'white' }}>{story.title || ''}</Text>
          {story.title && (
            <Icon name="circle" solid size={2} color={colors.white} style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          )}
          <Text style={{ ...defaultStyles.smallRegular, fontSize: 13, color: 'white' }}>
            {timeDiff} {period}
          </Text>
        </View> */}
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 4,
          right: 12,
          paddingHorizontal: 8,
          height: 28,
          borderRadius: 8,
          backgroundColor: colors.purp,
          justifyContent: 'center',
          alignItems: 'center',
          ...defaultStyles.shadowButton,
        }}
        onPress={() => null}
      >
        <Text style={{ ...defaultStyles.smallSemibold, color: colors.white }}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});

export default StoryHeader;
