import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, Animated, ActivityIndicator } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import HeaderMatches from 'library/components/headers/HeaderMatches';
import Error from 'library/components/UI/Error';
import Loader from 'library/components/UI/Loader';
import ConnectionsList from 'library/components/lists/ConnectionsList';

const ConnectionsScreen = ({ navigation }) => {
  // OTHER HOOKS
  const insets = useSafeArea();
  const [scrollY] = useState(new Animated.Value(0));
  const [showRefreshing, setShowRefreshing] = useState(false);

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <StatusBar barStyle="dark-content" />
      <HeaderMatches handleMiddle={() => null} handleRight={() => navigation.navigate('Search')} navigation={navigation} />
      {/* This is the loading animation */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 15,
          left: 0,
          width: '100%',
          height: 60,
          justifyContent: 'flex-end',
          // backgroundColor: 'pink',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-45, 0],
                outputRange: [45, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <View style={{ width: '100%', height: 60 }}>
          <ActivityIndicator
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
            size="small"
            color={colors.purp}
            animating={showRefreshing}
            hidesWhenStopped={false}
          />
        </View>
      </Animated.View>
      <View style={{ flex: 1, top: -StyleSheet.hairlineWidth }}>
        <ConnectionsList
          navigation={navigation}
          scrollY={scrollY}
          showRefreshing={showRefreshing}
          setShowRefreshing={setShowRefreshing}
        />
      </View>

      {/* Gives a solid background to the StatusBar */}
      <View
        style={{
          ...styles.statusBar,
          height: insets.top,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    overflow: 'hidden',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default ConnectionsScreen;
