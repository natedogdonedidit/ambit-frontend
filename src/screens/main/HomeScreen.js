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

import HeaderHome from 'library/components/headers/HeaderHome';
import NewPostModal from 'library/components/modals/NewPostModal';
import Loader from 'library/components/UI/Loader';
import PersonalTimeline from 'library/components/PersonalTimeline';
import GlobalTimeline from 'library/components/GlobalTimeline';
import LocalTimeline from 'library/components/LocalTimeline';
import TimelineTabs from 'library/components/TimelineTabs';

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
      <HeaderHome user={userLoggedIn} handleMiddle={() => null} handleRight={() => null} navigation={navigation} />
      <TimelineTabs height={TABS_HEIGHT} tabState={activeTimeline} setTabState={setActiveTimeline} />

      <ScrollView
        style={[
          {
            width: '100%',
            flex: 1,
            backgroundColor: colors.lightGray,
          },
        ]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={BANNER_HEIGHT} />}
      >
        {activeTimeline === 2 && (
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
        {activeTimeline === 0 && (
          <GlobalTimeline
            requestRefresh={requestRefresh}
            setRequestRefresh={setRequestRefresh}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            navigation={navigation}
          />
        )}
      </ScrollView>

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
    backgroundColor: colors.lightLightGray,
    overflow: 'hidden',
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
    fontSize: 14,
    fontFamily: 'SFProDisplay-Thin',
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
