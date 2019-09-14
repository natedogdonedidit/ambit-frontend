import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/react-hooks';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HeaderHome from 'library/components/headers/HeaderHome';
import HeaderBackground from 'library/components/headers/HeaderBackground';
import NewPostModal from 'library/components/modals/NewPostModal';
import Loader from 'library/components/UI/Loader';
import PersonalTimeline from 'library/components/PersonalTimeline';
import GlobalTimeline from 'library/components/GlobalTimeline';
import LocalTimeline from 'library/components/LocalTimeline';
import SmallProfilePic from 'library/components/UI/SmallProfilePic';
import TimelineTabs from 'library/components/TimelineTabs';

const HEADER_HEIGHT = 42;
const SLIDER_HEIGHT = 180;

const HomeScreen = props => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [newPostModalVisible, setNewPostModalVisible] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  const { navigation } = props;

  // QUERIES
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { userLoggedIn } = data;

  const insets = useSafeArea();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: HEADER_HEIGHT, width: '100%' }} />
      <Animated.ScrollView
        style={[
          {
            width: '100%',
            flex: 1,
            backgroundColor: 'white',
          },
        ]}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={1}
        stickyHeaderIndices={[1]}
      >
        <View style={{ height: SLIDER_HEIGHT, width: '100%' }} />
        <TimelineTabs tabState={activeTimeline} setTabState={setActiveTimeline} />
        <View style={{ height: 900, width: '100%', backgroundColor: colors.lightGray }} />

        {/* {activeTimeline === 0 && <PersonalTimeline />}
        {activeTimeline === 1 && <LocalTimeline />}
        {activeTimeline === 2 && <GlobalTimeline />} */}
      </Animated.ScrollView>

      <Animated.View
        style={{
          ...styles.sliderView,
          marginTop: insets.top + HEADER_HEIGHT,
          padding: 20,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, SLIDER_HEIGHT],
                outputRange: [0, -SLIDER_HEIGHT],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Text style={{ ...defaultStyles.largeLight }}>Hello, {userLoggedIn.firstName}!</Text>
        <Text style={styles.welcomeText}>Welcome to Ambit</Text>
        <TouchableOpacity onPress={() => null}>
          <View style={styles.taskView}>
            <View>
              <Text style={{ ...defaultStyles.largeBold, color: 'white' }}>Learn how to use{'\n'}Ambit!</Text>
            </View>

            <View>
              <Text style={{ ...defaultStyles.defaultText, color: 'white', textAlign: 'center' }}>Step{'\n'}1/4</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.headerBarView}>
        <View style={{ height: insets.top, width: '100%', backgroundColor: 'white' }} />
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <SmallProfilePic />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => null}>
            <Icon name="search" size={20} color={colors.darkGray} style={{ opacity: 0.6 }} />
          </TouchableOpacity>
        </View>
      </View>

      <NewPostModal newPostModalVisible={newPostModalVisible} setNewPostModalVisible={setNewPostModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  headerBarView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  headerBar: {
    width: '100%',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  sliderView: {
    width: '100%',
    height: SLIDER_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  welcomeText: {
    fontSize: 26,
    fontFamily: 'SFProDisplay-Regular',
    color: colors.darkGray,
    marginTop: 2,
  },
  taskView: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: colors.purp,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
});

export default HomeScreen;

// {/* {activeTimeline === 0 && <GlobalTimeline />}
// {activeTimeline === 1 && <LocalTimeline />}
// {activeTimeline === 2 && <GlobalTimeline />} */}
