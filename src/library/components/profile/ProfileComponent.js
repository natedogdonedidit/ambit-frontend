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
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserContext } from 'library/utils/UserContext';
// import { useSafeArea } from 'react-native-safe-area-context';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import NameBox from 'library/components/profile/NameBox';
import ProfilePic from 'library/components/UI/ProfilePic';
import ProfileTabs from 'library/components/profile/ProfileTabs';
import ProfileBio from 'library/components/profile/ProfileBio';
import ProfilePosts from 'library/components/profile/ProfilePosts';
import ProfileNetwork from 'library/components/profile/ProfileNetwork';

const bannerExample = 'http://backgrounddownload.com/wp-content/uploads/2018/09/background-polygons-6.jpg';

// SET THESE
const BANNER_MAX_HEIGHT = 140;
const BANNER_MIN_HEIGHT = 44;
const PIC_ANIM = 50;

const ProfileComponent = ({
  navigation,
  profileId,
  scrollY,
  OUTSIDE_HEADER_HEIGHT,
  OUTSIDE_HEADER_SCROLL,
  loading,
  user,
  showBack = true,
  showOptions = true,
}) => {
  const [tabState, setTabState] = useState(0);
  const { currentUserId } = useContext(UserContext);
  // const insets = useSafeArea();

  // CALCULATED
  const BANNER_SCROLL_DISTANCE = OUTSIDE_HEADER_HEIGHT + BANNER_MAX_HEIGHT - BANNER_MIN_HEIGHT;
  const nullFunction = () => null;
  const isMyProfile = user.id === currentUserId;

  if (loading) {
    return <Loader loading={loading} />;
  }

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
        <NameBox navigation={navigation} isMyProfile={isMyProfile} user={user} />
        <ProfileTabs tabState={tabState} setTabState={setTabState} />
        {tabState === 0 && (
          <ProfileBio
            navigation={navigation}
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
            uri: user.bannerPic || bannerExample,
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
        <ProfilePic user={user} intro={user.intro} navigation={navigation} size={70} border />
      </Animated.View>
      {/* back button */}
      {showBack && (
        <View
          style={{
            position: 'absolute',
            top: 8,
            left: 12,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
            <Icon name="chevron-left" size={15} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* options button */}
      {showOptions && (
        <View
          style={{
            position: 'absolute',
            top: 8,
            right: 12,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => null} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
            <Icon name="ellipsis-h" size={15} color="white" />
          </TouchableOpacity>
        </View>
      )}
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
