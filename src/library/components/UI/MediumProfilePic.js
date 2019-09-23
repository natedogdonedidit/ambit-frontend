import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';

const MediumProfilePic = ({ navigation, user, pitch = false, disableVideo = false }) => {
  // console.log(user);
  const hasPitch = !!pitch;
  const hasIntro = user.intro.length > 0;
  const hasMedia = (hasPitch || hasIntro) && !disableVideo;

  const handlePress = () => {
    if (!hasMedia || disableVideo) {
      navigation.navigate('Profile', { profileId: user.id });
      return;
    }

    if (hasPitch) {
      navigation.navigate('StoryModal', { user, contentType: 'pitch', pitch: null });
      return;
    }

    if (hasIntro) {
      navigation.navigate('StoryModal', { user, contentType: 'intro' });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={hasMedia ? styles.outterCircle : null}>
        {hasIntro && !disableVideo && (
          <LinearGradient
            start={{ x: 0.4, y: 0.4 }}
            end={{ x: 1, y: 1 }}
            colors={[colors.purp, colors.purple]}
            style={styles.linearGradient}
          />
        )}
        {hasPitch && !disableVideo && (
          <LinearGradient
            start={{ x: 0.4, y: 0.4 }}
            end={{ x: 1, y: 1 }}
            colors={[colors.peach, colors.purpGradient]}
            style={styles.linearGradient}
          />
        )}
        <View style={[{ ...styles.profilePicView }, hasMedia ? { ...styles.whiteBorder } : null]}>
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

const styles = StyleSheet.create({
  profilePicView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  whiteBorder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 1.5,
    marginLeft: 1.5,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  outterCircle: {
    width: 47,
    height: 47,
    borderRadius: 23.5,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});

export default MediumProfilePic;
