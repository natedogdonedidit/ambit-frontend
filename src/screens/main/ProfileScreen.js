import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Animated } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import colors from 'styles/colors';
import Loader from 'library/components/UI/Loader';
import ProfileComponent from 'library/components/profile/ProfileComponent';

// MUST BE COPIED TO PROFILECOMPONENT
const OUTSIDE_HEADER_HEIGHT = 0;
const OUTSIDE_HEADER_SCROLL = 0;

const ProfileScreen = ({ navigation }) => {
  const [scrollY] = useState(new Animated.Value(0));

  // CONTEXT & USER CHECK
  const profileId = navigation.getParam('profileId', 'NO-ID');

  // QUERIES
  const { loading, error, data } = useQuery(SINGLE_USER_BIO, {
    variables: { id: profileId },
  });

  const { user } = data;

  // CUSTOM FUNCTIONS

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <ProfileComponent
          navigation={navigation}
          profileId={profileId}
          scrollY={scrollY}
          OUTSIDE_HEADER_HEIGHT={OUTSIDE_HEADER_HEIGHT}
          OUTSIDE_HEADER_SCROLL={OUTSIDE_HEADER_SCROLL}
          loading={loading}
          user={user}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
});

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
