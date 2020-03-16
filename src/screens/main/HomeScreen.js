import React, { useState, useRef } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';
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

const SLIDE_HEIGHT = HEADER_HEIGHT - StyleSheet.hairlineWidth;

const HomeScreen = ({ navigation }) => {
  // STATE
  const [scrollY] = useState(new Animated.Value(0));

  // OTHER HOOKS
  const insets = useSafeArea();
  const { width } = Dimensions.get('window');
  const horizontalScrollRef = useRef();
  // const { currentUserId } = useContext(UserContext);

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  const { userLoggedIn } = dataUser;

  const handleTopicsButton = () => {
    console.log(horizontalScrollRef.current);
    // horizontalScrollRef.current.scrollTo({ x: 1 * width });
    horizontalScrollRef.current.scrollToEnd();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <ScrollView
          // horizontal scrollView
          ref={horizontalScrollRef}
          style={{ flex: 1 }} // must give a fixed height here of the onEndReached doesnt work in FlatLists
          horizontal
          snapToAlignment="start"
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={100}
        >
          <View style={{ width }}>
            <HomeTimeline navigation={navigation} scrollY={scrollY} paddingTop={SLIDE_HEIGHT} />
          </View>
          <View style={{ width }}>
            <TopicsList userLoggedIn={userLoggedIn} navigation={navigation} scrollY={scrollY} paddingTop={SLIDE_HEIGHT} />
          </View>
        </ScrollView>
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
            <Icon name="pencil-alt" size={24} color="white" />
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
            navigation={navigation}
            handleTopicsButton={handleTopicsButton}
          />
        </Animated.View>
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

export default HomeScreen;
