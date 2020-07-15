import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';

const ProfilePic = ({
  navigation, // required
  user, // required
  size = 'medium',
  disableVideo = false,
  disableClick = false,
  showBlue = false,
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
  }

  // const hasPitch = !!pitch;
  let hasIntro = false;
  if (user) {
    if (user.intro) {
      if (user.intro.items.length > 0) {
        hasIntro = true;
      }
    }
  }

  // const hasStory = false;
  let hasStory = false;
  if (user) {
    if (user.myStory) {
      if (user.myStory.items.length > 0) {
        hasStory = true;
      }
    }
  }

  const hasVideo = hasIntro || hasStory || showBlue;

  const whiteWidth = sizePX + 2 * borderWidth;
  const colorWidth = whiteWidth + 2 * borderWidth + 2 * extraColorBorder + 2 * extraBorder;
  // const colorWidth = whiteWidth + 2 * 1.4 + 2 * extraBorder;

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

  if (!user) {
    return (
      <View style={border ? styles.whiteBorder : styles.noBorder}>
        <View style={styles.grayBox} />
      </View>
    );
  }

  if (hasVideo && !disableVideo) {
    // if only story
    if (hasStory && !hasIntro) {
      return (
        <View style={styles.introBorderBackground}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.introBorder}
            disabled={disableClick}
            onPress={() => {
              navigation.navigate('StoryModal', {
                story: user.myStory,
                // intro: user.intro,
              });
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
        </View>
      );
    }

    // if only intro
    if (hasIntro && !hasStory) {
      return (
        <View style={border ? styles.whiteBorder : styles.noBorder}>
          <TouchableOpacity
            style={border ? styles.whiteBorder : styles.noBorder}
            activeOpacity={0.7}
            disabled={disableClick}
            onPress={() => {
              navigation.navigate('StoryModal', {
                // story: user.myStory,
                intro: user.intro,
              });
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
          <View
            style={{
              position: 'absolute',
              bottom: -6,
              right: -4,
              ...defaultStyles.shadow3,
            }}
          >
            <View
              style={{
                position: 'absolute', // this sits behind the icon for a while background
                top: 2,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: colors.white,
              }}
            />
            <Icon name="play-circle" solid size={18} color={colors.green} />
          </View>
        </View>
      );
    }

    // if both
    return (
      <View style={styles.introBorderBackground}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.introBorder}
          disabled={disableClick}
          onPress={() => {
            navigation.navigate('StoryModal', {
              story: hasStory ? user.myStory : null,
              intro: hasIntro ? user.intro : null,
            });
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
        <View
          style={{
            position: 'absolute',
            bottom: -3,
            right: 1,
            ...defaultStyles.shadow3,
          }}
        >
          <View
            style={{
              position: 'absolute', // this sits behind the icon for a while background
              top: 2,
              right: 2,
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: colors.white,
            }}
          />
          <Icon name="play-circle" solid size={18} color={colors.green} />
        </View>
      </View>
    );
  }

  // if (disableClick) {
  //   return (
  //     <View style={[border ? styles.whiteBorder : styles.noBorder, { overflow: 'hidden' }]}>
  //       <Image
  //         style={{ ...styles.profilePic }}
  //         resizeMode="cover"
  //         source={{
  //           uri: user.profilePic || profilePicExample,
  //         }}
  //       />
  //     </View>
  //   );
  // }

  return (
    <View style={[border ? styles.whiteBorder : styles.noBorder, { overflow: 'hidden' }]}>
      <TouchableOpacity
        style={border ? styles.whiteBorder : styles.noBorder}
        disabled={disableClick}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Profile', { profileId: user.id })}
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
