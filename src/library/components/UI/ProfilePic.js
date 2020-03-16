import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';

const ProfilePic = ({
  navigation, // required
  user, // required
  size = 40,
  disableVideo = false,
  disableClick = false,
  border = false,
  borderWidth = 1.4,
  extraBorder = 0, // adds a white ring around outside
}) => {
  // sizes
  // small = 30
  // medium = 40
  // large = 50
  // x-large = 70

  // const hasPitch = !!pitch;
  let hasIntro = false;
  if (user) {
    if (user.intro) {
      if (user.intro.items.length > 0) {
        hasIntro = true;
      }
    }
  }

  const whiteWidth = size + 2 * borderWidth;
  const colorWidth = whiteWidth + 2 * borderWidth + 2 * extraBorder;
  // const colorWidth = whiteWidth + 2 * 1.4 + 2 * extraBorder;

  const styles = StyleSheet.create({
    noBorder: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      backgroundColor: 'white',
    },
    whiteBorder: {
      justifyContent: 'center',
      alignItems: 'center',

      width: whiteWidth,
      height: whiteWidth,
      overflow: 'hidden',

      borderRadius: whiteWidth / 2,
      borderWidth,
      borderColor: 'white',
      backgroundColor: 'white',
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
    },
  });

  if (!user) {
    return (
      <View style={border ? styles.whiteBorder : styles.noBorder}>
        <View style={styles.grayBox} />
      </View>
    );
  }

  if (hasIntro && !disableVideo) {
    return (
      <View style={styles.introBorderBackground}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.introBorder}
          onPress={() =>
            navigation.navigate('StoryModal', {
              owner: user,
              story: user.intro,
            })
          }
        >
          <View style={styles.whiteBorder}>
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

  if (hasIntro && !disableVideo) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('StoryModal', {
            owner: user,
            story: user.intro,
          })
        }
      >
        <View style={styles.introBorder}>
          <View style={styles.whiteBorder}>
            <Image
              style={styles.profilePic}
              resizeMode="cover"
              source={{
                uri: user.profilePic || profilePicExample,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (disableClick) {
    return (
      <View style={border ? styles.whiteBorder : styles.noBorder}>
        <Image
          style={{ ...styles.profilePic }}
          resizeMode="cover"
          source={{
            uri: user.profilePic || profilePicExample,
          }}
        />
      </View>
    );
  }

  return (
    <View style={border ? styles.whiteBorder : styles.noBorder}>
      <TouchableOpacity
        style={border ? styles.whiteBorder : styles.noBorder}
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
