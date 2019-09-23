import React, { useState, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { useQuery } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TestVideo from 'library/assets/testintro.mp4';
import MediumProfilePic from 'library/components/UI/MediumProfilePic';

const StoryModal = ({ navigation }) => {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  const user = navigation.getParam('user');
  const contentType = navigation.getParam('contentType');
  const pitch = navigation.getParam('pitch', null);

  let story = [];

  if (contentType === 'intro') {
    story = [...user.intro];
  }

  const onBuffer = () => {};

  const onError = () => {};

  const onProgress = () => {};

  if (hasError) {
    return (
      <View style={styles.coverView}>
        <Text>There was an error</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Video
        // source={{ uri: 'https://res.cloudinary.com/ambitapp/video/upload/v1569267304/IMG_2418_atnorh-mp4_vkltw5.mp4' }} // Can be a URL or a local file.
        source={{ uri: story[0] }}
        resizeMode="cover"
        ref={videoRef}
        onBuffer={onBuffer} // Callback when remote video is buffering
        onError={onError} // Callback when video cannot be loaded
        onProgress={onProgress}
        style={styles.backgroundVideo}
      />

      <SafeAreaView style={styles.overlay}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: user.id })}>
          <View style={styles.header}>
            <MediumProfilePic user={user} disableVideo />
            <Text style={{ ...defaultStyles.defaultBold, color: 'white', paddingLeft: 15 }}>{user.name}</Text>
            <Icon style={{ paddingLeft: 10 }} name="circle" solid size={4} color="white" />
            <Text style={{ ...defaultStyles.defaultMedium, color: 'white', paddingLeft: 10 }}>Intro</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: user.id })}>
            <View style={styles.viewProfile}>
              <Text>View Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  footer: {
    alignItems: 'center',
  },
  viewProfile: {
    width: 120,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  coverView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StoryModal;
