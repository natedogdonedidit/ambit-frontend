import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import FitImage from 'react-native-fit-image';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import { getIconFromID } from 'library/utils';

const StoryBoxGrid = ({ navigation, story, showProfilePic = true }) => {
  if (story.type === 'MYSTORY') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('StoryModal', {
            story,
          })
        }
        style={styles.storyBox}
        activeOpacity={0.8}
      >
        <FitImage source={{ uri: story.preview || story.items[story.items.length - 1].preview }} />
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
            <ProfilePic user={story.owner} size="small" navigation={navigation} />
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
            {story.owner.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (story.type === 'PROJECT') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('StoryModal', {
            story,
          })
        }
        style={styles.storyBox}
        activeOpacity={0.8}
      >
        <FitImage source={{ uri: story.preview || story.items[story.items.length - 1].preview }} />
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
            <ProfilePic user={story.owner} size="small" navigation={navigation} />
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
        <View
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
        </View>
      </TouchableOpacity>
    );
  }

  if (story.type === 'SOLO') {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('StoryModal', {
            story,
          })
        }
        style={styles.storyBox}
        activeOpacity={0.8}
      >
        <FitImage source={{ uri: story.preview || story.items[story.items.length - 1].preview }} />
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
            <ProfilePic user={story.owner} size="small" navigation={navigation} />
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
        {story.items[0].type === 'VIDEO' && (
          <View
            style={{
              position: 'absolute',
              top: 7,
              right: 8,
            }}
          >
            <Icon
              name="play"
              size={16}
              color={colors.white}
              solid
              style={{ textAlign: 'center', paddingTop: 1, ...defaultStyles.shadowButton }}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  storyBox: {
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    // borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    overflow: 'hidden',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});

export default StoryBoxGrid;
