import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Animated } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import ProfileComponent from 'library/components/profile/ProfileComponent';

// MUST BE COPIED TO PROFILECOMPONENT
const OUTSIDE_HEADER_HEIGHT = 120;

const NetworkScreen = props => {
  const [scrollY] = useState(new Animated.Value(0));
  const insets = useSafeArea();
  const profileId = 'ck0tsen1lpd600b09xfi09b14';

  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.outsideHeader,
          {
            height: OUTSIDE_HEADER_HEIGHT,
            marginTop: insets.top,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, OUTSIDE_HEADER_HEIGHT + insets.top],
                  outputRange: [0, -OUTSIDE_HEADER_HEIGHT - insets.top],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      />
      <ProfileComponent
        navigation={navigation}
        profileId={profileId}
        scrollY={scrollY}
        OUTSIDE_HEADER_SCROLL={OUTSIDE_HEADER_HEIGHT + insets.top}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  outsideHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'gray',
    // opacity: 0.5,
    overflow: 'hidden',
  },
});

export default NetworkScreen;
