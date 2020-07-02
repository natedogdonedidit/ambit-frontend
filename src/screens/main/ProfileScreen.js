import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import SINGLE_USER_BASIC from 'library/queries/SINGLE_USER_BASIC';

import colors from 'styles/colors';
import Loader from 'library/components/UI/Loader';
import ProfileComponent from 'library/components/profile/ProfileComponent';

// MUST BE COPIED TO PROFILECOMPONENT
const OUTSIDE_HEADER_HEIGHT = 0;
const OUTSIDE_HEADER_SCROLL = 0;

const ProfileScreen = ({ navigation, route }) => {
  const [scrollY] = useState(new Animated.Value(0));

  // PARAMS
  const { profileId } = route.params;

  // QUERIES
  const { loading, error, data, refetch } = useQuery(SINGLE_USER_BASIC, {
    variables: { id: profileId },
  });

  // useEffect(() => {
  //   analytics.screen('Home Screen')
  // }, [profileId])

  if (loading) return <Loader loading={loading} />;

  const { user } = data;

  // console.log(user);

  // CUSTOM FUNCTIONS

  return (
    <View style={styles.container}>
      <ProfileComponent
        navigation={navigation}
        profileId={profileId}
        scrollY={scrollY}
        OUTSIDE_HEADER_HEIGHT={OUTSIDE_HEADER_HEIGHT}
        OUTSIDE_HEADER_SCROLL={OUTSIDE_HEADER_SCROLL}
        loading={loading}
        user={user}
        refetch={refetch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
