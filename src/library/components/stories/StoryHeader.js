import React, { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import ProfilePic from 'library/components/UI/ProfilePic';
import FollowButton from 'library/components/UI/buttons/FollowButton';

// ONLY RE-RENDER IF THE ACTIVEITEM CHANGES
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  if (prevProps.activeItem === nextProps.activeItem) {
    return true;
  }

  return false;
}

function StoryHeader({ owner, type, activeItem, navigation, isMyPost }) {
  // MEMO VALUES
  const { timeDiff, period } = useMemo(() => {
    const createdAt = new Date(activeItem.createdAt);
    const timeOfDay = new Date();
    return timeDifference(timeOfDay, createdAt);
  }, [activeItem]);

  if (!owner) return null;

  // if is my post
  const showAddToProjectButton = isMyPost;

  return (
    <View style={{ ...styles.absoluteTop, top: 18 }}>
      <View style={styles.header}>
        <ProfilePic
          size="small"
          user={owner}
          navigation={navigation}
          enableClick={type !== 'INTRO'}
          enableIntro={false}
          enableStory={false}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile', { username: owner.username });
          }}
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
              <Text style={{ ...defaultStyles.defaultBold, color: 'white' }}>{owner.username}</Text>
              <Icon name="circle" solid size={2} color={colors.white} style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
              <Text style={{ ...defaultStyles.smallRegular, color: 'white' }}>
                {timeDiff} {period}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {!isMyPost && (
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 12,
          }}
        >
          <FollowButton userToFollowID={owner.id} username={owner.username} small onStory />
        </View>
      )}
      {/* {isMyPost && (
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 12,
          }}
        >
          <TouchableOpacity onPress={() => null} activeOpacity={0.5}>
            <View style={styles.addButton}>
              <Feather name="camera" size={12} color={colors.white} style={{ alignSelf: 'center', paddingRight: 5 }} />
              <Text style={{ ...defaultStyles.smallSemibold, color: colors.white }}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
}

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
  addButton: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    ...defaultStyles.shadowButton,
  },
});

export default React.memo(StoryHeader, areEqual);
