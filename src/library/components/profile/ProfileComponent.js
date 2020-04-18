import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserContext } from 'library/utils/UserContext';
import { useSafeArea } from 'react-native-safe-area-context';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import NameBox from 'library/components/profile/NameBox';
import ProfileTabs from 'library/components/profile/ProfileTabs';
import ProfileBio from 'library/components/profile/ProfileBio';
import ProfilePosts from 'library/components/profile/ProfilePosts';
import ProfileGrid from 'library/components/profile/ProfileGrid';

const bannerExample = 'http://backgrounddownload.com/wp-content/uploads/2018/09/background-polygons-6.jpg';

// SET THESE
const BANNER_HEIGHT = 100;
const HEADER_HEIGHT = 44;
const TABS_HEIGHT = 42;

const ProfileComponent = ({
  navigation,
  profileId,
  scrollY,
  loading,
  user,
  showBack = true,
  refetch,
  OUTSIDE_HEADER_HEIGHT = 0,
}) => {
  const [tabState, setTabState] = useState(0);
  const [tabPosition, setTabPosition] = useState(0);
  const { currentUserId } = useContext(UserContext);
  const insets = useSafeArea();
  const [top] = useState(insets.top || 20); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal

  const tabScrollDistance = tabPosition - top - HEADER_HEIGHT;
  const SCROLLVIEW_PADDING_TOP = OUTSIDE_HEADER_HEIGHT;

  // CALCULATED
  const nullFunction = () => null;
  const isMyProfile = user.id === currentUserId;

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <View style={styles.container}>
      {/* Banner behind everything */}
      <Animated.View
        style={{
          position: 'absolute',
          top: OUTSIDE_HEADER_HEIGHT,
          width: '100%',
          height: BANNER_HEIGHT + top,
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [-800, 0],
                outputRange: [20, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Image
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode="cover"
          source={{
            uri: user.bannerPic || bannerExample,
          }}
        />
      </Animated.View>
      <Animated.ScrollView
        style={{ ...styles.scrollView }}
        showsVerticalScrollIndicator={false}
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
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />} // not really being used right now
      >
        {/* Placeholder view to push evertyhing down into the scrollview to be below outside header */}
        <View style={{ width: '100%', height: OUTSIDE_HEADER_HEIGHT, backgroundColor: 'white' }} />
        <View
          style={{
            // a clear view so you can see the banner behind it
            height: BANNER_HEIGHT + top,
            width: '100%',
            backgroundColor: 'transparent',
          }}
        />

        <NameBox navigation={navigation} isMyProfile={isMyProfile} user={user} />
        <View
          // this is how i get the position for the sticky tabs
          onLayout={event => {
            const { y } = event.nativeEvent.layout;
            setTabPosition(y);
          }}
          style={{ width: '100%', height: TABS_HEIGHT, backgroundColor: 'white' }}
        />
        {tabState === 0 && (
          <ProfileBio
            navigation={navigation}
            isMyProfile={isMyProfile}
            profileId={profileId}
            handleSelectExperience={nullFunction}
            handleSelectEducation={nullFunction}
            setModalVisibleSkills={nullFunction}
          />
        )}
        {tabState === 1 && <ProfileGrid navigation={navigation} isMyProfile={isMyProfile} profileId={profileId} />}
        {tabState === 2 && (
          <ProfilePosts
            setModalVisibleEditPost={nullFunction}
            setPostToEdit={nullFunction}
            navigation={navigation}
            isMyProfile={isMyProfile}
            profileId={profileId}
          />
        )}
      </Animated.ScrollView>

      {/* Profile Tabs */}
      <Animated.View
        style={{
          position: 'absolute',
          top: tabPosition,
          left: 0,
          right: 0,
          width: '100%',
          overflow: 'hidden',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-800, tabScrollDistance],
                outputRange: [800, -tabScrollDistance],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <ProfileTabs tabState={tabState} setTabState={setTabState} />
      </Animated.View>

      {/* Hidden Header */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: HEADER_HEIGHT + top,
          backgroundColor: colors.blueGray,
          paddingTop: top,
          opacity: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        }}
      >
        <Text style={{ ...defaultStyles.largeHeavy, color: 'white' }}>{user.name}</Text>
        {user.headline && <Text style={{ ...defaultStyles.smallRegular, color: 'white' }}>{user.headline}</Text>}
      </Animated.View>

      {/* Back Button */}
      {showBack && (
        <View
          style={{
            position: 'absolute',
            top: 8 + top,
            left: 20,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollView: {
    ...StyleSheet.absoluteFill,
    // backgroundColor: colors.lightGray,
  },
});

export default ProfileComponent;
