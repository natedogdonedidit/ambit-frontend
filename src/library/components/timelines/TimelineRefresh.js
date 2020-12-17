import React from 'react';
import { View, Animated, ActivityIndicator, StyleSheet } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TimelineRefresh = ({ scrollY, refetching, paddingTop }) => {
  if (refetching) {
    return (
      <View style={{ position: 'absolute', top: paddingTop, left: 0, width: '100%', height: 60, justifyContent: 'flex-end' }}>
        <ActivityIndicator style={styles.spinner} color={colors.purp} animating={refetching} hidesWhenStopped={false} />
      </View>
    );
  }
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: paddingTop - 60,
        left: 0,
        width: '100%',
        height: 60,
        justifyContent: 'flex-end',
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [-60, 0],
              outputRange: [60, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    >
      <View style={{ width: '100%', height: 60 }}>
        <ActivityIndicator style={styles.spinner} animating={refetching} hidesWhenStopped={false} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default TimelineRefresh;
