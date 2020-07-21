import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/react-hooks';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HeaderHome from 'library/components/headers/HeaderHome';
import Error from 'library/components/UI/Error';

import HomeTimeline from 'library/components/timelines/HomeTimeline';
import TopicsList from 'library/components/timelines/TopicsList';

import { HEADER_HEIGHT } from 'styles/constants';
import { UserContext } from 'library/utils/UserContext';
import analytics from '@segment/analytics-react-native';

const SLIDE_HEIGHT = HEADER_HEIGHT - StyleSheet.hairlineWidth;

const HomeScreen = ({ navigation }) => {
  // CONTEXT
  const { homePosition, setHomePosition, creatingStory } = useContext(UserContext);

  // STATE
  const [scrollY] = useState(new Animated.Value(0));

  // OTHER HOOKS
  const insets = useSafeArea();
  const [top] = useState(insets.top || 20); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal

  const { width } = Dimensions.get('window');
  const horizontalScrollRef = useRef();

  // if home position changes to 0, scroll to begininning (used for when user presses Home tab)
  useEffect(() => {
    if (homePosition === 0) {
      horizontalScrollRef.current.scrollTo({ x: 0 });
    }
  }, [homePosition]);

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  const { userLoggedIn } = dataUser;

  // if press top button --> auto scroll
  const handleTopicsButton = () => {
    if (homePosition === 0) {
      horizontalScrollRef.current.scrollToEnd();
    } else {
      horizontalScrollRef.current.scrollTo({ x: 0 });
    }
  };

  // if scroll past threshold --> change state
  const handleOnScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    if (scrollX < width / 2 && homePosition === 1) {
      setHomePosition(0);
    }
    if (scrollX > width / 2 && homePosition === 0) {
      setHomePosition(1);
    }
  };

  return (
    <View style={{ ...styles.container, paddingTop: top }}>
      <StatusBar barStyle="dark-content" networkActivityIndicatorVisible={creatingStory} />

      {/* horizontal scrollView */}
      <ScrollView
        ref={horizontalScrollRef}
        style={{ flex: 1 }} // must give a fixed height here of the onEndReached doesnt work in FlatLists
        horizontal
        snapToAlignment="start"
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={100}
        onScroll={handleOnScroll}
      >
        <View style={{ width }}>
          <HomeTimeline navigation={navigation} scrollY={scrollY} paddingTop={SLIDE_HEIGHT} />
        </View>
        <View style={{ width, borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: colors.borderBlack }}>
          <TopicsList navigation={navigation} scrollY={scrollY} paddingTop={SLIDE_HEIGHT} />
        </View>
      </ScrollView>

      {/* Absolute positioned stoff */}
      <View style={styles.newPostButtonAbsolute}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('NewPostModal', { userLoggedIn });
          }}
        >
          <View style={{ ...styles.newPostButton, ...defaultStyles.shadowButton }}>
            <Icon name="pencil-alt" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* this contains the Header, Banner, and Tabs. They all slide up together clamped at SLIDE_HEIGHT */}
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
        }}
      >
        <Animated.View
          style={{
            paddingTop: top,
          }}
        >
          <HeaderHome
            user={userLoggedIn}
            handleMiddle={() => null}
            navigation={navigation}
            handleTopicsButton={handleTopicsButton}
            homePosition={homePosition}
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
