import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { sub, isBefore } from 'date-fns';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';

const ProfilePic = ({
  navigation, // required
  user, // required
  size = 'medium',
  enableIntro = true,
  enableStory = true,
  enableClick = true,
  border = false,
  borderWidth = 1.6,
  extraBorder = 0, // adds a white ring around outside
  extraColorBorder = 0.4,
}) => {
  // set the size of the profile pic
  let sizePX = 46;
  if (size === 'small') {
    sizePX = 36;
  } else if (size === 'medium') {
    sizePX = 46;
  } else if (size === 'large') {
    sizePX = 70;
  } else if (size === 'xlarge') {
    sizePX = 110;
  } else if (size === 'xsmall') {
    sizePX = 28;
  }

  // NOTE: GO BACK TO VERSION 0.0.15 CODE IF YOU WANT TO GO BACK TO INTRO ONLY LOGIC!!

  let hasIntro = false;
  if (user) {
    if (user.intro) {
      if (user.intro.items.length > 0) {
        hasIntro = true;
      }
    }
  }

  let hasStory = false;
  if (user) {
    if (user.myStory) {
      if (user.myStory.items.length > 0) {
        hasStory = true;
      }
    }
  }

  let hasProject = false;
  if (user) {
    if (user.latestProject) {
      if (user.latestProject.items.length > 0) {
        hasProject = true;
      }
    }
  }

  let showIntro = false;
  let showStory = false;
  let showProject = false;

  let storyToShow = null;

  // decide if we should show project

  if (enableStory && hasProject) {
    if (hasStory) {
      // if you have a story AND a project, only show project if its less than 7 days old

      // decide if the project is greater than 7 days old
      const someDayAgo = sub(new Date(), { hours: 24 * 7 });
      const isTooOld = isBefore(new Date(user.latestProject.lastUpdated), someDayAgo);

      // if the project is too old or this is the profile screen...show the mystory
      if (isTooOld || size === 'large') {
        showStory = true;
        storyToShow = { ...user.myStory };
      } else {
        showProject = true;
        storyToShow = { ...user.latestProject };
      }
    } else if (hasIntro && enableIntro) {
      // if you don't have a MyStory...show latest project...unless its too old

      // decide if the project is greater than 30 days old
      const someDayAgo2 = sub(new Date(), { hours: 24 * 30 });
      const isTooOld2 = isBefore(new Date(user.latestProject.lastUpdated), someDayAgo2);

      // if the project is too old...show the mystory
      if (isTooOld2) {
        showIntro = true;
        storyToShow = { ...user.intro };
      } else {
        showProject = true;
        storyToShow = { ...user.latestProject };
      }
    } else {
      showProject = true;
      storyToShow = { ...user.latestProject };
    }

    // if you dont have a project...but you have a story...show story
  } else if (hasStory && enableStory) {
    showStory = true;
    storyToShow = { ...user.myStory };

    // if you dont have a project or a story...but you have an intro...show intro
  } else if (hasIntro && enableIntro) {
    showIntro = true;
    storyToShow = { ...user.intro };
  }

  const whiteWidth = sizePX + 2 * borderWidth;
  const colorWidth = whiteWidth + 2 * borderWidth + 2 * extraColorBorder + 2 * extraBorder;

  const styles = StyleSheet.create({
    noBorder: {
      width: sizePX,
      height: sizePX,
      borderRadius: sizePX / 2,
      // overflow: 'hidden',
      backgroundColor: 'white',
      position: 'relative',
    },
    whiteBorder: {
      justifyContent: 'center',
      alignItems: 'center',

      width: whiteWidth,
      height: whiteWidth,
      // overflow: 'hidden',

      borderRadius: whiteWidth / 2,
      borderWidth,
      borderColor: 'white',
      backgroundColor: 'white',

      position: 'relative',
    },
    profilePic: {
      width: '100%',
      height: '100%',
    },
    grayBox: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.iconGray,
    },
    introBorder: {
      backgroundColor: colors.purp,
      justifyContent: 'center',
      alignItems: 'center',

      width: colorWidth,
      height: colorWidth,

      borderRadius: colorWidth / 2,
      borderWidth: extraBorder,
      borderColor: 'white',
    },
    introBorderBackground: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',

      width: colorWidth,
      height: colorWidth,

      borderRadius: colorWidth / 2,
      borderWidth: extraBorder,
      borderColor: 'white',

      position: 'relative',
    },
  });

  const renderIntroIcon = () => {
    // if only INTRO
    if (hasIntro && enableIntro) {
      // if small
      if (size === 'small') {
        return null;
      }
      if (size === 'medium') {
        return null;
      }
      if (size === 'large') {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('IntroModal', {
                intro: {
                  ...user.intro,
                  owner: { ...user },
                },
              });
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: -36,
              ...defaultStyles.shadow3,
              backgroundColor: colors.purp,
              height: 24,
              borderRadius: 10,
              paddingHorizontal: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            hitSlop={{ top: 10, left: 10, right: 15, bottom: 15 }}
          >
            <Icon name="play" solid size={10} color={colors.white} />
            <Text style={{ ...defaultStyles.smallSemibold, color: colors.white, paddingLeft: 4 }}>Intro</Text>
          </TouchableOpacity>
        );
      }
    }
  };

  // RENDER
  // if no user passed in
  if (!user) {
    return (
      <View style={border ? styles.whiteBorder : styles.noBorder}>
        <View style={styles.grayBox} />
      </View>
    );
  }

  // if theres a story or intro or project and enabled...show the blue ring
  if (showIntro || showProject || showStory) {
    // if STORY and INTRO
    return (
      <View style={styles.introBorderBackground}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.introBorder}
          disabled={!enableClick}
          onPress={() => {
            if (showIntro) {
              navigation.navigate('IntroModal', {
                intro: {
                  ...user.intro,
                  owner: { ...user },
                },
              });
            } else {
              navigation.navigate('StoryModal', {
                story: {
                  ...storyToShow,
                  owner: { ...user },
                },
              });
            }
          }}
        >
          <View style={{ ...styles.whiteBorder, overflow: 'hidden' }}>
            <Image
              style={styles.profilePic}
              resizeMode="cover"
              source={{
                uri: user.profilePic || profilePicExample,
              }}
            />
          </View>
        </TouchableOpacity>
        {renderIntroIcon()}
      </View>
    );
  }

  // if no story or intro to show
  return (
    <View style={[border ? styles.whiteBorder : styles.noBorder, { overflow: 'hidden' }]}>
      <TouchableOpacity
        style={border ? styles.whiteBorder : styles.noBorder}
        disabled={!enableClick}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Profile', { profileId: user.id, username: user.username })}
      >
        <Image
          style={{ ...styles.profilePic }}
          resizeMode="cover"
          source={{
            uri: user.profilePic || profilePicExample,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePic;
