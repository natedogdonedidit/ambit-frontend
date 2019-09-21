import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Platform,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/react-hooks';
import LinearGradient from 'react-native-linear-gradient';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import NewPostModal from 'library/components/modals/NewPostModal';
import Loader from 'library/components/UI/Loader';
import PersonalTimeline from 'library/components/PersonalTimeline';
import GlobalTimeline from 'library/components/GlobalTimeline';
import LocalTimeline from 'library/components/LocalTimeline';
import SmallProfilePic from 'library/components/UI/SmallProfilePic';
import TimelineTabs from 'library/components/TimelineTabs';
import { LoggedInUser } from '../../library/queries/_fragments';

const HEADER_HEIGHT = 42;
const BANNER_HEIGHT = 115;
const TABS_HEIGHT = 42;

const SLIDE_DISTANCE = BANNER_HEIGHT;

const HomeScreen = ({ navigation }) => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [newPostModalVisible, setNewPostModalVisible] = useState(false);
  const [scrollY] = useState(new Animated.Value(Platform.OS === 'ios' ? -BANNER_HEIGHT : 0));
  const [refreshing, setRefreshing] = useState(false);
  const [requestRefresh, setRequestRefresh] = useState(false);

  const insets = useSafeArea();

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (loadingUser) return null;
  if (errorUser) return <Text>{`Error! ${errorUser}`}</Text>;
  const { userLoggedIn } = dataUser;

  const onRefresh = () => {
    setRequestRefresh(true);
    setRefreshing(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{ height: HEADER_HEIGHT + TABS_HEIGHT, width: '100%' }} />
      <Animated.ScrollView
        contentInset={{ top: Platform.OS === 'ios' ? BANNER_HEIGHT : 0 }}
        style={[
          {
            width: '100%',
            flex: 1,
            backgroundColor: colors.lightGray,
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={BANNER_HEIGHT} />}
      >
        <View style={{ height: Platform.OS === 'ios' ? 0 : BANNER_HEIGHT, width: '100%' }} />
        {activeTimeline === 0 && (
          <PersonalTimeline
            requestRefresh={requestRefresh}
            setRequestRefresh={setRequestRefresh}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            navigation={navigation}
          />
        )}
        {activeTimeline === 1 && (
          <LocalTimeline
            requestRefresh={requestRefresh}
            setRequestRefresh={setRequestRefresh}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            userLoggedIn={userLoggedIn}
            navigation={navigation}
          />
        )}
        {activeTimeline === 2 && (
          <GlobalTimeline
            requestRefresh={requestRefresh}
            setRequestRefresh={setRequestRefresh}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            navigation={navigation}
          />
        )}

        {/* <View style={{ height: 900, width: '100%', backgroundColor: 'pink' }} /> */}
      </Animated.ScrollView>

      <Animated.View
        style={{
          ...styles.sliderView,
          ...defaultStyles.shadowButton,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: Platform.OS === 'ios' ? [-SLIDE_DISTANCE, 0] : [0, SLIDE_DISTANCE],
                outputRange: [0, -SLIDE_DISTANCE],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <View style={{ height: insets.top + HEADER_HEIGHT, width: '100%', backgroundColor: 'white' }} />
        <View style={{ height: BANNER_HEIGHT, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: 'white' }}>
          {/* {userLoggedIn && <Text style={{ ...defaultStyles.largeLight }}>Hello, {userLoggedIn.firstName}!</Text>} */}
          <Text style={styles.welcomeText}>Get started in 3 simple steps.</Text>
          <TouchableOpacity onPress={() => null}>
            <View style={{ ...styles.taskView, ...defaultStyles.shadowButton }}>
              <LinearGradient
                start={{ x: 0.2, y: 0.2 }}
                end={{ x: 1, y: 6 }}
                colors={[colors.purp, colors.purpGradient]}
                style={{ ...styles.linearGradient }}
              />
              <View>
                <Text style={{ ...defaultStyles.largeBold, color: 'white' }}>Learn how to use{'\n'}Ambit!</Text>
              </View>

              <View>
                <Text style={{ ...defaultStyles.defaultMedium, color: 'white', textAlign: 'center' }}>Step{'\n'}1/3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <TimelineTabs
          height={TABS_HEIGHT}
          tabState={activeTimeline}
          setTabState={setActiveTimeline}
          setNewPostModalVisible={setNewPostModalVisible}
        />
      </Animated.View>

      <View style={styles.headerBarView}>
        <View style={{ height: insets.top, width: '100%', backgroundColor: 'white' }} />
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <SmallProfilePic pic={userLoggedIn.profilePic} />
          </TouchableOpacity>
          <View style={{ flex: 1, paddingRight: 30, alignItems: 'center' }}>
            <Text style={{ ...defaultStyles.ambitLogo }}>Ambit</Text>
          </View>
          {/* <TouchableOpacity onPress={() => setNewPostModalVisible(true)}>
            <Icon name="search" size={20} color={colors.darkGray} style={{ opacity: 0.6 }} />
          </TouchableOpacity> */}
        </View>
      </View>
      <TouchableOpacity onPress={() => setNewPostModalVisible(true)}>
        <View style={{ ...styles.newPostButton, ...defaultStyles.shadowButton }}>
          <Icon name="pen" size={18} color="white" />
        </View>
      </TouchableOpacity>
      <NewPostModal
        newPostModalVisible={newPostModalVisible}
        setNewPostModalVisible={setNewPostModalVisible}
        userLoggedIn={userLoggedIn}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  newPostButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    overflow: 'hidden',
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  sliderView: {
    width: '100%',
    // height: SLIDER_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // overflow: 'hidden',
    backgroundColor: 'white',
  },
  welcomeText: {
    fontSize: 15,
    fontFamily: 'SFProDisplay-Light',
    color: colors.darkGray,
    // marginTop: 2,
  },
  taskView: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingVertical: 10,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
  },
});

export default HomeScreen;
