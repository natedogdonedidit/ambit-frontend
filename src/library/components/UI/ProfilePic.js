import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';

const ProfilePic = ({
  navigation, // required
  size = 40,
  user, // required
  intro = [],
  pitch = null,
  disableVideo = false,
  disableClick = false,
  border = false,
  borderWidth = 1.6,
  extraBorder = 0, // adds a white ring around outside
}) => {
  // sizes
  // small = 30
  // medium = 40
  // large = 70

  const hasPitch = !!pitch;
  const hasIntro = intro.length > 0;

  const whiteWidth = size + 2 * borderWidth;
  const colorWidth = whiteWidth + 2 * borderWidth + 2 * extraBorder;
  // const colorWidth = size + 4 * borderWidth;

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
    },
    profilePic: {
      width: '100%',
      height: '100%',
    },
    grayBox: {
      width: '100%',
      height: '100%',
    },
    outterCircle: {
      backgroundColor: colors.purp,
      justifyContent: 'center',
      alignItems: 'center',

      width: colorWidth,
      height: colorWidth,

      borderRadius: colorWidth / 2,
      borderWidth: extraBorder,
      borderColor: 'white',
    },
    linearGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    },
  });

  if (!user) {
    return (
      <View style={border ? styles.whiteBorder : styles.noBorder}>
        <View style={styles.grayBox} />
      </View>
    );
  }

  if (hasPitch && !disableVideo) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('StoryModal', { user, contentType: 'Pitch', pitch })}>
        <View style={styles.outterCircle}>
          <LinearGradient
            start={{ x: 0.4, y: 0.4 }}
            end={{ x: 1, y: 1 }}
            colors={[colors.peach, colors.peachO]}
            style={styles.linearGradient}
          />

          <View style={styles.whiteBorder}>
            <Image
              style={{ ...styles.profilePic }}
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

  if (hasIntro && !disableVideo) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('StoryModal', { user, contentType: 'Intro' })}>
        <View style={styles.outterCircle}>
          <View style={[styles.whiteBorder]}>
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
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Profile', { profileId: user.id })}>
      <View>
        <View style={border ? styles.whiteBorder : styles.noBorder}>
          <Image
            style={{ ...styles.profilePic }}
            resizeMode="cover"
            source={{
              uri: user.profilePic || profilePicExample,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfilePic;
