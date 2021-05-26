import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useApolloClient} from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HeaderHome from 'library/components/headers/HeaderHome';
// import Error from 'library/components/UI/Error';

import HomeTimeline0 from 'library/components/timelines/HomeTimeline0';
import HomeTimeline1 from 'library/components/timelines/HomeTimeline1';
import HomeTimeline2 from 'library/components/timelines/HomeTimeline2';

import {
  HEADER_HEIGHT,
  STORIES_HEIGHT,
  HOME_TABS_HEIGHT,
} from 'styles/constants';
import {UserContext} from 'library/utils/UserContext';

const SLIDE_HEIGHT = HEADER_HEIGHT + STORIES_HEIGHT - StyleSheet.hairlineWidth;
const TIMELINE_PADDING_TOP = HEADER_HEIGHT + STORIES_HEIGHT + HOME_TABS_HEIGHT;

const HomeScreen = ({navigation}) => {
  // CONTEXT
  const {showNetworkActivity, setRefreshHomeScreen} = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const horizontalScrollRef = useRef();
  const client = useApolloClient();
  const {width} = Dimensions.get('window');

  // STATE
  // const [scrollY] = useState(new Animated.Value(0));
  const scrollY = useRef(new Animated.Value(0)).current;
  const [top, setTop] = useState(insets.top || 20); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [headerValue, setHeaderValue] = useState(0);

  // create refetch function. will refetch:
  // 1. All 3 timeline posts
  // 2. For You stories
  // 3. Topic stories
  // 4. Current User Topics

  // EFFECTS
  useEffect(() => {
    if (insets.top > 0) {
      setTop(insets.top);
    }
  }, [insets.top]);

  // track the slide height of the Home Header in state so timelines can sync scroll
  useEffect(() => {
    scrollY.addListener(({value}) => {
      if (value > 0 && value < SLIDE_HEIGHT) {
        const val = Math.round(value / 8) * 8;
        setHeaderValue(val);
      } else if (value <= 0) {
        setHeaderValue(0);
      } else if (value >= SLIDE_HEIGHT) {
        setHeaderValue(SLIDE_HEIGHT);
      }
    });
  }, [scrollY]);

  // for HORIZONTAL scroll. If change tab --> scroll to timeline
  useEffect(() => {
    if (activeTimeline === 0) {
      horizontalScrollRef.current.scrollTo({x: 0});
    } else if (activeTimeline === 1) {
      horizontalScrollRef.current.scrollTo({x: width});
    } else if (activeTimeline === 2) {
      horizontalScrollRef.current.scrollTo({x: width * 2});
    }
  }, [activeTimeline, width]);

  // for HORIZONTAL scroll. If scroll past threshold --> change tab state
  const handleOnScroll = event => {
    const scrollX = event.nativeEvent.contentOffset.x;
    if (scrollX === 0) {
      setActiveTimeline(0);
    } else if (scrollX === width) {
      setActiveTimeline(1);
    } else if (scrollX === width * 2) {
      setActiveTimeline(2);
    }
  };

  return (
    <View style={{...styles.container, paddingTop: top}}>
      <StatusBar
        barStyle="dark-content"
        networkActivityIndicatorVisible={showNetworkActivity}
      />
      <ScrollView
        ref={horizontalScrollRef}
        style={{flex: 1}} // must give a fixed height here of the onEndReached doesnt work in FlatLists
        horizontal
        snapToAlignment="start"
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleOnScroll}
        removeClippedSubviews={false}>
        <View style={{width}}>
          <HomeTimeline0
            navigation={navigation}
            scrollY={scrollY}
            paddingTop={TIMELINE_PADDING_TOP}
            activeTimeline={activeTimeline}
            headerValue={headerValue}
          />
        </View>
        <View style={{width}}>
          <HomeTimeline1
            navigation={navigation}
            scrollY={scrollY}
            paddingTop={TIMELINE_PADDING_TOP}
            activeTimeline={activeTimeline}
            headerValue={headerValue}
          />
        </View>
        <View style={{width}}>
          <HomeTimeline2
            navigation={navigation}
            scrollY={scrollY}
            paddingTop={TIMELINE_PADDING_TOP}
            activeTimeline={activeTimeline}
            headerValue={headerValue}
          />
        </View>
        {/* <View style={{ width, borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: colors.borderBlack }}>
          <TopicsHome navigation={navigation} scrollY={scrollY} paddingTop={TIMELINE_PADDING_TOP} />
        </View> */}
      </ScrollView>

      {/* Absolute positioned stoff */}
      <View style={styles.newPostButtonAbsolute}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('NewPostModal', {topicsPassedIn: []});
          }}>
          <View
            style={{...styles.newPostButton, ...defaultStyles.shadowButton}}>
            <Icon name="pencil-alt" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* this contains the Header, Stories, and Tabs. They all slide up together clamped at SLIDE_HEIGHT */}
      <Animated.View
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
        }}>
        <Animated.View
          style={{
            paddingTop: top,
          }}>
          <HeaderHome
            handleMiddle={() => null}
            activeTimeline={activeTimeline}
            setActiveTimeline={setActiveTimeline}
          />
        </Animated.View>
      </Animated.View>

      {/* Gives a solid background to the StatusBar */}
      <View
        style={{
          ...styles.statusBar,
          height: top,
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
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  newPostButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default HomeScreen;
