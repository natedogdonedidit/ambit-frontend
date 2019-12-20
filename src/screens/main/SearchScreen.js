import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useSafeArea } from 'react-native-safe-area-context';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HomeTimeline from 'library/components/timelines/HomeTimeline';
import HeaderSearch from 'library/components/headers/HeaderSearch';
import Error from 'library/components/UI/Error';
import SearchTabs from 'library/components/search/SearchTabs';
import { HEADER_HEIGHT } from 'styles/constants';
import TimelineTabs from 'library/components/timelines/TimelineTabs';

const DROPDOWNS_HEIGHT = 44;

const SearchScreen = ({ navigation }) => {
  // ////////////////////////////////////////////////////////////////
  // ROUTE PARAMS
  // const goToTimeline = navigation.getParam('goToTimeline');

  // ////////////////////////////////////////////////////////////////
  // STATE
  const [scrollY] = useState(new Animated.Value(0));

  const [textInput, setTextInput] = useState('');

  const [showingResults, setShowingResults] = useState(false);
  const [activeTab, setActiveTab] = useState('Top');

  // ///////////////////////////////////////////////////////////////
  // OTHER HOOKS
  const insets = useSafeArea();

  // ////////////////////////////////////////////////////////////////
  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  const { userLoggedIn } = dataUser;

  // ////////////////////////////////////////////////////////////////
  // CONSTANTS
  const tabsHeight = 42;
  const HEADER_HEIGHT_WITH_PADDING = HEADER_HEIGHT + insets.top;

  const SLIDE_HEIGHT = DROPDOWNS_HEIGHT;

  // ////////////////////////////////////////////////////////////////
  // CUSTOM FUNCTIONS

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <HomeTimeline
          navigation={navigation}
          scrollY={scrollY}
          paddingTop={HEADER_HEIGHT_WITH_PADDING + SLIDE_HEIGHT + tabsHeight}
        />
      </View>

      {/* Absolute Positioned Stuff */}

      <Animated.View
        // this contains the Dropdowns, and Tabs. They all slide up together clamped at SLIDE_HEIGHT
        style={{
          position: 'absolute',
          top: HEADER_HEIGHT_WITH_PADDING,
          left: 0,
          right: 0,
          width: '100%',
          overflow: 'hidden',
          backgroundColor: colors.lightLightGray,
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
        <View style={{ width: '100%', height: DROPDOWNS_HEIGHT }}>
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdownBoxLeft}>
              <View style={styles.dropdown} />
            </View>
            <View style={styles.dropdownBoxRight}>
              <View style={styles.dropdown} />
            </View>
          </View>
        </View>

        <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} height={tabsHeight} />
      </Animated.View>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <HeaderSearch user={userLoggedIn} handleLeft={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    overflow: 'hidden',
  },
  // dropdowns
  dropdownContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: colors.lightLightGray,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderBlack,
  },
  dropdownBoxLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 6,
  },
  dropdownBoxRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    paddingRight: 12,
  },
  dropdown: {
    width: '100%',
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.searchGray,
  },
});

export default SearchScreen;
