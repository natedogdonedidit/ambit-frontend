import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import { getIconFromID } from 'library/utils';
import { UserContext } from 'library/utils/UserContext';

const StoryBox = ({
  navigation,
  story,
  showProfilePic = true,
  moreType,
  topicIDtoSearch,
  loading,
  newestUnseen,
  small = true,
}) => {
  const { currentUserId } = useContext(UserContext);
  const isMyStory = story ? currentUserId === story.owner.id : false;
  const viewedEntireStory = newestUnseen === -1;

  if (loading) {
    if (small) {
      return <View style={styles.storyBoxBlank} />;
    }
    return <View style={styles.storyBoxBlankLarge} />;
  }

  if (story.type === 'PROJECT') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('StoryModalUser', {
            story,
            // moreType,
            // topicIDtoSearch,
          })
        }
        style={viewedEntireStory ? { ...styles.storyBox, opacity: 0.5 } : styles.storyBox}
        activeOpacity={0.8}
      >
        <Image
          style={{ position: 'absolute', top: 0, left: 0, width: 85, height: 136 }}
          source={{ uri: story.items[story.items.length - 1].preview || null }}
          resizeMode="cover"
        />
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.linearGradient}
        />
        {showProfilePic && (
          <View
            style={{
              top: 5,
              left: 5,
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
        )}
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
        {/* <View
          style={{
            position: 'absolute',
            top: 7,
            right: 8,
          }}
        >
          <Icon
            name="clone"
            size={18}
            color={colors.white}
            solid
            style={{ textAlign: 'center', paddingTop: 1, ...defaultStyles.shadowButton }}
          />
        </View> */}
      </TouchableOpacity>
    );
  }

  return null;
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
  storyBoxBlank: {
    justifyContent: 'space-between',
    height: 120,
    width: 80,
    borderRadius: 12,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
    overflow: 'hidden',
    backgroundColor: colors.gray12,
    marginLeft: 6,
  },
  storyBoxBlankLarge: {
    justifyContent: 'space-between',
    height: 136,
    width: 85,
    borderRadius: 12,
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

export default StoryBox;
