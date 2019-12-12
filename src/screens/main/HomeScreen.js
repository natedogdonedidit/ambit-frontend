import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar, TouchableOpacity, RefreshControl, Animated, Dimensions } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useSafeArea } from 'react-native-safe-area-context';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HeaderHome from 'library/components/headers/HeaderHome';
import Error from 'library/components/UI/Error';

import HomeTimeline from 'library/components/timelines/HomeTimeline';
import LocalTimeline from 'library/components/timelines/LocalTimeline';
import TopicsTimeline from 'library/components/timelines/TopicsTimeline';

import TimelineTabs from 'library/components/timelines/TimelineTabs';
import TopicsSelector from 'library/components/timelines/TopicsSelector';
// import GoalsSelector from 'library/components/timelines/GoalsSelector';

const HEADER_HEIGHT = 44;
const BANNER_HEIGHT = 0;

const HomeScreen = ({ navigation }) => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeTopic, setActiveTopic] = useState('Trending');
  const [scrollY] = useState(new Animated.Value(0));
  const [scrollX] = useState(new Animated.Value(0));
  // const [refreshing, setRefreshing] = useState(false);
  // const [requestRefresh, setRequestRefresh] = useState(false);

  // ///////////////////////////
  // REFS & CONTEXT
  // ///////////////////////////
  const insets = useSafeArea();
  const { height, width } = Dimensions.get('window');
  const horizontalScrollRef = useRef();

  scrollX.addListener(({ value }) => {
    if (value === 0) setActiveTimeline(0);
    if (value === width * 1) setActiveTimeline(1);
    if (value === width * 2) setActiveTimeline(2);

    // if (value >= 0 && value < width * 0.5 && activeTimeline !== 0) setActiveTimeline(0);
    // if (value >= width * 0.5 && value < width * 1.5 && activeTimeline !== 1) setActiveTimeline(1);
    // if (value >= width * 1.5 && activeTimeline !== 2) setActiveTimeline(2);
  });

  // ///////////////////////////
  // CONSTANTS
  // ///////////////////////////
  const tabs1Height = 42;
  let tabs2Height = 0;
  if (activeTimeline === 2) tabs2Height = 46;
  // if (activeTimeline === 3) tabs2Height = 46;
  const tabsHeight = tabs1Height + tabs2Height;

  const SLIDE_HEIGHT = HEADER_HEIGHT + BANNER_HEIGHT;

  // ///////////////////////////
  // QUERIES
  // ///////////////////////////
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  const { userLoggedIn } = dataUser;

  // ///////////////////////////
  // CUSTOM FUNCTIONS
  // ///////////////////////////

  const onScrollHorizontal = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          },
        },
      },
    ],
    { useNativeDriver: true }
  );

  // const onRefresh = () => {
  //   setRequestRefresh(true);
  //   setRefreshing(true);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          // horizontal scrollView
          ref={horizontalScrollRef}
          style={{ flex: 1 }} // must give a fixed height here of the onEndReached doesnt work in FlatLists
          // contentContainerStyle={{ height: '100%' }}
          horizontal
          snapToAlignment="start"
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={100}
          onScroll={onScrollHorizontal}
        >
          <View
            style={{
              width,
              borderLeftWidth: StyleSheet.hairlineWidth,
              borderLeftColor: colors.borderBlack,
              borderRightWidth: StyleSheet.hairlineWidth,
              borderRightColor: colors.borderBlack,
              // backgroundColor: 'pink',
            }}
          >
            <HomeTimeline navigation={navigation} scrollY={scrollY} paddingTop={SLIDE_HEIGHT + tabsHeight} />
          </View>
          <View
            style={{
              width,
              borderRightWidth: StyleSheet.hairlineWidth,
              borderRightColor: colors.borderBlack,
              // backgroundColor: 'blue',
            }}
          >
            <LocalTimeline
              userLoggedIn={userLoggedIn}
              navigation={navigation}
              scrollY={scrollY}
              paddingTop={SLIDE_HEIGHT + tabsHeight}
            />
          </View>
          <View
            style={{
              width,
              borderRightWidth: StyleSheet.hairlineWidth,
              borderRightColor: colors.borderBlack,
              // backgroundColor: 'tomato',
            }}
          >
            <TopicsTimeline
              activeTopic={activeTopic}
              userLoggedIn={userLoggedIn}
              navigation={navigation}
              scrollY={scrollY}
              paddingTop={SLIDE_HEIGHT + tabsHeight}
            />
          </View>
        </Animated.ScrollView>
      </View>

      {/* Absolute positioned stoff */}
      <View style={styles.newPostButtonAbsolute}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('NewPostModal', { userLoggedIn });
          }}
        >
          <View style={{ ...styles.newPostButton, ...defaultStyles.shadowButton }}>
            <Icon name="pen" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>

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
          <HeaderHome
            user={userLoggedIn}
            handleMiddle={() => null}
            handleRight={() => navigation.navigate('CustomSearch')}
            navigation={navigation}
            height={HEADER_HEIGHT}
          />
          <View
            // custom banner (optional)
            style={{ width: '100%', height: BANNER_HEIGHT, backgroundColor: 'tomato' }}
          />
        </Animated.View>

        <View
          style={{
            backgroundColor: colors.lightLightGray,
            borderBottomColor: colors.borderBlack,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <TimelineTabs
            activeTimeline={activeTimeline}
            setActiveTimeline={setActiveTimeline}
            height={tabs1Height}
            scrollX={scrollX}
            width={width}
            horizontalScrollRef={horizontalScrollRef}
          />
        </View>
        {activeTimeline === 2 && (
          <View
            style={{
              backgroundColor: colors.lightLightGray,
              borderBottomColor: colors.borderBlack,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <TopicsSelector activeTopic={activeTopic} setActiveTopic={setActiveTopic} height={tabs2Height} />
          </View>
        )}
        {/* {activeTimeline === 3 && (
          <View
            style={{
              backgroundColor: colors.lightLightGray,
              borderBottomColor: colors.borderBlack,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <GoalsSelector tabState={activeTimeline} setTabState={setActiveTimeline} height={tabs2Height} />
          </View>
        )} */}
      </Animated.View>

      {/* Gives a solid background to the StatusBar */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: insets.top,
          backgroundColor: colors.lightLightGray,
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

export default HomeScreen;
