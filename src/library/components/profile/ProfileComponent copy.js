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

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';
const bannerExample = 'http://backgrounddownload.com/wp-content/uploads/2018/09/background-polygons-6.jpg';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 44;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ADDED_ANIMATION_DISTANCE = 100;

const ProfileComponent = ({ navigation, profileId, scrollY, outsideHeaderHeight }) => {
  // STATE
  const [tabState, setTabState] = useState(0);

  // CONTEXT & USER CHECK
  const insets = useSafeArea();
  // const profileId = navigation.getParam('profileId', 'NO-ID');

  // QUERIES
  const { loading, error, data } = useQuery(SINGLE_USER_BIO, {
    variables: { id: profileId },
  });

  if (loading || error) {
    return <Loader loading={loading} />;
  }

  const { user } = data;

  const nullFunction = () => null;
  const isMyProfile = false;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={[
          {
            width: '100%',
            flex: 1,
            backgroundColor: colors.lightGray,
          },
        ]}
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
        stickyHeaderIndices={[1]}
      >
        <NameBox user={user} height={140} />

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

      <Animated.View
        style={[
          styles.slidingBannerView,
          {
            height: HEADER_MAX_HEIGHT + insets.top,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, HEADER_SCROLL_DISTANCE],
                  outputRange: [0, -HEADER_SCROLL_DISTANCE],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <Animated.Image
          style={{
            height: HEADER_MAX_HEIGHT + insets.top,
            width: '100%',
            opacity: scrollY.interpolate({
              inputRange: [HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + ADDED_ANIMATION_DISTANCE],
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
            height: HEADER_MIN_HEIGHT,
            width: '100%',
            padding: 5,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + ADDED_ANIMATION_DISTANCE],
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
      <Animated.View
        style={{
          position: 'absolute',
          left: 20,
          top: HEADER_MAX_HEIGHT + insets.top - 18,
          opacity: scrollY.interpolate({
            inputRange: [60, HEADER_MAX_HEIGHT - 20],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, HEADER_MAX_HEIGHT],
                outputRange: [0, -HEADER_MAX_HEIGHT],
                extrapolate: 'clamp',
              }),
            },
            {
              translateY: scrollY.interpolate({
                inputRange: [60, HEADER_MAX_HEIGHT],
                outputRange: [0, 20],
                extrapolate: 'clamp',
              }),
            },
            {
              translateX: scrollY.interpolate({
                inputRange: [60, HEADER_MAX_HEIGHT],
                outputRange: [0, -30],
                extrapolate: 'clamp',
              }),
            },
            {
              scale: scrollY.interpolate({
                inputRange: [60, HEADER_MAX_HEIGHT],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
              // scale: scrollY.interpolate({
              //   inputRange: [HEADER_MAX_HEIGHT - 10, HEADER_MAX_HEIGHT + 50],
              //   outputRange: [1, 0.1],
              //   extrapolate: 'clamp',
              // }),
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
    backgroundColor: colors.lightGray,
  },
  slidingBannerView: {
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  profileBox: {
    width: '100%',
    paddingTop: HEADER_SCROLL_DISTANCE + 70,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  profilePicView: {},
  name: {
    marginBottom: 3,
  },
  job: {
    marginBottom: 15,
  },
  whiteButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  editProfileButton: {
    position: 'absolute',
    top: HEADER_SCROLL_DISTANCE + 10,
    right: 20,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default ProfileComponent;
