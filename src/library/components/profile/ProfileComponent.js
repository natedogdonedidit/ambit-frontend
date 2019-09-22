import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  Alert,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useSafeArea } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import WhiteButton from 'library/components/UI/WhiteButton';
import TextButton from 'library/components/UI/TextButton';

import Loader from 'library/components/UI/Loader';

import NameBox from 'library/components/profile/NameBox';
import LargeProfilePic from 'library/components/UI/LargeProfilePic';
import ProfileTabs from 'library/components/ProfileTabs';
import ProfileBio from 'library/components/ProfileBio';
import ProfilePosts from 'library/components/ProfilePosts';
import ProfileNetwork from 'library/components/ProfileNetwork';

const bannerExample = 'http://backgrounddownload.com/wp-content/uploads/2018/09/background-polygons-6.jpg';

// SET THESE
const BANNER_MAX_HEIGHT = 140;
const BANNER_MIN_HEIGHT = 44;
const PIC_ANIM = 50;

const ProfileComponent = ({ navigation, profileId, scrollY, OUTSIDE_HEADER_HEIGHT, OUTSIDE_HEADER_SCROLL, loading, user }) => {
  const [tabState, setTabState] = useState(0);

  // CALCULATED
  const BANNER_SCROLL_DISTANCE = OUTSIDE_HEADER_HEIGHT + BANNER_MAX_HEIGHT - BANNER_MIN_HEIGHT;

  // CONTEXT & USER CHECK
  // const insets = useSafeArea();
  // const profileId = navigation.getParam('profileId', 'NO-ID');

  // // QUERIES
  // const { loading, error, data } = useQuery(SINGLE_USER_BIO, {
  //   variables: { id: profileId },
  // });

  if (loading) {
    return <Loader loading={loading} />;
  }

  // const { user } = data;

  const nullFunction = () => null;
  const isMyProfile = false;

  const SCROLLVIEW_PADDING_TOP = OUTSIDE_HEADER_HEIGHT + BANNER_MAX_HEIGHT - BANNER_MIN_HEIGHT;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={{ ...styles.scrollView, marginTop: BANNER_MIN_HEIGHT }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={1}
        stickyHeaderIndices={[2]}
      >
        <View style={{ width: '100%', height: SCROLLVIEW_PADDING_TOP, backgroundColor: 'white' }} />
        <NameBox user={user} />
        <ProfileTabs tabState={tabState} setTabState={setTabState} />
        {tabState === 0 && (
          <ProfileBio
            isMyProfile={isMyProfile}
            user={user}
            handleSelectExperience={nullFunction}
            handleSelectEducation={nullFunction}
            setModalVisibleSkills={nullFunction}
          />
        )}
        {tabState === 1 && (
          <ProfilePosts
            setModalVisibleEditPost={nullFunction}
            setPostToEdit={nullFunction}
            navigation={navigation}
            isMyProfile={isMyProfile}
            profileId={profileId}
          />
        )}
        {tabState === 2 && <ProfileNetwork />}
      </Animated.ScrollView>

      {/* ABSOLUTE OBJECTS ONLY */}
      {/* BANNER */}
      <Animated.View
        style={[
          styles.bannerView,
          {
            height: BANNER_MAX_HEIGHT,
            marginTop: OUTSIDE_HEADER_HEIGHT,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, BANNER_SCROLL_DISTANCE],
                  outputRange: [0, -BANNER_SCROLL_DISTANCE],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <Animated.Image
          style={{
            height: BANNER_MAX_HEIGHT,
            width: '100%',
            opacity: scrollY.interpolate({
              inputRange: [OUTSIDE_HEADER_SCROLL, BANNER_SCROLL_DISTANCE],
              outputRange: [1, 0.4],
              extrapolate: 'clamp',
            }),
          }}
          resizeMode="cover"
          source={{
            uri: user.profileBanner || bannerExample,
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: BANNER_MIN_HEIGHT,
            width: '100%',
            padding: 5,
            opacity: scrollY.interpolate({
              inputRange: [BANNER_SCROLL_DISTANCE + 60, BANNER_SCROLL_DISTANCE + 120],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          }}
        >
          <Text style={{ ...defaultStyles.largeHeavy, color: 'white' }}>{user.name}</Text>
          <Text style={{ ...defaultStyles.smallRegular, color: 'white' }}>
            {user.jobTitle || 'Job title'} | {user.location || 'Location'}
          </Text>
        </Animated.View>
      </Animated.View>

      {/* PROFILE PIC */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 20,
          top: OUTSIDE_HEADER_HEIGHT + BANNER_MAX_HEIGHT - 20,
          opacity: scrollY.interpolate({
            inputRange: [BANNER_SCROLL_DISTANCE, BANNER_SCROLL_DISTANCE + PIC_ANIM],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, BANNER_SCROLL_DISTANCE],
                outputRange: [0, -BANNER_SCROLL_DISTANCE],
                extrapolate: 'clamp',
              }),
            },
            {
              translateX: scrollY.interpolate({
                inputRange: [BANNER_SCROLL_DISTANCE, BANNER_SCROLL_DISTANCE + PIC_ANIM],
                outputRange: [0, -30],
                extrapolate: 'clamp',
              }),
            },
            {
              scale: scrollY.interpolate({
                inputRange: [BANNER_SCROLL_DISTANCE, BANNER_SCROLL_DISTANCE + PIC_ANIM],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
          ...defaultStyles.shadow3,
        }}
      >
        <LargeProfilePic pic={user.profilePic} intro={user.intro} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.lightGray,
  },
  bannerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  // editProfileButton: {
  //   position: 'absolute',
  //   top: HEADER_SCROLL_DISTANCE + 10,
  //   right: 20,
  // },
  // backButton: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  // },
});

export default ProfileComponent;
