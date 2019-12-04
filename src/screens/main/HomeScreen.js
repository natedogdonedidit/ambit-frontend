import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useSafeArea } from 'react-native-safe-area-context';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HeaderHome from 'library/components/headers/HeaderHome';
import Error from 'library/components/UI/Error';
import PersonalTimeline from 'library/components/timelines/PersonalTimeline';
import HomeTimeline from 'library/components/timelines/HomeTimeline';
import LocalTimeline from 'library/components/timelines/LocalTimeline';
import TimelineTabs from 'library/components/timelines/TimelineTabs';

const AMBIT_HEADER_HEIGHT = 44;

const HomeScreen = ({ navigation }) => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  // const [newPostModalVisible, setNewPostModalVisible] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);
  // const [requestRefresh, setRequestRefresh] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));
  const insets = useSafeArea();

  // CONSTANTS

  const tabs1Height = 42;
  let tabs2Height = 0;
  if (activeTimeline === 2) tabs2Height = 42;
  const tabsHeight = tabs1Height + tabs2Height;
  const paddingTop = tabsHeight + insets.top;

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  const { userLoggedIn } = dataUser;

  // const onRefresh = () => {
  //   setRequestRefresh(true);
  //   setRefreshing(true);
  // };

  return (
    <View style={styles.container}>
      {/* <View style={{ height: 20, width: '100%', backgroundColor: colors.lightLightGray, zIndex: 100 }}>
        <StatusBar barStyle="dark-content" />
      </View> */}
      <StatusBar barStyle="dark-content" />

      {/* <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}> */}
      <View style={{ flex: 1, paddingTop }}>
        {activeTimeline === 0 && (
          // <View style={{ width: '100%', height: 500, backgroundColor: 'green' }} />
          <HomeTimeline
            // requestRefresh={requestRefresh}
            // setRequestRefresh={setRequestRefresh}
            // refreshing={refreshing}
            // setRefreshing={setRefreshing}
            navigation={navigation}
            scrollY={scrollY}
            tabsHeight={tabsHeight}
          />
        )}
        {activeTimeline === 1 && (
          // <View style={{ width: '100%', height: 500, backgroundColor: 'red' }} />
          <LocalTimeline
            // requestRefresh={requestRefresh}
            // setRequestRefresh={setRequestRefresh}
            // refreshing={refreshing}
            // setRefreshing={setRefreshing}
            userLoggedIn={userLoggedIn}
            navigation={navigation}
            scrollY={scrollY}
            tabsHeight={tabsHeight}
          />
        )}
        {/* {activeTimeline === 2 && (
          <PersonalTimeline
            requestRefresh={requestRefresh}
            setRequestRefresh={setRequestRefresh}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            navigation={navigation}
          />
        )} */}
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
                inputRange: [0, AMBIT_HEADER_HEIGHT],
                outputRange: [0, -AMBIT_HEADER_HEIGHT],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Animated.View
          style={{
            opacity: scrollY.interpolate({
              inputRange: [0, AMBIT_HEADER_HEIGHT],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          }}
        >
          <HeaderHome
            user={userLoggedIn}
            handleMiddle={() => null}
            handleRight={() => navigation.navigate('CustomSearch')}
            navigation={navigation}
            height={AMBIT_HEADER_HEIGHT + insets.top}
          />
        </Animated.View>

        <View
          style={{
            backgroundColor: colors.lightLightGray,
            borderBottomColor: colors.borderBlack,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <TimelineTabs tabState={activeTimeline} setTabState={setActiveTimeline} height={tabs1Height} />
          <TimelineTabs tabState={activeTimeline} setTabState={setActiveTimeline} height={tabs2Height} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightLightGray,
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
