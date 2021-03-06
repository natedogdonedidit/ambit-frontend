import React, { useState } from 'react';
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
  const { username } = route.params;

  // QUERIES
  const { loading, error, data } = useQuery(SINGLE_USER_BASIC, {
    variables: { where: { username } },
    onError: () => {
      navigation.goBack();
      Alert.alert('Oh no!', `We can't find that user`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            // navigation.goBack();
          },
        },
      ]);
    },
  });

  if (loading) return <Loader loading={loading} size="small" />;

  if (error || !data) {
    navigation.goBack();
    Alert.alert('Oh no!', `We can't find that user`, [
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Pressed');
          // navigation.goBack();
        },
      },
    ]);
    return null;
  }

  const { user } = data;

  // CUSTOM FUNCTIONS
  return (
    <View style={styles.container}>
      <ProfileComponent
        navigation={navigation}
        username={username}
        scrollY={scrollY}
        OUTSIDE_HEADER_HEIGHT={OUTSIDE_HEADER_HEIGHT}
        OUTSIDE_HEADER_SCROLL={OUTSIDE_HEADER_SCROLL}
        loading={loading}
        user={user}
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

export default ProfileScreen;
