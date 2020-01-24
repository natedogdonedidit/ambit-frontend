import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar, TouchableOpacity, RefreshControl, Animated, Dimensions } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useSafeArea } from 'react-native-safe-area-context';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HeaderTopic from 'library/components/headers/HeaderTopic';
import Error from 'library/components/UI/Error';

import TopicsTimeline from 'library/components/timelines/TopicsTimeline';
import SubTopicsSelector from 'library/components/timelines/SubTopicsSelector';
import { getFullTopicFromID } from 'library/utils';

const HEADER_HEIGHT = 44;
const BANNER_HEIGHT = 0;

const TopicScreen = ({ navigation }) => {
  // PARAMS
  const topicID = navigation.getParam('topicID');
  const subTopic = navigation.getParam('subTopic', null);
  const activeTopic = getFullTopicFromID(topicID);

  // STATE
  const [activeSubTopic, setActiveSubTopic] = useState(subTopic || activeTopic.topicID);
  const [scrollY] = useState(new Animated.Value(0));

  // REFS & CONTEXT
  const insets = useSafeArea();
  // const { height, width } = Dimensions.get('window');

  // CONSTANTS
  const tabsHeight = 46;
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <TopicsTimeline
          activeTopic={activeTopic}
          activeSubTopic={activeSubTopic}
          userLoggedIn={userLoggedIn}
          navigation={navigation}
          scrollY={scrollY}
          paddingTop={SLIDE_HEIGHT + tabsHeight}
        />
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
          <HeaderTopic
            user={userLoggedIn}
            handleMiddle={() => null}
            handleRight={() => navigation.navigate('CustomSearch')}
            navigation={navigation}
            height={HEADER_HEIGHT}
            topicName={activeTopic.name}
          />
          <View
            // custom banner (optional)
            style={{ width: '100%', height: BANNER_HEIGHT, backgroundColor: 'tomato' }}
          />
        </Animated.View>
        <View
          style={{
            // backgroundColor: colors.lightLightGray,
            backgroundColor: 'white',
            borderBottomColor: colors.borderBlack,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <SubTopicsSelector
            activeTopic={activeTopic}
            activeSubTopic={activeSubTopic}
            setActiveSubTopic={setActiveSubTopic}
            height={tabsHeight}
          />
        </View>
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
          // backgroundColor: colors.lightLightGray,
          backgroundColor: 'white',
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

export default TopicScreen;
