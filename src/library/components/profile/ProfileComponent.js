import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UserContext } from 'library/utils/UserContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import NameBox from 'library/components/profile/NameBox';
import ProfileTabs from 'library/components/profile/ProfileTabs';
import ProfileBio from 'library/components/profile/ProfileBio';
import ProfilePosts from 'library/components/profile/ProfilePosts';
import ProfileGrid from 'library/components/profile/ProfileGrid';
import { useApolloClient } from '@apollo/client';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import STORIES_QUERY from 'library/queries/STORIES_QUERY';
import POSTS_WHERE_QUERY from 'library/queries/POSTS_WHERE_QUERY';

const bannerExample =
  'https://images.unsplash.com/photo-1592320937521-84c88747a68a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80';

// SET THESE
const BANNER_HEIGHT = 100;
const HEADER_HEIGHT = 44;
const TABS_HEIGHT = 42;

const ProfileComponent = ({ navigation, username, scrollY, loading, user, OUTSIDE_HEADER_HEIGHT = 0 }) => {
  const [tabState, setTabState] = useState(0);
  const [tabPosition, setTabPosition] = useState(0);
  const [showRefreshing, setShowRefreshing] = useState(false);
  const { currentUserId } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const [top] = useState(insets.top || 20); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal
  const client = useApolloClient();

  const tabScrollDistance = tabPosition - top - HEADER_HEIGHT;
  const SCROLLVIEW_PADDING_TOP = OUTSIDE_HEADER_HEIGHT;

  // CALCULATED
  const isMyProfile = user.id === currentUserId;

  // copy these queries from ProfileBio, ProfileGrid, and ProfilePosts
  const onRefresh = async () => {
    setShowRefreshing(true);
    // refresh PROFILE BIO
    client.query({
      query: SINGLE_USER_BIO,
      variables: { where: { username } },
      fetchPolicy: 'network-only',
    });

    // refresh PROFILE STORIES
    client.query({
      query: STORIES_QUERY,
      variables: {
        first: 18,
        where: {
          owner: { username: { equals: username } },
          type: { equals: 'PROJECT' },
        },
        orderBy: [{ lastUpdated: 'desc' }],
      },
      fetchPolicy: 'network-only',
    });

    // refresh PROFILE POSTS
    await client.query({
      query: POSTS_WHERE_QUERY,
      variables: {
        take: 50,
        where: {
          owner: { username: { equals: username } },
        },
      },
      fetchPolicy: 'network-only',
    });
    setShowRefreshing(false);
  };

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
        refreshControl={<RefreshControl refreshing={showRefreshing} onRefresh={onRefresh} tintColor="white" />} // not really being used right now
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
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setTabPosition(y);
          }}
          style={{ width: '100%', height: TABS_HEIGHT, backgroundColor: 'white' }}
        />
        {tabState === 0 && <ProfileBio isMyProfile={isMyProfile} username={username} />}
        {tabState === 1 && <ProfileGrid isMyProfile={isMyProfile} username={username} />}
        {tabState === 2 && <ProfilePosts isMyProfile={isMyProfile} username={username} />}
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
          backgroundColor: colors.purpO,
          paddingTop: top,
          opacity: scrollY.interpolate({
            inputRange: [90, 120],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        }}
      >
        <Text style={{ ...defaultStyles.largeHeavy, color: 'white' }}>{user.name}</Text>
        {!!user.headline && <Text style={{ ...defaultStyles.smallRegular, color: 'white' }}>@{user.username}</Text>}
      </Animated.View>

      {/* Back Button */}
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
