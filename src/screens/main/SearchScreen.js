import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar, TouchableOpacity, Animated, Dimensions, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useSafeArea } from 'react-native-safe-area-context';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchTimeline from 'library/components/timelines/SearchTimeline';
import HeaderSearch from 'library/components/headers/HeaderSearch';
import Error from 'library/components/UI/Error';
import SearchTabs from 'library/components/search/SearchTabs';
import { HEADER_HEIGHT } from 'styles/constants';
import TimelineTabs from 'library/components/timelines/TimelineTabs';
import { getTopicFromID } from 'library/utils';

const DROPDOWNS_HEIGHT = 44;

const SearchScreen = ({ navigation }) => {
  // PARAMS

  // STATE
  const [scrollY] = useState(new Animated.Value(0));
  const [textInput, setTextInput] = useState('');
  const [topicID, setTopic] = useState('');
  const [lat, setLat] = useState('');
  const [activeTab, setActiveTab] = useState('Top');

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
  const topic = getTopicFromID(topicID);
  const topicSelectText = topic ? topic.name : 'All Topics';
  const locationSelectText = 'All Locations';

  const SLIDE_HEIGHT = DROPDOWNS_HEIGHT;

  // ////////////////////////////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const clearTopic = () => {
    setTopic('');
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <SearchTimeline
          navigation={navigation}
          activeTab={activeTab}
          textInput={textInput}
          topicID={topicID}
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
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => navigation.navigate('SelectSearchTopicsModal', { setTopic })}
                >
                  <Text style={{ ...defaultStyles.defaultMedium, color: colors.blueGray }}>{topicSelectText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={topicID ? () => clearTopic() : () => navigation.navigate('SelectSearchTopicsModal', { setTopic })}
                  hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                >
                  <Ionicons name={topicID ? 'md-close' : 'md-arrow-dropdown'} size={topicID ? 16 : 22} color={colors.blueGray} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.dropdownBoxRight}>
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => navigation.navigate('SelectSearchTopicsModal', { setTopic })}
                >
                  <Text style={{ ...defaultStyles.defaultMedium, color: colors.blueGray }}>{locationSelectText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={lat ? () => clearTopic() : () => navigation.navigate('SelectSearchTopicsModal', { setTopic })}
                  hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                >
                  <Ionicons name={lat ? 'md-close' : 'md-arrow-dropdown'} size={lat ? 16 : 22} color={colors.blueGray} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} height={tabsHeight} />
      </Animated.View>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <HeaderSearch
          user={userLoggedIn}
          handleLeft={() => navigation.goBack()}
          textInput={textInput}
          setTextInput={setTextInput}
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});

export default SearchScreen;
