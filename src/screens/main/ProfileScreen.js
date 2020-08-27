import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Alert } from 'react-native';
import { useQuery } from '@apollo/client';

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
  const { profileId, username } = route.params;

  // QUERIES
  const { loading, error, data, refetch } = useQuery(SINGLE_USER_BASIC, {
    variables: { where: { username } },
    onError: () =>
      Alert.alert('Oh no!', 'That username does not exist', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            navigation.goBack();
          },
        },
      ]),
  });

  if (loading) return <Loader loading={loading} size="small" />;

  if (error || !data) {
    return null;
  }

  const { user } = data;

  // CUSTOM FUNCTIONS
  return (
    <View style={styles.container}>
      <ProfileComponent
        navigation={navigation}
        profileId={profileId}
        username={username}
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
