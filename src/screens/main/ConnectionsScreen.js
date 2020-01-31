import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useSafeArea } from 'react-native-safe-area-context';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import HeaderSuggestions from 'library/components/headers/HeaderSuggestions';
import Error from 'library/components/UI/Error';
import Loader from 'library/components/UI/Loader';

import ConnectionsList from 'library/components/lists/ConnectionsList';

import FullWidthTabs from 'library/components/UI/FullWidthTabs';
import { HEADER_HEIGHT } from 'styles/constants';

const TABS_HEIGHT = 42;
const SLIDE_HEIGHT = HEADER_HEIGHT;
const TABS = ['For you', 'Local'];

const ConnectionsScreen = ({ navigation }) => {
  // ROUTE PARAMS

  // STATE
  const [scrollY] = useState(new Animated.Value(0));
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // OTHER HOOKS
  const insets = useSafeArea();

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  if (loadingUser) return <Loader backgroundColor={colors.lightGray} loading={loadingUser} />;
  const { userLoggedIn } = dataUser;

  // CONSTANTS

  // CUSTOM FUNCTIONS

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <ConnectionsList
          navigation={navigation}
          scrollY={scrollY}
          paddingTop={SLIDE_HEIGHT + TABS_HEIGHT}
          activeTab={activeTab}
        />
      </View>

      {/* Absolute positioned stoff */}

      <Animated.View
        // this contains the Header, Banner, and Tabs. They all slide up together clamped at SLIDE_HEIGHT
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          overflow: 'hidden',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, SLIDE_HEIGHT],
                outputRange: [0, -SLIDE_HEIGHT],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Animated.View
          style={{
            paddingTop: insets.top,
          }}
        >
          <HeaderSuggestions
            user={userLoggedIn}
            handleMiddle={() => null}
            handleRight={() => navigation.navigate('Search')}
            navigation={navigation}
          />
        </Animated.View>

        <View
          style={{
            backgroundColor: 'white',
            borderBottomColor: colors.borderBlack,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <FullWidthTabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} height={TABS_HEIGHT} />
        </View>
      </Animated.View>

      {/* Gives a solid background to the StatusBar */}
      <View
        style={{
          ...styles.statusBar,
          height: insets.top,
        }}
      />
    </SafeAreaView>
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
  scrollView: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.lightGray,
  },
  newPostButtonAbsolute: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'white',
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  newPostButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});

export default ConnectionsScreen;
