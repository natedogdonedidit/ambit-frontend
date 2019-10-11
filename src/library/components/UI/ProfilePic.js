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
  borderWidth = 2,
}) => {
  // sizes
  // small = 30
  // medium = 40
  // large = 70

  const hasPitch = !!pitch;
  const hasIntro = intro.length > 0;

  const whiteBorder = size + 2 * borderWidth;
  const colorBorder = size + 4 * borderWidth - 1;

  const styles = StyleSheet.create({
    noBorder: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      backgroundColor: 'white',
    },
    whiteBorder: {
      width: whiteBorder,
      height: whiteBorder,
      borderRadius: whiteBorder / 2,
      borderWidth,
      borderColor: 'white',
      overflow: 'hidden',
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
      width: colorBorder,
      height: colorBorder,
      borderRadius: colorBorder / 2,
      overflow: 'hidden',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
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
          <LinearGradient
            start={{ x: 0.4, y: 0.4 }}
            end={{ x: 1, y: 1 }}
            colors={[colors.purp, colors.purple]}
            style={styles.linearGradient}
          />

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
